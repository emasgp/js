var homePage = 'https://manutdworld-live.blogspot.com/',
    maxResults = 10,
    containerId = 'random-post-container',
    label = 'Rilis';


function createLatestPosts(json) {
    var totalResults = json.feed.openSearch$totalResults.$t;
    if (totalResults === 0) {
        document.getElementById(containerId).innerHTML = 'Tidak ada data ' + label;
        return;
    }

    document.write('<scr' + 'ipt src="' + homePage + '/feeds/posts/summary/-/' + label + '?alt=json-in-script&orderby=published&reverse=false&max-results=' + maxResults + '&callback=latestPosts"></scr' + 'ipt>');
}


function latestPosts(json) {
    var link, ct = document.getElementById(containerId),
        entry = json.feed.entry || [],
        skeleton = "<ul>";
    if (entry.length === 0) {
        ct.innerHTML = 'Tidak ada postingan ditemukan.';
        return;
    }
    for (var i = 0, len = entry.length; i < len; i++) {
        for (var j = 0, jen = entry[i].link.length; j < jen; j++) {
            link = (entry[i].link[j].rel == "alternate") ? entry[i].link[j].href : '#';
        }
        skeleton += '<li><al href="' + link + '">' + entry[i].title.$t + '</al></li>';
    }
    ct.innerHTML = skeleton + '</ul>';


    var ul = ct.querySelector('ul');
    var listWidth = ul.scrollWidth;
    var containerWidth = ct.offsetWidth;
    var scrollDistance = listWidth + containerWidth;
    var scrollDuration = scrollDistance / 100;
    ul.style.setProperty('--list-width', listWidth + 'px');
    ul.style.setProperty('--scroll-duration', scrollDuration + 's');
}


document.write('<scr' + 'ipt src="' + homePage + '/feeds/posts/summary/-/' + label + '?alt=json-in-script&max-results=0&callback=createLatestPosts"></scr' + 'ipt>');
