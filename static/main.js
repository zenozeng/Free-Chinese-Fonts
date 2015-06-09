$(function() {

    var tags = {
        "Family": ["黑体", "宋体", "楷体", "仿宋", "其他"],
        "License": ["GPL", "SIL", "文鼎公众授权", "CC", "Apache"],
        "Tag": ["可商用", "可嵌入PDF"]
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
        $('#filter').val($('#filter').val() + " " + key + ":" + tag);
        $('#filter').trigger('input');
    });


    var fonts = $.get('src/fonts.json', function(fonts) {
        fonts.forEach(function(f) {
            var $font = $('<tr class="font"></tr>');
            var $name = $('<td class="name"><a href="' + f.link + '">' + f.name + '</a></td>');
            $name.append('<i class="fa fa-info-circle" title="Copyright: ' + f.copyright + '"></i>');
            $font.append($name);
            $font.append('<td class="license">' + f.license + '</td>');
            var html = [f.commercialUse, f.embedInPDF, $(marked(f.notes)).html() || '无'].map(function(td) {
                return '<td>' + td + '</td>';
            }).join('');
            $font.append(html);
            $main.append($font);
            return '<tr>' + html + '</tr>';
        });
            // <i class="fa fa-file-pdf-o"></i>

    });

});
