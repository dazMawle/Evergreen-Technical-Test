# Evergreen-Technical-Test

This is my implementation of the task set by Evergreen for their technical test. I've folllowed the criteria set for me and used a Bootstrap form to accept new customer data (Company name, first/last name, contact number and full address). This data is then handled by my express server and sent to MongoDB. I then display the data by utilising Ejs to loop over and display all records in my 'Customers' collection within a table. As part of the requirements for the task I have displayed a Google Map for each customer in the list. Each map thumbnail is a dynamically created static map based on each address attached to each customer. The map thumbnails are also links that will open up a new tab and take you to that address in Google Maps for a closer look if preferred. I have also made use of datatables.net for my table data which adds searchable functionality and pagination to the list of customers.

Note: I'm aware that I've chosen to use a non-relational database that doesn't absolutely require the use of Models and Schemas but understand thier importance and necessity had I completed this task with the tech stack used at Evergreen (PHP, Laravel, Mysql). 

Technolgies and packages utilised:

* Node.js
* Express 
* Ejs 
* Nodemon 
* Dotenv
* Body-parser
* Bootstrap
* MongoDB

Set up:
* In terminal/command line, cd into 'evergreen_technical_test'
* Run 'npm install' to install dependancies
* Create '.env' file to hold sensitive data
* Get and provide MongoDB connection string and put it into your .env file
* On MongoDB site (cloud.mongodb.com) add your IP address to your IP access list (Security > Network Access > IP Access List)
* Get and provide a Google Maps API key (developers.google.com) and also put that into your .env file
* Run 'npm run dev' and go to http://localhost:3000 in your browser
