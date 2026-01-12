import express from "express";
import bodyParser from "body-parser";



const app = express();
const port = 3000;






app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));
app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));

let posts = [];
let nextId = 1;

app.get("/", (req, res) => {

    res.render("home.ejs", {posts});
})



app.post("/submit", (req, res) => {

   

    const post = { id: nextId++,
        essay: req.body.essay
    }
    posts.push(post);
res.render("home.ejs", {posts})
})



app.get("/update",(req, res) => {
    const id = Number(req.query.id);

    const post = posts.find(p => p.id === id);

    if(!post) {
        return res.status(404).send("Post not found");
    }


    res.render("update.ejs", {post});


})

app.post("/update/submit", (req, res) => {
   const id = Number(req.body.id);
  const { essay } = req.body;
    const post = posts.find(p => p.id === id);
     if (!post) {
    return res.status(404).send("Post not found");
  }

  post.essay = essay;

    res.render("home.ejs", {posts});




})

app.post("/delete", (req, res) => {

    const id  = Number(req.body.id);

    posts = posts.filter(post => post.id !== id);
    res.render("home.ejs", {posts});


})
app.listen(port, () => {

    console.log(`Listening to port ${port}`);
})