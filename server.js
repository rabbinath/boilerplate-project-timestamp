// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { response } = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


let resObj={};
app.get('/api/:inputDate',function(req,res)  {
let inputDate=req.params.inputDate;
var parsedDate=Date.parse(inputDate).getTime();
if(inputDate.includes('-')){
  resObj['unix']=new Date(inputDate).getTime();
  resObj['utc']=new Date(inputDate).toUTCString();
  resObj['pdate']=parsedDate;
}elseif (!inputDate.includes(' '))
{
  inputDate=parseInt(inputDate);
  resObj['unix']=new Date(inputDate).getTime();
  resObj['utc']=new Date(inputDate).toUTCString();
  resObj['pdate']=parsedDate;
}
if( !resObj['unix'] ||  !resObj['utc'])
{
  res.json({error:"Invalid Date"})
}

res.json(resObj);
});

app.get('/api',function(req,res){
resObj['unix']=new Date().getTime();
resObj['utc']=new Date().toUTCString();
res.json(resObj);

});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

