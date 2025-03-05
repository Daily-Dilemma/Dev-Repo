# Development Repository for the Daily Dilemma Web Application
## Run Flask App Locally

```bash
#backend directory
cd backend 

#only necessary if you dont have a venv already
python -m venv venv

#activate virtual environment
venv\scripts\activate

#install Dependencies
pip install -r requirements.txt

#run backend in venv
python app.py
```
Open at ```localhost:5000```
## Run React Front End
Open new CMD instance in VS Code
```bash
#frontend directory
cd frontend

#run react front end
npm start
```
 Open local host at ```localhost:3000```