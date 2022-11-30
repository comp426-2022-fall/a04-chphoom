import { roll } from "./lib/roll.js";
import minimist from "minimist";
import express from "express";

const app = express();
const args = minimist(process.argv.slice(2));
const port = args.port || 5000;

app.use(express.urlencoded({extended: true}));

//default values
var sides = 6;
var dice = 2;
var rolls = 1;


// Check endpoint at /app/ that returns 200 OK.
app.get('/app', (req, res)=>{
    res.send("200 OK")
});
// Endpoint /app/roll/ that returns JSON for a default roll of two six-sided dice one time. 
//Example output might look like: {"sides":6,"dice":2,"rolls":1,"results":[12]}.
app.get('/app/roll', (req, res)=>{
    res.send(roll(sides,dice,rolls))
});
// Endpoint /app/roll/ should ALSO accept either JSON or URLEncoded data body for sides, dice, and rolls. 
//Example URLEncoded string for data body: ?sides=20&dice=4&rolls=3. 
//Example JSON data body: {"sides":20,"dice":4,"rolls":3}. 
app.post('/app/roll', (req, res)=>{
    res.send(roll(parseInt(req.body.sides), parseInt(req.body.dice), parseInt(req.body.rolls)))
});
//The format of the resulting JSON should look like: {"sides":20,"dice":4,"rolls":3,"results":[19,3,60]}.
// Endpoint /app/roll/:sides/ that returns JSON for a default number of rolls and dice with whatever number of sides is specified in the parameter. 
//For example, /app/roll/6/ should return JSON for two six-sided dice, rolled one time, whereas /app/roll/10/ should return JSON for two ten-sided dice, rolled 1 time.
//The format of the resulting JSON should look like: {"sides":10,"dice":2,"rolls":1,"results":[17]}.
app.get('/app/roll/:sides/', (req, res)=>{
    res.send(roll(parseInt(req.params.sides),dice,rolls))
});
// Endpoint /app/roll/:sides/:dice/ that returns JSON for a default number of rolls with whatever number of sides and dice specified in the parameters. 
//For example, /app/roll/6/2/ should return JSON for two six-sided dice, rolled one time, whereas /app/roll/10/3/ should return JSON for three ten-sided dice, rolled 1 time. 
//The format of the resulting JSON should look like: {"sides":10,"dice":3,"rolls":1,"results":[27]}.
app.get('/app/roll/:sides/:dice/', (req, res)=>{
    res.send(roll(parseInt(req.params.sides),parseInt(req.params.dice),rolls))
});
// Endpoint /app/roll/:sides/:dice/:rolls/ that returns JSON for the specified number of rolls with whatever number of sides and dice specified in the parameters.
// For example, /app/roll/6/2/1/ should return JSON for two six-sided dice, rolled one time, whereas /app/roll/10/3/8/ should return JSON for three ten-sided dice, rolled 1 time. The format of the resulting JSON should look like: {"sides":10,"dice":3,"rolls":8,"results":[6,13,30,17,16,27,4,29]}.
// ALL endpoints should return HTTP headers including a status code and the appropriate content type for the response.
app.get('/app/roll/:sides/:dice/:rolls/', (req, res)=>{
    res.send(roll(parseInt(req.params.sides),parseInt(req.params.dice),parseInt(req.params.rolls)))
});

// Default API endpoint that returns 404 NOT FOUND for any endpoints that are not defined.
app.get('/app/*', (req, res)=>{
    res.send("404 NOT FOUND")
});

app.listen(port);