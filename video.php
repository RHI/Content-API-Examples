<? $PAGE_TITLE = "Ramp MetaPlayer Framework";                   
                                                
$episode = $_REQUEST['e'];

$seek = array_key_exists('seek',$_REQUEST)?"seek=" . $_REQUEST['seek'] . "&":null;
//$seek = array_key_exists('seek',$_REQUEST)?$_REQUEST['seek']:null;


	$include_scripts = array( 
			"js/util/string-util.js", 
			"js/util/url-util.js", 
			"js/widgets/search-form-widget.js",
			"js/widgets/related-items-widget.js",
            "js/player.js"
	);
	
	$include_styles = array( 
			"css/widgets/related-items-widget.css",
			"css/widgets/search-form-widget.css",
			"css/player/player.css" 
	);
?>
<?include_once('header.php');?>

<span class="options">
    <span class="input-block"><input type="checkbox" id="all"/> <span class="input-label">All &nbsp;</span></span>
    <span class="input-block"><input type="checkbox" id="controls"/> <span class="input-label">Player Controls &nbsp;</span></span>
    <span class="input-block"><input type="checkbox" id="overlay"/> <span class="input-label">Overlay &nbsp;</span></span>
    <span class="input-block"><input type="checkbox" id="endcap"/> <span class="input-label"> End Cap &nbsp;</span></span>
    <span class="input-block"><input type="checkbox" id="captions"/> <span class="input-label">Closed Captions &nbsp;</span></span>
    <span class="input-block"><input type="checkbox" id="vsearch"/> <span class="input-label">Search &nbsp;</span></span>
    <span class="input-block"><input type="checkbox" id="transcript"/><span class="input-label">Transcript &nbsp;</span></span>

</span>

    <span class="see-code"><a class="see-code input-label" target="_blank" href="http://jsfiddle.net/ramp/4M2YL/">See code</a></span><span class="see-code-thingy">&nbsp;</span>
    
<iframe id="player-frame" height="800" width="100%" frameborder="0" scrolling="no" src="http://sxsw.ramp.com/themename/1.0/playerinator?e=<?=$episode?>&<?=$seek?>"></iframe>
<div id="ramp-related-items-widget-container">
	<div id="ramp-related-items-widget"></div>
</div>
   
     
<script>
	jQuery.noConflict();
	jQuery(document).ready( function() {
			var searchFormWidget = new RampWidgets.SearchFormWidget();
			searchFormWidget.displayFull("ramp-search-form-container", "search.php");
			
			var RampRelatedItemsWidget = new RampWidgets.RelatedItemsWidget();
			RampRelatedItemsWidget.displayFull(<?=$episode?>, "RELATED VIDEOS", 4, "#ramp-related-items-widget"); 
		}
	);
</script>
	
<?include_once('footer.php');?>
