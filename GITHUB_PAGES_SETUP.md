# GitHub Pages 配置指南

## 🚀 快速配置步骤

### 步骤1：登录GitHub
1. 访问：https://github.com
2. 登录账号：`mata-evo-creator`

### 步骤2：进入仓库设置
1. 访问仓库：https://github.com/meta-evo-creator/meta-evo-website
2. 点击顶部菜单"Settings"
3. 在左侧菜单选择"Pages"

### 步骤3：配置GitHub Pages
```
分支: main
文件夹: / (根目录)
保存设置
```

### 步骤4：配置自定义域名
1. 在Pages设置页面找到"Custom domain"
2. 输入：`meta-evo.com`
3. 勾选"Enforce HTTPS"
4. 保存设置

### 步骤5：验证配置
1. 等待1-2分钟让配置生效
2. 访问：https://meta-evo-creator.github.io/meta-evo-website/
3. 访问：https://meta-evo.com (需要DNS生效后)

## 🌐 DNS配置要求

### 阿里云DNS配置（必须已完成）
```
A记录（4条）：
@ → 185.199.108.153
@ → 185.199.109.153  
@ → 185.199.110.153
@ → 185.199.111.153

CNAME记录（1条）：
www → mata-evo-creator.github.io
```

### DNS验证命令
```bash
# 验证DNS解析
nslookup meta-evo.com
nslookup www.meta-evo.com

# 应该返回GitHub Pages的IP地址
```

## ⚡ 故障排除

### 问题1：GitHub Pages未启用
**症状**：访问仓库页面看不到"Environments"部分
**解决**：
1. 确保代码已推送到main分支
2. 等待GitHub处理（最多10分钟）
3. 重新检查Pages设置

### 问题2：自定义域名不工作
**症状**：GitHub Pages可以访问，但自定义域名不行
**解决**：
1. 检查DNS配置是否正确
2. 等待DNS传播（最多24小时，通常几分钟）
3. 在GitHub Pages设置中重新保存域名

### 问题3：HTTPS证书问题
**症状**：浏览器显示不安全连接
**解决**：
1. 确保勾选"Enforce HTTPS"
2. 等待GitHub签发证书（最多24小时）
3. 清除浏览器缓存

## 📊 验证步骤

### 验证1：GitHub Pages工作
```
访问：https://meta-evo-creator.github.io/meta-evo-website/
预期：看到MetaEvo官方网站首页
```

### 验证2：自定义域名工作
```
访问：https://meta-evo.com
预期：重定向到HTTPS，显示官方网站
```

### 验证3：HTTPS工作
```
检查浏览器地址栏：应该有🔒锁图标
检查证书：应该是GitHub颁发的有效证书
```

## 🔧 高级配置

### 性能优化
1. **启用HTTP/2**：GitHub Pages自动支持
2. **CDN加速**：GitHub Pages使用全球CDN
3. **自动压缩**：静态资源自动Gzip压缩

### 安全配置
1. **强制HTTPS**：在Pages设置中启用
2. **安全头部**：GitHub Pages自动添加
3. **CSP策略**：可以通过自定义配置添加

### 监控配置
1. **访问统计**：GitHub不提供，需要第三方工具
2. **错误监控**：浏览器控制台查看
3. **性能监控**：使用Lighthouse工具

## 📱 移动端优化

### 已实现的优化
✅ 响应式设计（4个断点）
✅ 移动端优先设计
✅ 触摸友好的交互
✅ 性能优化（图片懒加载等）

### 测试工具
1. **Chrome DevTools**：设备模拟
2. **Google Mobile-Friendly Test**：https://search.google.com/test/mobile-friendly
3. **Lighthouse**：性能、PWA、最佳实践测试

## 🚀 部署状态检查清单

### 部署前检查
- [ ] 代码已推送到main分支
- [ ] GitHub Pages已启用
- [ ] 自定义域名已配置
- [ ] HTTPS已强制启用
- [ ] DNS记录已正确配置

### 部署后验证
- [ ] GitHub Pages URL可访问
- [ ] 自定义域名可访问
- [ ] HTTPS工作正常
- [ ] 所有页面加载正常
- [ ] 移动端显示正常

## 📞 支持资源

### GitHub官方文档
- GitHub Pages文档：https://docs.github.com/pages
- 自定义域名：https://docs.github.com/pages/configuring-a-custom-domain
- 故障排除：https://docs.github.com/pages/troubleshooting

### 工具和测试
- DNS检查：https://dnschecker.org
- SSL检查：https://www.ssllabs.com/ssltest
- 性能测试：https://pagespeed.web.dev

### 联系我们
如有问题，请通过以下方式联系：
- GitHub Issues：在仓库创建issue
- 邮箱：support@meta-evo.com
- 文档：https://meta-evo.com/docs

---

**最后更新**：2026-04-04 08:10
**状态**：等待代码推送和Pages配置
**预计完成时间**：08:15前