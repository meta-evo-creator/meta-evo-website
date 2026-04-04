/**
 * MetaEvo 网站中英文切换功能
 * 支持无缝语言切换，保持用户偏好
 */

class LanguageSwitcher {
    constructor() {
        this.currentLang = this.getStoredLanguage() || this.detectBrowserLanguage();
        this.translations = {};
        this.init();
    }

    // 初始化
    init() {
        this.loadTranslations().then(() => {
            this.applyLanguage(this.currentLang);
            this.setupLanguageSwitcher();
            this.updateLanguageIndicator();
        });
    }

    // 获取存储的语言偏好
    getStoredLanguage() {
        return localStorage.getItem('metaEvoLang');
    }

    // 存储语言偏好
    storeLanguage(lang) {
        localStorage.setItem('metaEvoLang', lang);
    }

    // 检测浏览器语言
    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        return browserLang.startsWith('zh') ? 'zh-CN' : 'en';
    }

    // 加载翻译文件
    async loadTranslations() {
        try {
            const response = await fetch('/assets/lang/translations.json');
            this.translations = await response.json();
        } catch (error) {
            console.error('Failed to load translations:', error);
            // 使用默认翻译
            this.translations = this.getDefaultTranslations();
        }
    }

    // 默认翻译（后备）
    getDefaultTranslations() {
        return {
            'zh-CN': {
                // 导航
                'nav.home': '首页',
                'nav.products': '产品',
                'nav.docs': '文档',
                'nav.blog': '博客',
                'nav.about': '关于',
                'nav.contact': '联系',
                'nav.language': '语言',
                
                // 英雄区域
                'hero.title': 'MetaEvo - 进化进化的进化',
                'hero.subtitle': '让AI具备自我学习、自我进化、自我产品化的能力',
                'hero.description': '探索 mev-self-learning 和 mev-efficiency 技能，构建智能、高效的AI助手生态系统。',
                'hero.cta.primary': '开始探索',
                'hero.cta.secondary': '查看文档',
                
                // 产品部分
                'products.title': 'mev 技能系列',
                'products.subtitle': '构建完整的AI助手能力生态',
                
                // mev-self-learning
                'product.self-learning.title': 'mev-self-learning',
                'product.self-learning.subtitle': 'AI自我学习和进化技能',
                'product.self-learning.description': '让AI助手能够自我诊断、学习、封装新技能，实现持续进化。',
                'product.self-learning.features': '核心功能',
                'product.self-learning.feature1': '自我诊断能力短板',
                'product.self-learning.feature2': '设计个性化学习路径',
                'product.self-learning.feature3': '技能封装和标准化',
                'product.self-learning.feature4': '进化监控和优化',
                'product.self-learning.stats': '性能指标',
                'product.self-learning.stat1': '学习效率提升 80%',
                'product.self-learning.stat2': '每周创建 2-3 个新技能',
                'product.self-learning.stat3': '用户满意度 4.8/5.0',
                'product.self-learning.cta': 'GitHub 查看',
                
                // mev-efficiency
                'product.efficiency.title': 'mev-efficiency',
                'product.efficiency.subtitle': '开发效率并行工程技能',
                'product.efficiency.description': '智能并行任务规划，显著提升开发工作效率和资源利用率。',
                'product.efficiency.features': '核心功能',
                'product.efficiency.feature1': '智能并行任务规划',
                'product.efficiency.feature2': '系统资源优化分配',
                'product.efficiency.feature3': 'WBS科学任务分解',
                'product.efficiency.feature4': '动态执行优化',
                'product.efficiency.stats': '实际效果',
                'product.efficiency.stat1': '效率提升 89-94%',
                'product.efficiency.stat2': '时间节省 16-24小时 → 87分钟',
                'product.efficiency.stat3': '资源利用率 92%',
                'product.efficiency.cta': 'GitHub 查看',
                
                // 生态价值
                'ecosystem.title': '生态协同价值',
                'ecosystem.description': '两个技能形成完整的价值闭环，实现指数级增长。',
                'ecosystem.value1.title': '自我进化',
                'ecosystem.value1.desc': 'mev-self-learning 创造新技能的能力',
                'ecosystem.value2.title': '高效执行',
                'ecosystem.value2.desc': 'mev-efficiency 提升工作效率的技能',
                'ecosystem.value3.title': '组合效应',
                'ecosystem.value3.desc': '自我进化 + 高效执行 = 指数级增长',
                
                // 行动号召
                'cta.title': '加入 MetaEvo 社区',
                'cta.description': '探索AI自我学习和效率优化的未来，参与开源社区建设。',
                'cta.button1': 'Star on GitHub',
                'cta.button2': '加入讨论',
                'cta.button3': '联系我们',
                
                // 页脚
                'footer.description': 'MetaEvo - 推动AI向更自主、更智能的方向发展',
                'footer.quickLinks': '快速链接',
                'footer.products': '产品',
                'footer.docs': '文档',
                'footer.blog': '博客',
                'footer.community': '社区',
                'footer.legal': '法律',
                'footer.privacy': '隐私政策',
                'footer.terms': '服务条款',
                'footer.license': '开源协议',
                'footer.copyright': '© 2026 MetaEvo Technologies. 保留所有权利。',
                
                // 语言切换
                'lang.zh': '中文',
                'lang.en': 'English',
                'lang.current': '当前语言'
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
                'product.efficiency.stat2': 'Time saved: 16-24 hours → 87 minutes',
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
                'footer.copyright': '© 2026 MetaEvo Technologies. All rights reserved.',
                
                // Language Switcher
                'lang.zh': '中文',
                'lang.en': 'English',
                'lang.current': 'Current Language'
            }
        };
    }

    // 应用语言
    applyLanguage(lang) {
        this.currentLang = lang;
        this.storeLanguage(lang);
        
        // 更新HTML lang属性
        document.documentElement.lang = lang;
        
        // 翻译所有带data-i18n属性的元素
        this.translatePage();
        
        // 更新语言指示器
        this.updateLanguageIndicator();
        
        // 触发语言切换事件
        this.dispatchLanguageChangeEvent();
    }

    // 翻译页面
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

    // 获取翻译
    getTranslation(key) {
        const langData = this.translations[this.currentLang];
        if (!langData) return key;
        
        // 支持嵌套键，如 'nav.home'
        return key.split('.').reduce((obj, k) => obj && obj[k], langData) || key;
    }

    // 设置语言切换器
    setupLanguageSwitcher() {
        // 创建或找到语言切换器
        let switcher = document.querySelector('.language-switcher');
        if (!switcher) {
            switcher = this.createLanguageSwitcher();
            const nav = document.querySelector('.nav-menu') || document.querySelector('nav');
            if (nav) {
                nav.appendChild(switcher);
            } else {
                document.body.insertBefore(switcher, document.body.firstChild);
            }
        }
        
        // 设置切换事件
        const buttons = switcher.querySelectorAll('.lang-btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = button.getAttribute('data-lang');
                this.applyLanguage(lang);
            });
        });
    }

    // 创建语言切换器
    createLanguageSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <div class="lang-dropdown">
                <button class="lang-current" aria-label="Language switcher">
                    <span class="lang-flag">${this.currentLang === 'zh-CN' ? '🇨🇳' : '🇺🇸'}</span>
                    <span class="lang-text" data-i18n="lang.current"></span>
                    <span class="lang-arrow">▼</span>
                </button>
                <div class="lang-options">
                    <button class="lang-btn" data-lang="zh-CN">
                        <span class="lang-flag">🇨🇳</span>
                        <span class="lang-text" data-i18n="lang.zh"></span>
                    </button>
                    <button class="lang-btn" data-lang="en">
                        <span class="lang-flag">🇺🇸</span>
                        <span class="lang-text" data-i18n="lang.en"></span>
                    </button>
                </div>
            </div>
        `;
        
        // 添加样式
        this.addLanguageSwitcherStyles();
        
        return switcher;
    }

    // 添加语言切换器样式
    addLanguageSwitcherStyles() {
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
            
            /* 深色模式支持 */
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
            
            /* 移动端优化 */
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

    // 更新语言指示器
    updateLanguageIndicator() {
        const currentBtn = document.querySelector('.lang-current .lang-flag');
        if (currentBtn) {
            currentBtn.textContent = this.currentLang === 'zh-CN' ? '🇨🇳' : '🇺🇸';
        }
        
        // 更新当前语言文本
        this.translatePage();
    }

    // 触发语言切换事件
    dispatchLanguageChangeEvent() {
        const event = new CustomEvent('languageChanged', {
            detail: { language: this.currentLang }
        });
        document.dispatchEvent(event);
    }

    // 切换语言（公开方法）
    switchLanguage(lang) {
        if (this.translations[lang]) {
            this.applyLanguage(lang);
        }
    }

    // 获取当前