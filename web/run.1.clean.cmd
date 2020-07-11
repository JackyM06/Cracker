@echo off
taskkill /IM node.exe /F
echo remove dist..
RD /S /Q dist
echo done
echo remove node_modules
RD /S /Q node_modules
echo done
pause