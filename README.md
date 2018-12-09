# Introduction

This app was built to pratice the nodejs environment.

## Frameworks

The frameworks used are:

* [async-redis](https://github.com/moaxaca/async-redis) - Promises in the redis access
* [babel-cli](https://www.npmjs.com/package/babel-cli) - Compiler
* [babel-core](https://github.com/babel/babel/tree/master/packages/babel-core) - Compiler
* [babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015) - Compiler
* [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Hash passwords
* [bluebird](https://github.com/petkaantonov/bluebird) - Promises in the mongoose
* [body-parser](https://github.com/expressjs/body-parser) - Parse request Bodies
* [cors](https://github.com/expressjs/cors) - Enable CORS
* [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables
* [express](https://github.com/expressjs/express) - Web framework
* [express-jwt](https://github.com/auth0/express-jwt) - Request token authentication
* [express-mung](https://github.com/richardschneider/express-mung) - Response transformer
* [express-validator](https://github.com/express-validator/express-validator) - Request validator 
* [faker](https://github.com/Marak/Faker.js) - Generate fake date
* [@meanie/mongoose-to-json](https://github.com/meanie/mongoose-to-json) - Format model object to json
* [moment](https://www.npmjs.com/package/momentl) - Date library
* [mongoose](https://github.com/Automattic/mongoose) - MongoDB modeling and access
* [redis](https://github.com/NodeRedis/node_redis) - Redis access
* [request-ip](https://www.npmjs.com/package/request-ip) - Get IP address
* [socket.io](https://github.com/socketio/socket.io) - Real time notifications
* [socketio-jwt](https://github.com/auth0-community/socketio-jwt) - Authenticate real time notifications
* [winston](https://github.com/winstonjs/winston) - Logger
* [winston-daily-rotate-file](https://github.com/winstonjs/winston-daily-rotate-file) - Logs rotate file

For tests:

* [chai](https://github.com/chaijs/chai) - Test assertion
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - Token authentication
* [mocha](https://github.com/mochajs/mocha) - Test runner
* [supertest](https://github.com/visionmedia/supertest) - Test request

This app works with MongoDB and Redis, this is the information for [MongoDB installation](https://docs.mongodb.com/manual/installation/) and [Redis installation](https://redis.io/topics/quickstart).

## Install

```
npm install
```

## Start

```
npm start
```

## Tests

```
npm test
```

## Api

| Method | Resource 		                 | Description                             |
|--------|-----------------------------------|-----------------------------------------|
| POST** | /authenticate/                    | create a new token 	                   | 
| POST** | /clients/registration/            | create a new client	                   | 
| GET	 | /clients/:id                      | return a client  	                   |
| GET	 | /clients/:id/expert/:id/questions | return a questions by client and expert |
| PUT	 | /clients/{id}                     | update a client      	               |
| DELETE | /clients/{id}                     | delete a client      	               |
| POST	 | /question/	                     | create a new client	                   | 
| GET	 | /questions/:id  	                 | return a question  	                   |
| PUT	 | /questions/{id}                   | update a question      	               |
| DELETE | /questions/{id}                   | delete a question      	               |
| POST	 | /question/	                     | create a new question                   | 
| GET	 | /questions/:id  	                 | return a question  	                   |
| PUT	 | /questions/{id}                   | update a question                       |
| DELETE | /questions/{id}                   | delete a question      	               |
| POST** | /users/registration/              | create a new user                       | 
| GET	 | /users/:id  	                     | return a user  	                       |
| GET	 | /users/:id/client/:id/questions   | return a questions by expert and client |
| PUT	 | /users/{id}                       | update a user        	               |
| DELETE | /users/{id}                       | delete a user      	                   |
| POST	 | /answers/	                     | create a new answer                     | 
| GET	 | /answers/:id  	                 | return a answer 	                       |
| PUT	 | /answers/{id}                     | update a answer     	                   |
| DELETE | /answers/{id}                     | delete a answer      	               |

**Routes without JWT authentication 
