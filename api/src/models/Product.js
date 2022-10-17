const mongoose = require('mongoose');
const { Schema } = mongoose;


const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
    isNewProduct: {
        type: String,
    },
    image: {
        type: String,
    },
    imageName: {
        type: String,
    },
    price: {
        type: Number,
    },
    category: {
        type: String,
    },
    datos: {
        brand: String, //marca
        model: String, //modelo
        year: Number, //año
        cylinderCapacity: Number, //para vehiculos 
        kilometres: Number, //para vehiculos
        gender: String, //para ropa
        typeOfGarment: String, //para ropa "tipo de prenda"
        waist: String, //para ropa "talle"
        color: String,
        totalArea: Number, //perimetro
        rooms: Number, //ambientes
        bathrooms: Number, //baños
        age: Number, //antiguedad
        location: String, //ubicacion
        weight: Number, // peso
        power: Number, //potencia
        wireless: String, // inalambrico
        voltage: Number, //voltaje
        rolled: Number, //bicicletas "rodado"
        frameSize: String, //tamaño de cuadro
    },
    stock: {
        type: Number,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],

})

module.exports = mongoose.model('Product', ProductSchema)