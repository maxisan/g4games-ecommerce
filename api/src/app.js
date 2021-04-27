const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const session  = require('express-session');
const { User, Order } = require('./db') ;
const bcrypt = require ('bcrypt');
const mercadopago = require ('mercadopago');
const nodemailer = require('nodemailer');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const { GITHUB_CLIENTID, GITHUB_SECRET, GOOGLE_CLIENTID, GOOGLE_SECRET } = process.env;

//AUTENTICACION
//Al crear usuario redirigir al login.
//Loguear con usuario y password
//Almacenar la sesion
//En la página login, si el usuario está logueado, redirigir a perfil
//El carrito de visitante se debe guardar hasta que el usuario se loguee
//Validar permisos de admin cuando va a la ruta admin
//logout debe destruir la sesion
//Pedir login/registro cuando se quiere avanzar al checkout del carrito
//Cierre de sesion después de 1 hora de inactividad
//Opcion "Mantener sesión iniciada" para que no venza la sesion
//


//Autenticacion

passport.use(new Strategy(
  function(username, password, done) {
    
    User.findOne({
      where: {username}
    })
      .then((user) => {
        let isEqual = bcrypt.compare(password, user.password)
        if(!user) {
          return done(null, false);
        }
        if(!isEqual) {
          return done(null, false);
        }
        return done(null, user);
      })
    .catch(err => {
      return done(err);
    })
  }
));

/* passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENTID,
  clientSecret: GITHUB_SECRET,
  callbackURL: "http://localhost:3001/auth/github/callback"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile)
  /* User.findOrCreate({ id: profile.id,
                      username: profile.username   }, function (err, user) {
    return cb(err, user); */
  /* User.findOne({
    where: { githubId: profile.id }
  })
  .then(user => {
      console.log({user})
      if(!user) {
          console.log('no user')
          User.create({
              githubId: profile.id,
              username: profile.username
          })
          .then(user => {cb(null, user)} )
        }
      else{
        return cb(null, user)
      }
  });
  
}
)); */ 

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENTID,
  clientSecret: GOOGLE_SECRET,
  callbackURL: "http://localhost:3001/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {  
  console.log(profile)
  User.findOne({
    where: { googleId: profile.id }
  })
  .then(user => {
      console.log({user})
      if(!user) {
          console.log('no user')
          User.create({
              googleId: profile.id,
              username: profile.displayName,  
              email: profile.emails[0].value
          })
          .then(user => {cb(null, user)} )
        }
      else{
        return cb(null, user)
      }
  });
  
}
));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch(err => {
      return done(err);
    })
});

const server = express();
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  /*  res.header('Access-Control-Allow-Origin: *') */ 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next();
});



server.name = 'API';
 
server.use(morgan('dev'));
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true,  limit: '50mb'  }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next) => {
  console.log('session: ',req.session);
  console.log('user: ', req.user);
  next();
});

/* server.get('/auth/github',
  passport.authenticate('github'));

server.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: 'http://localhost:3000/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/perfil');
  }); */

server.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

server.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/perfil');
  });

server.use('/', routes);





// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

//Integracion Mercado Pago !!!

//credenciales 

mercadopago.configure({
  access_token: 'APP_USR-6623451607855904-111502-1f258ab308efb0fb26345a2912a3cfa5-672708410'
});

//preferencias
server.post('/checkout', (req,res) =>{
 console.log("este req", req.body)
  let preference = {
    items: [
      {
        title: "G4 Games",
        unit_price: req.body.total,
         quantity: 1, 
      }
    ]
  };
  
  mercadopago.preferences.create(preference)
    .then(function(response){
    console.log(response.body.init_point)
    res.json(response)
    
    }).catch(function(error){
        console.log("esteee es tu error",error);
        });
        Order.findOne({where:{userId: req.body.perfil.id,
                               estado: 'En proceso'}})
        .then(order => {order.update({
          estado: "Aprobado",
        })
      })
      
      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPSSWD
        }
    });
    /* var claves = req.body.carrito.reducer((ac, el)=> {ac + el.nombre, el.keyCode }, '') */
    var mailOptions = {
        from: "G4.GAMES",
        to: req.body.perfil.email,
        subject: "Recibo de compra",
        html: `
            <table border = "0" cellpadding="0" width="600px" background-color="#2d3436"
            bgcolor="#2d3436">
                <tr heigth="200px">
                    <td bgcolor="" width="600px">
                        <h1 style="color: #fff; text-align:center">¡Compra realizada!</h1>
                        <p style="color: #fff; text-align:center">
                            <span style="color: #e84393">${req.body.perfil.username}</span>
                            gracias por tu compra. Producto y KeyCode ${req.body.claves} 
                        </p>
                        <p style="color: #fff; text-align:center"> El total es de $${req.body.total} </p>
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

})
   





module.exports = server;