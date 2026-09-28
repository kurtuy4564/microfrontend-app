# Microfrontend App

## Запуск для разработки

Host загружает компоненты Task Tracker и Finance Control через Module Federation. Для разработки запустите три процесса: Task Tracker на порту `5001`, Finance Control на порту `5002` и Host на порту `5000`.

### 1. Установить зависимости

При первом запуске выполните команды из корневой папки проекта:

```bash
npm install --prefix task-tracker
npm install --prefix finance-control
npm install --prefix host
```

### 2. Собрать и запустить Task Tracker

В отдельном терминале из корневой папки:

```bash
npm run build --prefix task-tracker
npm run preview --prefix task-tracker -- --host 0.0.0.0 --port 5001
```

Preview отдаёт собранную версию приложения, включая `remoteEntry.js`, который Host загружает по адресу `http://localhost:5001/assets/remoteEntry.js`.

### 3. Собрать и запустить Finance Control

В ещё одном терминале из корневой папки:

```bash
npm run build --prefix finance-control
npm run preview --prefix finance-control -- --host 0.0.0.0
```

Finance Control отдаёт `remoteEntry.js` на порту `5002`.

### 4. Запустить Host

В другом терминале из корневой папки:

```bash
npm run dev --prefix host
```

Откройте [http://localhost:5000](http://localhost:5000). Host работает с горячей перезагрузкой при изменении своего кода.

### Изменения в Remote-приложениях

Preview отдаёт production-сборку. После изменения Task Tracker пересоберите его:

```bash
npm run build --prefix task-tracker
```

После изменения Finance Control выполните:

```bash
npm run build --prefix finance-control
```

Обновите страницу Host в браузере. Если изменение не появилось, перезапустите preview соответствующего Remote. Остановить любой процесс можно сочетанием `Ctrl+C` в его терминале.
