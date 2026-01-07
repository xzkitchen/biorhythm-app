# BioRhythm Master - 部署指南

这是一个生物节律管理工具,帮助你优化睡眠周期和饮食安排。

## 🚀 快速部署到 Vercel（推荐）

### 方法一：最简单（拖拽上传）

1. **访问 Vercel 官网**
   - 打开 https://vercel.com
   - 点击右上角 "Sign Up" 注册（用 GitHub 账号登录最方便）

2. **创建新项目**
   - 登录后,点击 "Add New..." → "Project"
   - 选择 "Upload" 标签页
   - 把整个 `biorhythm-app` 文件夹拖进去（或点击上传）

3. **部署设置**
   - Project Name: 可以改成你喜欢的名字（比如 `my-biorhythm`）
   - Framework Preset: 选择 "Vite"
   - 其他设置保持默认
   - 点击 "Deploy"

4. **完成！**
   - 等待 1-2 分钟
   - 会得到一个链接,比如: `https://my-biorhythm.vercel.app`
   - 点击链接就能访问你的工具了！

---

### 方法二：通过 GitHub（更专业）

1. **上传到 GitHub**
   - 在 GitHub 创建新仓库（Repository）
   - 把这个文件夹里的所有文件上传上去

2. **连接 Vercel**
   - 在 Vercel 点击 "Import Project"
   - 选择你刚创建的 GitHub 仓库
   - 点击 "Import"

3. **自动部署**
   - Vercel 会自动识别这是 Vite 项目
   - 点击 "Deploy" 就完成了

---

## 💻 本地运行（测试用）

如果想在自己电脑上先看看效果:

```bash
# 1. 确保安装了 Node.js (去 https://nodejs.org 下载)

# 2. 在这个文件夹里打开终端,运行:
npm install

# 3. 启动开发服务器:
npm run dev

# 4. 浏览器打开显示的地址（通常是 http://localhost:5173）
```

---

## 📱 自定义域名（可选）

部署成功后,如果想用自己的域名:

1. 在 Vercel 项目设置里找到 "Domains"
2. 添加你的域名
3. 按照提示在域名服务商那里设置 DNS

---

## ❓ 常见问题

**Q: 部署后页面是空白的?**
A: 等待 1-2 分钟让 Vercel 完成构建,然后刷新页面

**Q: 可以免费使用吗?**
A: 是的! Vercel 的免费套餐完全够个人使用

**Q: 如何更新内容?**
A: 修改代码后重新上传,或者如果用了 GitHub,推送新代码 Vercel 会自动更新

**Q: 手机可以访问吗?**
A: 可以! 部署后的链接在任何设备上都能访问

---

## 🎉 部署成功后

把链接分享给朋友,或者添加到手机主屏幕方便使用:

- **iPhone**: Safari 打开 → 点击分享 → 添加到主屏幕
- **Android**: Chrome 打开 → 菜单 → 添加到主屏幕

---

需要帮助? 随时问我! 🚀
