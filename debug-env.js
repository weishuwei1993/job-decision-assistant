// 修复后的环境变量检查函数
// 此脚本可用于验证环境变量是否正确加载

// 读取环境变量的函数
function getEnvVar(name) {
  // 尝试多种方式获取环境变量
  let value = process.env[name];

  // 如果直接获取失败，尝试特殊处理
  if (!value) {
    // 在某些环境下，可能需要特殊处理
    console.log(`环境变量 ${name} 未找到`);
    return null;
  }

  // 去除首尾空白字符
  value = value.trim();

  if (value === '') {
    console.log(`环境变量 ${name} 为空字符串`);
    return null;
  }

  console.log(`成功获取环境变量 ${name}: ${value.substring(0, 20)}...`);
  return value;
}

// 验证所有必需的环境变量
function validateEnvironment() {
  console.log('=== 环境变量验证开始 ===');

  const apiKey = getEnvVar('ZHIPU_API_KEY');
  const model = getEnvVar('ZHIPU_MODEL');

  console.log('=== 环境变量验证完成 ===');

  if (!apiKey) {
    console.log('❌ ZHIPU_API_KEY 未正确配置');
    return false;
  }

  if (!model) {
    console.log('❌ ZHIPU_MODEL 未正确配置');
    return false;
  }

  console.log('✅ 所有环境变量配置正确');
  return true;
}

// 运行验证
validateEnvironment();