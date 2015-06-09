$(function() {

    var tags = {
        "Family": ["黑体", "宋体", "楷体", "仿宋", "其他"],
        "License": ["GPL", "SIL", "APL", "CC"]
    };

    var $main = $('#main');

    var $tags = $('<div id="tags"></div>');
    Object.keys(tags).forEach(function(key) {
        $tags.append('<span class="key">' + key + ': </span>');
        tags[key].forEach(function(tag) {
            $tags.append('<span class="tag">' + tag + '</span>');
        });
        $tags.append('<br>');
    });
    $main.append($tags);

    $('#filter').on('input', function() {
        var words = $(this).val().split(' ');
        words = words.filter(function(word) {
            return word.length > 0;
        });
        $('.font').each(function() {
            var text = $(this).text().toLowerCase();
            var display = words.length == 0 || words.some(function(word) {
                return text.indexOf(word.toLowerCase()) > -1;
            });
            $(this).toggle(display);
        });
    });

    $('#tags').on('click', '.tag', function() {
        var tag = $(this).text();
        var key = $(this).prevAll('.key').text().split(':')[0];
        $('#filter').val($('#filter').val() + " " + key + "=" + tag);
        $('#filter').trigger('input');
    });


    var fonts = $.get('src/fonts.json', function(fonts) {
        fonts.forEach(function(f) {
            var $font = $('<div class="font"></div>');
            var $name = $('<div class="name"><a href="' + f.link + '">' + f.name + '</a></div>');
            $name.append('<i class="fa fa-external-link"></i>');
            $name.append('<div class="license">' + f.license + '</div>');
            $font.append($name);
            $font.append('<div class="copyright">Copyright: ' + f.copyright + '</div>');
            $main.append($font);
            var html = [f.commercialUse, f.embedInPDF, f.link, f.name, f.notes].map(function(td) {
                return '<td>' + td + '</td>';
            }).join('');
            return '<tr>' + html + '</tr>';
        });
            // <i class="fa fa-file-pdf-o"></i>

    });

});
