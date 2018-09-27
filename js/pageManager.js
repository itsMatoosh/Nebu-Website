//init video
var source = document.createElement('source');
source.id = 'source';
var video = document.getElementById('background-video');
video.appendChild(source);
var userTransition = false;
var subpageTransition = false;

//page/subpage vars
var currentPage;
var currentSubpage;

//check if need to transition
if (location.hash !== null && location.hash !== '') {
    hashTransition();
} else {
    transition('welcome', null, true);
}
window.onhashchange = function () {
    if(!userTransition && !subpageTransition) {
        hashTransition();
    }
};

//transition to location hash
function hashTransition() {
    var pageName = location.hash.split('.')[0].substring(1);
    var subPageName = location.hash.split('.')[1];
    if(pageName != currentPage) {
        transition(pageName, subPageName, true);
    } else {
        if(subPageName == null) {
            subPageName = 'main';
        }
        transitionSubpage(subPageName, true);
    }
}
//transtition to page x
function transition(page, subpage, hash) {
    if(location.hash.substring(1) === page && !hash) return;

    var overlay = $("#transition-overlay");
    overlay.css("pointer-events", "all");
    overlay.fadeTo("slow", 1, function () {
        //transition content
        userTransition = true;
        if(subpage == null || subpage !== 'main') {
            location.hash = page;
        } else {
            location.hash = page + '.' + subpage;
        }

        //fade out
        setTimeout(function () {
            setContent(page, subpage, function () {
                transitionOut();
                page = page;
            });
        }, 200);
    })
}
function transitionSubpage(subpage, force) {
    if(force == null) {
        force = false;
    }

    //check if the subpage is already loaded.
    if(!force) {
        if (location.hash.split('.')[1] !== null && location.hash.split('.')[1] === subpage) {
            return;
        } else if (location.hash.split('.')[1] == null && subpage === 'main') {
            return;
        }
    }

    //set active sub page button.
    //todo

    subpageTransition = true;
    $('#content').fadeTo("fast", 0, function () {
        $('#content').load('pages/' + location.hash.split('.')[0].substring(1) + '/' + subpage + '.html', function () {
            //setting hash.
            if(subpage == 'main') {
                location.hash = location.hash.split('.')[0].substring(1);
            } else {
                location.hash = location.hash.split('.')[0].substring(1) + '.' + subpage;
            }

            if(subpage == 'main') {
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

//fade the loading screen out
function transitionOut() {
    var overlay = $("#transition-overlay");
    overlay.fadeTo("slow", 0, function () {
        overlay.css("pointer-events", "none");
        userTransition = false;
    });
}

//set the background video
function setBg() {
    setVideoSource(document.getElementById('bg-url').innerText);
    document.getElementById('bg-url').remove();
}

//set the source for the video element
function setVideoSource(link) {
    var video = document.getElementById('background-video');
    var source = document.getElementById('source');
    video.pause();

    source.setAttribute('src', link);

    video.load();
    video.play();
}

//sets the content of a page
function setContent(page, subpage, callback) {
    if(page === null) {
        page = 'welcome';
    }
    if(subpage == null) {
        subpage = 'main';
    }

    $('#content').load('pages/' + page + '/' + 'main.html', function () {
        $("#page-title").text($('#category').text());
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
    if(subpage !== 'main') {
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