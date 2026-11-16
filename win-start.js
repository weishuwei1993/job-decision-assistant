#!/usr/bin/env node

// 专门用于Windows环境的启动脚本，确保环境变量正确加载
const { exec } = require('child_process');
const path = require('path');

// 设置环境变量
process.env.ZHIPU_API_KEY = "sk-ws-H.PPIEXPD.hHW5.MEUCIQCAtIpKaHwvL7s5yutji5ghOish3onW_Jn_rcs6ZRurKAIgSYJKsy-NenXhB9o44eqOzmSwCcQ1S5e3ujbyO9QBlA4";
process.env.ZHIPU_MODEL = "qwen3-coder-flash";

// 设置工作目录
process.chdir(path.join(__dirname));

console.log('启动参数:');
console.log('ZHIPU_API_KEY:', process.env.ZHIPU_API_KEY ? '已设置' : '未设置');
console.log('ZHIPU_MODEL:', process.env.ZHIPU_MODEL);

// 启动Next.js开发服务器
const child = exec('npx next dev', {
  cwd: __dirname,
  env: process.env
});

child.stdout.on('data', (data) => {
  console.log(data.toString());
});

child.stderr.on('data', (data) => {
  console.error(data.toString());
});

child.on('close', (code) => {
  console.log(`服务器进程退出，代码: ${code}`);
});