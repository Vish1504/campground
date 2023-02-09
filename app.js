const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const Campground=require('./models/campground');


mongoose.connect('mongodb://localhost:27017/yelp')
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("Error, MONGO CONNECTION!!!!")
    console.log(err)
})
const db=mongoose.connection;


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
res.render("home");
});

// app.get("/camp",async(req,res)=>{
//     const camp = new Campground({title:"India"});
//     await camp.save();
//     res.send(camp);
// })

app.get("/camp",async(req,res)=>{
    const campgrounds= await Campground.find({});
    res.render("campgrounds_fldr/index",{campgrounds});
})
app.get("/camp/new",(req,res)=>{
    res.render("campgrounds_fldr/new");
})

app.post("/camp",async(req,res)=>{
    const campground= new Campground(req.body.campground)
    await campground.save();
    res.redirect(`/camp/${campground._id}`);
})


app.get("/camp/:id",async(req,res)=>{
    const campgrounds= await Campground.findById(req.params.id);
    res.render("campgrounds_fldr/show",{campgrounds});
})




app.listen(8080,()=>{
    console.log("Listening at 8080");
})