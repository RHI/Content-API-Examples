<?
header('Content-type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8'?>\n";
?>
<meta-q>
<imports>
<?
$dir = "metaqs";

foreach (glob("metaqs/*.xml") as $filename) {
    $url = "http://" . $_SERVER['HTTP_HOST'] . str_replace("metaq.php","$filename",$_SERVER['REQUEST_URI']);
    echo "\t<import url='$url' priority='2'/>\n";
}

?>
</imports>
</meta-q>