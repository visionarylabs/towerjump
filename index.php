<?php
    /**
	// http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
	// http://www.html5rocks.com/en/tutorials/casestudies/onslaught/#toc-the-game-loop
	// https://github.com/austinhallock/html5-virtual-game-controller
	// http://html5gameengine.com/
	// http://www.html5rocks.com/en/tutorials/casestudies/gopherwoord-studios-resizing-html5-games/
	// http://www.smashingmagazine.com/2012/10/19/design-your-own-mobile-game/
	// http://www.nathalielawhead.com/candybox/html5-game-tutorial-making-a-platformer-part-1
	// http://blog.sklambert.com/html5-game-tutorial-module-pattern/
	// http://blog.sklambert.com/galaxian-html5-game/
	**/
?>
<html>
	<head>
		<title>Tower Jump!</title>
		<?php /* <meta name="Viewport" content="width=device-width; user-scaleable=no; initial-scale=1.0" /> */ ?>
		<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, user-scalable=0" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
		<link rel="stylesheet" type="text/css" href="game.css?t=3" media="all" />
		<script type='text/javascript' src='/scripts/tools/jquery.js'></script>
		<script src="/scripts/tools/hammer.min.js"></script>
		<script src="/scripts/tools/hammer-time.min.js"></script>
		<script src="game.js?t=4"></script>
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