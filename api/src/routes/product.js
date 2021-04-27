const { Op } = require('sequelize')
const server = require('express').Router();
const { Product, producto_categorias, Categorias, producto_multimedia, Multimedia, Review } = require('../db.js');
const bodyParser = require('body-parser');
server.use(bodyParser.json());

/*server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    server.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});*/


server.get('/', (req, res, next) => {
	Product.findAll({
        include: [{
            model: Multimedia
        }, {
            model: Categorias
        }]
    })
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.post('/', function(req, res){
    console.log("estoy funcionando");
    const {nombre, descripcion, descripcionCorta, keyCode, tamanio, precio, stock, fechaLanzamiento, clasificacion, desarrollador} = req.body
    return Product.create({
        nombre,
        descripcion,
        descripcionCorta,
        keyCode,
        tamanio,
        precio,
        stock,
        fechaLanzamiento,
        clasificacion,
        desarrollador
    })
    .then(product =>{
       return res.json(product)
      })
    
  });

server.put('/:id',function(req, res){
    console.log("estoy cambiando");
    const id = req.params.id;
    const update = {}
    if (req.body.nombre) {
        update.nombre = req.body.nombre;
    }
    if (req.body.descripcion) {
        update.descripcion = req.body.descripcion;
    }
    if (req.body.descripcionCorta) {
        update.descripcionCorta = req.body.descripcionCorta;
    }
    if (req.body.fotos) {
        update.fotos = req.body.fotos;
    }
    if (req.body.videos) {
        update.videos = req.body.videos;
    }
    if (req.body.keyCode) {
        update.keyCode = req.body.keyCode;
    }
    if (req.body.tamanio) {
        update.tamanio = req.body.tamanio;
    }
    if (req.body.precio) {
        update.precio = req.body.precio;
    }
    if (req.body.fechaLanzamiento) {
        update.fechaLanzamiento = req.body.fechaLanzamiento;
    }
    if (req.body.clasificacion) {
        update.clasificacion = req.body.clasificacion;
    }
    if (req.body.desarrollador) {
        update.desarrollador = req.body.desarrollador;
    }
    

    return Product.update(update, {where: { id }}
    ).then(product =>{
       return res.json(product);
      })

  });

server.delete('/:id', function(req, res){
    console.log("estoy borrando");
    const id = req.params.id;

    return Product.destroy({
        where: { id }
    }).then(product =>{
       return res.json(product)
      })
  });


  server.get('/search', (req, res, next) => {
    const {query} = req.query;
    console.log(query)
	Product.findAll({
		where: {
			[Op.or]: [
                {
				    nombre: {
					    [Op.iLike]: `%${query}%` 
                    }
                },
                {
                    descripcion: {
                        [Op.iLike]: `%${query}%` 
                    }
                }
            ]
		},
        include: Multimedia
	})
	.then(productos => {
		if (productos) {
			res.status(200).send(productos)
		} else {
			res.send({error: 'No hay coincidencias'})
		}
	})
	.catch(next);
});

server.get('/:id', (req,res,next) => {
	const {id} = req.params;
	Product.findOne({
        where: { id },
        include: {
            model: Multimedia,
        }
    })
	.then(producto => res.send(producto))
	.catch(next);
})

server.post('/:productId/img/:multimediumId',  function(req, res, next){
    const {productId, multimediumId} = req.params
	producto_multimedia.create({
        productId,
        multimediumId
    })
	.then(result => {
        return res.json(result)
	})
	.catch(next)
});

server.delete('/:productId/img/:multimediumId', function(req, res,next){
    const {productId, multimediumId} = req.params
  producto_categorias.destroy({
      where: {
          productId,
          multimediumId
        }
    })
    .then(result => {
       return res.json(result)
      })
	  .catch(next)
  });

server.post('/:idProducto/categoria/:idCategoria', function(req, res, next){
    const {idProducto, idCategoria} = req.params
	producto_categorias.create({categoriaId: idCategoria, productId: idProducto})
	.then(producto => {
        return res.json(producto)
	})
	.catch(next)
});

server.delete('/:idProducto/categoria/:idCategoria',  function(req, res,next){
	const idProducto = req.params.idProducto
	const idCategoria = req.params.idCategoria
  producto_categorias.destroy({where:{productId:idProducto,categoriaId:idCategoria}})
    .then(product =>{
		
       return res.json(product)
      })
	  .catch(next)
  });

server.get('/categorias/:nombreCategoria', (req, res, next) => {
	const {nombreCategoria} = req.params;
	Product.findAll({
		include: [{
			model: Categorias,
			where: {
				nombre: nombreCategoria
            }
        },
        {
            model: Multimedia
        }]
	})
	.then(productos => res.send(productos))
	.catch(next);
});


//RUTA PARA POSTEAR UNA REVIEW
server.post('/:productId/review', function(req, res, next) {
    const productId = req.params.productId;
   /*  const userId = req.body.userId */
    return Review.create(
        {puntaje: req.body.puntaje, opinion: req.body.opinion, productId, /* userId */}
)   .then(review =>{
    console.log("ESTEE EL REVIEW", review)
    return res.json(review);
   })
   .catch(next);
});


//RUTA PARA MODIFICAR UNA REVIEW
server.put('/:productId/review/:reviewId', function(req, res, next){
    console.log("estoy entrando");
    const productId = req.params.productId;
    const id = req.params.reviewId;
    const update = {}
    if (req.body.puntaje) {
        update.puntaje = req.body.puntaje;
    }
    if (req.body.opinion) {
        update.opinion = req.body.opinion;
    }
    return Review.update(update, {where: { productId, id }}
        ).then(reviews =>{
           return res.json(reviews);
          })
          .catch(next);
})


//RUTA PARA BORRAR UNA REVIEW
server.delete('/:productId/review/:reviewId', function(req, res, next){
    console.log("estoy borrando");
    const productId = req.params.productId;
    const id = req.params.reviewId;

    return Review.destroy({
        where: { productId , id }
    }).then(reviews =>{
       return res.json(reviews);
      })
      .catch(next);
  });

//RUTA PARA TODAS LAS REVIEWS DE UN PRODUCTO
server.get('/:productId/review/', function(req, res, next){
    console.log("entrando");
    const id = req.params.productId;
    Review.findAll({
        include: [{
            model: Product,
            where: {
                id
            }
        }]
    })
		.then(reviews => {
			res.send(reviews);
        })
        .catch(next);
})
/*
//RUTA PARA TODOS LAS REVIES DE TODOS LOS PRODUCTOS
server.get('/:productId/review/', (req, res, next) => {
	Review.findAll()
		.then(review => {
			res.send(review);
		})
		.catch(next);
});
*/
  
module.exports = server;
