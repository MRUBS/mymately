<?php
require_once './vendor/autoload.php';

$helperLoader = new SplClassLoader('Helpers', './vendor');
$helperLoader->register();

use Helpers\Config;

$config = new Config;
$config->load('./config/config.php');

?><!DOCTYPE html>
<html lang="en">
<head>
    <title>Reserve Membership</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1 user-scalable=no">
    <meta name="description" content="Mately offers simple, cutting-edge, and affordable STD testing. Receive your results online, share them with others as you wish, and enable Mately member badges on your dating site profiles.">
    <link rel="shortcut icon" href="images/favicon.ico" />    
    <link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/jquery-ui.css" />
    <link rel="stylesheet" href="css/reserve-membership.css">
    <link rel="stylesheet" href="css/reserve-membership-responsive.css">
    <link rel="stylesheet" href="css/owl.carousel.css">
	<link rel="stylesheet" href="css/bootstrap.min.css">
    <link href='https://fonts.googleapis.com/css?family=Roboto:700,400,300' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
    <link href="https://file.myfontastic.com/n6vo44Re5QaWo8oCKShBs7/icons.css" rel="stylesheet">
    <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
</head>

<body>
	<div class="page reserve-membership">
		<!-- Start of Header -->
		<header class="site-header">
			<div class="top">
				<div class="wrapper">
					<a href="index.php" class="logo"><img class="normal" src="images/logo.png"><img class="mobile-icon" src="images/back-button.png"></a>
					<!-- Start of Desktop Menu -->
					<ul class="menu desktop">
						<li><a href="/index.html" title="Home">Home</a></li>
					</ul>
					<!-- End of Desktop Menu -->
				</div>
			</div>
		</header>
		<!-- End of Header -->
		
		<!-- Start of Form -->
		<div class="container">
			<div class="col-md-6 col-md-offset-3">
				<form enctype="application/x-www-form-urlencoded;" id="reserve-membership" class="form-horizontal" role="form" method="post" onsubmit="parent.scrollTo(0,0); return false">
					<div class="reserve-text col-md-12">
					<h1><span class="reserve-bold">Reserve</span> Membership</h1>
					<p>Please provide us with your email address and we'll keep you updated on our progess and launch date.</p>
					</div>
					<div class="form-group" id="name-field">
						<label for="form-first-name" class="col-lg-2 control-label"><?php echo $config->get('fields.firstname'); ?></label>
						<div class="form-input col-lg-10">
							<input type="text" class="cst-form-control" id="form-first-name" name="fname" placeholder="<?php echo $config->get('fields.firstname'); ?>">
						</div>
					</div>
					<div class="form-group" id="name-field">
						<label for="form-last-name" class="col-lg-2 control-label"><?php echo $config->get('fields.lastname'); ?></label>
						<div class="form-input col-lg-10">
							<input type="text" class="cst-form-control" id="form-last-name" name="lname" placeholder="<?php echo $config->get('fields.lastname'); ?>">
						</div>
					</div>
					<div class="form-group" id="email-field">
						<label for="form-email" class="col-lg-2 control-label"><?php echo $config->get('fields.email'); ?></label>
						<div class="form-input col-lg-10">
							<input type="email" class="form-control" id="form-email" name="form-email" placeholder="<?php echo $config->get('fields.email'); ?>" required>
						</div>
					</div>
					<div class="form-group submit-btn">
						<div class="form-input col-lg-10">
							<button type="submit" class="btn btn-default reserve-btn"><?php echo $config->get('fields.btn-send'); ?></button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<!-- End Of Form -->
	</div>
		<!-- Start of Footer -->	
		<footer>   
			<div class="container">		
				<!-- Start of Legal text and social -->
				<div class="bottom">                        
					<ul class="social">
						<li><a class="socicon-icon socicon-facebook" href="https://www.facebook.com/Mately-950494171724857/" target="_blank"><span>Facebook</span></a></li>
						<li><a class="socicon-icon socicon-twitter" href="https://www.twitter.com/mymately " target="_blank"><span>Twitter</span></a></li>
						<li><a class="socicon-icon socicon-instagram" href="https://www.instagram.com/mymately" target="_blank"><span>Instagram</span></a></li>
						<li><a class="socicon-icon socicon-youtube" href="https://www.youtube.com/channel/UC8Qkf6BY9HIg1xM9WujndpA" target="_blank"><span>Youtube</span></a></li>                                
					</ul>
					<p class="desktop tablet">©2016 Mately. All Rights Reserved.<br /><a href="mailto:info@mymately.com">info@mymately.com</a></p>
					<p class="mobile"><a href="mailto:info@mymately.com">info@mymately.com</a></p>
					<p class="mobile no-border-bottom">©2016 Mately. All Rights Reserved.</p>
				</div>
				<!-- End of Legal text and social -->
			</div>
		</footer>
		<!-- End of Footer -->
	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-76214476-1', 'auto');
	  ga('send', 'pageview');

	</script>
    <script src="js/reserve-membership.js"></script>
    <script type="text/javascript">
        new ReserveMembership('#reserve-membership', {
            endpoint: './process.php'
        });
    </script>
</body>
</html>