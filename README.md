# MetaEvo 官方网站

官方网站: https://meta-evo.com

## 🎯 项目概述

MetaEvo 官方网站是 MetaEvo 品牌的官方展示平台，专注于展示 mev 系列技能产品，包括 mev-self-learning 和 mev-efficiency。

## 🚀 功能特性

### 核心页面
- **首页**: 品牌介绍 + mev技能展示
- **产品页**: mev技能详细介绍和比较
- **文档页**: 使用文档和教程（开发中）
- **关于页**: 品牌理念和联系方式（开发中）

### 技术特性
- ✅ 响应式设计：完美适配各种设备
- ✅ 高性能：静态HTML，快速加载
- ✅ 品牌一致：应用mev品牌视觉系统
- ✅ 无障碍：良好的键盘导航和屏幕阅读器支持
- ✅ 现代技术：HTML5、CSS3、ES6+

## 🛠️ 技术栈

### 前端技术
- **HTML5**: 语义化结构
- **CSS3**: 现代样式，Flexbox/Grid布局
- **JavaScript**: 基础交互功能
- **字体**: Inter字体（英文字体）

### 开发工具
- **编辑器**: VS Code
- **版本控制**: Git
- **部署**: GitHub Pages
- **CDN**: Cloudflare

### 性能优化
- 图片优化和懒加载
- CSS和JavaScript压缩
- 浏览器缓存策略
- CDN加速

## 📁 项目结构

```
meta-evo-website/
├── index.html              # 首页
├── products/              # 产品页面
│   ├── index.html        # 产品总览
│   ├── mev-self-learning/ # mev-self-learning详情（开发中）
│   └── mev-efficiency/   # mev-efficiency详情（开发中）
├── docs/                 # 文档页面（开发中）
├── about/               # 关于页面（开发中）
├── assets/              # 静态资源
│   ├── css/            # 样式文件
│   │   ├── style.css   # 主样式
│   │   ├── responsive.css # 响应式样式
│   │   └── products.css # 产品页面样式
│   ├── js/             # JavaScript文件
│   │   └── main.js     # 主JavaScript
│   └── images/         # 图片资源
├── CNAME               # 自定义域名配置
└── README.md          # 项目说明
```

## 🚀 快速开始

### 本地开发
1. 克隆项目：
   ```bash
   git clone https://github.com/meta-evo/website.git
   cd website
   ```

2. 使用任何HTTP服务器运行：
   ```bash
   # 使用Python
   python -m http.server 8000
   
   # 或使用Node.js
   npx serve .
   ```

3. 在浏览器中打开：http://localhost:8000

### 部署到GitHub Pages
1. 将项目推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择主分支作为源
4. 添加CNAME文件配置自定义域名

### 自定义域名
1. 在域名注册商处配置DNS：
   ```
   CNAME meta-evo.com → username.github.io
   ```
2. 在项目根目录创建CNAME文件：
   ```
   meta-evo.com
   ```
3. 在GitHub Pages设置中启用自定义域名

## 🎨 设计系统

### 色彩系统
- **主色调**: 科技蓝 (#4A90E2)
- **辅助色**: 进化绿 (#50E3C2)
- **渐变**: 蓝→绿渐变 (品牌特色)
- **中性色**: 深灰、浅灰、白色

### 字体系统
- **英文**: Inter字体 (现代、科技感)
- **中文**: 系统默认中文字体
- **代码**: 等宽字体

### 标志系统
- **主标志**: 8点循环标志
- **标志变体**: 完整版、图形版、文字版
- **标志应用**: 网站favicon、logo、品牌元素

## 📱 响应式设计

### 断点设计
- **大屏幕**: ≥1200px (桌面)
- **中等屏幕**: 992px-1199px (平板横屏/小桌面)
- **小屏幕**: 768px-991px (平板竖屏)
- **超小屏幕**: ≤767px (手机)

### 适配特性
- 灵活的网格布局
- 响应式图片和媒体
- 移动端优先设计
- 触摸友好的交互

## 🔧 开发指南

### 添加新页面
1. 在对应目录创建HTML文件
2. 继承基础模板结构
3. 添加页面特定样式（如果需要）
4. 更新导航菜单

### 样式开发
- 使用CSS自定义属性（变量）
- 遵循BEM命名约定
- 移动端优先的媒体查询
- 使用Flexbox/Grid布局

### JavaScript开发
- 使用模块化组织代码
- 添加适当的错误处理
- 考虑性能影响
- 提供无障碍支持

## 📊 性能优化

### 加载性能
- 关键CSS内联
- 图片懒加载
- 字体预加载
- 资源压缩

### 运行时性能
- 避免布局抖动
- 使用CSS动画代替JavaScript
- 事件委托
- 防抖和节流

### 缓存策略
- 静态资源长期缓存
- Service Worker（未来）
- CDN缓存
- 浏览器缓存头

## 🔒 安全考虑

### 基本安全
- HTTPS强制启用
- 安全头部配置
- 内容安全策略
- 防止点击劫持

### 隐私保护
- 不收集用户个人信息
- 不使用第三方跟踪
- 透明的隐私政策
- GDPR合规考虑

## 🌐 国际化

### 多语言支持（未来）
- 中英文双语支持
- 语言切换功能
- 区域化内容
- RTL布局支持

## 🤝 贡献指南

### 开发流程
1. Fork项目
2. 创建功能分支
3. 提交更改
4. 创建Pull Request

### 代码规范
- 遵循现有代码风格
- 添加适当的注释
- 更新相关文档
- 测试更改

### 提交信息
使用约定式提交：
- feat: 新功能
- fix: 错误修复
- docs: 文档更新
- style: 代码格式
- refactor: 代码重构
- test: 测试相关
- chore: 构建过程或辅助工具

## 📞 支持

### 问题反馈
- GitHub Issues: 报告bug或请求功能
- 邮件支持: support@meta-evo.com

### 文档资源
- 官方文档: https://meta-evo.com/docs
- API参考: https://meta-evo.com/docs/api
- 常见问题: https://meta-evo.com/docs/faq

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢所有为MetaEvo项目做出贡献的开发者、设计师和用户。

---

**MetaEvo: 进化进化的进化** 🚀