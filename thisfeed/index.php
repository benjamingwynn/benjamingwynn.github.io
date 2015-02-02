<!DOCTYPE html>
<head>
	<title>thisfeed</title>
	<link href='http://fonts.googleapis.com/css?family=Questrial|Roboto:400,100,300,500|Roboto+Condensed:400,300' rel='stylesheet' type='text/css'>
	<link href='external-css/animate.css' rel='stylesheet' type='text/css'>
	<link href='css/style.css' rel='stylesheet' type='text/css'>
	
	<script src='external-js/jquery.js'></script>
	<script src='external-js/jquery-ui.js'></script>
	<script src='js/thisfeed-main.js'></script>
	<script src='js/thisfeed-config.js'></script>
	
	<?php
		/*
		 * ?user=twitter_username
		 */
		if (empty($_GET["user"])) {
			$user = 'iamxenxier';
		} else {
			$user = htmlspecialchars($_GET["user"]);
		}
		
		/* Tweet doesn't support multiple users. To get TweetPHP to support
		 * mutliple users we have to delete it's cache before doing anything.
		 * 
		 * Yes, this is hacky.
		 */
		
		if (file_exists ("tweet-php/cache/twitter-default.txt")) {
			unlink ("tweet-php/cache/twitter-default.txt");
		}
		if (file_exists ("tweet-php/cache/twitter-default-array.txt")) {
			unlink ("tweet-php/cache/twitter-default-array.txt");
		}
		
		# Load TweetPHP and change options:
		require_once('external-php/tweet-php/TweetPHP.php');
		$TweetPHP = new TweetPHP(array(
			'consumer_key'          		=> 'xxx',
			'consumer_secret'       		=> 'xxx',
			'access_token'              		=> 'xxx',
			'access_token_secret'   		=> 'xxx',
			'twitter_screen_name'       		=> $user,
			'tweets_to_display'			=> 30,
			'twitter_wrap_open'			=> '',
			'tweet_wrap_open'			=> '<div class="feed twitter" data-colour="rand"><h1>t</h1><div class="container"><h2>@' . $user . '</h2><h3>recent tweet</h3><p>',
			'meta_wrap_open'			=> '<br></br>',
			'meta_wrap_close'			=> '',
			'tweet_wrap_close'			=> '</p></div></div>',
			'twitter_wrap_close'			=> '',
			'error_message'				=> 'Oops, that users tweets can\'t be accessed.',
			'error_link_text'			=> 'Why not try through twitter instead?',
			'debug'					=> false
		));
	?>
</head>
<body>
	<header>
		<h1>ThisFeed</h1>
		<p id="loadtext" style="display: none">Welcome back. Loading Tweets.</p>
		<p id="nojstext" style="color: crimson">Either your browser doesn't support Javascript or thisfeed's code isn't playing nicely with your browser.</p>
	</header>
	<div id="image-background"></div>
	<div id="image-background-overlay"></div>
	<div id="thisfeed">
		<div id="thisfeed-meta-welcome" class="feed" data-colour="#708090">
			<h1>w</h1>
			<div class="container">
				<h2>thisfeed</h2>
				<h3>Welcome to thisfeed</h3>
				<p>thisfeed is a simple experiment, to deliver public tweets in a beautiful way. thisfeed is 100% open source and avaliable to grab off of GitHub for free.</p>
			</div>
		</div>
		<!-- <div id="thisfeed-meta-changelog" class="feed" data-colour="#908090">
			<h1>c</h1>
			<div class="container">
				<h2>changelog</h2>
				<h3>thisfeed version 0.2</h3>
				<p>thisfeed now has the ability to make tweet images work as backgrounds and tweets now keep the same background colour. Other technical changes were also made under the hood, such as a nice error message for those without Javscript enabled.</p>
			</div>
		</div> -->
		<?php echo $TweetPHP->get_tweet_list(); ?></p>
	</div>
	<footer class="animated fadeIn">
		<p>ThisFeed 0.2</p>
		<p>An experimental open source HTML5, Javscript and PHP experiment.</p>
		<p>Created by Benjamin Gwynn (@iamxenxier) | <a style="color: white;" href="https://github.com/benjamingwynn/thisfeed">grab the source code on GitHub</a></p>
	</footer>
</body>
