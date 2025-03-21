# Photo Chat Pro - 图片处理工具

这是一个基于Next.js的在线图片处理工具，专门针对社交媒体平台优化图片。目前支持：

- 朋友圈图片优化：短边1080px高清处理
- 小红书封面优化：3:4比例，1280*1706像素最佳显示效果

## 功能特点

- 智能图片处理：自动适配不同平台的图片要求
- 浏览器端处理：保护用户隐私，无需上传到服务器
- 简单易用：拖拽上传，一键处理，快速下载
- 响应式设计：适配移动端和桌面端

## 开发指南

### 环境要求

- Node.js 16.0.0 或更高版本
- npm 7.0.0 或更高版本

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

### 部署项目

1. 首先确保你有一个GitHub仓库

2. 将该仓库克隆到本地，并将项目文件复制到仓库目录中

3. 配置远程仓库（如果尚未配置）：

```bash
git remote add origin https://github.com/你的用户名/你的仓库名.git
```

4. 执行部署命令：

```bash
npm run deploy
```

该命令会自动构建项目，处理静态资源，然后提交并推送到GitHub仓库。

## 自定义部署

如果你需要自定义部署流程，可以编辑 `scripts/deploy.js` 文件，根据你的需求修改部署逻辑。

## 技术栈

- Next.js - React框架
- TypeScript - 类型安全的JavaScript
- Tailwind CSS - 实用优先的CSS框架
- Canvas API - 图片处理

## 许可协议

MIT
