(function() {
    var sites = [{
        name: 'Apple',
        url: 'http://www.apple.com'
    }, {
        name: 'Google',
        url: 'https://www.google.com'
    }];
    $(function() {
        var cnt = $('#cnt');
        $.each(sites, function(i, site) {
            cnt.append('<a href="' + site.url + '">' + site.name + '</a>')
        });
    });
})();