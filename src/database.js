

import mongoose  from "mongoose"

//hago la conexion con mongo y localhost y la base de datos se va llamar companydb y le pongo un then y cash para verificar conexion



mongoose.connect("mongodb://Localhost/companydb",{
    useNewUrlParser: true,
    useUniFiedTopology: true,
    
})

    .then(db => console.log('Db is conected'))
    .catch(error =>console.log(error))