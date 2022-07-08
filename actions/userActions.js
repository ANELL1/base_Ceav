const client  = require('../database');
const bcrypt =  require('bcrypt');
const puppeteer = require('puppeteer');
const nodemailer = require("nodemailer")
const {jsonwebtoken} = require('../utils/index');
const SALT_WORK_FACTOR =10
const downloadsFolder = require('downloads-folder');
const { response } = require('express');
const { promises } = require('nodemailer/lib/xoauth2');
const con = require('../database');

const loginEmpleado = async  data =>{
    return new Promise((resolve,reject) =>{  client.query(`select * from dataempleados where correo='${data[0]}'`,    
    function(err,results,field){
        if(err){ reject(err)
    }
        var string = JSON.stringify(results)
        var resultados=JSON.parse(string);
        if(resultados[0]){       
            bcrypt.compare(data[1],resultados[0].contrasena,function(error,result){
                if(result){
                        resolve({                          
                        id_empleado:resultados[0].id_empleado,
                        nombre:resultados[0].nombre,
                        apellidos:resultados[0].apellidos,                   
                        correo:resultados[0].correo, 
                        curp:resultados[0].curp,
                        rfc:resultados[0].rfc,                       
                        telefono:resultados[0].telefono, 
                        ext:resultados[0].ext,
                        area:resultados[0].area,
                        puesto:resultados[0].puesto,
                        ubicacion:resultados[0].ubicacion,
                        message:"login exitoso",
                        token:jsonwebtoken(resultados[0].correo) //coreo data[0]]   
                })
                } else{ 
                    resolve({message:"usuario y contraseña incorrecto", token:"no hay token"})
                }
            })
        }else{
            resolve({
                message:"usuario no encontrado",
                
                })
        }   
    })
    } )
    } 
    const loginDataAdmin = async  data =>{
        return new Promise((resolve,reject) =>{client.query(`select * from dataadministrador where correo='${data[0]}'`,
        function(err,results,field){
            console.log("error",err)
            console.log("results",results)
            // console.log("field",field)
            if(err){ reject(err)
        }   
            var string = JSON.stringify(results)
            var resultados=JSON.parse(string);
            if(resultados[0]){
                bcrypt.compare(data[1],resultados[0].contrasena,function(error,result){
                    if(result){
                            resolve({
                              
                            id_admin:resultados[0].id_admin,
                            nombre:resultados[0].nombre,
                            apellidos:resultados[0].apellidos,                   
                            correo:resultados[0].correo,   
                            message:"login exitoso",
                            token:jsonwebtoken(resultados[0].correo) //coreo data[0]]   
                    })
                    } else{ 
                        resolve({message:"usuario y contraseña incorrecto", token:"no hay token"})
                    }
                })
            }else{
                resolve({
                    message:"usuario no encontrado",
                    
                    })
            }   
        })
        } )
        } 

