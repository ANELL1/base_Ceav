const actions = require('../actions/userActions')

const getTablaDataEmpleado  =  (_ , data) =>{    
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getTablaDataEmpleado(variable)
}

const getEmpleadosByCorreo  =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getEmpleadosByCorreo(variable)
}

const loginEmpleado  =  (_ , data) =>{
    var cadena = data.data[0]
    var variable = cadena.split(",")
return actions.loginEmpleado(variable)
}
const getTablaEmpleadowhereId  =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getTablaEmpleadowhereId(variable)
}
const getTablaArea =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getTablaArea(variable)
}
const getTablaOficinas =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getTablaOficinas(variable)
}
const getTablaPersonal =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getTablaPersonal(variable)
}
const getTablaPuesto =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getTablaPuesto(variable)
}

const getTablaAdmin =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getTablaAdmin(variable)
}
const getEntidad =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getEntidad(variable)
}
const loginDataAdmin =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.loginDataAdmin(variable)
}
const getTablaPuestoAndNivel =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getTablaPuestoAndNivel(variable)
}
const getTablaNivel =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getTablaNivel(variable)
}
const getTablaEstados =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getTablaEstados(variable)
}
const getTablaDataEmpleadoUser =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getTablaDataEmpleadoUser(variable)
}
const getTablalistaNivel =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getTablalistaNivel(variable)
}
const getTablaFechaNotificaciones =  (_ , data) =>{
    var cadena= data.data[0]
    var variable = cadena.split(",")
return actions.getTablaFechaNotificaciones(variable)
}


module.exports={ 
    getTablaFechaNotificaciones,
    getTablalistaNivel,
    getTablaDataEmpleadoUser,
    getTablaEstados,
    getTablaNivel,
    loginDataAdmin,
    getEntidad,
    getTablaAdmin,
    getTablaPuestoAndNivel,
    getTablaPuesto,
    getTablaPersonal,
    getTablaOficinas,
    getTablaArea,
    getTablaEmpleadowhereId,  
    getEmpleadosByCorreo,
    getTablaDataEmpleado,
    loginEmpleado,
}