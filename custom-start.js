// 一个自定义的启动脚本，直接在Node.js中加载环境变量
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// 加载环境变量文件
function loadEnvVars() {
  const envLocalPath = path.join(__dirname, '.env.local');
  const envPath = path.join(__dirname, '.env');

  // 读取 .env.local
  if (fs.existsSync(envLocalPath)) {
    const content = fs.readFileSync(envLocalPath, 'utf8');
    content.split('\n').forEach(line => {
      if (line.trim() && !line.startsWith('#')) {
        const [key, value] = line.split('=');
        if (key && value) {
          process.env[key.trim()] = value.trim().replace(/^['"](.*)['"]$/, '$1');
        }
      }
    });
  }

  // 读取 .env
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      if (line.trim() && !line.startsWith('#')) {
        const [key, value] = line.split('=');
        if (key && value) {
          process.env[key.trim()] = value.trim().replace(/^['"](.*)['"]$/, '$1');
        }
      }
    });
  }
}

// 在启动服务器前加载环境变量
loadEnvVars();

console.log('Loaded environment variables:');
console.log('ZHIPU_API_KEY:', process.env.ZHIPU_API_KEY);
console.log('ZHIPU_MODEL:', process.env.ZHIPU_MODEL);

// 启动Next.js开发服务器
const child = exec('npx next dev', { cwd: __dirname });

child.stdout.on('data', (data) => {
  console.log(data);
});

child.stderr.on('data', (data) => {
  console.error(data);
});

child.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
});