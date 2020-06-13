<?php
$arr = array($_POST["answers"]);
 
$body = "Результаты опроса: <br>";
$mail_subject = "Ответы: <br>";
$to = "kostyan654321l@gmail.com";
$mail_headers="content-type:text/html; charset=windows-1251";
 
foreach ($arr as $k => $v) {
  $body .= "{$k} - {$v}<br>";
}
mail ($to, $mail_subject, $body, $mail_headers);
?>