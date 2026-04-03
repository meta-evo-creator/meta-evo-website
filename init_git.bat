@echo off
echo === 初始化MetaEvo网站Git仓库 ===

REM 删除现有.git目录
if exist .git (
    echo 删除现有.git目录...
    rmdir /s /q .git
)

REM 初始化Git仓库
echo 初始化新的Git仓库...
git init

REM 添加所有文件
echo 添加所有文件...
git add .

REM 创建初始提交
echo 创建初始提交...
git commit -m "初始提交: MetaEvo官方网站 v1.0

- 首页开发完成
- 产品页面开发完成  
- 品牌视觉系统应用
- 响应式设计实现
- 性能优化完成"

REM 显示状态
echo.
echo === Git仓库状态 ===
git status

echo.
echo === 下一步操作 ===
echo 1. 在GitHub创建仓库: meta-evo-website
echo 2. 添加远程仓库: git remote add origin https://github.com/mata-evo-creator/meta-evo-website.git
echo 3. 推送到GitHub: git push -u origin main
echo 4. 配置GitHub Pages

echo.
echo === 重要提示 ===
echo 请确保您已配置阿里云DNS记录！
echo A记录: 185.199.108.153 等4个IP
echo CNAME记录: www -> mata-evo-creator.github.io

pause