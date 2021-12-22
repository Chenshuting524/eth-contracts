const fs = require("fs");

var  previous ="222"

let data=fs.readFileSync("h.txt",(err,data)=>{

    previous=data.toString();
    
});
console.log(data.toString());


