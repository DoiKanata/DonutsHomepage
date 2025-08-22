document.addEventListener('DOMContentLoaded', () => {
    // --- セレクタ取得 ---
    const sections = document.querySelectorAll<HTMLElement>('.fade-in');
    const menuItems = document.querySelectorAll<HTMLElement>('.menu-item');
    const popup = document.getElementById('popup') as HTMLElement;
    const closePopup = document.getElementById('close-popup') as HTMLElement;
    const hamburgerBtn = document.getElementById('hamburgerBtn') as HTMLElement;
    const menuTab = document.querySelector('.menu-tab') as HTMLElement;
    const popupTitle = document.getElementById('popup-title') as HTMLElement;
    const popupImg = document.getElementById('popup-img') as HTMLImageElement;
    const popupDescription = document.getElementById('popup-description') as HTMLElement;
    const popupPrice = document.getElementById('popup-price') as HTMLElement;
    const menuLinks = document.querySelectorAll<HTMLAnchorElement>('.menu-tab ul li a');
    const snsLinks = document.querySelectorAll<HTMLAnchorElement>('.sns-links a');

    // --- メニュー説明文を辞書で管理 ---
    const menuDescriptions: { [key: string]: string } = {
        'classic': 'ふんわり生地と優しい甘さ。定番のクラシックドーナツ。',
        'choco': '濃厚チョコとサクサク食感がクセになる人気No.1。',
        'strawberry': '甘酸っぱい苺グレーズがたっぷり。春限定の味わい。',
        'matcha': '宇治抹茶の香りとほろ苦さが大人の贅沢。',
        'latte': 'ミルクたっぷりのカフェラテ。ドーナツと相性抜群。',
        'lemonade': '爽やかなレモンの香りでリフレッシュ。',
        // ...必要に応じて追加...
    };

    // --- IntersectionObserverでふわっと表示 ---
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                (entry.target as HTMLElement).classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    sections.forEach(section => observer.observe(section));

    // --- メニュークリックでポップアップ ---
    menuItems.forEach(item => {
        let isProcessing = false;
        item.addEventListener('click', () => {
            if (isProcessing) return;
            isProcessing = true;
            const name = item.getAttribute('data-name') || '';
            const price = item.getAttribute('data-price') || '';
            const img = item.getAttribute('data-img') || '';
            const type = item.getAttribute('data-type') || '';
            const descKey = item.getAttribute('data-desc') || img || name.toLowerCase();
            popupTitle.textContent = name;
            popupImg.src = `images/${img}`;
            popupImg.alt = name;
            popupDescription.textContent = menuDescriptions[descKey] || `${type === 'donut' ? 'ドーナツ' : 'ドリンク'}の説明がここに入ります。`;
            popupPrice.textContent = `価格: ${price}`;
            popup.classList.remove('hidden', 'popup-hide');
            popup.classList.add('popup-show');
            setTimeout(() => { isProcessing = false; }, 350);
        });
    });

    // --- ポップアップ閉じる ---
    closePopup.addEventListener('click', () => {
        popup.classList.remove('popup-show');
        popup.classList.add('popup-hide');
    });
    popup.addEventListener('animationend', (e: AnimationEvent) => {
        if (e.animationName === 'popupFadeOut') {
            popup.classList.add('hidden');
        }
    });

    // --- ハンバーガーメニュー ---
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('open');
        menuTab.classList.toggle('open');
    });

    // --- メニューリンクのアクティブ切替 ---
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // --- SNSボタン：新規タブ&クリック演出 ---
    snsLinks.forEach(link => {
        link.addEventListener('click', e => {
            link.classList.add('clicked');
            setTimeout(() => link.classList.remove('clicked'), 300);
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });
    });
});
