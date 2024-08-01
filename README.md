Installation instructions

clone repo

inside backend directory run npm install

node --watch server.js


inside frontend directory, run npm install

npm start


# blog-post
blog-post

Blog Application
Project Overview
This is a full-stack blog application built with the MERN stack (MongoDB, Express, React, Node.js). The application provides a platform for users to create, read, update, and delete blog posts. It features user authentication and authorization using OAuth 2.0 and Passport.js.

Key Features
CRUD Functionality: Users can create, read, update, and delete blog posts.
User Authentication: Secure login and registration with OAuth 2.0 and Passport.js.
Responsive Design: User-friendly interface built with React v16.8.
Pagination: Efficiently handle large sets of blog posts with pagination.
Tech Stack
Frontend: React v16.8
Backend: Node.js with Express
Database: MongoDB
Authentication: OAuth 2.0, Passport.js

`postController.js`
This module contains the controller functions for handling blog posts in the application. The controller is responsible for implementing CRUD (Create, Read, Update, Delete) operations on blog posts and handling pagination for fetching posts.

Dependencies
express-async-handler: For handling asynchronous errors.
Post: The Post model representing the blog posts in the MongoDB database.
Controller Functions
createPost
Route: POST /api/posts/create

Description: Creates a new blog post.

Request Body:

title (string, required): The title of the post.
content (string, required): The content of the post.
image (string, optional): The URL or path of the image for the post.
Authentication: Required. The authenticated user's ID is used as the author of the post.

Response:

status (string): The status of the request.
message (string): A message indicating the success of the request.
postCreated (object): The newly created post object.

fetchAllPosts
Route: GET /api/posts

Description: Fetches all blog posts with pagination.

Query Parameters:

page (number, optional): The page number to fetch. Default is 1.
limit (number, optional): The number of posts per page. Default is 6.
Response:

status (string): The status of the request.
message (string): A message indicating the success of the request.
postData (array): An array of post objects for the current page.
currentPage (number): The current page number.
totalPages (number): The total number of pages available.

deletePost
Route: DELETE /api/posts/:postId

Description: Deletes a blog post by its ID.

URL Parameters:

postId (string, required): The ID of the post to delete.
Authentication: Required. Only the author of the post can delete it.

Response:

status (string): The status of the request.
postDeleted (object): The deleted post object.

updatePost
Route: PUT /api/posts/:postId

Description: Updates a blog post by its ID.

URL Parameters:

postId (string, required): The ID of the post to update.
Request Body:

title (string, optional): The new title of the post.
content (string, optional): The new content of the post.
Authentication: Required. Only the author of the post can update it.

Response:

status (string): The status of the request.
postUpdated (object): The updated post object.


userController.js
This module contains the controller functions for user management, including registration, login, authentication with Google, and handling user sessions. The controller uses Passport for authentication, JWT for token management, and bcrypt for password hashing.

Dependencies
User: The User model representing user accounts in the MongoDB database.
bcryptjs: For hashing user passwords.
jsonwebtoken: For generating and verifying JWT tokens.
express-async-handler: For handling asynchronous errors.
passport: For user authentication.
Controller Functions
register
Route: POST /api/users/register

Description: Registers a new user.

Request Body:

username (string, required): The username of the new user.
email (string, required): The email address of the new user.
password (string, required): The password for the new user account.
Response:

status (string): The status of the request.
message (string): A message indicating the success of the request.
userRegistered (object): The newly registered user object.

login
Route: POST /api/users/login

Description: Logs in a user and generates a JWT token.

Request Body:

email (string, required): The email address of the user.
password (string, required): The password of the user.
Response:

status (string): The status of the request.
message (string): A message indicating the success of the request.
username (string): The username of the logged-in user.
email (string): The email of the logged-in user.
_id (string): The ID of the logged-in user.

googleAuth
Route: GET /api/users/auth/google

Description: Initiates Google authentication using Passport.

Response: Redirects to Google's authentication page.

Notes: Users are redirected to Google for authentication.

googleAuthCallback
Route: GET /api/users/auth/google/callback

Description: Handles the callback from Google after authentication.

Response:

On success: Redirects to the client application with a JWT token set in cookies.
On failure: Redirects to a specified error page.
Notes: Generates a JWT token and sets it in cookies for authenticated users.

checkAuthenticated
Route: GET /api/users/check-auth

Description: Checks if the user is authenticated.

Response:

isAuthenticated (boolean): Indicates if the user is authenticated.
_id (string, optional): The ID of the authenticated user.
username (string, optional): The username of the authenticated user.
profilePicture (string, optional): The profile picture URL of the authenticated user.

logout
Route: POST /api/users/logout

Description: Logs out the user by clearing the JWT token cookie.

Response:

message (string): A message indicating the success of the logout request.

postSchema.js
This module defines the Mongoose schema for blog posts. The schema includes fields for the post's title, content, image, and author, and uses Mongoose's timestamps option to automatically manage created and updated timestamps.

Dependencies
mongoose: Mongoose library for MongoDB object modeling.
Schema Definition
postSchema
The schema for a blog post, which includes the following fields:

title (string, required, trimmed): The title of the post. This field is required and any extra whitespace will be trimmed.
content (string, required, trimmed): The main content of the post. This field is required and any extra whitespace will be trimmed.
image (string, optional): A URL or path to an image associated with the post.
author (ObjectId, required): A reference to the User model, representing the user who created the post. This field is required.
The schema also uses Mongoose's timestamps option to add createdAt and updatedAt fields automatically.

