$(document).ready(function(){
    const stTipCssUrl = "https://guidedlearning.oracle.com/player/latest/static/css/stTip.css";    
    loadStTipCss(stTipCssUrl);
 
 });


 function loadStTipCss(url) {
    $.ajax({
        url: url,
        type: "GET",
        dataType: 'text',
        success: function(data) {
            $('<style type="text/css">\n' + data + '</style>').appendTo("head");                    
        },
        error: function(err) {
            console.log(err);
        }                  
    });
}