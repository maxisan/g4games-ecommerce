const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const categoryRouter = require('./category.js');
const userRouter = require('./user.js');
const imagesRouter = require('./images');
const orderRouter = require('./order.js')
const loginRouter = require('./auth')

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/productos', productRouter);
router.use('/categorias', categoryRouter);
router.use('/user', userRouter )
router.use('/order', orderRouter)
router.use('/images', imagesRouter )
router.use('/auth', loginRouter)


module.exports = router;
