<?php
require 'vendor/autoload.php';

use PhpOffice\PhpWord\TemplateProcessor;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\Settings;

Settings::setPdfRendererPath('vendor/tecnickcom/tcpdf/');
Settings::setPdfRendererName('TCPDF');

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
    ["Орех", ""],
    ["Дуб мореный", ""],
    ["Палисандр", ""],
    ["Эбеновое дерево", ""],
    ["Клен", ""],
    ["Лиственница", ""]
);

$furnitures = array(
    [0, "Банкетка", "", ""],
    [1, "Кровать", "", ""],
    [2, "Комод", "", ""],
    [3, "Шкаф", "", ""],
    [4, "Стул", "", ""],
    [5, "Стол", "", ""]
);

if (isset($_REQUEST["sub"])) {

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
    for ($i = 0; $i < count($colors); $i++) {
        if ($color == $colors[$i][0]) {
            $colors[$i][1] = "checked";
        } else {
            $colors[$i][1] = "";
        }
    }

    for ($i = 0; $i < count($furnitures); $i++) {
        if (isset($_REQUEST['furniture'][$i]) and $_REQUEST['furniture'][$i] != "") {
            $furnitures[$i][2] = "checked";
            $furnitures[$i][3] = $_REQUEST["quantity"][$i];
        } else {
            $furnitures[$i][2] = "";
            $furnitures[$i][3] = "";
        }
    }

}
if (isset($_POST['sub'])) {
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $file_tmp = $_FILES['file']['tmp_name'];
        $file_type = $_FILES['file']['type'];

        if ($file_type === 'text/plain') {
            $lines = file($file_tmp, FILE_IGNORE_NEW_LINES);

            $prices = [];
            $firstLineSkipped = false;
            foreach ($lines as $line) {
                if (!$firstLineSkipped) {
                    $firstLineSkipped = true;
                    continue;
                }
                $parts = explode(" ", $line);
                $prices[$parts[0]] = intval($parts[1]);
                echo $parts[0] . $prices[$parts[0]] . "<br>";
            }

        } else {
            echo "Допустим только файлы текстового формата (.txt) <br>";
        }
    } else {
        echo "Ошибка загрузки файла <br>";
    }


// Путь к вашему шаблону Word
    $templateFile = 'path_to_your_template.docx';

// Создаем объект TemplateProcessor и загружаем шаблон
    $templateProcessor = new TemplateProcessor($templateFile);

    $templateProcessor->setValue('placeholder1', 'Replacement1');
    $templateProcessor->setValue('placeholder2', 'Replacement2');

    $processedFile = 'path_to_processed_file.docx';
    $templateProcessor->saveAs($processedFile);

// Создаем объект PhpWord из нового документа
    $phpWord = IOFactory::load($processedFile);

// Создаем объект Writer для экспорта в PDF
    $writer = IOFactory::createWriter($phpWord, 'PDF');

// Сохраняем PDF-файл
    $pdfFile = 'path_to_output_pdf.pdf';
    $writer->save($pdfFile);

    echo 'PDF файл успешно создан';
}
