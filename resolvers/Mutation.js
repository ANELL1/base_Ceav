const actions = require('../actions/userActions')


    const sigUpEmpleado  =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.sigUpEmpleado(variable)    
    }

    const updatePasswordEmpleados  =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
        return actions.updatePasswordEmpleados(variable)    
    }
    const updateEmpleados = (_,data)=>{       
        var cadena = data.data[0]
        var variable = cadena.split(",")
        return actions.updateEmpleados(variable)
    }
     const deleteEmpleados = (_, data)=>{
         var cadena = data.data[0]
         var variable = cadena.split(",")
         return actions.deleteEmpleados(variable)
     }
     const signupCatOficina = (_, data) =>{
         var cadena = data.data[0]
         var variable = cadena.split(",")
         return actions.signupCatOficina(variable)
     }
     const signupCatPersonal = (_, data) =>{
        var cadena = data.data[0]
        var variable = cadena.split(",")
        return actions.signupCatPersonal(variable)
    }
    const signupCatArea = (_, data) =>{
        var cadena = data.data[0]
        var variable = cadena.split(",")
        return actions.signupCatArea(variable)
    }
    const signupCatRoles = (_, data) =>{
        var cadena = data.data[0]
        var variable = cadena.split(",")
        return actions.signupCatRoles(variable)
    }
    const signupCatPuesto = (_, data) =>{
        var cadena = data.data[0]
        var variable = cadena.split(",")
        return actions.signupCatPuesto(variable)
    }
    const signupDataAdmin = (_, data) =>{
        var cadena = data.data[0]
        var variable = cadena.split(",")
        return actions.signupDataAdmin(variable)
    }
    const updateArea = (_, data) =>{
        var cadena = data.data[0]
        var variable = cadena.split(",")
        return actions.updateArea(variable)
    }
    const updateOficina = (_, data) =>{
        var cadena = data.data[0]
        var variable = cadena.split(",")
        return actions.updateOficina(variable)
    }
    const updatePersonal =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
    return actions.updatePersonal(variable)
    }
    const updatePuesto =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
    return actions.updatePuesto(variable)
    }
    const signupDataFechanotificaciones =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
    return actions.signupDataFechanotificaciones(variable)
    }
    const sigupCatNiveles =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
    return actions.sigupCatNiveles(variable)
    }
    const updateNivel =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
    return actions.updateNivel(variable)
    }
    const updatefechasNotificaciones =  (_ , data) =>{
        var cadena= data.data[0]
        var variable = cadena.split(",")
    return actions.updatefechasNotificaciones(variable)
    }
    const updateExtensiones =  (_ , data) =>{
        // console.log("updateExtensiones mutation",data)
        var cadena= data.data[0]
        var variable = cadena.split(",")
    return actions.updateExtensiones(variable)
    }


module.exports={
    updateExtensiones,
    updatefechasNotificaciones,
    updateNivel,
    signupDataFechanotificaciones,
    updatePuesto,
    updatePersonal, 
    updateOficina,
    updateArea,
    signupDataAdmin,
    sigupCatNiveles,
    signupCatPuesto,
    signupCatRoles,
    signupCatArea,
    signupCatPersonal,
    signupCatOficina,
    deleteEmpleados,
    updateEmpleados,
    sigUpEmpleado,
    updatePasswordEmpleados

}