$(function() {

    var tags = {
        "Family": ["黑体", "宋体", "楷体", "仿宋", "其他"],
        "License": ["GPL", "SIL", "文鼎公众授权", "CC", "Apache"],
        "Tag": ["可商用", "可嵌入PDF"]
    };

    $('#filter').on('input', function() {
        var words = $(this).val().split(' ');
        words = words.filter(function(word) {
            return word.length > 0;
        });
        $('.font').each(function() {
            var text = $(this)[0].dataset.index.toLowerCase();
            var display = words.length == 0 || words.every(function(word) {
                return text.indexOf(word.toLowerCase()) > -1;
            });
            $(this).toggle(display);
        });
    });

    var $tags = $('<div id="tags"></div>');
    Object.keys(tags).forEach(function(key) {
        $tags.append('<span class="key">' + key + ': </span>');
        tags[key].forEach(function(tag) {
            $tags.append('<span class="tag">' + tag + '</span>');
        });
        $tags.append('<br>');
    });

    var $main = $('#main');
    $main.append($tags);

    $('#tags').on('click', '.tag', function() {
        var tag = $(this).text();
        var key = $(this).prevAll('.key').text().split(':')[0];
        var currentWords = $('#filter').val();
        var word = key != "Tag" ? key + ":" + tag : tag;
        if (currentWords.indexOf(word) > -1) {
            currentWords = currentWords.replace(word, '');
        } else {
            if (key != "Tag") {
                currentWords = currentWords.replace(new RegExp(key + ':[^ ]*'), '');
            }
            currentWords += " " + word;
        }
        $('#filter').val(currentWords.replace(/  /g, ' ').replace(/^ /g, ''));
        $('#filter').trigger('input');
    });

    var fonts = $.get('src/fonts.json', function(fonts) {

        fonts = fonts.map(function(font) {
            // "Family": ["黑体", "宋体", "楷体", "仿宋", "其他"],
            var family = {
                "黑体": [/黑体/, /黑$/, /Hei/],
                "宋体": [/[^仿]宋/, /Ming/, /明体/, /Ming/, /[^g]song/],
                "楷体": [/楷/, /Kai/],
                "仿宋": [/仿宋/, /Fangsong/],
                "其他": [/.*/]
            };
            if (!Array.isArray(font.license)) {
                font.license = [font.license];
            }
            if (!font.family) {
                Object.keys(family).some(function(f) {
                    if (family[f].some(function(reg) {
                        return reg.test(font.name);
                    })) {
                        font.family = f;
                        return true;
                    }
                    return false;
                });
            }
            font.index = [
                font.name,
                'Family:'+font.family,
                font.license.toString().indexOf('Creative Commons') > -1 ? "License:CC" : "",
                font.commercialUse.indexOf('可') > -1 ? "可商用" : "",
                font.embedInPDF.indexOf('可') > -1 ? "可嵌入PDF" : "",
                font.notes
            ];
            tags.License.forEach(function(license) {
                font.license.forEach(function(font_license) {
                    if (font_license.indexOf(license) > -1) {
                        font.index.push('License:' + license);
                    }
                });
            });
            font.index = font.index.join(' ');
            return font;
        });

        $main.append(["字体名称", "授权", "可否商用", "可否嵌入 PDF", "备注"].map(function(th) {
            return '<th>' + th + '</th>';
        }).join(''));
        fonts.forEach(function(f) {
            var $font = $('<tr class="font"></tr>');
            $font[0].dataset.index = f.index;
            var $name = $('<td class="name"><a href="' + f.link + '">' + f.name + '</a></td>');
            $name.append('<i class="fa fa-info-circle" title="Copyright: ' + f.copyright + '"></i>');
            $font.append($name);
            $font.append('<td class="license">' + f.license.join(' or ') + '</td>');
            var html = [f.commercialUse, f.embedInPDF, $(marked(f.notes)).html() || '无'].map(function(td) {
                return '<td>' + td + '</td>';
            }).join('');
            $font.append(html);
            $main.append($font);
            return '<tr>' + html + '</tr>';
        });

    });

});
