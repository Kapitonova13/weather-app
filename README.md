# Weather App 🌤️

Интерактивное веб-приложение для просмотра текущей погоды в любом городе мира. 
Проект создан для демонстрации навыков современной фронтенд-разработки: TypeScript, работа с REST API, тестирование и CI/CD.

☀️ **[Ссылка на живое демо](https://kapitonova13.github.io/weather-app/)** 

##  Технологический стек
*   **React** (Functional components, Hooks)
*   **TypeScript** (строгая типизация, Union Types, Type Guards)
*   **Vite** (сборщик проекта)
*   **Vitest + React Testing Library** (юнит-тестирование)
*   **CSS3** (Flexbox, CSS-переменные, адаптивная верстка)
*   **GitHub Actions** (автоматический деплой на GitHub Pages)
*   **Open-Meteo API** (внешний REST API без ключа авторизации)

##  Ключевые технические решения 

1.  **Работа с REST API и Promises:** Асинхронные запросы через `fetch` и `async/await` с обработкой ошибок (статусы `loading`, `error`, `success`).
2.  **Отмена запросов (Race Condition):** Использование `AbortController` и `AbortSignal`. Если пользователь быстро переключает города, предыдущий запрос отменяется, чтобы устаревшие данные не перезаписали актуальные.
3.  **Строгая типизация (TypeScript):** 
    *   Описан интерфейс ответа от API (`WeatherResponse`, `City`).
    *   Использован паттерн `Discriminated Unions` для стейта `WeatherState` (TypeScript автоматически сужает типы при проверке `status`).
    *   Написан `Type Guard` (функция `parseWeatherResponse`), которая безопасно валидирует входящий JSON (тип `unknown`), защищая приложение от падений при получении некорректных данных.
4.  **Тестирование:** Покрыты юнит-тестами чистые функции (форматирование температуры, парсинг ответа API) и рендеринг React-компонентов (через `@testing-library/react`).
5.  **CI/CD:** Настроен GitHub Actions workflow, который при каждом пуше автоматически запускает тесты и, в случае успеха, собирает и деплоит проект на GitHub Pages.

##  Как запустить локально

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/Kapitonova13/weather-app.git
   ```

2. Перейдите в папку проекта и установите зависимости:

    ```bash
    cd weather-app
    npm install
    ```
3. Запустите сервер разработки:

    ```bash
    npm run dev
    ```
4. Запустите тесты:

    ```bash
    npm run test
    ```