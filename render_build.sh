#!/usr/bin/env bash
set -o errexit

# Instalar requisitos con pipenv
pipenv install --dev

# Otros comandos de construcción
npm install
npm run build
pipenv run upgrade
