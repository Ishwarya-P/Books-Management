const Sequelize=require('sequelize');

const db=require('../config/db.js');


const Book=db.define('mydata',{
    Name:{
        type:Sequelize.STRING
    },
    Author:{
        type:Sequelize.STRING
    },
    Keywords:{
        type:Sequelize.STRING
    },
    Yearof:{
        type:Sequelize.STRING
    },
    NoOfBooks:{
        type:Sequelize.INTEGER
    }



});


module.exports=Book;