const fs = require('fs');
const path = require('path');

// 源目录和目标目录
const buildDir = path.join(__dirname, '../out');

// 检查输出目录是否存在
if (!fs.existsSync(buildDir)) {
  console.error('构建目录不存在，请先运行 npm run build');
  process.exit(1);
}

// 确保 404.html 和 index.html 文件存在和一致
const indexPath = path.join(buildDir, 'index.html');
const notFoundPath = path.join(buildDir, '404.html');

if (fs.existsSync(indexPath)) {
  // 读取 index.html 内容
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // 写入404.html（确保SPA路由在GitHub Pages上正常工作）
  fs.writeFileSync(notFoundPath, indexContent);
  console.log('已创建 404.html 文件');

  // 创建 .nojekyll 文件，避免GitHub Pages忽略下划线开头的文件夹
  fs.writeFileSync(path.join(buildDir, '.nojekyll'), '');
  console.log('已创建 .nojekyll 文件');
  
  // 如果需要，创建CNAME文件
  // fs.writeFileSync(path.join(buildDir, 'CNAME'), 'yourdomain.com');
  // console.log('已创建 CNAME 文件');
} else {
  console.error('index.html 文件不存在，构建可能有问题');
  process.exit(1);
}

console.log('HTML文件处理完成'); 