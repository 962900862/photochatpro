# 朋友圈图片优化处理工具

一个简单易用的图片处理工具，专门用于优化朋友圈图片质量。

## 功能特点

- 自动将图片短边调整为1080像素，长边保持比例
- 高分辨率输出 (300 DPI)
- 防止微信二次压缩
- 支持拖拽上传
- 支持 JPG、PNG 格式
- 最大支持30MB图片

## 技术栈

- Next.js 14
- TypeScript
- Tailwind CSS
- Sharp (图片处理)
- shadcn/ui (UI组件)

## 本地开发

1. 克隆仓库
```bash
git clone https://github.com/yourusername/photochatpro.git
cd photochatpro
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 打开浏览器访问 http://localhost:3000

## 部署

1. 构建项目
```bash
npm run build
```

2. 启动生产服务器
```bash
npm start
```

## 使用说明

1. 打开网页，拖入或选择要处理的图片
2. 点击"开始处理"按钮
3. 等待处理完成后下载处理后的图片
4. 将处理后的图片发布到朋友圈

## 注意事项

- 上传图片大小不能超过30MB
- 建议使用原图以获得最佳效果
- 处理后的图片会自动保持原始比例

## License

MIT
