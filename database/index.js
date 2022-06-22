// var mysql = require('mysql')
// var con = mysql.createPool({
//     database:"base_Ceav",
//     host:"10.2.100.41",
//     user:"linux",
//     password:"user"
// },
//     console.log("conectado a la BD")
// ) 

// module.exports =  con;

var mysql = require ('mysql')
var coneccion= mysql.createConnection({
    database:'bd_directorio',
    host:'localhost',
    user:'root',
    password:'user'
})

coneccion.connect(function(error){
   console.log('este es el error',error)
   if(error) throw error   
   console.log('conectado a la base de datos')
})
module.exports=coneccion


