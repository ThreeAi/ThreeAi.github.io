<!DOCTYPE html>
<html>
<head>
    <title>Форма заказа</title>
    <link rel="stylesheet" href="../styles/global.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<content>
    <h2>Заполните информацию по заказу:</h2>
    <form action="main.php" method="post" enctype="multipart/form-data">

        <?php include "handle_form.php";
        global $text_fields;
        global $towns;
        global $colors;
        global $furnitures; ?>

        <label for="surname">Фамилия</label>
        <input type="text" id="surname" name="surname" value="<?= $text_fields["surname"] ?>"><br><br>

        <label for="product">Город доставки</label>
        <select id="product" name="town">
            <?php
            foreach ($towns as $key => $value) {
                echo "<option name=town value={$key} $value>{$key}</option>";
            }
            ?>
        </select><br><br>

        <label for="date">Дата доставка</label>
        <input type="text" id="date" name="date" value="<?= $text_fields["date"] ?>"><br><br>

        <label for="address">Адрес</label>
        <input type="text" id="address" name="address" value="<?= $text_fields["address"] ?>"><br><br>

        <div class="row">
            <div>
                <label><b>Выберите цвет мебели<b></b></label><br>
                <?php foreach ($colors as $color => $value): ?>
                    <input type=radio id="<?= $color ?>" name=color value="<?= $color ?>" <?= $value["checked"] ?>>
                    <label for="<?= $color ?>"><?= $color ?></label><br>
                <?php endforeach; ?>
            </div>
            <table>
                <tr>
                    <th>Название мебели</th>
                    <th>Количество</th>
                </tr>
                <?php foreach ($furnitures as $furniture => $value): ?>
                    <tr>
                        <td>
                            <input type="checkbox" id="<?= $furniture ?>" name="furniture_<?= $furniture ?>"
                                   value="<?= $furniture ?>" <?= $value["checked"] ?>>
                            <label for="<?= $furniture ?>"><?= $furniture ?></label>
                        </td>
                        <td>
                            <input type="number" name="quantity_<?= $furniture ?>" min="0"
                                   value=<?= $value["quantity"] ?>>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </table>
        </div>
        <br>

        <div class="row_btn">
                <label for="file">Выбрать файл с ценами</label>
                <input type="file" id="file" name="file">
        </div>
        <br>

        <div class="center">
            <div class="btn">
                <label for="sub">Отправить заказ</label>
                <input name="sub" type="submit" id="sub">
            </div>
            <?php
            global $pdfFile;
            global $file;
            if (!$file["is_fail"]) {
                echo  "<br>" . $file['message'] . "<br>";
                if (file_exists($pdfFile)) {
                    echo '<br><a href="' . $pdfFile . '" download>Скачать файл</a>';
                }
            }
            else if (isset($_POST['sub'])) {
                echo  "<br>" . $file['message'] . "<br>";
            }
            ?>
        </div>
    </form>

</content>
</body>
</html>
