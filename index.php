<?php /* 
    TOWER JUMP
*/ ?>
<html>
	<head>
		<title>Tower Jump!</title>
		<?php /* <meta name="Viewport" content="width=device-width; user-scaleable=no; initial-scale=1.0" /> */ ?>
		<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, user-scalable=0" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
		<link rel="stylesheet" type="text/css" href="game.css?t=3" media="all" />
		<script type='text/javascript' src='/scripts/tools/jquery.js'></script>
		<script src="tools/hammer.min.js"></script>
		<script src="tools/hammer-time.min.js"></script>
		<script src="levels.js?t=8"></script>
		<script src="game.js?t=8"></script>
	</head>
	<body>
		<div class="game-area" id="game-area">
			<div class="info"></div>
			<canvas id="game-canvas"></canvas>
			<div class="interface">
    			<div class="button left"></div>
    			<div class="button right"></div>
    			<div class="button jump"></div>
			</div>
		</div>
	</body>
</html>