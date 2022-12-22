import { Router } from 'express';
import { faker } from '@faker-js/faker';
import {fork} from "child_process";

faker.locale = 'es';
const { commerce, image } = faker;

const router = Router();

router.get('/productos-test', (req, res, next) => {
      try {
            let data = {productos: []};

            for (let i = 0; i < 5; i++) {
                  data.productos.push({
                        nombre: commerce.product(),
                        precio: commerce.price(),
                        url: image.technics(),
                  });
            }
            console.log(data);
            res.render("productos", data);
      } catch (error) {
            next(error);
      }
});

router.get("/random", (req, res) => {

      const {cant = 1000000} = req.query;
      if(isNaN(Number(cant))){
          res.json({error: "El numero ingresado es un string"})
      } else {
          console.log(cant)
          const child = fork("calculo.js");
            
            child.on("message", (result) => {
                  if(result == "ready"){
                        child.send(Number(cant))
                  } else {
                        console.log("llegue aqui")
                        res.json(result)
                  }
            })
      }
})

export default router;