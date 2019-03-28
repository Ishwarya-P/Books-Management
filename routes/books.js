const express=require('express');
const router=express.Router();

const db=require('../config/db');
const Book=require('../models/Book');

const Sequelize=require('sequelize');

const Op=Sequelize.Op;


router.get('/',(req,res)=>  Book.findAll().then(books=>{
    //console.log(books);
    //res.sendStatus(200);
res.render('books',{books})


}).catch(err=>console.log("MY Error.."+err))  );


router.get('/add',function(req,res){
res.render('add');

})


router.post('/add',(req,res)=>{

let {Name,Author,Keywords,Yearof,NoOfBooks}=req.body;


let errors=[];

if(!Name)
{

    errors.push({text:"Please Enter Book Name"});

}

if(!Author){

    errors.push({text:"Please Enter Author Name "});
}

if(!Keywords){

    errors.push({text:"Please Enter Keywords "});
}


if(!Yearof){

    errors.push({text:"Please Enter Year of Published"});
}


if(!NoOfBooks){

    errors.push({text:"Please Enter No of Books"});
}


if(errors.length >0){

    res.render('add',{errors,Name,Author,Keywords,Yearof,NoOfBooks});

}
else{

    Keywords=Keywords.replace(/, /g,',')
    Book.create({Name,Author,Keywords,Yearof,NoOfBooks}).then(book=> res.redirect('/books')).catch(err=>console.log("Error  is comming from"+err));

}

//Intert into a table



});


router.get('/search',(req,res)=>{

    let {term}=req.query;

    console.log(term);

    term=term.toLowerCase();



    //res.write("HI");

    Book.findAll({where: {Keywords:{[Op.like]:'%'+ term +  '%'}}}).
then(books=>res.render('books',{books}))

.catch(err=>console.log(err));

})


module.exports = router;