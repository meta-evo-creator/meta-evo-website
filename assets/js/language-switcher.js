/**
 * MetaEvo 缃戠珯涓嫳鏂囧垏鎹㈠姛鑳? * 鏀寔鏃犵紳璇█鍒囨崲锛屼繚鎸佺敤鎴峰亸濂? */

class LanguageSwitcher {
    constructor() {
        this.currentLang = this.getStoredLanguage() || this.detectBrowserLanguage();
        this.translations = {};
        this.enhancedInit();
    }

    // 鍒濆鍖?    init() {
        this.loadTranslations().then(() => {
            this.applyLanguage(this.currentLang);
            this.setupLanguageSwitcher();
            this.updateLanguageIndicator();
        });
    }

    // 鑾峰彇瀛樺偍鐨勮瑷€鍋忓ソ
    getStoredLanguage() {
        return localStorage.getItem('metaEvoLang');
    }

    // 瀛樺偍璇█鍋忓ソ
    storeLanguage(lang) {
        localStorage.setItem('metaEvoLang', lang);
    }

    // 妫€娴嬫祻瑙堝櫒璇█
    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        return browserLang.startsWith('zh') ? 'zh-CN' : 'en';
    }

    // 鍔犺浇缈昏瘧鏂囦欢
    async loadTranslations() {
        try {
            const response = await fetch('/assets/lang/translations.json');
            this.translations = await response.json();
        } catch (error) {
            console.error('Failed to load translations:', error);
            // 浣跨敤榛樿缈昏瘧
            this.translations = this.getDefaultTranslations();
        }
    }

    // 榛樿缈昏瘧锛堝悗澶囷級
    getDefaultTranslations() {
        return {
            'zh-CN': {
                // 瀵艰埅
                'nav.home': '棣栭〉',
                'nav.products': '浜у搧',
                'nav.docs': '鏂囨。',
                'nav.blog': '鍗氬',
                'nav.about': '鍏充簬',
                'nav.contact': '鑱旂郴',
                'nav.language': '璇█',
                
                // 鑻遍泟鍖哄煙
                'hero.title': 'MetaEvo - 杩涘寲杩涘寲鐨勮繘鍖?,
                'hero.subtitle': '璁〢I鍏峰鑷垜瀛︿範銆佽嚜鎴戣繘鍖栥€佽嚜鎴戜骇鍝佸寲鐨勮兘鍔?,
                'hero.description': '鎺㈢储 mev-self-learning 鍜?mev-efficiency 鎶€鑳斤紝鏋勫缓鏅鸿兘銆侀珮鏁堢殑AI鍔╂墜鐢熸€佺郴缁熴€?,
                'hero.cta.primary': '寮€濮嬫帰绱?,
                'hero.cta.secondary': '鏌ョ湅鏂囨。',
                
                // 浜у搧閮ㄥ垎
                'products.title': 'mev 鎶€鑳界郴鍒?,
                'products.subtitle': '鏋勫缓瀹屾暣鐨凙I鍔╂墜鑳藉姏鐢熸€?,
                
                // mev-self-learning
                'product.self-learning.title': 'mev-self-learning',
                'product.self-learning.subtitle': 'AI鑷垜瀛︿範鍜岃繘鍖栨妧鑳?,
                'product.self-learning.description': '璁〢I鍔╂墜鑳藉鑷垜璇婃柇銆佸涔犮€佸皝瑁呮柊鎶€鑳斤紝瀹炵幇鎸佺画杩涘寲銆?,
                'product.self-learning.features': '鏍稿績鍔熻兘',
                'product.self-learning.feature1': '鑷垜璇婃柇鑳藉姏鐭澘',
                'product.self-learning.feature2': '璁捐涓€у寲瀛︿範璺緞',
                'product.self-learning.feature3': '鎶€鑳藉皝瑁呭拰鏍囧噯鍖?,
                'product.self-learning.feature4': '杩涘寲鐩戞帶鍜屼紭鍖?,
                'product.self-learning.stats': '鎬ц兘鎸囨爣',
                'product.self-learning.stat1': '瀛︿範鏁堢巼鎻愬崌 80%',
                'product.self-learning.stat2': '姣忓懆鍒涘缓 2-3 涓柊鎶€鑳?,
                'product.self-learning.stat3': '鐢ㄦ埛婊℃剰搴?4.8/5.0',
                'product.self-learning.cta': 'GitHub 鏌ョ湅',
                
                // mev-efficiency
                'product.efficiency.title': 'mev-efficiency',
                'product.efficiency.subtitle': '寮€鍙戞晥鐜囧苟琛屽伐绋嬫妧鑳?,
                'product.efficiency.description': '鏅鸿兘骞惰浠诲姟瑙勫垝锛屾樉钁楁彁鍗囧紑鍙戝伐浣滄晥鐜囧拰璧勬簮鍒╃敤鐜囥€?,
                'product.efficiency.features': '鏍稿績鍔熻兘',
                'product.efficiency.feature1': '鏅鸿兘骞惰浠诲姟瑙勫垝',
                'product.efficiency.feature2': '绯荤粺璧勬簮浼樺寲鍒嗛厤',
                'product.efficiency.feature3': 'WBS绉戝浠诲姟鍒嗚В',
                'product.efficiency.feature4': '鍔ㄦ€佹墽琛屼紭鍖?,
                'product.efficiency.stats': '瀹為檯鏁堟灉',
                'product.efficiency.stat1': '鏁堢巼鎻愬崌 89-94%',
                'product.efficiency.stat2': '鏃堕棿鑺傜渷 16-24灏忔椂 鈫?87鍒嗛挓',
                'product.efficiency.stat3': '璧勬簮鍒╃敤鐜?92%',
                'product.efficiency.cta': 'GitHub 鏌ョ湅',
                
                // 鐢熸€佷环鍊?                'ecosystem.title': '鐢熸€佸崗鍚屼环鍊?,
                'ecosystem.description': '涓や釜鎶€鑳藉舰鎴愬畬鏁寸殑浠峰€奸棴鐜紝瀹炵幇鎸囨暟绾у闀裤€?,
                'ecosystem.value1.title': '鑷垜杩涘寲',
                'ecosystem.value1.desc': 'mev-self-learning 鍒涢€犳柊鎶€鑳界殑鑳藉姏',
                'ecosystem.value2.title': '楂樻晥鎵ц',
                'ecosystem.value2.desc': 'mev-efficiency 鎻愬崌宸ヤ綔鏁堢巼鐨勬妧鑳?,
                'ecosystem.value3.title': '缁勫悎鏁堝簲',
                'ecosystem.value3.desc': '鑷垜杩涘寲 + 楂樻晥鎵ц = 鎸囨暟绾у闀?,
                
                // 琛屽姩鍙峰彫
                'cta.title': '鍔犲叆 MetaEvo 绀惧尯',
                'cta.description': '鎺㈢储AI鑷垜瀛︿範鍜屾晥鐜囦紭鍖栫殑鏈潵锛屽弬涓庡紑婧愮ぞ鍖哄缓璁俱€?,
                'cta.button1': 'Star on GitHub',
                'cta.button2': '鍔犲叆璁ㄨ',
                'cta.button3': '鑱旂郴鎴戜滑',
                
                // 椤佃剼
                'footer.description': 'MetaEvo - 鎺ㄥ姩AI鍚戞洿鑷富銆佹洿鏅鸿兘鐨勬柟鍚戝彂灞?,
                'footer.quickLinks': '蹇€熼摼鎺?,
                'footer.products': '浜у搧',
                'footer.docs': '鏂囨。',
                'footer.blog': '鍗氬',
                'footer.community': '绀惧尯',
                'footer.legal': '娉曞緥',
                'footer.privacy': '闅愮鏀跨瓥',
                'footer.terms': '鏈嶅姟鏉℃',
                'footer.license': '寮€婧愬崗璁?,
                'footer.copyright': '漏 2026 MetaEvo Technologies. 淇濈暀鎵€鏈夋潈鍒┿€?,
                
                // 璇█鍒囨崲
                'lang.zh': '涓枃',
                'lang.en': 'English',
                'lang.current': '褰撳墠璇█'
            },
            'en': {
                // Navigation
                'nav.home': 'Home',
                'nav.products': 'Products',
                'nav.docs': 'Docs',
                'nav.blog': 'Blog',
                'nav.about': 'About',
                'nav.contact': 'Contact',
                'nav.language': 'Language',
                
                // Hero Section
                'hero.title': 'MetaEvo - Evolving Evolution',
                'hero.subtitle': 'Empowering AI with self-learning, self-evolution, and self-productization capabilities',
                'hero.description': 'Explore mev-self-learning and mev-efficiency skills to build intelligent, efficient AI assistant ecosystems.',
                'hero.cta.primary': 'Get Started',
                'hero.cta.secondary': 'View Docs',
                
                // Products Section
                'products.title': 'mev Skills Series',
                'products.subtitle': 'Building a complete AI assistant capability ecosystem',
                
                // mev-self-learning
                'product.self-learning.title': 'mev-self-learning',
                'product.self-learning.subtitle': 'AI Self-Learning and Evolution Skill',
                'product.self-learning.description': 'Enables AI assistants to self-diagnose, learn, and encapsulate new skills for continuous evolution.',
                'product.self-learning.features': 'Core Features',
                'product.self-learning.feature1': 'Self-diagnosis of capability gaps',
                'product.self-learning.feature2': 'Personalized learning path design',
                'product.self-learning.feature3': 'Skill encapsulation and standardization',
                'product.self-learning.feature4': 'Evolution monitoring and optimization',
                'product.self-learning.stats': 'Performance Metrics',
                'product.self-learning.stat1': 'Learning efficiency improvement: 80%',
                'product.self-learning.stat2': 'Skill creation: 2-3 new skills/week',
                'product.self-learning.stat3': 'User satisfaction: 4.8/5.0',
                'product.self-learning.cta': 'View on GitHub',
                
                // mev-efficiency
                'product.efficiency.title': 'mev-efficiency',
                'product.efficiency.subtitle': 'Development Efficiency Parallel Engineering Skill',
                'product.efficiency.description': 'Intelligent parallel task planning significantly improves development efficiency and resource utilization.',
                'product.efficiency.features': 'Core Features',
                'product.efficiency.feature1': 'Intelligent parallel task planning',
                'product.efficiency.feature2': 'System resource optimization',
                'product.efficiency.feature3': 'WBS scientific task decomposition',
                'product.efficiency.feature4': 'Dynamic execution optimization',
                'product.efficiency.stats': 'Real Results',
                'product.efficiency.stat1': 'Efficiency improvement: 89-94%',
                'product.efficiency.stat2': 'Time saved: 16-24 hours 鈫?87 minutes',
                'product.efficiency.stat3': 'Resource utilization: 92%',
                'product.efficiency.cta': 'View on GitHub',
                
                // Ecosystem Value
                'ecosystem.title': 'Ecosystem Synergy',
                'ecosystem.description': 'Two skills form a complete value loop for exponential growth.',
                'ecosystem.value1.title': 'Self-Evolution',
                'ecosystem.value1.desc': 'mev-self-learning: Ability to create new skills',
                'ecosystem.value2.title': 'Efficient Execution',
                'ecosystem.value2.desc': 'mev-efficiency: Skill to improve work efficiency',
                'ecosystem.value3.title': 'Combined Effect',
                'ecosystem.value3.desc': 'Self-evolution + Efficient execution = Exponential growth',
                
                // Call to Action
                'cta.title': 'Join the MetaEvo Community',
                'cta.description': 'Explore the future of AI self-learning and efficiency optimization, participate in open-source community building.',
                'cta.button1': 'Star on GitHub',
                'cta.button2': 'Join Discussion',
                'cta.button3': 'Contact Us',
                
                // Footer
                'footer.description': 'MetaEvo - Advancing AI towards greater autonomy and intelligence',
                'footer.quickLinks': 'Quick Links',
                'footer.products': 'Products',
                'footer.docs': 'Docs',
                'footer.blog': 'Blog',
                'footer.community': 'Community',
                'footer.legal': 'Legal',
                'footer.privacy': 'Privacy Policy',
                'footer.terms': 'Terms of Service',
                'footer.license': 'Open Source License',
                'footer.copyright': '漏 2026 MetaEvo Technologies. All rights reserved.',
                
                // Language Switcher
                'lang.zh': '涓枃',
                'lang.en': 'English',
                'lang.current': 'Current Language'
            }
        };
    }

    // 搴旂敤璇█
    applyLanguage(lang) {
        this.currentLang = lang;
        this.storeLanguage(lang);
        
        // 鏇存柊HTML lang灞炴€?        document.documentElement.lang = lang;
        
        // 缈昏瘧鎵€鏈夊甫data-i18n灞炴€х殑鍏冪礌
        this.translatePage();
        
        // 鏇存柊璇█鎸囩ず鍣?        this.updateLanguageIndicator();
        
        // 瑙﹀彂璇█鍒囨崲浜嬩欢
        this.dispatchLanguageChangeEvent();
    }


    // 优化：添加语言切换动画
        switchLanguageWithAnimation(lang) {
        console.log('switchLanguageWithAnimation called with:', lang);
        console.log('Current language:', this.currentLang);
        
        return new Promise((resolve) => {
            // 添加切换动画类
            document.body.classList.add('language-switching');
            
            // 更新按钮状态
            this.updateLanguageButtons(lang);
            
            // 显示切换提示
            this.showLanguageSwitchToast(lang);
            
            // 应用语言（带延迟以显示动画）
            setTimeout(() => {
                console.log('Applying language change to:', lang);
                this.applyLanguage(lang);
                document.body.classList.remove('language-switching');
                console.log('Language switch completed');
                resolve();
            }, 300);
        });
    } 300);
        });
    }
    
    // 更新语言按钮状态
    updateLanguageButtons(lang) {
        const buttons = document.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            const btnLang = btn.getAttribute('data-lang');
            if (btnLang === lang) {
                btn.classList.add('active');
                btn.classList.add('switching');
                setTimeout(() => btn.classList.remove('switching'), 300);
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // 显示语言切换提示
    showLanguageSwitchToast(lang) {
        // 移除现有的提示
        const existingToast = document.querySelector('.lang-toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // 创建新的提示
        const toast = document.createElement('div');
        toast.className = 'lang-toast';
        toast.innerHTML = `
            <span class="lang-toast-flag">${lang === 'zh-CN' ? '🇨🇳' : '🇺🇸'}</span>
            <span class="lang-toast-text">
                ${lang === 'zh-CN' ? '已切换到中文' : 'Switched to English'}
            </span>
        `;
        
        // 添加到页面
        document.body.appendChild(toast);
        
        // 显示动画
        setTimeout(() => toast.classList.add('show'), 10);
        
        // 自动隐藏
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
    
    // 优化：添加语言切换CSS
    addLanguageSwitchStyles() {
        if (document.querySelector('#language-switch-styles')) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = 'language-switch-styles';
        style.textContent = `
            /* 语言切换动画 */
            .language-switching * {
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            
            /* 语言切换提示 */
            .lang-toast {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--primary-color);
                color: white;
                padding: 12px 20px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                gap: 10px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                z-index: 9999;
                opacity: 0;
                transform: translateY(-20px);
                transition: all 0.3s ease;
            }
            
            .lang-toast.show {
                opacity: 1;
                transform: translateY(0);
            }
            
            .lang-toast-flag {
                font-size: 20px;
            }
            
            .lang-toast-text {
                font-weight: 500;
                font-size: 14px;
            }
            
            /* 深色模式适配 */
            @media (prefers-color-scheme: dark) {
                .lang-toast {
                    background: var(--primary-dark);
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // 优化：增强初始化
    enhancedInit() {
        this.addLanguageSwitchStyles();
        this.loadTranslations().then(() => {
            this.applyLanguage(this.currentLang);
            this.setupEnhancedLanguageSwitcher();
            this.updateLanguageButtons(this.currentLang);
        });
    }
    
    // 优化：增强语言切换器设置
    setupEnhancedLanguageSwitcher() {
        const buttons = document.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.getAttribute('data-lang');
                if (lang && lang !== this.currentLang) {
                    this.switchLanguageWithAnimation(lang).then(() => {
                        this.currentLang = lang;
                        this.storeLanguage(lang);
                    });
                }
            });
            
            // 添加悬停提示
            btn.setAttribute('title', btn.getAttribute('aria-label'));
        });
        
        // 添加键盘支持
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key === 'l') {
                const newLang = this.currentLang === 'zh-CN' ? 'en' : 'zh-CN';
                this.switchLanguageWithAnimation(newLang).then(() => {
                    this.currentLang = newLang;
                    this.storeLanguage(newLang);
                });
            }
        });
    }

    // 缈昏瘧椤甸潰
    translatePage() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    // 鑾峰彇缈昏瘧
    getTranslation(key) {
        const langData = this.translations[this.currentLang];
        if (!langData) return key;
        
        // 鏀寔宓屽閿紝濡?'nav.home'
        return key.split('.').reduce((obj, k) => obj && obj[k], langData) || key;
    }

    // 璁剧疆璇█鍒囨崲鍣?    setupLanguageSwitcher() {
        // 鍒涘缓鎴栨壘鍒拌瑷€鍒囨崲鍣?        let switcher = document.querySelector('.language-switcher');
        if (!switcher) {
            switcher = this.createLanguageSwitcher();
            const nav = document.querySelector('.nav-menu') || document.querySelector('nav');
            if (nav) {
                nav.appendChild(switcher);
            } else {
                document.body.insertBefore(switcher, document.body.firstChild);
            }
        }
        
        // 璁剧疆鍒囨崲浜嬩欢
        const buttons = switcher.querySelectorAll('.lang-btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = button.getAttribute('data-lang');
                this.applyLanguage(lang);
            });
        });
    }

    // 鍒涘缓璇█鍒囨崲鍣?    createLanguageSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <div class="lang-dropdown">
                <button class="lang-current" aria-label="Language switcher">
                    <span class="lang-flag">${this.currentLang === 'zh-CN' ? '馃嚚馃嚦' : '馃嚭馃嚫'}</span>
                    <span class="lang-text" data-i18n="lang.current"></span>
                    <span class="lang-arrow">鈻?/span>
                </button>
                <div class="lang-options">
                    <button class="lang-btn" data-lang="zh-CN">
                        <span class="lang-flag">馃嚚馃嚦</span>
                        <span class="lang-text" data-i18n="lang.zh"></span>
                    </button>
                    <button class="lang-btn" data-lang="en">
                        <span class="lang-flag">馃嚭馃嚫</span>
                        <span class="lang-text" data-i18n="lang.en"></span>
                    </button>
                </div>
            </div>
        `;
        
        // 娣诲姞鏍峰紡
        this.addLanguageSwitcherStyles();
        
        return switcher;
    }

    // 娣诲姞璇█鍒囨崲鍣ㄦ牱寮?    addLanguageSwitcherStyles() {
        if (document.querySelector('#language-switcher-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'language-switcher-styles';
        style.textContent = `
            .language-switcher {
                position: relative;
                display: inline-block;
                margin-left: 20px;
            }
            
            .lang-dropdown {
                position: relative;
            }
            
            .lang-current {
                background: transparent;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 6px;
                padding: 8px 16px;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 14px;
                transition: all 0.3s ease;
            }
            
            .lang-current:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: rgba(255, 255, 255, 0.3);
            }
            
            .lang-flag {
                font-size: 16px;
            }
            
            .lang-arrow {
                font-size: 10px;
                margin-left: 4px;
            }
            
            .lang-options {
                position: absolute;
                top: 100%;
                right: 0;
                background: white;
                border-radius: 6px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                min-width: 140px;
                display: none;
                z-index: 1000;
                margin-top: 5px;
            }
            
            .lang-dropdown:hover .lang-options {
                display: block;
            }
            
            .lang-btn {
                width: 100%;
                padding: 12px 16px;
                background: none;
                border: none;
                text-align: left;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 10px;
                color: #333;
                font-size: 14px;
                transition: background 0.2s ease;
            }
            
            .lang-btn:hover {
                background: #f5f5f5;
            }
            
            /* 娣辫壊妯″紡鏀寔 */
            @media (prefers-color-scheme: dark) {
                .lang-options {
                    background: #2d2d2d;
                }
                
                .lang-btn {
                    color: #f0f0f0;
                }
                
                .lang-btn:hover {
                    background: #3d3d3d;
                }
            }
            
            /* 绉诲姩绔紭鍖?*/
            @media (max-width: 768px) {
                .language-switcher {
                    margin-left: 10px;
                }
                
                .lang-current {
                    padding: 6px 12px;
                    font-size: 13px;
                }
                
                .lang-btn {
                    padding: 10px 14px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    // 鏇存柊璇█鎸囩ず鍣?    updateLanguageIndicator() {
        const currentBtn = document.querySelector('.lang-current .lang-flag');
        if (currentBtn) {
            currentBtn.textContent = this.currentLang === 'zh-CN' ? '馃嚚馃嚦' : '馃嚭馃嚫';
        }
        
        // 鏇存柊褰撳墠璇█鏂囨湰
        this.translatePage();
    }

    // 瑙﹀彂璇█鍒囨崲浜嬩欢
    dispatchLanguageChangeEvent() {
        const event = new CustomEvent('languageChanged', {
            detail: { language: this.currentLang }
        });
        document.dispatchEvent(event);
    }

    // 鍒囨崲璇█锛堝叕寮€鏂规硶锛?    switchLanguage(lang) {
        if (this.translations[lang]) {
            this.applyLanguage(lang);
        }
    }

    // 鍒囨崲璇█锛堝埆鍚嶆柟娉曪紝鍏煎娴嬭瘯锛?    switchToLanguage(lang) {
        return this.switchLanguage(lang);
    }

    // 鑾峰彇褰撳墠



// 确保DOM完全加载后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof window.languageSwitcher === 'undefined') {
            window.languageSwitcher = new LanguageSwitcher();
            console.log('LanguageSwitcher initialized on DOMContentLoaded');
        }
    });
} else {
    // DOM已经加载完成，立即初始化
    if (typeof window.languageSwitcher === 'undefined') {
        window.languageSwitcher = new LanguageSwitcher();
        console.log('LanguageSwitcher initialized immediately');
    }
}

// 全局访问
window.LanguageSwitcher = LanguageSwitcher;




// 直接事件绑定作为后备
document.addEventListener('DOMContentLoaded', () => {
    // 直接绑定语言切换按钮点击事件
    const languageButtons = document.querySelectorAll('.lang-btn');
    console.log('Found language buttons:', languageButtons.length);
    
    languageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = button.getAttribute('data-lang');
            console.log('Language button clicked:', lang);
            
            if (window.languageSwitcher && lang !== window.languageSwitcher.currentLang) {
                window.languageSwitcher.switchLanguageWithAnimation(lang).then(() => {
                    window.languageSwitcher.currentLang = lang;
                    window.languageSwitcher.storeLanguage(lang);
                });
            } else if (!window.languageSwitcher) {
                console.error('LanguageSwitcher not initialized');
                // 后备方案：直接切换
                document.documentElement.lang = lang;
                localStorage.setItem('metaEvoLang', lang);
                location.reload();
            }
        });
    });
    
    // 初始化按钮状态
    const storedLang = localStorage.getItem('metaEvoLang') || 'zh-CN';
    languageButtons.forEach(button => {
        const btnLang = button.getAttribute('data-lang');
        if (btnLang === storedLang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
});
