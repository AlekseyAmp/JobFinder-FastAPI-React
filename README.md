## JobFinder

JobFinder is a web application for storing files, built with FastAPI (Python) for the API backend and ReactJS for the user interface. It uses MongoDB as the database and allows users to store files in different categories (folders). Users can create, rename, and delete their own custom categories, as well as upload, download, rename, and delete files. Additionally, users can move files to trash or favorites, and view their history of actions on the site. The project also features a sidebar that displays useful information and options for users.

---

### Running the project 
  
  - Install the PostgreSQL database (https://www.postgresql.org/download/windows/)
  - Go to PgAdmin4 and create a database called JobFinder

  Install git (https://git-scm.com/download/win)
  Go into a convenient code editor and open the term (ctrl + shift + e)
  
  ```bash
  git clone https://github.com/AlekseyAmp/JobFinder-FastAPI-React
  ```

- Create an .env file 
    - Go to folder server 
    - Create a ".env" file
    - Copy the information from the bottom and paste it into the .env
    
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

- Create a virtual environment, go to "cd/server" in the terminal and paste this command
    ```bash
    python -m venv venv
    ```
- Activate venv
  - on Windows ```bash
               venv/scripts/activate
               ```
  - On Linux ```bash
             venv/bin/activate
             ```
  - Install the required libraries
  ```bash
  pip install -r requirements.txt
  ```

  - Start the server
  ```bash
  uvicorn main:app --reload
  ```

#### Run the client
- Download https://nodejs.org/en/download
- In the terminal go to the path "cd/client". 
- Install the required libraries
  ```bash
  npm install react-router-dom
  ```
- Run the client
  ```bash
  npm start
  ```

---


### The stack

- **Python** - FastAPI framework for API design
- **ReactJS** - for the user interface
- **PostgreSQL** - Database