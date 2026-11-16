// 简单测试环境变量
const fs = require('fs');

// 检查 .env.local 文件
try {
  const content = fs.readFileSync('.env.local', 'utf8');
  console.log('文件内容:');
  console.log(content);

  // 检查是否有 \r 字符（Windows换行符）
  if (content.includes('\r')) {
    console.log('警告: 文件包含 Windows 换行符 \\r');
  }

  // 逐行解析
  const lines = content.split('\n').filter(line => line.trim() !== '');
  console.log('解析的行:');
  lines.forEach((line, i) => {
    console.log(`${i + 1}: "${line}"`);
  });

} catch (err) {
  console.error('读取文件失败:', err.message);
}

// 检查环境变量
console.log('\n环境变量:');
console.log('ZHIPU_API_KEY:', process.env.ZHIPU_API_KEY);
console.log('ZHIPU_MODEL:', process.env.ZHIPU_MODEL);