<?php
    /**
        TOWER JUMP
        MAIN INDEX
    **/
?>
<html>
    <head>
        <title>Tower Jump!</title>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="stylesheet" type="text/css" href="game.css?t=4" media="all" />

        <script src="scripts/levels.js?t=10"></script>
        <script src="scripts/level-builder.js?t=10"></script>
        <script src="scripts/render.js?t=10"></script>
        <script src="scripts/update.js?t=10"></script>

    </head>
    <body>
        <div class="game-area" id="game-area">
            <div class="info"></div>
            <canvas id="game-canvas"></canvas>
        </div>

        <p>Welcome to Tower Jump!</p>
        <?php include_once('../../lib/includes/opalgames-footer.php'); ?>

        <script src="scripts/ui.js?t=10"></script>
        <script src="game.js?t=10"></script>

    </body>
</html>