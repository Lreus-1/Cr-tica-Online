@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Atualizar projeto no GitHub

echo ============================================
echo    ATUALIZAR PROJETO NO GITHUB
echo ============================================
echo.
echo Pasta: %cd%
echo.

git --version >nul 2>&1
if errorlevel 1 (
  echo [ERRO] O Git nao foi encontrado neste computador.
  echo Instale em https://git-scm.com/download/win e rode de novo.
  echo.
  pause
  exit /b 1
)

if not exist ".git" (
  echo [ERRO] Esta pasta ainda nao e um repositorio Git.
  echo Coloque este arquivo dentro da pasta do projeto, a mesma onde esta o package.json.
  echo.
  pause
  exit /b 1
)

echo Arquivos alterados:
echo --------------------------------------------
git status --short
echo --------------------------------------------
echo.

set "msg="
set /p msg=Digite a mensagem do commit (Enter usa a padrao): 
if "%msg%"=="" set "msg=Atualizacao do portal"

echo.
echo Enviando com a mensagem: %msg%
echo.

git add .
git commit -m "%msg%"
if errorlevel 1 (
  echo.
  echo [AVISO] Nada novo para enviar, ou ocorreu um erro no commit.
  echo.
  pause
  exit /b 1
)

git push
if errorlevel 1 (
  echo.
  echo [ERRO] O envio para o GitHub falhou. Confira a conexao e o login e tente de novo.
  echo.
  pause
  exit /b 1
)

echo.
echo ============================================
echo  PRONTO! Enviado para o GitHub.
echo  A Vercel ja comeca o deploy sozinha.
echo ============================================
echo.
pause
