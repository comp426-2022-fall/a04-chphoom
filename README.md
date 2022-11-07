# a04 Stand up an API

This assignment will help you stand up a web API using Express and the module that you produced for a03.

Make sure to consult the appropriate documentation as you work through the assignment instructions.

## DO NOT CLONE THIS TEMPLATE REPOSITORY DIRECTLY

Use the GitHub classroom link instead: https://classroom.github.com/a/CtRcwZji

If you clone the template repo directly, it will not be added to the organization as an individual repo associated with your account and you will not be able to push to it. This repository should only be used for assignment issues.

## Instructions

In this assignment, you are going to convert the functions that you wrote for a03 to emulate rolling dice and then do things with the resulting information.
The focus of the assignment is not necessarily on creating basic API endpoints in Node using Express.js.

The instructions for this are fairly sparse because I want you to be creative in how you approach this.
There are a only a few things that you will have to do very specifically in order to make this work, but beyond that, HOW you do this is really up to you. 

### List of requirements for submission

1. `server.js` file that takes an arbitrary port number as a command line argument (i.e. I should be able to run it with `node server.js`. The port should default to 5000 if no argument is given.
2. Default API endpoint that returns `404 NOT FOUND` for any endpoints that are not defined.
3. Check endpoint at `/app/` that returns `200 OK`.
4. Endpoint `/app/roll/` that returns JSON for a default roll of two six-sided dice one time. Example output might look like: `{"sides":6,"dice":2,"rolls":1,"results":[12]}`.
5. Endpoint `/app/roll/` should ALSO accept either JSON or URLEncoded data body for `sides`, `dice`, and `rolls`. Example URLEncoded string for data body: `?sides=20&dice=4&rolls=3`. Example JSON data body: `{"sides":20,"dice":4,"rolls":3}`. The format of the resulting JSON should look like: `{"sides":20,"dice":4,"rolls":3,"results":[19,3,60]}`.
6. Endpoint `/app/roll/:sides/` that returns JSON for a default number of rolls and dice with whatever number of sides is specified in the parameter. For example, `/app/roll/6/` should return JSON for two six-sided dice, rolled one time, whereas `/app/roll/10/` should return JSON for two ten-sided dice, rolled 1 time. The format of the resulting JSON should look like: `{"sides":10,"dice":2,"rolls":1,"results":[17]}`.
6. Endpoint `/app/roll/:sides/:dice/` that returns JSON for a default number of rolls with whatever number of sides and dice specified in the parameters. For example, `/app/roll/6/2/` should return JSON for two six-sided dice, rolled one time, whereas `/app/roll/10/3/` should return JSON for three ten-sided dice, rolled 1 time. The format of the resulting JSON should look like: `{"sides":10,"dice":3,"rolls":1,"results":[27]}`.
7. Endpoint `/app/roll/:sides/:dice/:rolls/` that returns JSON for the specified number of rolls with whatever number of sides and dice specified in the parameters. For example, `/app/roll/6/2/1/` should return JSON for two six-sided dice, rolled one time, whereas `/app/roll/10/3/8/` should return JSON for three ten-sided dice, rolled 1 time. The format of the resulting JSON should look like: `{"sides":10,"dice":3,"rolls":8,"results":[6,13,30,17,16,27,4,29]}`.
8. ALL endpoints should return HTTP headers including a status code and the appropriate content type for the response.
9. All of this should be in a Node package with `"main"` set to `server.js`.
10. The test script defined in `package.json` should be set to `"node server.js --port=5555"`

### Prerequisites

1. Run `npm init`.
2. Install express and minimist.
3. Create a `server.js` file.
4. Place your a03 module in a subdirectory named `lib` and make sure that it is imported in `server.js`.

### Testing your server

Run the following bash one-liners to test your API server. These are included in the autograder for this assignment. Your cod should produce the outputs listed above for the corresponding script below.

These should help you to better understand how to use curl to make API calls.

#### Get the root endpoint of your app

```
PORT="$(shuf -i 2000-65535 -n 1)"; (timeout --signal=SIGINT 5 node server.js --port=$PORT; exit 0) & sleep 1s && curl -s http://localhost:${PORT}/app/ && sleep 5s
```

> This should bring your server up on a randomly assigned port for 5 seconds, call the root endpoint, and then shut down.

The response should be:

```
200 OK
```

#### Call a nonexistent endpoint

```
PORT="$(shuf -i 2000-65535 -n 1)"; (timeout --signal=SIGINT 5 node server.js --port=$PORT; exit 0) & sleep 1s && curl -s http://localhost:${PORT}/app/nonexistent/ && sleep 5s
```

> This should call an endpoint that does not exist. 

The response should be:

```
404 NOT FOUND
```

#### Roll default dice 

```
PORT="$(shuf -i 2000-65535 -n 1)"; (timeout --signal=SIGINT 5 node server.js --port=$PORT; exit 0) & sleep 1s && curl -s http://localhost:${PORT}/app/roll/ && sleep 5s
```

> This calls `/app/roll/` with no body message. 

The response should be something like:

```
{"sides":6,"dice":2,"rolls":1,"results":[12]}
```

#### Roll random dice

```
PORT="$(shuf -i 2000-65535 -n 1)"; SIDES="$(shuf -i 4-20 -n 1)"; DICE="$(shuf -i 1-4 -n 1)"; ROLLS="$(shuf -i 1-3 -n 1)"; (timeout --signal=SIGINT 5 node server.js --port=$PORT; exit 0) & sleep 1s && curl -s -d 'sides=${SIDES}&dice=${DICE}&rolls=${ROLLS}' http://localhost:${PORT}/app/roll/ && sleep 5s
```

> This calls your `/app/roll/` endpoint with random numbers passed as a URLEncoded message body. You could also do this with JSON.

The response should be something that looks like:

```
{"sides":20,"dice":4,"rolls":3,"results":[19,3,60]}
``` 

#### Roll dice with sides parameter

```
PORT="$(shuf -i 2000-65535 -n 1)"; SIDES="$(shuf -i 4-20 -n 1)"; (timeout --signal=SIGINT 5 node server.js --port=$PORT; exit 0) & sleep 1s && curl -s http://localhost:${PORT}/app/roll/${SIDES}/ && sleep 5s
```

> This calls your `/app/roll/:sides/` endpoint with a random number assigned in the `sides` parameter. 

The response should look like:

```
{"sides":10,"dice":2,"rolls":1,"results":[17]}
```

#### Roll dice with sides and dice parameters

```
PORT="$(shuf -i 2000-65535 -n 1)"; SIDES="$(shuf -i 4-20 -n 1)"; DICE="$(shuf -i 1-4 -n 1)"; (timeout --signal=SIGINT 5 node server.js --port=$PORT; exit 0) & sleep 1s && curl -s http://localhost:${PORT}/app/roll/${SIDES}/${DICE}/ && sleep 5s
```

> This calls your `/app/roll/:sides/:dice/` endpoint with a random number assigned in the `sides` and `dice` parameters.

The response should be similar to:

```
{"sides":10,"dice":3,"rolls":1,"results":[27]}
```

#### Roll dice with sides, dice, and rolls parameters

```
PORT="$(shuf -i 2000-65535 -n 1)"; SIDES="$(shuf -i 4-20 -n 1)"; DICE="$(shuf -i 1-4 -n 1)"; ROLLS="$(shuf -i 1-3 -n 1)"; (timeout --signal=SIGINT 5 node server.js --port=$PORT; exit 0) & sleep 1s && curl -s http://localhost:${PORT}/app/roll/${SIDES}/${DICE}/${ROLLS}/ && sleep 5s
```

> This calls your `/app/roll/:sides/:dice/:rolls/` endpoint with a random number assigned in the `sides`, `dice`, and `rolls` parameters.

The response should look like:

```
{"sides":10,"dice":3,"rolls":8,"results":[6,13,30,17,16,27,4,29]}
```

#### Look at the package.json file

```
cat package.json
```

> This should echo the contents of `package.json` to STDOUT see if there is a main file defined.

Somewhere in the output, you should see a line that says:

```
"main": "server.js",
```

#### Get the headers

```
PORT="$(shuf -i 2000-65535 -n 1)"; (timeout --signal=SIGINT 5 node server.js --port=$PORT; exit 0) & sleep 1s && curl -I -s http://localhost:${PORT}/app/ && sleep 5s
```

> This should return the headers that your API server is sending.

The response should look something like what is shown here: https://davidwalsh.name/curl-headers



#### Run a test

```
npm test
```

> This runs the test that you defined in `package.json`. 

The response should include an indication that your script ran on port 5555:

```
node server.js --port=5555
```