Post Model
The Post model is created using the postSchema and exported for use in other parts of the application.

userSchema.js
This module defines the Mongoose schema for user accounts. The schema includes fields for the user's username, email, password, Google ID, and authentication method, and uses Mongoose's timestamps option to automatically manage created and updated timestamps.

Dependencies
mongoose: Mongoose library for MongoDB object modeling.
Schema Definition
userSchema
The schema for a user account, which includes the following fields:

username (string, required): The username of the user. This field is required.
email (string, optional): The email address of the user. This field is optional.
password (string, optional): The password of the user, used for local authentication. This field is optional.
googleId (string, optional): The Google ID of the user, used for Google OAuth authentication. This field is optional.
authMethod (string, enum: ["google", "local", "facebook", "github"], required, default: "local"): The method of authentication used by the user. This field is required and defaults to "local".
The schema also uses Mongoose's timestamps option to add createdAt and updatedAt fields automatically.

User Model
The User model is created using the userSchema and exported for use in other parts of the application.

postRoutes.js
This module defines the routes for handling blog posts in the application. It uses Express Router to manage HTTP requests related to posts and integrates with the postController to perform the required operations.

Dependencies
express: Web framework for Node.js.
postController: Controller handling business logic related to posts.
authenticateUser: Middleware for authenticating user requests.
Route Definitions
Router Setup
An instance of the Express Router is created to define the routes related to blog posts.

Routes
Create Post

Method: POST
Endpoint: /create
Access: Protected (requires user authentication)
Description: Creates a new blog post. The request must include the post details, and the user must be authenticated.

Read All Posts

Method: GET
Endpoint: /
Access: Public
Description: Retrieves a list of all blog posts with pagination.

Get Single Post

Method: GET
Endpoint: /:postId
Access: Public
Description: Retrieves a single blog post by its ID.

Update Post

Method: PUT
Endpoint: /:postId
Access: Protected (requires user authentication)
Description: Updates a blog post by its ID. The user must be authenticated, and the request must include the updated post details.

Delete Post

Method: DELETE
Endpoint: /:postId
Access: Protected (requires user authentication)
Description: Deletes a blog post by its ID. The user must be authenticated.

Middleware
authenticateUser
This middleware function ensures that the user is authenticated before allowing access to protected routes. It checks the request for a valid authentication token.

usersRoutes.js
This module defines the routes for handling user-related operations in the application. It uses Express Router to manage HTTP requests related to user authentication and management, and integrates with the userController to perform the required operations.

Dependencies
express: Web framework for Node.js.
userController: Controller handling business logic related to users.
Route Definitions
Router Setup
An instance of the Express Router is created to define the routes related to user operations.

Routes
Register User

Method: POST
Endpoint: /register
Access: Public
Description: Registers a new user. The request must include user details such as username, email, and password.

Login

Method: POST
Endpoint: /login
Access: Public
Description: Authenticates a user and generates a JWT token. The request must include username and password.

Google Authentication

Method: GET
Endpoint: /auth/google
Access: Public
Description: Initiates Google authentication. Redirects to Google for user login.



Google Authentication Callback

Method: GET
Endpoint: /auth/google/callback
Access: Public
Description: Handles the callback from Google authentication. Generates a JWT token and redirects the user to the frontend.

Check Authentication Status

Method: GET
Endpoint: /checkauthenticated
Access: Public
Description: Checks if the user is authenticated by verifying the JWT token. Returns user details if authenticated.

Logout

Method: POST
Endpoint: /logout
Access: Public
Description: Logs out the user by clearing the authentication token from cookies.

passport.js
This module configures Passport.js for handling various authentication strategies including local authentication, JWT-based authentication, and Google OAuth 2.0. Passport.js is used for user authentication in the application.

Dependencies
passport: Middleware for authentication in Node.js applications.
passport-local: Strategy for username and password authentication.
passport-jwt: Strategy for JWT-based authentication.
passport-google-oauth20: Strategy for Google OAuth 2.0 authentication.
bcryptjs: Library for hashing passwords.
User: Mongoose model for user data.
Configuration
Local Strategy
Purpose: Authenticates users using a username and password.

Configuration:

Username Field: username
Password Verification: Uses bcryptjs to compare the provided password with the hashed password stored in the database.

JWT Strategy
Purpose: Authenticates users using JSON Web Tokens (JWT).

Options:

Extract Token: Extracts the JWT token from cookies.
Secret Key: Uses process.env.JWT_SECRET to verify the token.

Google OAuth 2.0 Strategy
Purpose: Authenticates users using Google OAuth 2.0.

Configuration:

Client ID: process.env.GOOGLE_CLIENT_ID
Client Secret: process.env.GOOGLE_CLIENT_SECRET
Callback URL: The URL to which Google will redirect users after authentication.

server.js
This file sets up and starts the Express server for the application. It configures middleware, connects to the database, and sets up routes for handling API requests.

Dependencies
dotenv: Loads environment variables from a .env file.
cors: Middleware to enable Cross-Origin Resource Sharing.
passport: Authentication middleware.
express: Web framework for Node.js.
cookie-parser: Middleware for parsing cookies.
connectDB: Utility for connecting to the MongoDB database.
