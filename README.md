# Локальный запуск (dev-режим)

## Mongo:
cd server && yarn mongo
* порт 27017
* база не под git в папке mongodb
* имя базы video-observe-tree, юзер/пасс admin

## Бэкенд (Node / Express):
cd server && yarn server
* порт 4000

## Фронтенд:
yarn start
* порт 3000
* перед запуском, нужно переименовать .env.example в .env
