@echo off
chcp 65001 >nul
cd /d "%~dp0"
title LocalMiniDrama dist:cn
echo.
echo ========== 开始国内镜像打包 ==========
echo 当前目录: %CD%
echo 窗口会一直开着，打包结束后才会提示按键退出。
echo.
call npm run dist:cn
set EXITCODE=%ERRORLEVEL%
echo.
if not "%EXITCODE%"=="0" (
  echo ========== 打包失败，退出码 %EXITCODE% ==========
) else (
  echo ========== 打包完成 ==========
  echo 产物在 desktop\release\
)
echo.
pause
exit /b %EXITCODE%