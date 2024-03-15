<?php
require 'vendor/autoload.php';

use PhpOffice\PhpWord\TemplateProcessor;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\Settings;
use Mpdf\Mpdf;


Settings::setPdfRendererPath('vendor/mpdf/mpdf');
Settings::setPdfRendererName(Settings::PDF_RENDERER_MPDF);

$total_color = "";
$total_price = 0;
$summary_price = 0;
$total_count = 0;
$pdfFile = "";
$file = array(
    "is_fail" => false,
    "message" => ""
);

$text_fields = array(
    "surname" => "",
    "date" => "",
    "address" => ""
);

$towns = array(
    "Москва" => "",
    "Санкт-Петербург" => "",
    "Пермь" => ""
);

$colors = array(
    "Орех" => array(
        "checked" => "checked",
        "extra_price" => 1.1,
        "img_name" => 'орех.png'),
    "Дуб мореный" => array(
        "checked" => "",
        "extra_price" => 1.2,
        "img_name" => 'дуб.png'),
    "Палисандр" => array(
        "checked" => "",
        "extra_price" => 1.3,
        "img_name" => 'палисандр.png'),
    "Эбеновое дерево" => array(
        "checked" => "",
        "extra_price" => 1.4,
        "img_name" => 'эбен.png'),
    "Клен" => array(
        "checked" => "",
        "extra_price" => 1.5,
        "img_name" => 'клен.png'),
    "Лиственница" => array(
        "checked" => "",
        "extra_price" => 1.6,
        "img_name" => 'лиственница.png')
);

$furnitures = array(
    "Банкетка" => array(
        "checked" => "",
        "quantity" => "",
        "item_price" => 0,
        "price" => 0),
    "Кровать" => array(
        "checked" => "",
        "quantity" => "",
        "item_price" => 0,
        "price" => 0),
    "Комод" => array(
        "checked" => "",
        "quantity" => "",
        "item_price" => 0,
        "price" => 0),
    "Шкаф" => array(
        "checked" => "",
        "quantity" => "",
        "item_price" => 0,
        "price" => 0),
    "Стул" => array(
        "checked" => "",
        "quantity" => "",
        "item_price" => 0,
        "price" => 0),
    "Стол" => array(
        "checked" => "",
        "quantity" => "",
        "item_price" => 0,
        "price" => 0),
);

if (isset($_POST['sub'])) {

    foreach ($text_fields as $key => $value)
        if (isset($_REQUEST[$key]) and $_REQUEST[$key] != "") {
            $text_fields[$key] = $_REQUEST[$key];
        } else {
            $text_fields[$key] = "";
        }

    foreach ($towns as $key => $value) {
        if (isset($_REQUEST["town"]) and $_REQUEST["town"] == $key) {
            $towns[$key] = "selected";
        } else {
            $towns[$key] = "";
        }
    }

    $color = "";
    if (isset($_REQUEST["color"])) {
        $color = $_REQUEST["color"];
    }
    foreach ($colors as $key => $value) {
        if ($color == $key) {
            $colors[$key]["checked"] = "checked";
        } else {
            $colors[$key]["checked"] = "";
        }
    }

    foreach ($furnitures as $key => $value) {
        if (isset($_REQUEST['furniture_' . $key]) and $_REQUEST['furniture_' . $key] != "") {
            $furnitures[$key]["checked"] = "checked";
            $furnitures[$key]["quantity"] = $_REQUEST["quantity_" . $key];
        } else {
            $furnitures[$key]["checked"] = "";
            $furnitures[$key]["quantity"] = "";
        }
    }

    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $file_tmp = $_FILES['file']['tmp_name'];
        $file_type = $_FILES['file']['type'];

        if ($file_type === 'text/plain') {
            $lines = file($file_tmp, FILE_IGNORE_NEW_LINES);

            $firstLineSkipped = false;
            foreach ($lines as $line) {
                if (!$firstLineSkipped) {
                    $firstLineSkipped = true;
                    continue;
                }
                $parts = explode(" ", $line);
                $furnitures[$parts[0]]["item_price"] = intval($parts[1]);
                $furnitures[$parts[0]]["price"] = intval($furnitures[$parts[0]]["quantity"]) * intval($parts[1]);
            }

        } else {
            $file["is_fail"] = true;
            $file["message"] = "Допустим только файлы текстового формата (.txt)";
        }
    } else {
        $file["is_fail"] = true;
        $file["message"] = "Ошибка загрузки файла";
    }
    if (!$file["is_fail"]) {
        foreach ($colors as $color => $details) {
            if ($details['checked'] === "checked") {
                $total_color = $color;
            }
        }

        $templateFile = 'temp/template.docx';
        $templateProcessor = new TemplateProcessor($templateFile);

        $number = mt_rand(1000, 9999);
        $replacements = array();
        foreach ($furnitures as $furniture => $details) {
            if ($details['checked'] === "checked") {
                $replacements[] = array('furniture' => $furniture, 'quantity' => $details['quantity'], 'price' => $details['price']);
                $total_count += $details['quantity'];
                $summary_price += $details['price'];
            }
        }
        $templateProcessor->setValue('number_invoice', $number);
        $templateProcessor->setValue('address', $text_fields['address']);
        $templateProcessor->setValue('date', $text_fields['date']);
        $templateProcessor->cloneBlock('block_name', 0, true, false, $replacements);
        $templateProcessor->setValue('summary_price', $summary_price);
        $templateProcessor->setValue('color', $total_color);
        $templateProcessor->setValue('extra_price', $colors[$total_color]['extra_price']);
        $total_price = $summary_price * $colors[$total_color]['extra_price'];
        $templateProcessor->setValue('total_price', $total_price);
        $file["message"] = "Итоговая цена: " . $total_price;
        $templateProcessor->setValue('total_count', $total_count);
        $templateProcessor->setImageValue('color_img', array('path' => 'img/' . $colors[$total_color]['img_name'], 'width' => 20, 'height' => 20, 'resize' => true));

        $processedFile = 'temp/processed_file.docx';
        $templateProcessor->saveAs($processedFile);

        $phpWord = IOFactory::load($processedFile, 'Word2007');

        $pdfFile = "files/Документ_на_выдачу_$number.pdf";
        $xmlWriter = IOFactory::createWriter($phpWord, 'PDF');
        $html = $xmlWriter->getContent();
        $mpdf = new Mpdf();
        $mpdf->WriteHTML($html);
        $mpdf->Output($pdfFile, 'F');
    }
}
