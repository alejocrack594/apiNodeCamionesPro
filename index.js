var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/empresa', 
{useUnifiedTopology:true,useNewUrlParser: true})
.then(()=>{
        console.log('conexion Exitosa');

        app.listen(port,()=>{
            console.log('servidor corriendo en el puerto localhost:3800');
        })
    }
).catch(err=>console.log(err));
