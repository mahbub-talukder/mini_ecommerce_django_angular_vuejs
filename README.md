## Running the Miniproject Application 

## backend (Django):

**navigate this backend folder

first of all you can create virtual environment for running your project sperately. or you can run this globally
 #for virtual environemt create (for windows)
 -> py -m venv env
 #for virtual environment activate
 -> env\Scripts\activate

After that
install all dependencies (packages) in according to requirement.txt
you can install all package by running one command : py -m install -r requirements.txt

Create the DB tables first:
python manage.py migrate

Run the development web server:

python manage.py runserver 8080

## frontend (vue js):

**navigate this frontend vue folder

#for installing all packages run command:

npm install

Run the development web server:

npm run serve

Open the URL http://localhost:8080/ to access the application.


## frontend (angular):

**navigate this frontend folder

#for installing all packages run command:

npm install

Run the development web server:

ng s -o 

Open the URL http://localhost:4200/ to access the application.



written by Mahbub Talukder

