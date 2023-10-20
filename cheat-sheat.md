1.  Intializa project - npm init -y + index.js / Create a folder src
2.  Setup enviroment - NodeMon instalation + express - npm i -D nodemon + go into package.json delete Test and add ("start": "nodemon src/index.js")
   - npm i-D nodemon
   - npm i express
3. Setup BodyParser, static middleware and routes.
  - npm i express-handlebars mongoose
  - configure index.js (add hbs config)
4. Add img and css into public folder
5. Add HTML files in views directory
6. Add main layout
7. Convert all htmls to HBS and leave only main.
  - group views by meaning
8 Create router.js and homeController and check site
9 Add DB in index.js and make sure to change the name
10. User Functionality
    -create user controller and add it to router.js
    - fix navigation to Login, Register
    - render userController by adding get zaqvki
11. Add user model
   - Adding User model as per requirments
   - validating if there is such a user
   - adding post method for registration / changing names in register.hbs / adding POST method in reg.hbs
12. Installing bcrypt and other packages
  - npm i bcrypt jsonwebtoken cookie-parser
  - create first user in DB
13. Hash Password (Login)
    - add names and method on login.hbs
14. JWT token and setting cookie
    - creating lib/jwt.js
    - generate a UUID token for the Secret https://www.uuidgenerator.net/ update Secret in constants.js
    - uncomment all sections for jwt and cookie and change index.js
    - -test if cookie is set correctly with login
15 Logout functionality
16. Authentication middleware
  - creating auth directory
  - directly imported the auth file (the whole middleware)
  - change in index.js
17. Conditional option in NAV
  - check if it is working
18. Error handling
    - import utils
    - uncomment sections
    - added error textbox within main / imported from wizard.wiki
    - Check if all errors are correct
19. Adding a mongoose model for the task (animal)
20. Created a postController + router update navigation to Dashboard
   - created animalService.js
21. Functionality for Posts
   - creadted dashboard
   - creating create function to add posts / Check if it is working
   - created home functionality to show animals
   - working on Details functionality
    - working on Edit
     - working on Delete
     - working on Donation
     - working on search
