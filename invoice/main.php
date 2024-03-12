<!DOCTYPE html>
<html>
<head>
    <title>Форма заказа</title>
</head>
<body>
<h2>Заполните информацию по заказу:</h2>
<form action="main.php" method="post" enctype="multipart/form-data">

    <?php include "handle_form.php" ?>

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

    <div>

        <label><b>Выберите цвет мебели<b></b></label><br>
        <?php foreach ($colors as $color): ?>
            <input type=radio id="<?= $color[0] ?>" name=color value="<?= $color[0] ?>" <?= $color[1] ?>>
            <label for="<?= $color[0] ?>"><?= $color[0] ?></label><br>
        <?php endforeach; ?>

        <table>
            <tr>
                <th>Название мебели</th>
                <th>Количество</th>
            </tr>
            <?php foreach ($furnitures as $furniture): ?>
                <tr>
                    <td>
                        <input type="checkbox" id="<?= $furniture[1] ?>" name="furniture[<?= $furniture[0] ?>]"
                               value="<?= $furniture[1] ?>" <?= $furniture[2] ?>>
                        <label for="<?= $furniture[1] ?>"><?= $furniture[1] ?></label>
                    </td>
                    <td>
                        <input type="number" name="quantity[<?= $furniture[0] ?>]" min="0" value=<?= $furniture[3] ?>>
                    </td>
                </tr>
            <?php endforeach; ?>
        </table>
    </div>

    <label for="file">Прикрепите файл:</label><br>
    <input type="file" id="file" name="file"><br><br>

    <input name="sub" type="submit" value="Отправить заказ">
</form>
</body>
</html>

