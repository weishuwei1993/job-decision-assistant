@echo off
REM 启动Next.js应用的批处理文件，确保环境变量正确加载

REM 设置环境变量
set ZHIPU_API_KEY=sk-ws-H.PPIEXPD.hHW5.MEUCIQCAtIpKaHwvL7s5yutji5ghOish3onW_Jn_rcs6ZRurKAIgSYJKsy-NenXhB9o44eqOzmSwCcQ1S5e3ujbyO9QBlA4
set ZHIPU_MODEL=qwen3-coder-flash

REM 启动开发服务器
echo 正在启动开发服务器...
echo ZHIPU_API_KEY=%ZHIPU_API_KEY%
echo ZHIPU_MODEL=%ZHIPU_MODEL%

npm run dev