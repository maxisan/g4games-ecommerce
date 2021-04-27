const cloudinary = require('cloudinary');
const {Multimedia} = require('./db.js')
const dbInitialize = require('./dbInitialize')

//Acá viene el proceso de "cargar las fotos (urls)" a la base de datos
module.exports = multimediaUpload = () => {


    cloudinary.v2.api.resources({
        max_results: 500,
        context: true,
        tags: true,
        metadata: true,

    },
    
    (error, result) => {
        if (error) console.log(error);
    })
    .then(res => {

        const getFolder = (route) => {
            array = route.split('/');
            if (array.length > 1) return array[0]
        }   

    //Tenemos un array con todas las fotos cargadas, tengo que hacer un forEach
    //para crear el modelo multimedia de cada foto
    //por ahora, trabajo solo con fotos

        const registeredImages = res.resources.map(image => {
            const url = image.url;
            const alt = image.context && image.context.custom.alt ? image.context.custom.alt : null;
            const caption = image.context && image.context.custom.caption ? image.context.custom.caption : 'sin titulo';
            const folder = getFolder(image.public_id);
            const public_id = image.public_id;
                        
            return Multimedia.create({
                public_id,
                caption,
                url,
                alt,
                folder,
            })
        })
        return registeredImages;
    })
    .then(registeredImages => {
        return Promise.all(registeredImages)
        .then(() => Multimedia.count().then(count => console.log(`Se cargaron ${count} imágenes en la base de datos`)))
    })
    .then(() => { dbInitialize(); })
}
