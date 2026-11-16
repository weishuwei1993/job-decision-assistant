// 测试环境变量是否正确加载
console.log('=== 环境变量测试 ===');
console.log('ZHIPU_API_KEY:', process.env.ZHIPU_API_KEY);
console.log('ZHIPU_MODEL:', process.env.ZHIPU_MODEL);
console.log('NODE_ENV:', process.env.NODE_ENV);

// 读取 .env.local 文件
const fs = require('fs');
const path = require('path');

try {
  const envContent = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
  console.log('\n=== .env.local 文件内容 ===');
  console.log(envContent);
  console.log('=== 文件内容结束 ===');
} catch (err) {
  console.log('读取 .env.local 文件失败:', err.message);
}

// 尝试使用 dotenv 加载
try {
  require('dotenv').config({ path: '.env.local' });
  console.log('\n=== 使用 dotenv 加载后的变量 ===');
  console.log('ZHIPU_API_KEY after dotenv:', process.env.ZHIPU_API_KEY);
} catch (err) {
  console.log('dotenv 加载失败:', err.message);
}