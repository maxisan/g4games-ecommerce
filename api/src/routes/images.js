const server = require('express').Router();
const { Multimedia } = require('../db');
const cloudinary = require('cloudinary').v2

function isAdmin(req, res, next) {
  if(req.user.rol===admin) {
    next();
  } else {
    res.redirect('/');
  }
}

server.get('/get/:id', (req, res, next) => {
  const id = req.params.id
  Multimedia.findByPk(id)
  .then(image => res.send(image))
  .catch(next)
})

server.delete('/delete/:id', (req, res, next) => {
  const {id} = req.params;
  Multimedia.findOne({
    where: {id}
  })
  .then(image => {
    cloudinary.uploader.destroy(image.public_id)
    .then(() => image.destroy())
    return image
  })
  .then(image => res.send(image))
  .catch(next)
})

server.get('/', (req, res, next) => {
  Multimedia.findAll({
    order: [['updatedAt', 'DESC']]
  })
  .then(images => res.json(images))
  .catch(next)
})

server.put('/edit/:id', (req, res, next) => {
  console.log(req.body);
  const {title, alt, description, tags, position, public_id} = req.body;
  const id = req.params.id
  if (!tags) {
    updateTags = cloudinary.uploader.remove_all_tags(public_id);
  } else {
    updateTags = cloudinary.uploader.replace_tag(tags, public_id);
  }
  updateContext = cloudinary.uploader.add_context(
    `caption=${title}|alt=${alt}|description=${description}|position=${position}`,
    public_id
  );
  Promise.all([updateTags, updateContext])
  .then(() => {
    console.log('tags');
    Multimedia.findOne({
      where: {id}
    })
    .then(img => {
      console.log(img);
      img.update({
        caption: title || 'sin titulo',
        alt,
        description,
        tags,
        position,
      })
      img.save();
      return img
    })
    .then(img => res.send(img))
  })
  .catch(next);
})

server.put('/:productId/:id', (req, res, next) => {
    console.log('entre a images/:productId/:id');
    const {productId, id} = req.params;
    Multimedia.findByPk(id)
    .then(img => {
        console.log(img)
        return img.update({
        productId
    })})
    .then(response => res.send(response))
    .catch(next)
})

server.post('/upload', (req, res, next) => {
  const {image, title, alt, description, tags, position} = req.body
  cloudinary.uploader.upload(image, {
    context: `caption=${title}|alt=${alt}|description=${description}|position=${position}`,
    tags,

  })
  .then(response => {
    const public_id = response.public_id
    const url = response.url;
    const alt = response.context && response.context.custom.alt ? response.context.custom.alt : null;
    const caption = response.context && response.context.custom.caption ? response.context.custom.caption : 'Sin título';
    const position = response.context && response.context.custom.position ? response.context.custom.position : null;
    const tags =  response.tags && JSON.stringify(response.tags);
    
    
    Multimedia.create({
      public_id,
      caption,
      position,
      alt,
      url,
      tags,
    })
    .then(image => res.send(image))
  })
  .catch(next)
})

module.exports = server;