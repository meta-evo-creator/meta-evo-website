/* MetaEvo 官方网站 JavaScript */

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initAnimations();
    initPerformanceMonitoring();
    initAccessibility();
    initAnalytics();
});

// ===== 导航功能 =====
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        // 切换移动端菜单
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // 更新ARIA属性
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
            navMenu.setAttribute('aria-hidden', !isExpanded);
        });
        
        // 点击菜单项关闭菜单（移动端）
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    navMenu.setAttribute('aria-hidden', 'true');
                }
            });
        });
        
        // 窗口大小变化时重置菜单状态
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.setAttribute('aria-hidden', 'false');
            }
        });
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 如果是页面内锚点链接
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // 更新URL（不刷新页面）
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

// ===== 动画效果 =====
function initAnimations() {
    // 观察器配置
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // 创建观察器
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll(
        '.skill-card, .feature-item, .evolution-cycle'
    );
    
    animatedElements.forEach(element => {
        // 添加初始状态
        element.classList.add('animate-ready');
        
        // 开始观察
        observer.observe(element);
    });
    
    // 进化循环动画控制
    const evolutionCycle = document.querySelector('.evolution-cycle');
    if (evolutionCycle) {
        // 鼠标悬停时加速动画
        evolutionCycle.addEventListener('mouseenter', function() {
            this.style.animationDuration = '1s';
        });
        
        evolutionCycle.addEventListener('mouseleave', function() {
            this.style.animationDuration = '2s';
        });
        
        // 点击时随机改变颜色
        evolutionCycle.addEventListener('click', function() {
            const colors = [
                'linear-gradient(135deg, #4A90E2, #50E3C2)',
                'linear-gradient(135deg, #FF6B6B, #FFD93D)',
                'linear-gradient(135deg, #6BCF7F, #4D96FF)',
                'linear-gradient(135deg, #9D4EDD, #FF9E00)'
            ];
            
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const points = this.querySelectorAll('.cycle-point');
            
            points.forEach(point => {
                point.style.background = randomColor;
            });
            
            // 3秒后恢复原色
            setTimeout(() => {
                points.forEach(point => {
                    point.style.background = '';
                });
            }, 3000);
        });
    }
}

