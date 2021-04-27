const {Product, Categorias, User, Order, Multimedia, producto_categorias, producto_multimedia} = require('./db')
const bcrypt = require('bcrypt')
module.exports = dbInitialize = () => {

    const assignImages = (folder, product) => {
        Multimedia.findAll({
            where: {folder}
        }).then(imgs => {
            imgs.forEach(img => {
                producto_multimedia.create({
                    productId: product.id,
                    multimediumId: img.id
                })
            })
        })
    }

    //Inicialización de Categorias: ////
    c1 = Categorias.create({
        nombre: 'accion',
        descripcion: 'de lucha y peleas. Basados en ejercicios de repetición'
    })
    c2 = Categorias.create({
        nombre: 'deporte',
        descripcion: 'fútbol, tenis, baloncesto y conducción. Recrean diversos deportes. Requieren habilidad, rapidez y precisión'
    })
    c3 = Categorias.create({
        nombre: 'estrategia',
        descripcion: 'aventuras, rol, juegos de guerra…Consisten en trazar una estrategia para superar al contrincante. Exigen concentración, saber administrar recursos, pensar y definir estrategias'
    })
    c4 = Categorias.create({
        nombre: 'arcade',
        descripcion: 'plataformas, laberintos, aventuras. El usuario debe superar pantallas para seguir jugando. Imponen un ritmo rápido y requieren tiempos de reacción mínimos'
    })
    Promise.all([c1,c2,c3,c4]).then(() => {

        //Inicialización de Productos:
        //01-Cyberpunk 2077
        p1 = Product.create({
            nombre: 'Cyberpunk 2077',
            descripcion: 'Cyberpunk 2077 es una historia de acción y aventura en mundo abierto ambientada en Night City, una megalópolis obsesionada con el poder, el glamur y la modificación corporal. Tu personaje es V, un mercenario que persigue un implante único que permite alcanzar la inmortalidad. Podrás personalizar las mejoras cibernéticas, las habilidades y el estilo de juego del personaje para dar forma a un mundo y a una historia que depende de tus decisiones.',
            descripcionCorta: 'Personaliza las mejoras cibernéticas y las habilidades del personaje',
            keyCode: 'AS58774KPW8X1',
            tamanio: 100,
            precio: 2500,
            stock: 10,
            fechaLanzamiento: '20 de Mayo de 2020',
            clasificacion: 'Mature 17+',
            desarrollador: 'CD Proyect Red'
        })
        .then(p => {
            producto_categorias.create({categoriaId: 1, productId: p.id})
            producto_categorias.create({categoriaId: 2, productId: p.id})
            assignImages('cyberpunk2077', p)
        });

        p2 = Product.create({
            nombre: `Assassin's Creed: Valhalla`,
            descripcion: 'Conviértete en Eivor, un poderoso saqueador vikingo y lidera a tu clan desde las inclementes costas de Noruega a un nuevo hogar en medio de las exuberantes tierras de cultivo de la Inglaterra del siglo IX. Explora un hermoso y misterioso mundo abierto donde te enfrentarás a brutales enemigos, saquearás fortalezas, construirás el nuevo asentamiento de tu clan y forjarás alianzas para conseguir la gloria y obtener un lugar en el Valhalla.',
            descripcionCorta: 'Conviértete en un poderoso saqueador vikingo y lidera a tu clan',
            keyCode: 'AS58774KPW8X2',
            tamanio: 100,
            precio: 2500,
            stock: 10,
            fechaLanzamiento: '02 de Mayo de 2015',
            clasificacion: 'Teen',
            desarrollador: 'Atari Interactive'
        })
        .then(p => {
            producto_categorias.create({categoriaId: 4, productId: p.id})
            assignImages('assassins-creed-valhalla', p);
        })

        p3 = Product.create({
            nombre: `Watch Dogs: Legion`,
            descripcion: 'En Watch Dogs: Legion, Londres enfrenta su propia decadencia... a menos que hagas algo al respecto. Crea una resistencia, contraataca y devuelve la ciudad a la gente. Es hora de levantarse.',
            descripcionCorta: 'Londres enfrenta su propia decadencia... debes hacer algo al respecto.',
            keyCode: 'AS58774KPW8X3',
            tamanio: 100,
            precio: 2500,
            stock: 10,
            fechaLanzamiento: '30 de Marzo de 2010',
            clasificacion: 'Teen',
            desarrollador: 'Naughty Dog'
        })
        .then(p => {
            producto_categorias.create({categoriaId: 2, productId: p.id})
            producto_categorias.create({categoriaId: 3, productId: p.id})
            assignImages('watch-dogs-legion', p);
        })

        p4 = Product.create({
            nombre: `Call of Duty: Black Ops Cold War`,
            descripcion: 'En Watch Dogs: Nada es lo que parece en la fascinante campaña para un jugador de Raven Software, donde te enfrentarás cara a cara a figuras históricas y verdades incómodas mientras luchas por todo el mundo en escenarios icónicos de la Guerra Fría como Berlín Este, Vietnam, la sede del KGB y más.',
            descripcionCorta: 'Nada es lo que parece en la campaña de Raven Software',
            keyCode: 'AS58774KPW8X4',
            tamanio: 100,
            precio: 2500,
            stock: 10,
            fechaLanzamiento: '15 de Enero de 2019',
            clasificacion: 'Mature 17+',
            desarrollador: 'Raven Software'
        })
        .then(p => {
            producto_categorias.create({categoriaId: 1, productId: p.id})
            assignImages('call-of-duty-black-ops-cold-war', p);
        })

        p5 = Product.create({
            nombre: `Ghost of Tsushima`,
            descripcion: 'Hacia fines del siglo XIII, el imperio mongol ha arrasado naciones enteras en su campaña por conquistar Oriente. La isla de Tsushima es el único obstáculo que se interpone entre la isla principal de Japón y una gigantesca flota invasora liderada por el astuto y despiadado general Khotun Khan.',
            descripcionCorta: 'El imperio mongol ha arrasado naciones enteras conquistando Oriente.',
            keyCode: 'AS58774KPW8X5',
            tamanio: 100,
            precio: 2500,
            stock: 10,
            fechaLanzamiento: '10 de Julio de 2020',
            clasificacion: 'Mature 17+',
            desarrollador: 'Ubisoft'
        })
        .then(p => {
            producto_categorias.create({categoriaId: 4, productId: p.id})
            assignImages('ghost-of-tsushima', p);
        })

        p6 = Product.create({
            nombre: `The Witcher 3: Wild Hunt`,
            descripcion: 'The Witcher 3 es la tercera entrega de la saga The Witcher desarrollada por CD Projekt para PS4, Xbox One y Pc. Se trata de un videojuego que mezcla elementos de aventura, acción y rol en un mundo abierto épico basado en la fantasía. El jugador controlará una vez más a Geralt de Rivia, el afamado cazador de monstruos, (también conocido como el Lobo Blanco) y se enfrentará a un diversificadísimo bestiario y a unos peligros de unas dimensiones nunca vistas hasta el momento en la serie, mientras recorre los reinos del Norte.',
            descripcionCorta: 'Tercera entrega de la saga The Witcher para PS4, Xbox One y Pc.',
            keyCode: 'AS58774KPW8X6',
            tamanio: 100,
            precio: 2500,
            stock: 10,
            fechaLanzamiento: '22 de Octubre 2018',
            clasificacion: 'Adults only 18+',
            desarrollador: 'CD Proyect Red'
        })
        .then(p => {
            producto_categorias.create({categoriaId: 2, productId: p.id})
            producto_categorias.create({categoriaId: 3, productId: p.id})
            assignImages('the-witcher-3-wild-hunt', p);
        })
    })
.catch(err => console.log(err))


}

