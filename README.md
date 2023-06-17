### Запуск проекта
  
  - Установите БД PostgreSQL (https://www.postgresql.org/download/windows/)
  - Зайдите в PgAdmin4 и создайте базу данных с названием JobFinder

  Установить git (https://git-scm.com/download/win)
  Зайти в удобный редактор кода и открыть термин (ctrl + shift + ё)
  ```
  git clone https://github.com/AlekseyAmp  
  ```
   JobFinder-FastAPI-React.git

- Создать .env файл 
    - Перейти в папку server 
    - Создать файл ".env"
    - Скопируйте информацию снизу и вставьте в .env
    
    ```.env
    DATABASE_URL=postgresql://postgres:1@localhost:5432/JobFinder
    DATABASE_NAME=JobFinder
    ACCESS_TOKEN_EXPIRES_IN=15
    JWT_ALGORITHM=RS256

    CLIENT_ORIGIN=http://localhost:3000

    JWT_PRIVATE_KEY=LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlCT2dJQkFBSkJBSSs3QnZUS0FWdHVQYzEzbEFkVk94TlVmcWxzMm1SVmlQWlJyVFpjd3l4RVhVRGpNaFZuCi9KVHRsd3h2a281T0pBQ1k3dVE0T09wODdiM3NOU3ZNd2xNQ0F3RUFBUUpBYm5LaENOQ0dOSFZGaHJPQ0RCU0IKdmZ2ckRWUzVpZXAwd2h2SGlBUEdjeWV6bjd0U2RweUZ0NEU0QTNXT3VQOXhqenNjTFZyb1pzRmVMUWlqT1JhUwp3UUloQU84MWl2b21iVGhjRkltTFZPbU16Vk52TGxWTW02WE5iS3B4bGh4TlpUTmhBaUVBbWRISlpGM3haWFE0Cm15QnNCeEhLQ3JqOTF6bVFxU0E4bHUvT1ZNTDNSak1DSVFEbDJxOUdtN0lMbS85b0EyaCtXdnZabGxZUlJPR3oKT21lV2lEclR5MUxaUVFJZ2ZGYUlaUWxMU0tkWjJvdXF4MHdwOWVEejBEWklLVzVWaSt6czdMZHRDdUVDSUVGYwo3d21VZ3pPblpzbnU1clBsTDJjZldLTGhFbWwrUVFzOCtkMFBGdXlnCi0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0t
    JWT_PUBLIC_KEY=LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZ3d0RRWUpLb1pJaHZjTkFRRUJCUUFEU3dBd1NBSkJBSSs3QnZUS0FWdHVQYzEzbEFkVk94TlVmcWxzMm1SVgppUFpSclRaY3d5eEVYVURqTWhWbi9KVHRsd3h2a281T0pBQ1k3dVE0T09wODdiM3NOU3ZNd2xNQ0F3RUFBUT09Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==
    REFRESH_TOKEN_EXPIRES_IN=15
    ACCESS_TOKEN_EXPIRES_IN=60
    ```
- Создайте виртуальное окружение, в терминале перейдите по пути "cd/server" и вставьте эту команду
    ```.bash
    python -m venv venv
    ```
- Активируйте venv
  - на Windows ```
               venv/scripts/activate
               ```
  - на Linux ```
             venv/bin/activate
             ```
  - Установите нужные библиотеки
  ```.bash
  pip install -r requirements.txt
  ```

  - Запустите сервер
  ```.bash
  uvicorn main:app --reload
  ```

#### Запуск клиента
- Скачайте https://nodejs.org/en/download
- В терминале перейдите по пути "cd/client" 
- Установите нужные библиотеки
  ```.bash
  npm install react-router-dom
  ```
- Запустите клиент
  ```.bash
  npm start
  ```

---