const sigUpEmpleado = (data) => {
    return new Promise((resolve,reject) =>{
        bcrypt.genSalt(SALT_WORK_FACTOR,function(error,salt){
            if (error){    
                reject(error,{message:'error',token:error})
            } else{
                bcrypt.hash(data[8],salt, function(error,hash){
                    if(error){
                        throw error
                    } else{
                        client.query(`insert into dataempleados(nombre,apellidos,curp,rfc,correo,numEmpleado,telefono,ext,dependencia,contrasena,statusEmpleado,departamento,fk_oficinas,fk_rol,fk_area,fk_puesto,fk_nivel,fk_personal) values ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}','CEAV','${hash}','true','${data[9]}','${data[10]}','2','${data[11]}','${data[12]}','${data[13]}','${data[14]}')`);                  
                        resolve({           
                            message:"Registro exitoso",
                        })
                        
                    }
                })
            }
        })
        
    })   
    } 
    const signupDataFechanotificaciones = (data) =>{
      return new Promise((resolve,reject)=>{
       client.query(`insert into datafechasnotificaciones(fechaAlta,fechaBaja,fechaNotificacionAlta,fechaNotificacionBaja,numEmpleado)value('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}')`)
       resolve({message:"registro exitoso"})
      })
    }



    const signupDataAdmin = (data) => {      
        return new Promise((resolve,reject) =>{
            bcrypt.genSalt(SALT_WORK_FACTOR,function(error,salt){
                if (error){    
                    reject(error,{message:'error',token:error})
                } else{
                    bcrypt.hash(data[3],salt, function(error,hash){
                        if(error){
                            throw error
                        } else{
                            client.query(`insert into dataadministrador(nombre,apellidos,correo,contrasena,fk_rol) values ('${data[0]}','${data[1]}','${data[2]}','${hash}','1')`);                  
                            resolve({           
                                message:"Registro exitoso",
                            })
                            
                        }
                    })
                }
    
            })
            
        })   
        } 

  const getTablaDataEmpleado = ( data)  => {
    return new Promise((resolve,reject)=>{
        client.query(`SELECT *FROM dataempleados 
        INNER JOIN catoficina on dataempleados.fk_oficinas = catoficina.id_oficina 
        INNER JOIN catroles on dataempleados.fk_rol = catroles.id_roles
        INNER JOIN catarea on dataempleados.fk_area = catarea.id_area 
        INNER JOIN catpuesto on dataempleados.fk_puesto = catpuesto.id_puesto 
        INNER JOIN catniveles on dataempleados.fk_nivel = catniveles.id 
        INNER JOIN catpersonal on dataempleados.fk_personal = catpersonal.id_personal 
        INNER JOIN catextensiones on dataempleados.fk_extensiones = catextensiones.id_extension        
        `,function(err,result,field){
            var string = JSON.stringify(result)
            var resultados =  JSON.parse(string)
            resolve(resultados)
        }) 
    })

}
const getTablaDataEmpleadoUser = ( data)  => {
    return new Promise((resolve,reject)=>{
        client.query(`SELECT *FROM dataempleados 
        INNER JOIN catpuesto on dataempleados.fk_puesto = catpuesto.id_puesto
        INNER JOIN catarea on dataempleados.fk_area = catarea.id_area 
        `,function(err,result,field){
            var string = JSON.stringify(result)
            var resultados =  JSON.parse(string)
            resolve(resultados)
        }) 
    })

}
    const getEmpleadosByCorreo = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from dataempleados where correo='${data[0]}'`, function (err,results,fields ) {  
                var string = JSON.stringify(results)
                var resultados=JSON.parse(string);     
                resolve(resultados)
            })
        })
    }
    const updatePasswordEmpleados = ( data)  => {
        return new Promise((resolve,reject)=>{
            bcrypt.genSalt(SALT_WORK_FACTOR,function(error,salt){
                if (error){    
                        reject(error,{message:'error',token:error})
                } else{
                    bcrypt.hash(data[1],salt, function(error,hash){
                        if(error){
                            throw error
                        } else{
                            client.query(`update empleados set contrasena = '${hash}' where id_empleado  = '${data[0]}'`)
                            resolve({message:"actualización exitosa"})
                        }
                    })
                }                       
            })
            
        })
    }
    const updateEmpleados = ( data)  => {
        // console.log("nombre=",data[1],"apellidos=",data[2],"curp=",data[3],"rfc=",data[4],"correo=",data[5],"numEmpleado=",data[6],"telefono=",data[7]
        // ,"statusEmpleado=",data[8],"departamento=",data[9],"fk_oficinas=",data[10],"fk_area=",data[11],"fk_puesto=",data[12],"fk_nivel=",data[13],"fk_personal=",data[14],"fk_extensiones=",data[15],"id_empleado=",data[0] )
        return new Promise((resolve,reject)=>{
                client.query(`update dataempleados set nombre='${data[1]}',apellidos='${data[2]}',curp='${data[3]}',rfc='${data[4]}',correo='${data[5]}',numEmpleado='${data[6]}',telefono='${data[7]}'
                ,statusEmpleado='${data[8]}',departamento='${data[9]}',fk_oficinas='${data[10]}',fk_area='${data[11]}',fk_puesto='${data[12]}',fk_nivel='${data[13]}',fk_personal='${data[14]}',fk_extensiones='${data[15]}' where id_empleado='${data[0]}'`) 
                resolve({message:"actualizacion exitosa"})
        })
     }
     const deleteEmpleados  = ( data)  => {
        return new Promise((resolve,reject)=>{                        
            client.query(`delete from empleados where id_empleado='${data[0]}'`) 
            resolve({message:"delite exitoso"})
        })   
    }

    const getTablaEmpleadowhereId = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from empleados where id_empleado = '${data[0]}' `,function(err,result,field){
                var string = JSON.stringify(result)
                var resultados =  JSON.parse(string)
                resolve(resultados)
            }) 
        })
    }

    const signupCatOficina = (data) =>{
      return new Promise((resolve,reject)=>{
       client.query(`insert into catoficina(nombreOficina,calle,numExterior,numInterior,colonia,codigoPostal,ciudad,estado,telefono1,telefono2,telefono3,telefono4,telefono5,referencia)value('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}','${data[5]}','${data[6]}','${data[7]}','${data[8]}','${data[9]}','${data[10]}','${data[11]}','${data[12]}','${data[13]}')`)
       resolve({message:"registro exitoso"})
      })
    }
    const signupCatPersonal = (data) =>{
      return new Promise((resolve,reject)=>{
       client.query(`insert into catpersonal(tipoPersonal)value('${data[0]}')`)
       resolve({message:"registro exitoso"})
      })
    }
    const signupCatArea = (data) =>{
      return new Promise((resolve,reject)=>{
       client.query(`insert into catarea(nomeclatura,numSerie,nombreArea)value('${data[0]}','${data[1]}','${data[2]}')`)
       resolve({message:"registro exitoso"})
      })
    }
    const signupCatRoles = (data) =>{
      return new Promise((resolve,reject)=>{
       client.query(`insert into catroles(usuario)value('${data[0]}')`)
       resolve({message:"registro exitoso"})
      })
    }
    const signupCatPuesto = (data) =>{
      return new Promise((resolve,reject)=>{
       client.query(`insert into catpuesto(puesto,nivel,mando)value('${data[0]}','${data[1]}','${data[2]}')`)
       resolve({message:"registro exitoso"})
      })
    }
    const sigupCatNiveles = (data) =>{
        return new Promise((resolve,reject)=>{
         client.query(`insert into catniveles(nivel,fk_puesto)value('${data[0]}','${data[1]}')`)
         resolve({message:"registro exitoso"})
        }) 
    }
    const getTablaArea = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from catarea`,function(err,result,field){
                var string = JSON.stringify(result)
                var resultados =  JSON.parse(string)
                resolve(resultados)
            }) 
        })
    }
    const getTablaOficinas = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from catoficina`,function(err,result,field){
                var string = JSON.stringify(result)
                var resultados =  JSON.parse(string)
                resolve(resultados)
            }) 
        })
    }
    const getTablaPersonal = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from catpersonal`,function(err,result,field){
                var string = JSON.stringify(result)
                var resultados =  JSON.parse(string)
                resolve(resultados)
            }) 
        })
    }
    const getTablaPuesto = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from catpuesto`,function(err,result,field){
                var string = JSON.stringify(result)
                var resultados =  JSON.parse(string)
                resolve(resultados)
            }) 
        })
    }
    const getTablaAdmin = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select * from dataadministrador`,function(err,result,field){
                var string = JSON.stringify(result)
                var resultados =  JSON.parse(string)
                resolve(resultados)
            }) 
        })
    }
    const getEntidad = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`select nombreentidad,nombreMunicipio from catMunicipios inner join catentidad on catMunicipios.fk_entidad = catentidad.id_entidad where id_entidad ='${data[0]}'`,function(err,result,field){
                var string = JSON.stringify(result)
                var resultados =  JSON.parse(string)
                resolve(resultados)
            }) 
        })
    }
        const updateArea = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`update catarea set nomeclatura='${data[1]}',numSerie='${data[2]}',nombreArea='${data[3]}' where id_area='${data[0]}'`) 
            resolve({message:"actualizacion exitosa"})
        })
    }
    const updateOficina = ( data)  => {
    return new Promise((resolve,reject)=>{
        client.query(`update catoficina set nombreOficina ='${data[1]}',calle='${data[2]}',numExterior='${data[3]}', numInterior='${data[4]}', colonia='${data[5]}',        
        codigoPostal='${data[6]}',ciudad='${data[7]}',estado='${data[8]}',telefono1='${data[9]}',telefono2='${data[10]}',telefono3='${data[11]}',telefono4='${data[12]}',telefono5='${data[13]}', referencia='${data[14]}' where id_oficina='${data[0]}'`) 
        resolve({message:"actualizacion exitosa"})
        })
    }
    const updatePersonal = ( data)  => {
    return new Promise((resolve,reject)=>{
        client.query(`update catpersonal set tipoPersonal='${data[1]}' where id_personal='${data[0]}'`) 
        resolve({message:"actualizacion exitosa"})
        })
    }
    const updatePuesto = ( data)  => {
    return new Promise((resolve,reject)=>{
        client.query(`update catpuesto set puesto='${data[1]}' where id_puesto='${data[0]}'`) 
        resolve({message:"actualizacion exitosa"})
        })
    }  
    const getTablaPuestoAndNivel =(data) =>{
        return new Promise((resolve,reject)=>{
            client.query(`SELECT * FROM catpuesto INNER JOIN catniveles ON catpuesto.id_puesto = catniveles.fk_puesto`,function(err,result,field){
                var string = JSON.stringify(result)
                var resultados =  JSON.parse(string)
                resolve(resultados)
            }) 
        })
    }
    const getTablaNivel =(data) =>{        
        return new Promise((resolve,reject)=>{
            client.query(`SELECT * FROM catniveles where fk_puesto='${data[0]}'`,function(err,result,field){
                var string = JSON.stringify(result)
                var resultados =  JSON.parse(string)
                resolve(resultados)
            }) 
        })
    }
    const getTablalistaNivel =(data) =>{
        return new Promise((resolve,reject)=>{
            client.query(`SELECT * FROM catniveles`,function(err,result,field){
                var string = JSON.stringify(result)
                var resultados =  JSON.parse(string)
                resolve(resultados)
            }) 
        })
    }
    const getTablaEstados = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`SELECT * FROM catentidad`,function(err,result,field){
                var string = JSON.stringify(result)
                var resultados =  JSON.parse(string)
                resolve(resultados)
            }) 
        })
    }
    const updateNivel = ( data)  => {
    return new Promise((resolve,reject)=>{
        client.query(`update catniveles set nivel='${data[1]}' where id='${data[0]}'`) 
        resolve({message:"actualizacion exitosa"})
        })
    }
    const getTablaFechaNotificaciones = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`SELECT * FROM dataempleados INNER JOIN datafechasnotificaciones  on dataempleados.numEmpleado = datafechasnotificaciones.numEmpleado`,function(err,result,field){
                var string = JSON.stringify(result)
                var resultados =  JSON.parse(string)
                resolve(resultados)
            }) 
        })
    }
    const updatefechasNotificaciones = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`update datafechasnotificaciones set fechaAlta ='${data[1]}',fechaBaja ='${data[2]}',fechaNotificacionAlta ='${data[3]}',fechaNotificacionBaja ='${data[4]}' where id_fecha='${data[0]}'`) 
            resolve({message:"actualizacion exitosa"})
            })
        }
    const insertCatExtensiones =  data=> { 
        // console.log( "data1=",data[1],"data0=",data[0])
        return new Promise((resolve,reject) =>{ 
        //  console.log(' esta es la query',`select * from productoServicio where fk_empresa='${data[9]}' and concepto='${data[1]}'`)
        //  select * from productoServicio where fk_empresa='${data[9]}' and concepto='${data[1]}'  or  consecutivo='${data[3]}'
        client.query(`select * from catextensiones where numExtension='${data[0]}'`,
        function(err,results,field){
        var string = JSON.stringify(results)
        var resultados=JSON.parse(string);
        if (resultados[0]){
            resolve({message:"El numero de Extension ya fue registrado"})
            //   console.log("resolve",resultados[0])   
        }else{   
        //       console.log("insert into productoServicio(tipo,concepto,precio,consecutivo,tipoLicenciamiento,LineaProducto,id_actualizacion,asignacion,fechaRegistro,fk_empresa",data[0],data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8],data[9])                         
            client.query(`insert into catextensiones(numExtension,statusExtension) values('${data[0]}','libre')`) 
            resolve({message:"registro exitoso"})
            }        
    })
    })
    }
    const updateExtensiones = ( data)  => {
        // console.log("updateExtensiones",data)
        return new Promise((resolve,reject)=>{
            client.query(`update catextensiones set statusExtension ='${data[1]}' where id_extension='${data[0]}'`) 
            // resolve({message:"actualizacion exitosa"})
            })
    }
    const getTablaCatExtensionesLibres = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`SELECT * FROM catextensiones where statusExtension='libre' `,function(err,result,field){
                var string = JSON.stringify(result)
                var resultados =  JSON.parse(string)
                resolve(resultados)
            }) 
        })
    }
    const getTablaCatExtensiones = ( data)  => {
        return new Promise((resolve,reject)=>{
            client.query(`SELECT * FROM catextensiones `,function(err,result,field){
                var string = JSON.stringify(result)
                var resultados =  JSON.parse(string)
                resolve(resultados)
            }) 
        })
    }

module.exports={ 
    getTablaCatExtensionesLibres,
    getTablaCatExtensiones,
    insertCatExtensiones,
    updateExtensiones,
    getTablaFechaNotificaciones,
    updatefechasNotificaciones,
    getTablalistaNivel,
    getTablaDataEmpleadoUser,
    updateNivel,
    getTablaEstados,
    updatePuesto,
    updatePersonal,
    updateOficina,
    updateArea,
    loginDataAdmin,
    getTablaNivel,
    getEntidad,
    getTablaAdmin,
    getTablaPuestoAndNivel,
    getTablaPuesto,
    getTablaPersonal,
    getTablaOficinas,
    getTablaArea,
    getTablaDataEmpleado,
    sigupCatNiveles,
    signupCatPuesto,
    signupCatRoles,
    signupCatArea,
    signupCatPersonal,
    signupCatOficina,
    getTablaEmpleadowhereId,
    deleteEmpleados,
    updateEmpleados,   
    updatePasswordEmpleados,
    getEmpleadosByCorreo, 
    signupDataAdmin,
    loginEmpleado,
    sigUpEmpleado,
    signupDataFechanotificaciones,   

}