<?php
require_once './vendor/autoload.php';

$helperLoader = new SplClassLoader('Helpers', './vendor');
$mailLoader   = new SplClassLoader('SimpleMail', './vendor');

$helperLoader->register();
$mailLoader->register();

use Helpers\Config;
use SimpleMail\SimpleMail;

$config = new Config;
$config->load('./config/config.php');

$errors = array();
$data   = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fname    = stripslashes(trim($_POST['firstname']));
    $lname    = stripslashes(trim($_POST['lastname']));
    $email   = stripslashes(trim($_POST['email']));
    $pattern = '/[\r\n]|Content-Type:|Bcc:|Cc:/i';

    if (preg_match($pattern, $fname) || preg_match($pattern, $lname) || preg_match($pattern, $email)) {
        die("Header injection detected");
    }

    if (empty($fname)) {
        $errors['firstname'] = $config->get('messages.validation.emptyfirstname');
    }
	
    if (empty($lname)) {
        $errors['lastname'] = $config->get('messages.validation.emptylastname');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = $config->get('messages.validation.emptyemail');
    }

    if (!empty($errors)) {
        $data['success'] = false;
        $data['errors']  = $errors;
    } else {
        $mail = new SimpleMail();

        $mail->setTo($config->get('emails.to'));
        $mail->setFrom($config->get('emails.from'));
        $mail->setSender($fname . ' ' . $lname);
        $mail->setSenderEmail($email);
        $mail->setSubject($config->get('subject.prefix') . ' ' . $subject);

        $body = "
        <!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">
        <html>
            <head>
                <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />
            </head>
            <body>
                <p><strong>{$config->get('fields.firstname')}:</strong> {$fname}</p>
                <p><strong>{$config->get('fields.lastname')}:</strong> {$lname}</p>
                <p><strong>{$config->get('fields.email')}:</strong> {$email}</p>
            </body>
        </html>";

        $mail->setHtml($body);
        $mail->send();

        $data['success'] = true;
        $data['message'] = $config->get('messages.success');
    }

    echo json_encode($data);
}