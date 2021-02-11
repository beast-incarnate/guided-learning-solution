$(document).ready(function(){
    const stTipCssUrl = "https://guidedlearning.oracle.com/player/latest/static/css/stTip.css";    
    const guideUrl = "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=function&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867";
    
    loadStTipCss(stTipCssUrl);
    loadGuideAndUpdateDom(guideUrl);
 
 });

/* function to load tooltip css */
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

/* function to load guide json */
function loadGuideAndUpdateDom(url) {
    $.ajax({
        url: url,
        type: "GET",
        dataType: 'text',
        success : function(data) {
            parseResponseAndUpdateDom(data, url);                   
        },
        error : function(err) {
            console.log(err);
        }
    });
}

/* function to parse guide response */
function parseResponseAndUpdateDom(guideJSON, guideURL) {
    try {
        const guide = JSON.parse(getGuideString(guideJSON, guideURL));
        const {data} = guide;
        if (data) {
            const {structure, tiplates, css} = data;
            updateDOM($(document), structure, tiplates, css);
            initializeListeners($(document));
        }
    } catch(exception) {
        console.log(exception);
    }

}

/* function to get guide string from response */
function getGuideString(guideJSON, guideURL) {
    let queryParams = guideURL.split('&');
    let callback = '';    
    queryParams[0] = queryParams[0].split('?')[1];

    for(let i=0;i<queryParams.length;i++) {
        const query = queryParams[i].split('=');
        const key = query[0];
        const value = query[1];
        if (key == 'callback') {
            callback = value;
            break;
        }
    }

    return guideJSON.substring(callback.length+1, guideJSON.length-1);
}

/* function to update dom with tooltip */
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

function initializeListeners(document) {
    $(document).find('.next-btn').click(function() {
        const nextClass = $(this).attr('data-next-class');
        $(this).closest('.sttip').hide();
        if (nextClass) {
            $(document).find(nextClass).show();
        }
    });

    $(document).find('.view-less-container button').click(function(e) {
        e.preventDefault();
        $(this).closest('.sttip').hide();
    });

}

module.exports = {
    getNextClass : getNextClass,
    getGuideString : getGuideString
}
