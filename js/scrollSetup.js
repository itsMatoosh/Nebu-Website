$( document ).ready(function() {
    doScrollEffects();
});
window.addEventListener('scroll', function(e) {
    doScrollEffects();
});
function doScrollEffects() {
    var scrollFactor = $(document).scrollTop()/$(window).height();

    if(scrollFactor > 1) {scrollFactor = 1};

    $('.sidebar').width(350 * scrollFactor);
    $('#navbar-column').width(350 * scrollFactor);
    $('#navbar-top').css("opacity", scrollFactor);
    $('.sidebar').css("opacity", scrollFactor);
}


$(function() {
    $.scrollify({
        section : ".category-container",
        sectionName : "section-name",
        before : function (index, sections) {
            //Set the appropriate background.
            setBg(categories[index], index);
        },
    });
});

function setBg(category, index) {
    var backVid = index%2 == 1;
    var vidIdActive;
    var vidIdInactive;
    var sourceUsed;
    var link = "res/" + category + "_background.mp4";
    if(backVid) {
        vidIdActive = 'background-video2';
        sourceUsed = 'source2';
        vidIdInactive = 'background-video';
    } else {
        vidIdActive = 'background-video';
        sourceUsed = 'source';
        vidIdInactive = 'background-video2';
    }


    //change the source of the active video.
    var video = document.getElementById(vidIdActive);
    var sourceElement = document.getElementById(sourceUsed);
    video.pause();
    sourceElement.setAttribute('src', link);
    video.load();
    //video.play();

    //fade the inactive video out.
    $('#' + vidIdInactive).fadeTo("slow", 0);
    //fade the active video in.
    $('#' + vidIdActive).fadeTo("slow", 1);
}