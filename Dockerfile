# Используем базовый образ Node.js для сборки
FROM node:18 AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы и создаем сборку
COPY . .
RUN npm run build --prod

# Используем nginx для сервировки файлов
FROM nginx:1.23-alpine

# Замените `wolfram-ns-frontend` на имя вашего проекта
COPY --from=build /app/dist/wolfram-ns-frontend /usr/share/nginx/html

# Указываем порт, который будет использоваться
EXPOSE 4200
