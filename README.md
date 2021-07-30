## Running the Miniproject Application 

## backend (Django):

**navigate this backend folder

first of all you can create virtual environment for running your project sperately. or you can run this globally
 #for virtual environemt create (for windows)
 
<code> py -m venv env </code>
 
 #for virtual environment activate
 
<code> env\Scripts\activate </code>

After that
install all dependencies (packages) in according to requirement.txt
you can install all package by running one command :

<code> pip install -r requirements.txt </code>

Create the DB tables first:

<code> py manage.py migrate </code>

Run the development web server:

<code> py manage.py runserver </code>

## frontend (vue js):

**navigate this frontend vue folder

#for installing all packages run command:

 <code> npm install </code>

Run the development web server:

<code> npm run serve </code>

Open the URL http://localhost:8080/ to access the application.


## frontend (angular):

**navigate this frontend folder

#for installing all packages run command:

<code> npm install </code>

Run the development web server:

<code> ng s -o  </code>

Open the URL http://localhost:4200/ to access the application.

written by Mahbub Talukder

