# Welcome to my fictitious "Musical Club" full stack web app!

**Description:**
 
1. This is a multi-user web app, allowing for users to log in and maintain their session. Its role based access control app where there exists the guest role, the member role, and lastly the admin role. 

2. Password based authentication is supported on the api server and utilizes the bcrypt.js library to hash the password, add some salt, then compare user's plain text password with the hashed version for a match.

3. I use the fetch web browser api for communication and transferring json data between the components that talk with the api server, and the api server itself.

4. The express-session library is used to support sessions, using the default development datastore(so only one session will be stored).


5. This project utilizes the React.js library for the front end and express.js(node.js) for the api server(back end).

