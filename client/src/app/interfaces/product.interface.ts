export interface Product{
    _id: string;
    title: string;
    content: string;
    image: string;
    imageName: string;
    price: number;
    category: string;
    comments: object[];
    datos: {
        brand: string, //marca
        model: string, //modelo
        year: number, //año
        cylinderCapacity: number, //para vehiculos 
        kilometres: number, //para vehiculos
        gender: string, //para ropa
        typeOfGarment: string, //para ropa "tipo de prenda"
        waist: string, //para ropa "talle"
        color: string,
        totalArea: number, //perimetro
        rooms: number, //ambientes
        bathrooms: number, //baños
        age: number, //antiguedad
        location: string, //ubicacion
        weight: number, // peso
        power: number, //potencia
        wireless: string, // inalambrico
        voltage: number, //voltaje
        rolled: number, //bicicletas "rodado"
        frameSize: string, //tamaño de cuadro
    };
}