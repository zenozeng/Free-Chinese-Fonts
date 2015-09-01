var fonts = [
    "王漢宗顏楷體",
    "王漢宗粗鋼體標準",
    "王漢宗超明體",
    "王漢宗特黑體",
    "王漢宗鋼筆行楷",
    "王漢宗中魏碑簡體",
    "王漢宗超黑俏皮動物",
    "王漢宗細黑體",
    "王漢宗波浪體",
    "王漢宗特明體標準",
    "王漢宗波卡體空陰",
    "王漢宗標楷體空心",
    "王漢宗仿宋標準",
    "王漢宗粗黑體實陰",
    "王漢宗粗圓體雙空",
    "王漢宗海報體半天水",
    "王漢宗細新宋簡體"
].map(function(name) {
    return {
        name: name,
        copyright: "Dr. Hann-Tzong Wang",
        notes: "[2004年与文鼎发生版权纠纷，Justfont經專業的比對和硏究，證實王敎授的一些字體，並不涉及與文鼎字型的版權糾紛。](http://wiki.ubuntu.org.cn/index.php?title=%E5%85%8D%E8%B4%B9%E4%B8%AD%E6%96%87%E5%AD%97%E4%BD%93)",
        link: "https://code.google.com/p/wangfonts/",
        license: "GPLv2",
        commercialUse: "可（GPL）",
        embedInPDF: "可（GPL）"
    };
});
console.log(JSON.stringify(fonts, null, 4));
