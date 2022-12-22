import mongoose, {Schema} from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

class DB {
    constructor(schema){
        this.schema = schema
    }

    async conseguirData(){
        try {
            return await this.schema.find({})
        } catch (error) {
            console.log("Hubo un error al conseguir la data de la tabla " + this.schema + "\n" + error)
            throw Error("error")
        }
    }

    async añadirData(data){
        try {
            const result = await this.schema(data).save()
            return result
        } catch (error) {
            console.log("Hubo un error al añadir la data de la coleccion " + this.schema + "\n" + error)
            throw Error("error")
        }
    }
}

class Mensajes extends DB {
    constructor(){
        super(mongoose.model("mensajes", {
            author: {
                id: {type: String, required: true},
                nombre: {type: String, required: true},
                apellido: {type: String, required: true},
                edad: {type: Number, required: true},
                alias: {type: String, required: true},
                avatar: {type: String, required: true}
            },
            text: { type: String, required: true}
        }))
    }

    async agregarMensaje(mensaje){
        await super.añadirData(mensaje);
    }

    async leerMensajes(){
        return await super.conseguirData()
    }
}

class Productos extends DB {
    constructor(){
        super(mongoose.model("productos", {
            nombre: {type: String, required: true},
            precio: {type: Number, required: true},
            url: {type: String, required: true}
        }))
    }

    async agregarProducto(producto){
        await super.añadirData(producto);
    }

    async leerProductos(){
        return await super.conseguirData()
    }
}

export {
    Productos,
    Mensajes
}