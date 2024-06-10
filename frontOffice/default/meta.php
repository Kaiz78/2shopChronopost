<?php

const DIR_WS_CSS = '../../assets/css/';
const DIR_WS_JS = '../../assets/js/';

?>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!--[if IE]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge;" /><!--<![endif]-->

<link rel="icon" type="image/png" href="favicon2.png" />
<link rel="stylesheet" href="<?php echo DIR_WS_CSS;?>font_ms_100_200_300_400_500_600_700.min.css" />
<link rel="stylesheet" href="<?php echo DIR_WS_CSS;?>font_os_300_400_600_700.min.css" />
<link rel="stylesheet" href="https://cdn.datatables.net/2.0.5/css/dataTables.dataTables.min.css">
<link rel="stylesheet" href="<?php echo DIR_WS_CSS;?>bootstrap.min.css" />
<link rel="stylesheet" href="<?php echo DIR_WS_CSS;?>main.css" />
<link rel="stylesheet" href="<?php echo DIR_WS_CSS;?>main2.css" />
<link rel="stylesheet" href="<?php echo DIR_WS_CSS;?>jquery-ui.min.css" />
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />



<script>var all_translated_words = {<?php echo (isset($languages_translations_js) && isset($languages_translations_js[$languages_id]) ? implode(',', $languages_translations_js[$languages_id]) : '');?>};</script>
<script src="<?php echo DIR_WS_JS;?>jquery-3.4.1.min.js"></script>
<script src="<?php echo DIR_WS_JS;?>jquery-ui.min.js"></script>
<script src="<?php echo DIR_WS_JS;?>main.js"></script>

