$(document).ready(function(){
    const stTipCssUrl = "https://guidedlearning.oracle.com/player/latest/static/css/stTip.css";    
    const guideUrl = "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=func&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867";
    
    loadStTipCss(stTipCssUrl);
    loadGuideAndUpdateDom(guideUrl);
 
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


function loadGuideAndUpdateDom(url) {
    $.ajax({
        url: url,
        type: "GET",
        dataType: 'text',
        success : function(data) {
            parseResponseAndUpdateDom(data);                   
        },
        error : function(err) {
            console.log(err);
        }
    });
}

function parseResponseAndUpdateDom(guideJSON) {
    try {
        const guide = JSON.parse(guideJSON.substring(5, guideJSON.length-1));
        const {data} = guide;
        console.log(data);
    } catch(exception) {
        console.log(exception);
    }

}