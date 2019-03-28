const express=require('express');
const exphbs=require('express-handlebars');
const bodyparser=require('body-parser');
const path=require('path');

const db=require('./config/db.js');



db.authenticate().then(()=>console.log("Database Connected...")).catch(err=>console.log("Err"+err));





const app=express();


app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');


app.use(bodyparser.urlencoded({extended:false}));



app.use(express.static(path.join(__dirname+'/public')));





app.get('/',function(req,res){

    res.render("index",{layout:'landing'});


});


app.use('/books',require('./routes/books'))


const PORT=process.env.PORT || 3000 ;
app.listen(PORT,console.log(`The Server is running on Port ${PORT}`));