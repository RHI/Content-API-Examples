<?
	$PAGE_TITLE = "Search Results";    
	$include_scripts = array( 
			"js/lib/ezquery.qtip.min.js", 
			"js/lib/ezquery.qtip.pack.js", 
			
			"js/util/string-util.js", 
			"js/util/url-util.js", 
			"js/util/time-util.js", 
			
			"js/templates/search-result.js",
			"js/templates/thumbnail.js",
			"js/templates/search-meta.js",
			"js/templates/snippets.js",
			
			"js/widgets/pagination-widget.js", 
			"js/widgets/search-widget.js",
			"js/widgets/facets-widget.js", 
			"js/widgets/search-form-widget.js"
	);
	
	$include_styles = array( 
			"http://fonts.googleapis.com/css?family=Bitter", 
			
			"css/widgets/search-widget.css", 
			"css/widgets/facets-widget.css",
			"css/widgets/search-form-widget.css"
	);
	
	include_once('header.php');
?>

	<style>
		#ramp-search-widget-container {
			width:706px;
		}
	</style>
	
	<div id="ramp-facets-widget-container">
		<div id="ramp-facets-widget">
			<div id="ramp-facets-loading-icon">
				<img src="images/ramp-loading-icon-70.gif" />
			</div>
			<div id="ramp-tags-facet"></div>
			<div id="ramp-channels-facet"></div>
		</div>
	</div>
	
	<div id="ramp-search-widget-container">
		<div id="ramp-search-widget">
			<div id="ramp-search-loading-icon">
				<img src="images/ramp-loading-icon-70.gif" />
			</div>
		</div>
	</div>
	
	<script>
		jQuery.noConflict();
		jQuery(document).ready( function() {
				var facetsWidget = new RampWidgets.FacetsWidget();
				var searchFormWidget = new RampWidgets.SearchFormWidget();
				var searchWidget = new RampWidgets.SearchWidget();
				var facets = [
					{
						"hostDivId": "ramp-tags-facet",
						"displayName": "Tags",
						"name": "ezgenericnavmulti01",
						"numFacetItems": 25
					}
				];
			
				facetsWidget.displayFull("ramp-facets-widget", "ramp-facets-loading-icon", facets);
				searchWidget.displayFull("ramp-search-widget", "ramp-search-loading-icon");
				searchFormWidget.displayFull("ramp-search-form-container", "search.php");
			}
		);
	</script>

<?include_once('footer.php');?>