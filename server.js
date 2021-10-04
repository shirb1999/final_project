const express = require("express"),
  path = require("path"),
  fs = require("fs"),
  bodyParser = require("body-parser"),
  cors = require("cors");
  routers = require("./routes/routes.js");
require('./db/mongoose')
// const userRouter = require('./routers/user')
// const userRouter = require('./routes/User')

const app = express();
const port = 3001;

app.get('/',(req,res) => {fs.readFile('Screens/HomeScreen.html',  (err, html) => {
    if (err) {
        throw err; 
    }       
    
    res.writeHeader(200, {"Content-Type": "text/html"});  
    res.write(html);  
    res.end();  
    })
});

app.use(cors());
app.use(bodyParser.json());
// app.use(userRouter);
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/kvuda', express.static(path.join(__dirname, 'Screens/user_login.html')));



app.use('/', routers);

app.use('/js', express.static(path.join(__dirname, 'js')));

app.use('/css', express.static(path.join(__dirname, 'css')));

app.use('/', express.static(path.join(__dirname, 'PNG')));

app.use('/', express.static(path.join(__dirname, 'jpg')));

app.use('/addUser', express.static(path.join(__dirname, 'Screens/HomeScreen.html')));

app.use('/faqs', express.static(path.join(__dirname, 'Screens/faqs.html')));

app.use('/contact_us', express.static(path.join(__dirname, 'Screens/contact_us.html')));

app.use('/new_travel', express.static(path.join(__dirname, 'Screens/new_travel.html')));

app.use('/about_us', express.static(path.join(__dirname, 'Screens/about_us.html')));

app.use('/update_data', express.static(path.join(__dirname, 'Screens/update_data.html')));

app.use('/home', express.static(path.join(__dirname, 'Screens/home.html')));

app.use('/forget', express.static(path.join(__dirname, 'Screens/forget_password.html')));

app.use('/first_qestion', express.static(path.join(__dirname, 'Screens/first_qestion.html')));

app.use('/trip_qestion', express.static(path.join(__dirname, 'Screens/trip_qestion.html')));

const server = app.listen(port, () => {
  console.log("listening on port %s...", server.address().port);
});