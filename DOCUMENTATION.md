# Contents

- [Installation Instructions](#Installation-Instructions)
- [Architecture](#Architecture)
- [Frontend Structure](#Frontend-Structure)
- [Backend Structure](#Backend-Structure)
- [Authentication](#Authentication)
- [Technologies](#Technologies)


### Installation Instructions

If you haven't already, make sure you have node and NVM installed.

Clone the repository into your chosen location

`git clone https://github.com/dgullis/tutor-match
`

In /frontend

Install Node Version Manager (NVM).

`brew install nvm`

Install the latest version of Node.js, (20.5.0 at time of writing).

`nvm install 20`

Install dependencies

`npm install`

In /backend

Veryify Python and pip installation

```
python --version
pip --version
```

If needed install / upgrade pip

`python -m pip install --upgrade pip`

Install pipenv

`pip install pipenv`

Activate 'pipenv' virtual environment

`pipenv shell`

Install requirements

`pipenv install -r requirements.txt`

Environment Variables

Create a file frontend/.env with the following environment variables:

```
REACT_APP_SYNC_FUSION_KEY_2
REACT_APP_BACKEND_URL
REACT_APP_FB_API_KEY
REACT_APP_FB_AUTH_DOMAIN
REACT_APP_FB_PROJECT_ID
REACT_APP_FB_STORAGE_BUCKET
REACT_APP_FB_MESSAGING_ID
REACT_APP_FB_APP_ID
REACT_APP_FB_MEASURE_ID
```

Create a file backend/.env with the following environment variables:

```
GMAIL_PASS
FB_PROJECT_ID
FB_PRIVATE_KEY_ID
FB_PRIVATE_KEY
FB_EMAIL_CLIENT_EMAIL
FB_CLIENT_ID
FB_AUTH_URI
FB_TOKEN_URI
FB_AUTH_PROVIDER
FB_CLIENT
DB_UNIVERSE_DOMAIN
DB_NAME
MONGO_URI
```

Values will be provided by the production team.

Once environment variables are set you can run the app locally.

How to run the server and use the app

Whilst in 'pipenv' virtual environment start the server application (in the backend directory):

```
cd backend
python app.py
```

Start the front end application (in the frontend directory)

In a new terminal session...

```
cd frontend
npm start
```

You should now be able to open your browser and go to http://localhost:3000/ to see the homepage

### Architecture

This application is comprised of two distinct pieces:

A backend API built with Flask

A frontend built with React

The only way the frontend can communicate with the API is through HTTP requests over the network. The React front end sends HTTP requests to the backend API and receives JSON responses.

### Frontend Structure

index.jsx

This file joins the initial HTML document with the React application. 

App.js


This file sets up the routing for the React application, defining different routes and associating them with corresponding components/pages. Additionally, it includes a navigation bar component (TutorMatchNavbar) to provide navigation throughout the application.

Pages

Pages represent individual views of our application. Such as the login page or the feed page. They are built up of smaller components, and may interact with the backend through services.

Components

Components represent smaller, reusable pieces of code. They can be atomic components, which are not usable on their own, or more complex components made up of other components. They can hold their own state, if useful. They may interact with the backend through services.

Services

Services encapsulate communication with the backend, through HTTP requests. They make our code easier to read and understand, by abstracting the complexity of the fetch requests into their own functions, so they don't clutter our components.

### Backend Structure

app.py

This file contains the code for our backend server built using Flask. It does a few things:

Initializes a Flask application.
Configures CORS to allow cross-origin requests and sets up email server settings for sending emails using Flask-Mail.
Initializes the Firebase Admin SDK.
Defines various routes using Flask's @app.route decorator, each corresponding to a specific functionality or endpoint of the API. Routes generally utilise functions defined in users.py/subjects.py/bookings.py in the modules folder inorder to interact with the database.

Starts the Flask development server on port 5050.

modules/

This folder contains files 'users.py' 'subjects.py' 'bookings.py' each of whih contain functions for managing operations that interact with the MongoDB database.

lib/firebase_token_auth.py

This file provides a function verify_token() that verifies the Firebase ID token present in the request headers and returns the decoded token if valid. Otherwise, it raises an error indicating the reason for the invalid token.

db/mongodb.py

This file is responsible for setting up a connection to our MongoDB database and providing access to specific collections within that database. 


### Authentication

components/authContext.js

This file facilitates user authentication by integrating Firebase Authentication and MongoDB to manage user authentication data. It handles user sign-up, login, logout, and authentication state change events. Here's a breakdown:

Context Creation: It creates a context called AuthContext using React createContext function. This context will be used to store and share user authentication information across components.

AuthProvider Component: The AuthProvider component is responsible for managing authentication state.

Authentication Functions: It defines functions for user sign-up, login, and logout using Firebase Authentication methods (createUserWithEmailAndPassword, signInWithEmailAndPassword, auth.signOut). These functions handle the authentication process, update state variables, and interact with MongoDB to store user data.

UseEffect Hook: It uses the useEffect hook to set up a listener for changes in the user's authentication state (onAuthStateChanged). When the authentication state changes, it updates the user and mongoUser state variables accordingly.

Loading Indicator: While fetching user authentication data, it displays a loading spinner to indicate that the authentication process is in progress.

Context Provider Value: It provides the user, mongoUser, and authentication functions (signUpAuth, logInAuth, signOutAuth) as values to the AuthContext.Provider, making them accessible to other components using the useAuth hook.

UseAuth Hook: The useAuth hook allows components to access authentication state and functions from the AuthContext.

###  Technologies

- MongoDB - database
- Flask - server framework
- React - user interface framework
- Jest - frontend testing
- Pytest - backend testing
- Firebase - image storage and user authentication
- React Boostrap - front styling




