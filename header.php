<!DOCTYPE html>
        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" dir="ltr" class="js">
                                                      <head>


     <title>RAMP SXSW Developer Portal</title>


                                                      <link rel="stylesheet" type="text/css" href="style.css"/>

                                                      
                                                      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
     <link rel="shortcut icon" href="http://developers.ramp.com/sites/default/files/aloha_favicon.ico" type="image/x-icon">
	 <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	 <script type="text/javascript" src="js/lib/jquery-cors.js"></script>

<?
     $content = file_get_contents("http://dev.ramp.com/apimethodparameters/guid-1");
$pattern = '/<link type="text\/css" rel="stylesheet" media="all" href="\/sites\/default\/files\/css\/css_[a-z0-9]+\.css" \/>/';
preg_match_all($pattern, $content,$matches);
echo str_replace("/sites","http://dev.ramp.com/sites",$matches[0][0]);

$pattern = '/<script type="text\/javascript" src="\/sites\/default\/files\/js\/js_[a-z0-9]+\.js"><\/script>/';
preg_match_all($pattern, $content,$matches);
//echo str_replace("/sites","http://dev.ramp.com/sites",$matches[0][0]);
?>
     
<script type="text/javascript">
<!--//--><![CDATA[//><!--
//jQuery.extend(Drupal.settings, { "basePath": "/" });
//--><!]]>
</script>
		<!--[if lt IE 8]> <link href="http://developers.ramp.com/sites/all/themes/aloha/css/iebugs.css" rel="stylesheet" type="text/css" media="all" /> <![endif]-->
		<!--[if lt IE 7]>
		<link type="text/css" rel="stylesheet" media="all" href="http://developers.ramp.com/sites/all/themes/aloha/css/fix-ie.css" />		<![endif]-->
		
<?
	if (!empty($include_scripts))
	{
		echo '<script>jQuery.noConflict(); ezQuery = jQuery; </script>';
		foreach ($include_scripts as $script)
		{
			echo '<script type="text/javascript" src="' . $script . '"></script>';
		}
	}

	if (!empty($include_styles))
	{
		foreach ($include_styles as $style)
		{
			echo '<link rel="stylesheet" type="text/css" href="' . $style . '" />';
		}
	}
?>		
	</head>
	<body>
		<div class="frame">
			<!-- Header Section Starts Here -->
			<div id="header">
		  		<!-- RAMP HEADER BLOCK -->

<style type="text/css">
.api-method_link {
  padding-bottom:5px;
  display:block;
}


td {
     vertical-align:top;
 }

/*API Parameters*/
div.view-API-Method-Parameters table.views-table {
    table-layout:fixed;
    width:100%;
    word-wrap:break-word;
}

div.view-API-Method-Parameters {
    font-size:200%;
}

div.view-API-Method-Parameters td {
    padding: 5px 0px;
}

div.view-API-Method-Parameters th{
    text-transform:capitalize;
    font-weight:bold;
    width:15%
}

div.view-API-Method-Parameters th.views-field-title {
    width:20% !important;
}

div.view-API-Method-Parameters th.views-field-field-api-method-parameters-desc-value {
    width:45% !important;
}

/*API Examples*/
div.views-field-field-apimethodex-response-value div.field-content pre {
    font-size:115%;
    background-color:#cfcfcf;
}

div.view-APIMethodExample div.views-field-title {
    border-bottom: 1px solid black;
    padding-top:25px;
    font-size:150%;
}

label[class*='views-label-field-apimethodex-' ] {
    font-size:105%;
}

label[class*='views-label-field-apimethodex-' ] {
    font-weight:bold;
}

div.view-APIMethodExample label.views-label-title {
    font-weight:bold;
}
.frame #header #logo a  {
    background:url(images/ramp-sxsw-logo.gif) no-repeat scroll 0 0 transparent !important;
  width:550px !important;
}

</style>

<div id="logo"><a href="http://developers.ramp.com"> Developer Network</a></div>
    <!--[if lt IE 8]> <br class="ieclearright" /> <![endif]-->
    <div id="toprightnav">
				<a href="http://developers.ramp.com/user/login">SIGN IN</a> <span class="divider">¦</span>
		<a href="http://developers.ramp.com/user/register">REGISTER</a> <span class="divider">¦</span>
			
      
        <form action="#" name="searchForm" onsubmit="go_and_search('http://developers.ramp.com');return false;" method="post"><div class="strictwrapper">
        <input type="text" name="queryText" id="sitesearchinput" value="site search" class="hasexamplevalue clearFieldBlurred" rel="site search">
        <input type="button" onclick="go_and_search('http://developers.ramp.com')" value="Go" id="sitesearchbutton">
      	</div></form>  
     </div>
  				<!-- Header Top Navigation Strip -->
				<ul id="topnav"><li id="topnav-home" class="menu-551" style="padding-right:0px"><a href="http://developers.ramp.com/" title="Home link">HOME</a></li>
<li id="topnav-apis" class="menu-550" style="padding-right:0px"><a href="http://developers.ramp.com/apis" title="">APIs</a></li>
<li id="topnav-apis" class="active" style="padding-right:0px"><a href="http://developers.ramp.com/page/ramp-sdks" title="Javascript or HTML widgets that use RAMP data that you can use on your site." class="active">SDKs</a></li>
<li id="topnav-apis" class="menu-553" style="padding-right:0px"><a href="http://developers.ramp.com/faq/general-information" title="FAQ">FAQ</a></li>
<li id="topnav-apis" class="menu-548" style="padding-right:0px"><a href="http://developers.ramp.com/forum" title="">FORUMS</a></li>
</ul>	  
	    		<!-- Page Title Generating area -->
				<div class="header-wrap"><h2 class="righticon"><?=$PAGE_TITLE?></h2>
					<div id="ramp-search-form-widget">
						<div id="ramp-search-form-container"></div>
					</div>
				</div>
				

			</div> <!-- #header -->
			<div class="bg">
			<!-- Enabling Left Sidebar -->
    			
			<div id="content" class="main singlecol generictemp">
				<div id="node-110" class="node">
  <div class="content clear-block">




    
