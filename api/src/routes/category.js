const server = require('express').Router();
const { Categorias } = require('../db.js');

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
function isAdmin(req, res, next) {
    console.log('asdasdasd',req.user);
    if(req.user.rol==='admin') {
      next();
    } else {
      res.redirect('/');
    }
  }

server.get('/', (req, res, next) => {
	Categorias.findAll()
		.then(category => {
			res.send(category);
		})
		.catch(next);
});

server.get('/:id',(req, res, next) => {
    const id = req.params.id //
    return Categorias.findOne({
        where : {id}
    })
    .then(response => {
        res.json(response)
    })
    .catch(next);
})
     

server.post('/',isAdmin, function(req, res){
    return Categorias.create(
        {nombre: req.body.nombre,descripcion: req.body.descripcion}
    ).then(category =>{
       return res.json(category)
      })
    
  });

server.delete('/:id', isAdmin,function(req, res){
    const id = req.params.id
    return Categorias.destroy({
        where: { id }
    }).then(category =>{
       return res.json(category)
      })   
  });

  server.put('/:id', function(req, res){
    const id = req.params.id
    const update = {}
    if (req.body.nombre) {
        update.nombre = req.body.nombre
    }
    if (req.body.descripcion) {
        update.descripcion = req.body.descripcion
    }

    return Categorias.update(update, {where: { id }}
    ).then(category =>{
       return res.json(category)
      })
    
  });

module.exports = server;