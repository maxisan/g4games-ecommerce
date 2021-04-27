const server = require('express').Router();
const bodyParser = require('body-parser');
const { User } = require('../db.js');
const { Product, Productorders, Order, Multimedia } = require('../db.js')
const { Op } = require('sequelize');
const bcrypt = require ('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();

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
function isAdmin(req, res, next) {
    if(req.user.rol===admin) {
      next();
    } else {
      res.redirect('/');
    }
}

server.put('edit/:userId/order',(req,res)=> {
    const id = req.params.id
    Order.findOne({where:{userId:id}})
    .then(order => {order.update({
      total: total + req.body,
    }).then(order => {
        return res.json(order)
    }).catch(err => {
        console.log("ESTE ES TU ERROR", err)
    })
  })})
// RUTA PARA AGREGAR ITEMS AL CARRITO
server.post('/:userId/order', (req, res, next) => {
    const {userId} = req.params
    const {gameId} = req.body.gameId
    const {precio} = req.body.precio
    console.log('precio', precio)
    Order.findOne({
        where: {
            userId,
            [Op.or]: [
                {estado: 'En proceso'},
                {estado: 'Vacio'},
            ]
        }
    })
    .then(order => {
        console.log({order})
        if(!order) {
            console.log('not order');
            User.findByPk(userId)
            .then(user => {
                Order.create({
                    userId,
                    emailEnvio: user.email,
                    total: precio,
                })
                .then(order => Productorders.create({
                        orderId: order.id,
                        productId: gameId,
                    })
                )
                .then(() => Product.findOne({
                    where: {id:gameId},
                    include: [Multimedia, Order]
                }))
                .then(game => res.send(game))
            })
            return
        }
        console.log('donde es esto',order)
        return Productorders.create({ orderId: order.id, productId: gameId})
        .then(po => {
            Order.findOne({
                where: {
                    id: po.orderId,
                }
            })
            .then(order => {
                order.estado = 'En proceso'
                order.total+= precio
                order.save()
                return order
            })
            
        })
        .then(() => Product.findOne({
            where: {id : gameId},
            include: [Multimedia, Order]
        }))
        .then(game => res.send(game))
    })
    .catch(next)

})

server.get('/', (req, res) => {
    User.findAll()
        .then(user => {
            res.send(user)
        }).catch(err => {
            console.log("ESTE ES TU ERROR", err)
        })
})

server.get('/:id/order', (req, res) => {
    const id = req.params.id
    return User.findAll({
        where: { id },
        include: Order
    }).then(json => {
        return res.json(json)
    }).catch(err => {
        console.log("ESTE ES TU ERROR", err)
    })
});


server.post('/', async (req, res) => { //
    let hashPassword = await bcrypt.hash(req.body.password, 10)
    ///// NODE MAILER
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPSSWD
        }
    });
    var mailOptions = {
        from: "G4.GAMES",
        to: req.body.email,
        subject: "Bienvenido a G4GAMES!",
        html: `
            <table border = "0" cellpadding="0" width="600px" background-color="#2d3436"
            bgcolor="#2d3436">
                <tr heigth="200px">
                    <td bgcolor="" width="600px">
                        <h1 style="color: #fff; text-align:center">Bienvenido</h1>
                        <p style="color: #fff; text-align:center">
                            <span style="color: #e84393">${req.body.username}</span>
                            a la aplicacion
                        </p>
                    </td>
                </tr>
                <tr bgcolor="#fff">
                    <td style="text-align:center">
                        <p style="color: #000">¡Un mundo de videojuegos a tu disposición!</p>
                    </td>
                </tr>
            </table>               
        `
    };
    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            res.status(500).send(error.message);
        } else {
            console.log("Email enviado correctamente");
            res.status(200).jsonp(req.body);
        }
    })
    return User.create({
        username: req.body.username,
        password: hashPassword,
        rol: req.body.rol,
        //historial:req.body.historial, 
        email: req.body.email
    }).then(user => {
        return res.json(user)
    }).catch(err => {
        console.log("ESTE ES TU ERROR", err)

    })

    

})




// RUTA DEVOLVER TODOS LOS PRODUCTOS DEL CARRITO
server.get('/:idUser/items', (req, res) => {

    const userId = req.params.idUser
    console.log('este el userid',userId)
    Product.findAll({
        include: [{model: Order, where: {userId,[Op.or]:[{estado:'Vacio'},{estado:'En proceso'}]}}, Multimedia],
    })
    .then(products => {
        console.log('estos son los products',products)
        return res.json(products)
    }).catch(err => {
        console.log('ERROR EN DEVOLVER TODOS LOS ITEMS', err)
    })

})
//RUTA PARA MODIFICAR LAS CANTIDADES DEL CARRITO
server.put('/:idUser/order', function(req, res, next){
    const userId = req.params.idUser
    const {productId, cantidad, orderId} = req.body;
    console.log('llego a la ruta, ', {userId, productId , cantidad, orderId})
    Productorders.findOne(
        {where: { orderId, productId }}
    )
    .then(op => {
        op.cantidad = cantidad;
        op.save()
        .then(() => {
            Product.findOne({
                where: {
                    id: productId
                },
                include: [Multimedia, Order]
            })
            .then(game => {
                console.log(game.orders[0].productorders);
                return res.json(game)
            })
        })
    })
    .catch(next)

});




server.put('/:id', (req, res) => {
    const {id} = req.params            

    return User.update(
        { estadoPassword: 'reset' },
        { where: { id }
    }).then(user => {
        return res.json(user)
    }).catch(err => { console.log("ESTE ES EL ERROR", err) })

})

/* server.put('/:id', async (req, res) => {
    const id = req.params.id
    let username = ""
    let hashPassword = await bcrypt.hash(req.body.password, 10)
    
    let email = ""

    if (req.body) {
        username = req.body.username,
            password = hashPassword,
            rol = req.body.rol,
            email = req.body.email
    }

    return User.update( //
        {
            username,
            password,
            rol,
            email
        }, {
        where: { id }
    }).then(user => {
        return res.json(user)
    }).catch(err => { console.log("ESTE ES EL ERROR", err) })

}) */


//RUTA PARA ELIMINAR UN username POR ID

server.put('/:id/deleteUser', (req, res) => {
    const {id} = req.params

    return User.update(
        { estadoUser: 'deleted' },
        {where: { id }
    })
    .then(user =>{
       return res.json(user)
    })
    .catch(err => { console.log("ESTE ES EL ERROR", err) })   
});

//RUTA PARA MODIFICAR CONTRASEÑA POR RESET

server.put('/newPass/:id', async (req, res) => {
    const {id} = req.params;
    let hashPassword = await bcrypt.hash(req.body.password, 10)
    const update = {}
    update.password = hashPassword;
    update.estadoPassword = 'ok';
    return User.update(update, { where: { id }
    })
    .then(user =>{
       return res.json(user)
    })
    .catch(err => { console.log("ESTE ES EL ERROR", err) })   
});




module.exports = server;    
