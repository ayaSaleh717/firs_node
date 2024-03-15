const express = require("express");
const mongoose= require("mongoose")

const app = express();

const Article = require("./models/Article")

mongoose.connect("mongodb+srv://salehaya717:6c4SXSi6yCc0N7w8@cluster0.plshhna.mongodb.net/")
.then(()=>{
    console.log("connected")

}).catch((err)=>{
    console.log("error",err)
})



app.use(express.json())

app.get("/hello", (req,res) => {
res.send("hello")

})

app.get("/find/:num1/:num2" ,(req,res)=>{
    const num1=req.params.num1
    const num2=req.params.num2
    console.log(req.params)
    res.send(`find sum ${Number(num1) + Number(num2)}`)
} )


app.get("/find2" ,(req,res)=>{
    let num =""
for(let i=0; i<100 ; i++){
    num +=i + " - "

}
    // const name=req.body.name

    // console.log(req.body)
    // res.sendFile(__dirname + "/views/numbers.ejs")
    res.render("numbers.ejs", {
        'name':'aya',
        'age':22,
        'num': num
    })
    
} )


app.get("/find3" ,(req,res)=>{
    console.log(req.query)
    res.send(`Hello `)
    
} )




app.get("/num", (req,res) => {
let num =""
for(let i=0; i<100 ; i++){
    num +=i + " - "

}
    res.send(`the number is ${num}`)
    
 })
    
 app.put("/test", (req,res) => {
    res.send("test")
    
 })
 app.get("/", (req,res) => {
    res.send("homePage")
    
 })

 app.delete("/deletTest", (req,res) => {
    res.send("deleted")
    
 })





app.post("/addCommet" ,()=>{
    res.send("post requet ")
} )





app.post("/Article" ,async (req,res)=>{
    
    const article = new Article()
    const articlTitle = req.body.title
    const articlBody = req.body.body

    // res.send(articlTitle + " " + articlBody)
    
    article.title = articlTitle
    article.body= articlBody
    article.numOfLikes=100

   await article.save()
    res.json(`the new  article have been saved title ${articlTitle} `)
} )


app.get("/Article" ,async (req,res)=>{ 
    const articles = await Article.find()
     await res.json(articles)
})


app.get("/Article/:id" ,async (req,res)=>{
    const id= req.params.id
    const article = await Article.findById(id)
      res.json(article)
})


app.get("/showArticle" ,async (req,res)=>{

    const art= await Article.find()

   res.render("articls.ejs",{article: art})
})


app.delete("/Article/:id" ,async (req,res)=>{
    const id= req.params.id
    const article = await Article.findByIdAndDelete(id)
    res.json(article)


})    








app.listen(3000, ()=>{
    console.log("I am listining in port 3000")
})
