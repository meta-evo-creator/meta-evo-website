/**
 * 简单直接的语言切换方案
 * 作为复杂脚本的后备
 */

class SimpleLanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('metaEvoLang') || 'zh-CN';
        this.translations = {};
        this.init();
    }
    
    async init() {
        console.log('SimpleLanguageSwitcher initializing...');
        
        // 加载翻译
        await this.loadTranslations();
        
        // 设置事件监听
        this.setupEventListeners();
        
        // 应用当前语言
        this.applyLanguage(this.currentLang);
        
        console.log('SimpleLanguageSwitcher ready');
    }
    
    async loadTranslations() {
        try {
            const response = await fetch('/assets/lang/translations.json');
            this.translations = await response.json();
            console.log('Translations loaded successfully');
        } catch (error) {
            console.error('Failed to load translations:', error);
            // 使用默认翻译
            this.translations = {
                'zh-CN': {
                    'hero.title': 'MetaEvo - 进化进化的进化',
                    'hero.subtitle': '让AI具备自我学习、自我进化、自我产品化的能力'
                },
                'en': {
                    'hero.title': 'MetaEvo - Evolution of Evolution',
                    'hero.subtitle': 'Empowering AI with self-learning, self-evolution, and self-productization capabilities'
                }
            };
        }
    }
    
    setupEventListeners() {
        // 绑定所有语言切换按钮
        document.querySelectorAll('.lang-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = button.getAttribute('data-lang');
                console.log('Switching to language:', lang);
                this.switchLanguage(lang);
            });
        });
        
        console.log('Event listeners setup for', document.querySelectorAll('.lang-btn').length, 'buttons');
    }
    
    switchLanguage(lang) {
        if (lang === this.currentLang) return;
        
        console.log('Switching from', this.currentLang, 'to', lang);
        
        // 更新按钮状态
        this.updateButtonStates(lang);
        
        // 应用新语言
        this.applyLanguage(lang);
        
        // 保存偏好
        this.currentLang = lang;
        localStorage.setItem('metaEvoLang', lang);
        
        // 显示提示
        this.showToast(lang === 'zh-CN' ? '已切换到中文' : 'Switched to English');
    }
    
    updateButtonStates(lang) {
        document.querySelectorAll('.lang-btn').forEach(button => {
            const btnLang = button.getAttribute('data-lang');
            if (btnLang === lang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    applyLanguage(lang) {
        console.log('Applying language:', lang);
        
        // 更新html标签
        document.documentElement.lang = lang;
        
        // 更新所有data-i18n元素
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (this.translations[lang] && this.translations[lang][key]) {
                element.textContent = this.translations[lang][key];
            }
        });
        
        // 更新meta描述
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && metaDesc.hasAttribute('data-i18n')) {
            const key = metaDesc.getAttribute('data-i18n');
            if (this.translations[lang] && this.translations[lang][key]) {
                metaDesc.setAttribute('content', this.translations[lang][key]);
            }
        }
        
        // 更新页面标题
        const title = document.querySelector('title[data-i18n]');
        if (title) {
            const key = title.getAttribute('data-i18n');
            if (this.translations[lang] && this.translations[lang][key]) {
                title.textContent = this.translations[lang][key];
            }
        }
    }
    
    showToast(message) {
        // 移除现有的toast
        const existingToast = document.querySelector('.simple-lang-toast');
        if (existingToast) existingToast.remove();
        
        // 创建新的toast
        const toast = document.createElement('div');
        toast.className = 'simple-lang-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #007bff;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 9999;
            animation: fadeInOut 3s;
        `;
        
        // 添加样式
        if (!document.querySelector('#simple-toast-style')) {
            const style = document.createElement('style');
            style.id = 'simple-toast-style';
            style.textContent = `
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translateY(-20px); }
                    10% { opacity: 1; transform: translateY(0); }
                    90% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(-20px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(toast);
        
        // 3秒后移除
        setTimeout(() => toast.remove(), 3000);
    }
}

// 立即初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing SimpleLanguageSwitcher...');
    window.simpleLanguageSwitcher = new SimpleLanguageSwitcher();
});
