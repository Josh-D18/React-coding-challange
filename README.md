# React-coding-challange
TechGuilds React coding challenge

## Live Site: https://distracted-stonebraker-d5cbc6.netlify.app/
This project was created with React, SCSS and Mongodb.

If you want to run the project locally, you can do it two ways. One way is to setup your own mongodb database and populate it using the addtodatabase.js file that has a route that will do it for you. Or you can pull the images and extra information from the unsplash api.

If you want to use the unsplash api, you are going to need to modify the api get request url in both the modal and photos components. You will have to format it like this: https://api.unsplash.com/photos/?client_id=<YOUR CLIENT ID>. You will also need an client id that is given to you when you sign up for 
Unsplash Developers (It's free). 
 

# MongoDB Setup 
1. First Sign Up For MongoDB Atlas (It's Free)

2. The website will ask to choose a cluster. Choose Starter Clusters and click on Create a cluster.

3. After That In the Cloud Provider & Region section, the aws option should be selected as the default provider, but you can select any provider. All three platforms support the free tier.

4. Beneath the list of providers, select a region.

5. Expand the Cluster Tier section and ensure that M0 Sandbox is selected. This is the free M0 service level.

6. Expand the Cluster Name section and type Cluster1 in the text box.

7. Click the Create Cluster button at the bottom of the web page.

## Create a new user for the database
On the left side of screen, click on Database Access.
1. Click the green Add New Database User button.
2. In the modal, enter a new username and password.
3. Under Database User Privileges, leave this as the default option, Read and write to any database.
4. Click the Add User button to create your new user.
 
## Allow access from all IP addresses
1. On the left side of the screen, click on Network Access.

2. Click the green Add IP Address button.

3. In the modal, click the ALLOW ACCESS FROM ANYWHERE button. You should see 0.0.0.0/0 in the Access List Entry entry field.

4. Click the green Confirm button.

## Connect to your cluster
1. Click on the green Get Started button in the bottom left of your screen should now show you the final step, Connect to your cluster, click on it.
2. On the left side of the screen, click on Clusters.
3. Click the Connect button for your cluster.
4. In the popup modal, click on Connect your application.
5. You should see the URI you'll use to connect to your database similar to this: mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<db-name>?retryWrites=true&w=majority.
6. Click the Copy button to copy your URI to your clipboard.
7. Inside of the .env file add the URI to DB_URI and then save the file. (Make sure you change <username> and <password> to your username and password.

# Setting Up Project
1. For the backend create .env files and add the PORT number of 8080 to PORT and add your URI to the DB_URI (URI looks like this: mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<db-name>?retryWrites=true&w=majority.. On the client-side, to avoid errors create the env file and add REACT_APP_PRODUCTION_URL = .You would only need to add a URL if you want to deploy the site. The URL you would add would be the production URL. Also add REACT_APP_client_id to it. Paste in your client_id.  

2. cd into /server and run npm install. Then cd into /client and run npm install.
  
3. To start the project up type npm start in both the server and client directories   

  ## Populate MongoDb
 3.5 Once you have the express server running make get requests to /addtodatabase on your local server. Each request will populate your database with random pictures
