<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>
        <form action="task_alexandrov.php" method="get" name="f">
            <br><br>
            <div>
                <label for="name">Имя</label>
                <input type="text" name="name" value="<?php if (isset($_REQUEST['name'])) echo $_REQUEST['name'] ?>">
                <label for="height">Рост</label>
                <input type="number" name="height" id="" min=0 value="<?php if (isset($_REQUEST['height'])) echo $_REQUEST['height'] ?>">
            </div>
            <br><br>
                <input type="radio" name="type" id="old" value="пожилой" <?php 
                    if (!empty($_REQUEST['type']) and $_REQUEST['type'] === 'пожилой') { echo 'checked';}?> >
                <span>Пожилой</span>
                <input type="radio" name="type" id="young" value="молодой" <?php 
                    if (!empty($_REQUEST['type']) and $_REQUEST['type'] === 'молодой') { echo 'checked';}?> >
                <span>Молодой</span>
                <input type="checkbox" name="sportsman" id="" value="Спортсмен">
                <label for="sportsman">Спортсмен</label>
                <br>
                <br>
                <input type="submit" name="btn" value="Мужчина">
                <input type="submit" name="btn" value="Женщина">
                <input type="submit" name="btn" value="Приведение">
        </form>
    </div>
</body>
</html>

<?php
$name = "Имя";
$height = "рост";
$type = "не выбран";
$sport = "Не спортсмен";
$weigh = "вес";
$img = "картинка";
if(isset($_REQUEST["btn"])){
    if(!empty($_REQUEST["name"])){
        $name = $_REQUEST["name"];
    }
    $height = $_REQUEST["height"];
    if(isset($_REQUEST["type"])){
        $type = $_REQUEST["type"];
    }
    $btn = $_REQUEST["btn"];
    $weigh = match ($btn) {
        "Мужчина" => $height*0.7-50,
        "Женщина" => "Вы всегда прекрасны",
        "Приведение" => "Не имеет вес",
        default => "не указано"
    };
    if(isset($_REQUEST["sportsman"])){
        $sport = $_REQUEST["sportsman"];
    }
    $img = match ($btn) {
        "Мужчина" => '<img src="../php/height-1.png" width="100">',
        "Женщина" => '<img src="../php/height-2.png" width="100">',
        "Приведение" => '<img src="../php/height-3.png" width="100">',
        default => "не указано"
    };
    echo "<br> <div class='inf'><div class='text'>$name, Ваш рост $height <br> Возраст: $type <br> $sport <br> Ваш оптимальный вес:<br> $weigh </div> <div>$img</div></div>";
}
?>


<style>
    .inf{
        margin-top:30px;
        padding: 5px;
        width: 26%;
        display: flex;
    }
    .text{
        margin-right: 20px;
    }
    input[type="submit"]{
        cursor:pointer;
        margin-right:15px;
    }
</style>