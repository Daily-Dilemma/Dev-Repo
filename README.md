# Development Repository for the Daily Dilemma Web Application
## Run Flask App Locally
1. Clone the Repository:
    Open CMD in vscode
    Navigate to desired location for the local repository
   ``` bash
    git clone "repository"
    ```
    enter ssh password
2. Navigate to the backend directory
    ```bash
    cd backend
    ```
3. Create the Virtual Environment in VS Code:
    ```bash
    python -m venv venv
    ```
4. Run Virtual Environment
    ```bash
    venv\scripts\activate
    ```
5. Install Dependencies 
   ``` bash
    pip install -r requirements.txt
    ```
6. Run the Flask Application 
    ```bash
    python app.py
    ```
7. Open at ```localhost:5000```
## Run React Front End
1. Open new CMD instance in VS Code
```bash
cd frontend
npm start
```
2. Open local host at ```localhost:3000```