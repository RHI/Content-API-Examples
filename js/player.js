jQuery(document).ready(function(){
    var playerstart = jQuery("#player-frame")[0].src;

    jQuery(".options input").click(function() {
        var $params = "";

        if (this.id == "all" ) {
            if (this.checked) {
                jQuery(".options input").each(function(index) {
                    this.checked = true;
                    jQuery(this).change();
                });
            } else {
                return;
            }
        }

        jQuery(".options input").each(function(index) {
            if (this.checked) {
                jQuery(this).change();
                $params = $params + this.id + "=true&";
            }
        });
        jQuery("#player-frame")[0].src = playerstart + $params;


    });
    
    jQuery(".input-block input").change(function() {
        if(this.checked) {
            jQuery(this.parentElement).addClass('input-checked');
        }else {
            jQuery(this,parentElement).removeClass('input-checked');
       } 
        
    });
/*
    $("#player-frame").load(function() {
        $("#code").empty();
        $("#code").html("<pre id='headpreview'></pre><pre id='codepreview'></pre>");
        //$("#codepreview").text($("#player-frame")[0].contentDocument.documentElement.innerHTML);
        $("#headpreview").text($("#player-frame")[0].contentDocument.head.innerHTML.replace(/t></g,"t>\n<").replace(/e></g,"e>\n<"));
        $("#codepreview").text($("#player-frame")[0].contentDocument.body.innerHTML);
    });
*/
});
