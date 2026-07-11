const express = require("express");
const app = express();
const methodOverride = require("method-override");

const path = require("path");

app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());

const ejsMate = require("ejs-mate");
app.engine("ejs",ejsMate);
app.set("view engine", "ejs");

const {v4:uuidv4} = require("uuid");

let port = 9090;

let posts = [
    {
        id : uuidv4(),
        username : "kunalpathak",
        content : "i love coding"
    },
    {
         id : uuidv4(),
        username : "rahul kumar",
        content : "learning new skills"
    },
    {
         id : uuidv4(),
        username : "vanshika",
        content : "want to became model"
    },
]

app.get("/posts",(req,res) =>{
  res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res) =>{
    res.render("new.ejs");
})

app.post("/posts",(req,res) =>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
})

app.patch("/posts/:id",(req,res) =>{
     let {id} = req.params;
     let newContent = req.body.content;
      let post = posts.find((p) => id === p.id);
     post.content = newContent;
     res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res) =>{
  let {id} = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res) =>{
     let {id} = req.params;
   posts =   posts.filter((p) => id !== p.id);
   res.redirect("/posts");
})

app.get("/", (req,res) =>{
   res.redirect("/posts");
})

app.listen(port,() =>{
    console.log("listening to port : 9090");
})