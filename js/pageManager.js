//init video
var source = document.createElement('source');
source.id = 'source';
var source2 = document.createElement('source');
source2.id = 'source2';
var video = document.getElementById('background-video');
video.appendChild(source);
var video2 = document.getElementById('background-video2');
video2.appendChild(source2);
source.setAttribute("src", "res/welcome_background.mp4");


var subpageTransition = false;

//page/subpage vars
var currentPage;
var currentSubpage;

//establishing categories.
var categories = ["welcome", "restaurant", "grill", "bar", "lounge"];

//loading all the categories.
loadCategories();

//loads categories
function loadCategories() {
    for (let i = 0; i < categories.length; i++) {
        //load each.
        $(".content-append").append("<div class='category-container' id='category-" + categories[i] + "' data-section-name='" + categories[i] + "'></div>");
        $("#category-" + categories[i]).load('pages/' + categories[i] + '/' + 'main.html');
    }
    loadingScreenOut();
}

function transitionSubpage(subpage, force) {
    if (force == null) {
        force = false;
    }

    //check if the subpage is already loaded.
    if (!force) {
        if (location.hash.split('.')[1] !== null && location.hash.split('.')[1] === subpage) {
            return;
        } else if (location.hash.split('.')[1] == null && subpage === 'main') {
            return;
        }
    }

    //set active sub page button.
    $('#page-sublinks').children('p').each(function (i) {
        if ($(this).text() == subpage) {
            $(this).css("background-color", "rgba(255,255,255,0.35)");
        } else {
            $(this).removeAttr('style');
        }
    });

    subpageTransition = true;
    $('#content').fadeTo("fast", 0, function () {
        $('#content').load('pages/' + location.hash.split('.')[0].substring(1) + '/' + subpage + '.html', function () {
            //setting hash.
            if (subpage == 'main') {
                location.hash = location.hash.split('.')[0].substring(1);
            } else {
                location.hash = location.hash.split('.')[0].substring(1) + '.' + subpage;
            }

            if (subpage == 'main') {
                //removing useless tags.
                $('#bg-url').remove();
                $('#category').remove();
                $('#subpages').remove();
            }

            $('#content').fadeTo("fast", 1, function () {
                subpageTransition = false;
            });
        });
    });
}

//fade the loading screen in.
function loadingScreenIn() {
    var overlay = $("#transition-overlay");
    overlay.fadeTo("slow", 1, function () {
        overlay.css("pointer-events", "all");
    });
};
//fade the loading screen out
function loadingScreenOut() {
    var overlay = $("#transition-overlay");
    overlay.fadeTo("slow", 0, function () {
        overlay.css("pointer-events", "none");
    });
}

//sets the content of a page
function setContent(page, subpage, callback) {
    if (page === null) {
        page = 'welcome';
    }
    if (subpage == null) {
        subpage = 'main';
    }

    $('#content').load('pages/' + page + '/' + 'main.html', function () {
        $('#category').remove();

        video.addEventListener('loadedmetadata', vidCallback(page, subpage, callback));
        createSublinks(subpage);
        setBg();

        currentPage = page;
        currentSubpage = subpage;
    });
}

//callback when the bg vid loads.
function vidCallback(page, subpage, callback) {
    if (subpage !== 'main') {
        //load subpage content
        video.removeEventListener('loadedmetadata', vidCallback);
        $('#content').load('pages/' + page + '/' + subpage + '.html', callback);
    } else {
        callback();
    }
}

//create sublinks on a page.
function createSublinks() {
    //removing all previous elements.
    var myNode = document.getElementById("page-sublinks");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    //adding sublinks
    var subpages = $('#subpages').text().split(',');
    for (let i = 0; i < subpages.length; i++) {
        $('#page-sublinks').append('<p class="navbar-element navbar-button" onclick="transitionSubpage(\'' + subpages[i] + '\')">' + subpages[i] + '</p>');
    }
    $('#subpages').remove();
}