@echo off
REM 完整的启动脚本，包含所有必要的环境变量设置

REM 设置环境变量
set ZHIPU_API_KEY=sk-ws-H.PPIEXPD.hHW5.MEUCIQCAtIpKaHwvL7s5yutji5ghOish3onW_Jn_rcs6ZRurKAIgSYJKsy-NenXhB9o44eqOzmSwCcQ1S5e3ujbyO9QBlA4
set ZHIPU_MODEL=qwen3-coder-flash

REM 切换到正确的目录
cd /d "D:\claude-job\job-decision-assistant"

REM 显示设置的环境变量
echo ZHIPU_API_KEY=%ZHIPU_API_KEY%
echo ZHIPU_MODEL=%ZHIPU_MODEL%

REM 启动开发服务器
echo 正在启动Next.js开发服务器...
npx next dev