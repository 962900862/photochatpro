const fs = require('fs');
const path = require('path');

// 源目录和目标目录
const sourceDir = path.join(__dirname, '../out/_next/static');
const targetDir = path.join(__dirname, '../out/static');

// 确保目标目录存在
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 复制文件
function copyFiles(src, dest) {
  try {
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        if (!fs.existsSync(destPath)) {
          fs.mkdirSync(destPath, { recursive: true });
        }
        copyFiles(srcPath, destPath);
      } else {
        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error copying files from ${src} to ${dest}:`, error);
  }
}

// 执行复制
copyFiles(sourceDir, targetDir);

// 修改 index.html 中的路径
const indexPath = path.join(__dirname, '../out/index.html');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // 首先将 _next/static 替换为 static
  content = content.replace(/_next\/static/g, 'static');
  
  // 然后将所有 /static 路径替换为 /photochatpro/static
  content = content.replace(/\/static\//g, '/photochatpro/static/');
  
  fs.writeFileSync(indexPath, content);
  console.log('index.html 中的路径已更新');
}

console.log('静态资源目录已扁平化'); 