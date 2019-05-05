# Typescript Fullstack Starter Pack
### PoRNo — Postgres React Node
Стартовый набор для разработки клиент-серверного приложения на **Typescript**.

Реализована базовая аутентификация пользователя и верификация jwt-токена.

### Development
Сборка *development*-окружения: `./scripts/dev-start.sh`

Сборку необходимо производить при любом изменении вне папки **/src**

Запуск *development*-окружения: `./scripts/dev-start.sh`

"Горячее" обновление кода активно и на серверной и на клиентской частях, включая прекомпиляцию *SCSS*

**URL**: *localhost:3000*

### Production
Сборка *production*-окружения: `./scripts/prod-build.sh`

Запуск *production*-окружения: `./scripts/prod-start.sh`

Фронтенд собирается в бандл и передаётся серверу

**URL**: *localhost*

### Файл .ENV
`DB_USER` - пользователь базы данных по умолчанию

`DB_PASSWORD` - пароль пользователя базы данных по умолчанию

`DB_NAME` - название базы данных по умолчанию

`SECRET` - "соль" для JWT
