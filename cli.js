const HandleInput = require('./handleInput');

const prompt = require('prompt-sync')({sigint : true});
const handle = new HandleInput();
while(true){
    const input = prompt("enter request: ");
    const data = input.trim().split("");
    handle.proccess(data);
}