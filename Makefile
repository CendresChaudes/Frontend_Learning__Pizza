# --- Инициализация проекта ---
init:
	pnpm install --frozen-lockfile

# --- Основные команды ---
start-dev: ## Запустить в dev-режиме
	pnpm run start:dev

start-prod: ## Запустить в prod-режиме
	pnpm run start:prod

build: ## Запустить сборку
	pnpm run build

generate: ## Запустить генерацию кода
	pnpm run generate

check: ## Запустить проверки проекта
	pnpm run check:all

types-check: ## Запустить проверку типов
	pnpm run check:types

lint: ## Запустить проверки кода
	@echo "Начались проверки кода"
	pnpm run check:linters
	@echo "Проверки кода завершились успешно"

lint-fix: ## Запустить автоисправление кода
	pnpm run prettify

test: ## Запустить тесты
	@echo "Началось тестирование кода"
	pnpm run check:tests:all
	@echo "Тестирование кода завершилось успешно"

# --- Docker ---
docker-dev-build: ## Собрать Docker-образ приложения
	docker build -t frontend-dev ./docker/dev/Dockerfile.dev

docker-dev-run: ## Запустить приложение через
	docker-compose -f ./docker/dev/docker-compose.dev.yml up --build

docker-dev-stop: ## Остановить и удалить контейнеры
	docker-compose -f ./docker/dev/docker-compose.dev.yml down

docker-stage-build: ## Собрать Docker-образ приложения
	docker build -t frontend-stage ./docker/stage/Dockerfile.stage

docker-stage-run: ## Запустить приложение через
	docker-compose -f ./docker/stage/docker-compose.stage.yml up --build

docker-stage-stop: ## Остановить и удалить контейнеры
	docker-compose -f ./docker/stage/docker-compose.stage.yml down

# --- Справка по Makefile ---
help: ## Показать эту справку по доступным командам
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
