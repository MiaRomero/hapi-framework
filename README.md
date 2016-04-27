###Description

This app is an example of a single resource REST app using hapi, mongoDB, and mongoose.
Users can make GET, POST, PUT, and DELETE requests at `/zoo` to see and edit the animals in the zoo.

###Usage

The server is launched on `localhost:3000` by running the following on the command line:
`node server.js`

GET requests to `localhost:3000/zoo` will display all of the animals in the zoo (database).

POST requests made to the same url will add an animal to the database.  Required properties for each animal are name, variety, age, origin, and food.  An example POST request using httpie:

`http POST :3000/zoo name='Tuxedo McBirdfish' variety=emperor age:=4 origin=Antartica food=fish`

To update an animal make a PUT request to `localhost:3000/zoo/:id` with the id param being the id of the animal you would like to edit.  Make sure to include all properties, even if they are not being changed.

`http PUT :3000/zoo/<Tuxedo McBirdfish's id number> name='Tuxedo McBirdfish' variety=emperor age:=4 origin=Antartica food=pizza`

A DELETE request is also made to `localhost:3000/zoo/:id`

`http DELETE :3000/zoo/<Tuxedo McBirdfish's id>`

###Dependencies
hapi  
mongoose  
chai  
chai-http  
gulp  
gulp-eslint  
gulp-mocha  
mocha  

###Testing and task-runners

Tests are implemented with chai, chai-http, and mocha; and run with `gulp lint:test`, `gulp lint:nontest`, and `gulp mocha`. Or `gulp` for all tests.

###Authors
 Maria Romero, Ben Nolan, Phillip Nguyen
