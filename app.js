//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Course = require("./models/course.js");
const engine = require('express-handlebars').engine;
const create = require('express-handlebars').create;

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// const hbs = create({
//   helpers: {
//     foo(array){
//       array.forEach(function(element){
//         return element;
//       });
//     }
//   }

// })

const port = 5000;

mongoose.connect('mongodb://localhost:27017/tealDB', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function(){
  console.log("MongoDB Local Server Started!");
});

app.get("/", function(req, res){

    res.render("index");
    console.log("Is this working?");
})

app.post('/test', function(req, res){
    const courses = Object.values(req.body);
    // console.log(Object.values(req.body));
    res.send("Hello");

    courses.forEach(function(course){

        var PHPname = course;

        const newCourse = new Course({
            country: "",
            institute: "",
            name: PHPname,
            collaborators: [], 
          });
          
          newCourse.save(function(err){
            if(err) {
                console.log(err);
            } else {
                console.log("New Course created");
            }
          
          });

    })
});

app.get('/courses', function(req, res){

  res.render("courses", {layout: false, title: "Anirudh"})

  var courseNames = [];
  
  // Course.find({}, function(courses, err){
  //   if(err){
  //     console.log(err);
  //   } else if (courses) {

  //     var name = courses[0].name;
  //     console.log(name);

      // res.render("courses", {title: name})

      // courses.forEach(function(course){
      //   courseNames.push(course.name);
      // });
      
      // res.render("courses", {
      //   layout: false,
      //   helpers: {
      //     foo() { return courseNames; }
      //   }
      // })

  //   } else {
  //     res.send("No courses exist!");
  //   }
  // })
})

app.post('/get-courses', function(req, res){
  console.log("get courses request")
  // res.render("courses");
  res.send("bruh");
    // courses.find()
    //   .then(cour = res.json(cour))
    //   .catch(err => res.status(400).json('Error: ', err))
})

app.listen(port, function(){
    console.log("Server started at port",port);
})