const server = require('express').Router();
const passport = require('passport')
const {User} = require('../db')

/*server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  server.options('http://localhost:3000', (req, res) => {
      // allowed XHR methods  
      res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
      res.send();
  });
});*/

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    console.log('estas logeado');
    next();
  } else {
    console.log('no estas logeado');
    res.redirect('/auth/login');
  }
}


server.get('/', (req, res) => {
  if(req.user) {
    return res.send(req.user);
  }
  return res.send(null)
  });
  
server.post('/', (req, res) => {
  const user = req.user;
  if(user) {
    console.log('Se validó')
    return res.send(user);
  }
  console.log('No se validó')
  return res.send(null)
});

server.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    if(req.user){
    res.send(req.user)};
    if(!req.user){
     res.send("esto es cualquier cosa")
    }
  }
);

server.post('/logout', (req, res) => {
  req.logOut();
  res.send({logOut: 'logout success'});
})


server.put('/promote/:idUser', function(req, res, next){
  const id = req.params.idUser
  return User.update({
        rol: 'admin',
      },
      {where:{id}})
      .then(admin=>{
        return res.json(admin)
      }).catch(err => {
        console.log("Error: ", err)
      })
});




server.get('/perfil', isAuthenticated, (req, res) => {
    res.send( req.user )
});

module.exports = server;