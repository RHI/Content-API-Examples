<? 
//http://sandbox.ramp.com http://developer.ramp.com http://developers.ramp.com http://dev.ramp.com http://smoney http://gkindel http://localhost
$cors = array("http://sandbox.ramp.com", "http://developer.ramp.com" , "http://developers.ramp.com" , "http://dev.ramp.com" ,  "http://smoney" ,  "http://gkindel" ,  "http://localhost");
if (in_array($_SERVER['HTTP_ORIGIN'],$cors)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Request-Method:POST");
}


if(array_key_exists("qterm",$_POST) && array_key_exists("twitter",$_POST) &&  strlen($_POST["twitter"]) > 0 && strlen($_POST["twitter"]) < 25 && strlen($_POST["qterm"]) > 0 && strlen($_POST["qterm"]) < 25  ) {
    $term = $_POST['qterm'];
    $twitter = $_POST['twitter'];
    $twitterURL = urlencode($_POST['twitter']);
$str = <<<EOT
<?xml version="1.0" encoding="utf-8"?>
<meta-q>
    <q>
        <context>playback</context>
        <targeting>
            <term match="exact"><![CDATA[$term]]></term>
        </targeting>
        <content type="popcorn" plugin="framefeed">
            <arg name="topic"><![CDATA[$term]]></arg>
            <arg name="title"><![CDATA[Comments from "$twitter"]]></arg>
            <arg name="tags"><![CDATA[twitter]]></arg>
            <arg name="height">250</arg>
            <arg name="width">300</arg>
            <arg name="url"><![CDATA[/cardlet?type=twitter&term=$twitterURL]]></arg>
        </content>
    </q>
</meta-q>
EOT;

file_put_contents("metaqs/" . time() . ".xml",$str);
echo "Success";
return;
}

?>


