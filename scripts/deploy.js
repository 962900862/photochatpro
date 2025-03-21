const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 确保scripts目录存在
if (!fs.existsSync(path.join(__dirname))) {
  fs.mkdirSync(path.join(__dirname), { recursive: true });
}

// 获取当前时间作为部署信息
const now = new Date();
const deploymentDate = now.toISOString().replace(/T/, ' ').replace(/\..+/, '');

// 执行构建
console.log('📦 开始构建项目...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ 项目构建成功');
} catch (error) {
  console.error('❌ 项目构建失败:', error);
  process.exit(1);
}

// 执行静态资源处理
console.log('🔄 处理静态资源...');
try {
  execSync('node scripts/flatten.js', { stdio: 'inherit' });
  console.log('✅ 静态资源处理成功');
} catch (error) {
  console.error('❌ 静态资源处理失败:', error);
  process.exit(1);
}

// 推送到GitHub
console.log('🚀 准备推送到GitHub...');

try {
  // 确认git仓库已初始化
  if (!fs.existsSync(path.join(process.cwd(), '.git'))) {
    console.log('初始化Git仓库...');
    execSync('git init', { stdio: 'inherit' });
  }

  // 检查是否配置了远程仓库
  let hasRemote = false;
  try {
    const remotes = execSync('git remote').toString().trim();
    hasRemote = remotes.includes('origin');
  } catch (error) {
    // 可能是新仓库，没有远程配置
  }

  if (!hasRemote) {
    console.log('请输入您的GitHub仓库地址，格式为: hhttps://github.com/962900862/photochatpro');
    console.log('您需要手动运行: git remote add origin https://github.com/962900862/photochatpro');
    console.log('然后再次运行此脚本');
    process.exit(1);
  }

  // 获取当前分支
  const currentBranch = execSync('git branch --show-current').toString().trim() || 'main';
  
  // 添加所有变更
  execSync('git add .', { stdio: 'inherit' });
  
  // 提交变更
  execSync(`git commit -m "自动部署: ${deploymentDate}"`, { stdio: 'inherit' });
  
  // 推送到GitHub (这会提示输入用户名和密码，或使用配置的凭证)
  console.log(`推送到 ${currentBranch} 分支...`);
  execSync(`git push -u origin ${currentBranch}`, { stdio: 'inherit' });
  
  console.log('✅ 成功推送到GitHub仓库!');
} catch (error) {
  console.error('❌ 推送到GitHub失败:', error.message);
  process.exit(1);
}

console.log('🎉 部署完成!'); 