<!DOCTYPE html>
<html>
<head>
    <title>Форма заказа</title>
</head>
<body>
<h2>Заполните информацию по заказу:</h2>
<form action="index.php" method="post" enctype="multipart/form-data">
    <label for="surname">Фамилия</label>
    <input type="text" id="surname" name="surname"><br><br>

    <label for="product">Город доставки</label>
    <select id="product" name="product">
        <?php
            $towns = array( "Москва", "Санкт-Петербург", "Пермь");
            foreach ($towns as $town){
                echo "<option value={$town}>{$town}</option>";
            }
        ?>
    </select><br><br>

    <label for="date">Дата доставка</label>
    <input type="text" id="date" name="date"><br><br>

    <label for="address">Адрес</label>
    <input type="text" id="address" name="address"><br><br>

    <div>
    <?php
        $colors = array(
                "nut" => ["Орех", ""],
                "oak" => ["Дуб мореный", ""],
                "rosewood" =>["Палисандр", ""],
                "dark" => ["Эбеновое дерево", ""],
                "maple" => ["Клен", ""],
                "larch" => ["Лиственница", ""]
        );
        echo "<label><b>Выберите цвет мебели<b></b></label><br>";
        foreach($colors as $key => $value) {
            echo "<input type=radio id=$key name=color value=\"$value[0]\" $value[1]>
                  <label for=$key>$value[0]</label><br>";
        }
    ?>


    <?php
    $furnitures = array(
        [0, "Банкетка", "", 0],
        [1, "Кровать", "", 0],
        [2, "Комод", "", 0],
        [3, "Шкаф", "", 0],
        [4, "Стул", "", 0],
        [5, "Лиственница", "", 0]
    );
    ?>
    <table>
        <tr>
            <th>Название мебели</th>
            <th>Количество</th>
        </tr>
        <?php foreach($furnitures as $furniture): ?>
            <tr>
                <td>
                    <input type="checkbox" id="<?= $furniture[1] ?>" name="furniture[<?= $furniture[0]?>]" value="<?= $furniture[0]?>" <?= $furniture[2]?>>
                    <label for="<?= $furniture[1] ?>"><?= $furniture[1] ?></label>
                </td>
                <td>
                    <input type="number" name="quantity_<?= $furniture[1] ?>" min="0" value=<?= $furniture[3]?>>
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

<?php

if(isset($_REQUEST["sub"])){
    for($i = 0; $i < count($furnitures); $i++){
        if (isset($_REQUEST['furniture'][$i]) ) {
            $furnitures[$i][2] = "checked";
        }
    }
}