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
        if (data) {
            const {structure, tiplates, css} = data;
            updateDOM($(document), structure, tiplates, css);
        }
    } catch(exception) {
        console.log(exception);
    }

}

function updateDOM(document, structure, tiplates, css) {
    if (structure) {
        const {steps} = structure;
        if (steps) {
            let showToolTip = true;
            for(let i=0;i<steps.length;i++){
                const {action, id, followers} = steps[i];
                const {type, contents, selector} = action;
                if (contents) {
                    const selectedElement = $(document).find(selector); 
                    if (selectedElement.length > 0) {
                        const tooltipHTML = $.parseHTML(tiplates[type]);
                        const contentHTML = $.parseHTML(contents["#content"]);
                        const tooltipWrapper = $.parseHTML(getToolTipWrapper());
                        const nextClass = getNextClass(followers);
                        $(tooltipHTML).find('.stFooter').css({color:"blue"});
                        $(tooltipHTML).find('.steps-count').empty().append('Step '+id);
                        $(tooltipHTML).find('.popover-content').first().append(contentHTML);
                        $(tooltipHTML).find('.next-btn').attr('data-next-class', nextClass);
                        $(tooltipHTML).css(css);
                        $(tooltipWrapper).addClass('step'+id);
                        if (!showToolTip) {
                            $(tooltipWrapper).hide();
                        } else {
                            showToolTip = false;
                        }
                        $(tooltipWrapper).find('.popover-inner').append(tooltipHTML);
                        $(selectedElement).parent().append(tooltipWrapper);
                    }
                }
            }
        }
    }
}

function getToolTipWrapper() {
    return '<div class="sttip"><div class="tooltip in"> <div class="tooltip-arrow"></div><div class="tooltip-arrow second-arrow"></     div><div class="popover-inner"></div></div></div>';
}

function getNextClass(followers) {
    let nextClass = '';
    if (followers) {
        for(let i=0;i<followers.length;i++){
            const {condition, next} = followers[i];
            if (condition && next) {
                nextClass = '.step'+next;
                break;
            }
        }
    }

    return nextClass;
}