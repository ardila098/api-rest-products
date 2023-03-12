

//el app js sirve para configurar la aplicacion de express

import express from 'express';
import morgan from 'morgan';
//puedo importar el package json y traer la version , el author ,descripcion
import pkg from '../package.json'

import {createRoles} from './libs/initialSetup';

import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes'


const app = express()

createRoles();

app.set('pkg', pkg);



//decirle a la app que use morgan cuando este en dev "modo desarrollo"
app.use(morgan('dev'));

//esto es para que me traiga los datos en formato json desde el servidor
app.use(express.json());

//creamos las rutas
//cuando cree la ruta inicial quiero que respondas


// en esta ruta estoy trayendo las propiedades del json 

app.get('/', (req, res) => {
    
    res.json({
    
        name: app.get('pkg').name,
        description: app.get('pkg').description,
    


    })

});


app.use('/api/products', productsRoutes)

app.use('/api/auth', authRoutes)

app.use('/api/users', userRoutes)


export default app;










