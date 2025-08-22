document.addEventListener('DOMContentLoaded', function () {
    // --- セレクタ取得 ---
    var sections = document.querySelectorAll('.fade-in');
    var menuItems = document.querySelectorAll('.menu-item');
    var popup = document.getElementById('popup');
    var closePopup = document.getElementById('close-popup');
    var hamburgerBtn = document.getElementById('hamburgerBtn');
    var menuTab = document.querySelector('.menu-tab');
    var popupTitle = document.getElementById('popup-title');
    var popupImg = document.getElementById('popup-img');
    var popupDescription = document.getElementById('popup-description');
    var popupPrice = document.getElementById('popup-price');
    var menuLinks = document.querySelectorAll('.menu-tab ul li a');
    var snsLinks = document.querySelectorAll('.sns-links a');
    // --- メニュー説明文を辞書で管理 ---
    var menuDescriptions = {
        'classic': 'ふんわり生地と優しい甘さ。定番のクラシックドーナツ。',
        'choco': '濃厚チョコとサクサク食感がクセになる人気No.1。',
        'strawberry': '甘酸っぱい苺グレーズがたっぷり。春限定の味わい。',
        'matcha': '宇治抹茶の香りとほろ苦さが大人の贅沢。',
        'latte': 'ミルクたっぷりのカフェラテ。ドーナツと相性抜群。',
        'lemonade': '爽やかなレモンの香りでリフレッシュ。',
        // ...必要に応じて追加...
    };
    // --- IntersectionObserverでふわっと表示 ---
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    sections.forEach(function (section) { return observer.observe(section); });
    // --- メニュークリックでポップアップ ---
    menuItems.forEach(function (item) {
        var isProcessing = false;
        item.addEventListener('click', function () {
            if (isProcessing)
                return;
            isProcessing = true;
            var name = item.getAttribute('data-name') || '';
            var price = item.getAttribute('data-price') || '';
            var img = item.getAttribute('data-img') || '';
            var type = item.getAttribute('data-type') || '';
            var descKey = item.getAttribute('data-desc') || img || name.toLowerCase();
            popupTitle.textContent = name;
            popupImg.src = "images/".concat(img);
            popupImg.alt = name;
            popupDescription.textContent = menuDescriptions[descKey] || "".concat(type === 'donut' ? 'ドーナツ' : 'ドリンク', "\u306E\u8AAC\u660E\u304C\u3053\u3053\u306B\u5165\u308A\u307E\u3059\u3002");
            popupPrice.textContent = "\u4FA1\u683C: ".concat(price);
            popup.classList.remove('hidden', 'popup-hide');
            popup.classList.add('popup-show');
            setTimeout(function () { isProcessing = false; }, 350);
        });
    });
    // --- ポップアップ閉じる ---
    closePopup.addEventListener('click', function () {
        popup.classList.remove('popup-show');
        popup.classList.add('popup-hide');
    });
    popup.addEventListener('animationend', function (e) {
        if (e.animationName === 'popupFadeOut') {
            popup.classList.add('hidden');
        }
    });
    // --- ハンバーガーメニュー ---
    hamburgerBtn.addEventListener('click', function () {
        hamburgerBtn.classList.toggle('open');
        menuTab.classList.toggle('open');
    });
    // --- メニューリンクのアクティブ切替 ---
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            menuLinks.forEach(function (l) { return l.classList.remove('active'); });
            link.classList.add('active');
        });
    });
    // --- SNSボタン：新規タブ&クリック演出 ---
    snsLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            link.classList.add('clicked');
            setTimeout(function () { return link.classList.remove('clicked'); }, 300);
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });
    });
});
