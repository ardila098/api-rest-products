

import { Schema, model } from 'mongoose'


// estos roles los importo en verifySignup para cuando colsuten venga aca y vea que existe alguno de este arreglo

export const ROLES = ["user","admin","moderator"]

// este Schema va ser para el rol que tiene cada usario

const roleSchema =new Schema({
    
    name: String,
    

}, {

    versionKey: false
})

export default model('Role', roleSchema);