process.on("message", (cant) => {
    console.log(cant)
    const cantidadVeces = {};
    for(let i = 0; i < cant; i++){
        const numero = Math.floor((Math.random() * 1000) + 1)
        if(!cantidadVeces[numero]) cantidadVeces[numero] = 0;
        cantidadVeces[numero]++ 
    }
    console.log(cantidadVeces)
    process.send(cantidadVeces)
    process.exit();
})

process.send("ready")