// ===== 性能监控 =====
function initPerformanceMonitoring() {
    // 记录关键性能指标
    const perfData = {
        loadTime: 0,
        firstPaint: 0,
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
        cumulativeLayoutShift: 0
    };
    
    // 使用Performance API
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const timing = performance.timing;
                const paintEntries = performance.getEntriesByType('paint');
                const navigationEntries = performance.getEntriesByType('navigation');
                
                // 计算加载时间
                perfData.loadTime = timing.loadEventEnd - timing.navigationStart;
                
                // 获取绘制时间
                paintEntries.forEach(entry => {
                    if (entry.name === 'first-paint') {
                        perfData.firstPaint = entry.startTime;
                    } else if (entry.name === 'first-contentful-paint') {
                        perfData.firstContentfulPaint = entry.startTime;
                    }
                });
                
                // 获取LCP
                const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
                if (lcpEntries.length > 0) {
                    perfData.largestContentfulPaint = lcpEntries[lcpEntries.length - 1].startTime;
                }
                
                // 获取CLS
                const layoutShiftEntries = performance.getEntriesByType('layout-shift');
                if (layoutShiftEntries.length > 0) {
                    perfData.cumulativeLayoutShift = layoutShiftEntries.reduce((sum, entry) => {
                        return sum + entry.value;
                    }, 0);
                }
                
                // 控制台输出性能数据
                console.group('📊 网站性能数据');
                console.log('页面加载时间:', perfData.loadTime + 'ms');
                console.log('首次绘制:', perfData.firstPaint + 'ms');
                console.log('首次内容绘制:', perfData.firstContentfulPaint + 'ms');
                console.log('最大内容绘制:', perfData.largestContentfulPaint + 'ms');
                console.log('累计布局偏移:', perfData.cumulativeLayoutShift.toFixed(4));
                console.groupEnd();
                
                // 性能评分
                let performanceScore = 100;
                
                if (perfData.loadTime > 3000) performanceScore -= 20;
                else if (perfData.loadTime > 2000) performanceScore -= 10;
                
                if (perfData.largestContentfulPaint > 2500) performanceScore -= 20;
                else if (perfData.largestContentfulPaint > 1500) performanceScore -= 10;
                
                if (perfData.cumulativeLayoutShift > 0.1) performanceScore -= 20;
                else if (perfData.cumulativeLayoutShift > 0.05) performanceScore -= 10;
                
                console.log('性能评分:', performanceScore + '/100');
                
                // 如果性能优秀，显示徽章
                if (performanceScore >= 90) {
                    showPerformanceBadge();
                }
            }, 0);
        });
    }
    
    // 显示性能徽章
    function showPerformanceBadge() {
        const badge = document.createElement('div');
        badge.className = 'performance-badge';
        badge.innerHTML = '🚀 性能优秀';
        badge.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4A90E2, #50E3C2);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: fadeIn 0.5s ease;
        `;
        
        document.body.appendChild(badge);
        
        // 3秒后淡出
        setTimeout(() => {
            badge.style.opacity = '0';
            badge.style.transition = 'opacity 0.5s ease';
            setTimeout(() => badge.remove(), 500);
        }, 3000);
    }
    
    // 资源加载监控
    const resourceObserver = new PerformanceObserver(function(list) {
        const entries = list.getEntries();
        entries.forEach(entry => {
            if (entry.duration > 1000) {
                console.warn('⏱️ 资源加载较慢:', entry.name, entry.duration + 'ms');
            }
        });
    });
    
    resourceObserver.observe({ entryTypes: ['resource'] });
}

// ===== 无障碍功能 =====
function initAccessibility() {
    // 焦点样式改进
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // 添加CSS类用于键盘导航样式
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-navigation :focus {
            outline: 3px solid var(--color-primary) !important;
            outline-offset: 2px !important;
        }
        
        .keyboard-navigation .btn:focus,
        .keyboard-navigation .nav-link:focus,
        .keyboard-navigation a:focus {
            box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.5) !important;
        }
    `;
    document.head.appendChild(style);
    
    // 跳过导航链接
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = '跳转到主要内容';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--color-primary);
        color: white;
        padding: 8px 16px;
        z-index: 1001;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // 添加主要内容区域ID
    const mainContent = document.querySelector('main') || document.querySelector('.hero');
    if (mainContent) {
        mainContent.id = 'main-content';
        mainContent.setAttribute('tabindex', '-1');
    }
    
    // 图片alt属性检查
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('alt')) {
            console.warn('⚠️ 图片缺少alt属性:', img.src);
            img.setAttribute('alt', '');
        }
    });
    
    // 按钮和链接角色检查
    document.querySelectorAll('[role="button"]').forEach(button => {
        button.setAttribute('tabindex', '0');
        
        // 添加键盘支持
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// ===== 分析功能 =====
function initAnalytics() {
    // 简单的页面浏览跟踪
    const pageViewData = {
        url: window.location.href,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`
    };
    
    // 控制台输出（实际项目中应发送到分析服务）
    console.log('📈 页面浏览:', pageViewData);
    
    // 事件跟踪
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        // 跟踪按钮点击
        if (target.matches('.btn, .nav-link, .skill-link')) {
            const eventData = {
                type: 'click',
                element: target.tagName.toLowerCase(),
                text: target.textContent.trim(),
                href: target.href || target.getAttribute('href'),
                className: target.className,
                timestamp: new Date().toISOString()
            };
            
            console.log('🖱️ 点击事件:', eventData);
        }
    });
    
    // 滚动深度跟踪
    let maxScrollDepth = 0;
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollPosition / pageHeight) * 100;
        
        if (scrollPercentage > maxScrollDepth) {
            maxScrollDepth = scrollPercentage;
            
            // 记录关键滚动点
            const milestones = [25, 50, 75, 90, 100];
            milestones.forEach(milestone => {
                if (scrollPercentage >= milestone && maxScrollDepth < milestone + 5) {
                    console.log(`📊 滚动深度: ${milestone}%`);
                }
            });
        }
    });
    
    // 页面离开跟踪
    window.addEventListener('beforeunload', function() {
        const sessionDuration = Date.now() - performance.timing.navigationStart;
        console.log('👋 页面离开:', {
            duration: sessionDuration + 'ms',
            maxScrollDepth: maxScrollDepth.toFixed(1) + '%',
            pageViews: 1
        });
    });
}

// ===== 工具函数 =====

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 检测网络状态
function checkNetworkStatus() {
    const statusElement = document.createElement('div');
    statusElement.className = 'network-status';
    statusElement.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        z-index: 1000;
        display: none;
    `;
    
    document.body.appendChild(statusElement);
    
    function updateStatus() {
        if (!navigator.onLine) {
            statusElement.textContent = '🔴 离线';
            statusElement.style.background = '#DC3545';
            statusElement.style.color = 'white';
            statusElement.style.display = 'block';
        } else {
            if (navigator.connection) {
                const connection = navigator.connection;
                if (connection.saveData) {
                    statusElement.textContent = '💾 省流模式';
                    statusElement.style.background = '#FFC107';
                    statusElement.style.color = '#212529';
                    statusElement.style.display = 'block';
                } else if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                    statusElement.textContent = '🐢 网络较慢';
                    statusElement.style.background = '#FFC107';
                    statusElement.style.color = '#212529';
                    statusElement.style.display = 'block';
                } else {
                    statusElement.style.display = 'none';
                }
            } else {
                statusElement.style.display = 'none';
            }
        }
    }
    
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    
    if (navigator.connection) {
        navigator.connection.addEventListener('change', updateStatus);
    }
    
    updateStatus();
}

// 初始化网络状态检测
checkNetworkStatus();

// ===== 错误处理 =====
window.addEventListener('error', function(e) {
    console.error('❌ JavaScript错误:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error
    });
    
    // 可以在这里发送错误到监控服务
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('❌ 未处理的Promise拒绝:', e.reason);
});

// ===== 服务工作者（未来扩展） =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // 在实际部署时注册Service Worker
        // navigator.serviceWorker.register('/sw.js');
    });
}