const server = require('express').Router();
const bodyParser = require('body-parser');
const { Order , Product, Productorders} = require('../db.js');


function isAdmin(req, res, next) {
    if(req.user.rol===admin) {
      next();
    } else {
      res.redirect('/');
    }
  }

server.use(bodyParser.json());

server.put('/:id/sumarproducto',(req,res)=> {
  const id = req.params
  const precio = req.body.precio
  console.log('entreeeeee',id,precio);
  Order.findOne(
    {where: id})
    .then(order => {
  console.log('orden: ',order,precio)
  order.total+=precio
  order.save()
  console.log(order.total)
   return order})
  .catch()
})

server.put('/:id/restarproducto',(req,res)=> {
  const id = req.params
  const precio = req.body.precio
  console.log('entreeeeee',id,precio);
  Order.findOne(
    {where: id})
    .then(order => {
  console.log('orden: ',order,precio)
  order.total-=precio
  order.save()
  console.log(order.total)
   return order})
  .catch()
})

server.delete('/:orderId/removerproducto', (req, res, next) => {
  const {precio} = req.body.precio
  const userId = req.body.userId
  const {orderId} = req.params;
  const {productId} = req.body;
  Productorders.findOne({
    where: {orderId, productId}  
  })
  .then(op => op.destroy()
    .then(result => res.send(result))
  ).then(order => {
    Order.findOne(
    {where: order.id})
    .then(order => {
  console.log('aaaaaaaaaaasd',order, 'precioooooo',precio)
  console.log('oreder.total',order.total,'-',precio)
  order.total-=precio
  order.save()
  console.log(order.total)
   return order})
  .catch(next)
})})

//RUTA PARA ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO
server.delete('/clear/:orderId', function(req, res, next){
  const orderId = req.params.orderId
  Productorders.findAll({
      where: { orderId }
  })
  .then( po => {
    deleted = po.map(product => product.destroy())
    Promise.all(deleted)
    .then(() => {
      Order.findOne({
        where: {id: orderId}
      })
      .then(order => {
        order.estado = 'Vacio';
        order.total = 0;
        order.save()
        return order;
      })
      .then(order => res.send(order))
    })
  })
  .catch(next)   
});



server.get('/',(req,res) => {
    Order.findAll()
    .then(order => {
        res.send(order)
    }).catch(err => { console.log("ESTE ES TU ERROR", err)
 })
 });

 server.get('/historial/:id',(req,res) => {
  const id = req.params.id //
  return Order.findAll({
      where : {userId : id},
      include: {model: Product}
  }).then(response => {
      res.json(response)
  }).catch(err => { console.log("ESTE ES TU ERROR", err)
  })
  })
   

server.get('/:id',(req,res) => {
const id = req.params.id //
return Order.findAll({
    where : { id },
    include: {model: Product}
}).then(response => {
    res.json(response)
}).catch(err => { console.log("ESTE ES TU ERROR", err)
})
})
 
 
 server.post('/:userId',(req,res, next) => { //para que funcione esta vamos primero a tener que crear un usuario sino tira error
  const {userId} = req.params
  const user = req.user  
  return Order.create({
        total: 0,           
        emailEnvio: user.email,
        userId
    }).then(order => {
        return res.json(order)
    }) .catch(next)
 }); 




 server.put('/:id', (req,res) => {
  const id = req.params.id
  return Order.update({
    total: req.body.total,
    emailEnvio: req.body.emailEnvio,
    estado: req.body.estado

  },
  {where:{id}})
  .then(()=> {Order.findOne(id)})
  .then(order => {
      return res.json(order)
  }).catch(err => {
      console.log("ESTE ES TU ERROR", err)
  })
});

 module.exports = server;