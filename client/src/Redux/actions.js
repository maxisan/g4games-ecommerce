export const ADDPRODUCT = "ADDPRODUCT";
export const SEARCHBAR = "SEARCHBAR";
export const GETALLPRODUCTS = 'GETALLPRODUCTS';
export const GETPRODUCT="GETPRODUCT";
export const ADDCATEGORY = "ADDCATEGORY";
export const GETALLCATEGORIES = "GETALLCATEGORIES";
export const GETCATEGORY = "GETCATEGORY";
export const FILTERPRODUCTSBYCATEGORY = "FILTERPRODUCTSBYCATEGORY";
export const ADDUSER = "ADDUSER";
export const RESETFILTER = 'RESETFILTER';
export const GETALLIMAGES = 'GETALLIMAGES';
export const ADDIMAGE = 'ADDIMAGE';
export const REMOVEIMAGE = 'REMOVEIMAGE';
export const CLEARIMAGES = 'CLEARIMAGES';
export const GETORDERS = 'GETORDERS';
export const GETORDER = 'GETORDER';
export const ADDTOSHOPPINGCART = 'ADDTOSHOPPINGCART';
export const GETSHOPPINGCART = 'GETSHOPPINGCART';
export const EDITCATEGORY = 'EDITCATEGORY';
export const DELETEPRODUCT= "DELETEPRODUCT";
export const EDITPRODUCT= "EDITPRODUCT";
export const EDITORDER = "EDITORDER";
export const CLEARSHOPPINGCART = "CLEARSHOPPINGCART";
export const DELETECATEGORY = "DELETECATEGORY";
export const GETALLUSERS = 'GETALLUSERS';
export const DELETEUSER = 'DELETEUSER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ADDREVIEW = 'ADDREVIEW';
export const GETALLREVIEWS = 'GETALLREVIEWS';
export const GETPERFIL = 'GETPERFIL';
export const AUTENTICADO = 'AUTENTICADO';
export const NO_AUTENTICADO = 'NO_AUTENTICADO'
export const USERAADMIN = 'USERAADMIN';
export const ACTUALIZACANTIDAD = 'ACTUALIZACANTIDAD';
export const QUITARPRODUCTO = 'QUITARPRODUCTO';
export const RESETPASSWORD = 'RESETPASSWORD';
export const CARGARIMAGEN = 'CARGARIMAGEN';
export const ELIMINAIMAGEN = 'ELIMINAIMAGEN';
export const EDITARIMAGEN = 'EDITARIMAGEN';
export const OBTENERDATAIMAGEN = 'OBTENERDATAIMAGEN';
export const GETORDERSBYID = 'GETORDERSBYID';
export const RESETCARRITO = 'RESETCARRITO';
export const NEWPASSWORD = 'NEWPASSWORD';
export const EDITTOTALORDER = 'EDITTOTALORDER';

export function clearImages() {
    return {
        type: CLEARIMAGES,
    }
}

export function obtenerDataImagen(id) {
    return function (dispatch) {
        fetch(`http://localhost:3001/images/get/${id}`)
        .then(response => response.json())
        .then(image => dispatch({
            type: OBTENERDATAIMAGEN,
            image
        }))
    }
}

export function editarImagen(img) {
    return function (dispatch) {
        fetch(`http://localhost:3001/images/edit/${img.id}`, {
            credentials: 'include',
            method: 'PUT',
            body: JSON.stringify(img),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then(response => response.json())
        .then(image => dispatch({
            type: EDITARIMAGEN,
            image
        }))
    }
}

export function eliminaImagen(id) {
    return function(dispatch) {
        fetch(`http://localhost:3001/images/delete/${id}`, {
            credentials: 'include',
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(image => {
            console.log(image);
            dispatch({
                type: ELIMINAIMAGEN,
                image,
            })
        })
    }
}

export function cargarImagen(imageData) {
    return function(dispatch) {
        fetch('http://localhost:3001/images/upload', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(imageData),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then(res => res.json())
        .then(image => {
            dispatch({
                type: CARGARIMAGEN,
                image
            })
        })
    }
}

export function sumarProducto(orderId,precioProducto) {
    const precio={
        'precio':precioProducto
    }
    return function(dispatch) {
        fetch(`http://localhost:3001/order/${orderId}/sumarproducto`, {
            credentials: 'include',
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(precio),
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then(res => res.json())
        .then(json => console.log(json))
    }
}
                
    
export function restarProducto(orderId,precioProducto) {
    const precio={
        'precio':precioProducto
    }
    return function(dispatch) {
        fetch(`http://localhost:3001/order/${orderId}/restarproducto`, {
            credentials: 'include',
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(precio),
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then(res => res.json())
        .then(json => console.log(json))
        
    }
}

export function quitarProducto (productId, orderId, autenticado,precioProducto, userId) {
    console.log('precio a borrar',precioProducto);
    const precio={
        'precio':precioProducto
    }
    return function (dispatch) {
        if (autenticado) {
            fetch(`http://localhost:3001/order/${orderId}/removerproducto`, {
                credentials: 'include',
                method: 'DELETE',
                body: JSON.stringify({productId,precio,userId}),
                headers:{
                    "Content-type": "application/json; charset=UTF-8",
                } 
            })
            .then(res => res.json())
            .then(result => console.log(result))
            .then(() => dispatch({
                type: QUITARPRODUCTO,
                productId
            }))
            return
        }
        var carrito = JSON.parse(localStorage.getItem('carrito'));
        carrito = carrito.filter(g => g.id !== productId);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        dispatch({
            type: QUITARPRODUCTO,
            productId
        })
        return
    
        }
}

export function actualizaCantidad (userId, productId, orderId, cantidad, autenticado) {
    return function(dispatch) {
        console.log('inicio de actualizaCant', {userId, productId, orderId, cantidad})
        if (autenticado) {
            fetch(`http://localhost:3001/user/${userId}/order`, {
                credentials: 'include',
                method: 'PUT',
                body: JSON.stringify({productId, orderId, cantidad}),
                headers:{
                    "Content-type": "application/json; charset=UTF-8",
                } 
            })
            .then(res => res.json())
            .then(game => {
                console.log({game});
                const cant = game.orders[0].productorders.cantidad
                dispatch({
                    type: ACTUALIZACANTIDAD,
                    productId,
                    cantidad: cant,
                    autenticado,
                })
            })
            .catch(err => console.log(err))
            return    
        }
        var carrito = JSON.parse(localStorage.getItem('carrito'))
        console.log({carrito});
        carrito = carrito.map(g => {
            if (g.id === productId) {
                g.cantidad = cantidad;
            }
            return g;
        })
        localStorage.setItem('carrito', JSON.stringify(carrito));
        dispatch({
            type: ACTUALIZACANTIDAD,
            productId,
            cantidad,
        })
    }
}


export function autenticationValidate() {
    return function(dispatch) {
        fetch('http://localhost:3001/auth', {
            credentials: 'include',
            method: 'POST',
        })
        .then(res => res.json())
        .then( user => {
            console.log('Validado el usuario: ',user)
            if (user) {
                dispatch({
                    type: AUTENTICADO,
                    user,
                })
            } else {
                console.log('Usuario no validado')
                dispatch({
                    type: NO_AUTENTICADO,
                })
            }
        })
    }
}

export function userAAdmin(idUser){
    return function(dispatch){
    return fetch(`http://localhost:3001/auth/promote/${idUser}`  , {
        credentials: 'include',
        method: 'PUT',
        mode: 'cors', 
        cache: 'default',
        headers:{
            "Content-type": "application/json; charset=UTF-8",
        } 
    }) 
    .then(json => {
        console.log(json);
        dispatch({
            type: USERAADMIN,
            payload: json,
        })
    })
    .catch(err => console.log( "Error: ",err))
    }
}


export function login(input) {
    return function(dispatch) {
        fetch('http://localhost:3001/auth/login', {
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(input),
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then(res => res.json())
        .then(user => {
            console.log("SOY EEEEEL USER",user);
            dispatch({
                type: AUTENTICADO,
                user
            })
        })
        
    }
}

export function logout(input) {
    return function(dispatch) {
        fetch('http://localhost:3001/auth/logout', {
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(input),
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then(res => res.json())
        .then(json => console.log(json))
        
    }
}



export function getAllReviews (id) {
    return function(dispatch) {
        
        fetch(`http://localhost:3001/productos/${id}/review/`)
        .then(response => response.json())
        .then(json => { 
            dispatch({
            type: GETALLREVIEWS, 
            reviews: json,
        })
    })
    .catch(err => console.log(err));
    }
}

export function removeImage(id) {
    return {
        type: REMOVEIMAGE,
        id
    }
}

export function addImage(id) {
    return {
        type: ADDIMAGE,
        id
    }
}

export function getAllImages () {
    return function(dispatch) {
        fetch('http://localhost:3001/images')
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: GETALLIMAGES,
                json
            })
        })
    }
}
//'/:productId/review/'

export function clearShoppingCart(carrito, autenticado){
    return function(dispatch){
        if (autenticado) {
            const orderId = carrito[0].orders[0].id
            return fetch(`http://localhost:3001/order/clear/${orderId}`  , {
                credentials: 'include',
                method: 'DELETE',
                mode: 'cors', 
                cache: 'default',
                headers:{
                    "Content-type": "application/json; charset=UTF-8",
                } 
            })
            .then(response => response.json()) 
            .then(order => {
             console.log(order)
                dispatch({
                    type: CLEARSHOPPINGCART,
                })
            })
            .catch(err => console.log(err));
        }
        localStorage.setItem('carrito', JSON.stringify([]));
        dispatch({
            type: CLEARSHOPPINGCART
        })

    }
}


export function getShoppingCart(userId, autenticado){
    return function(dispatch){
        if (autenticado) {
            fetch(`http://localhost:3001/user/${userId}/items`)
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: GETSHOPPINGCART,
                    carrito: json
                })
            })
            .catch(err => console.log(err));
            return
        }
        var carrito = JSON.parse(localStorage.getItem('carrito'))
        if (!carrito) carrito = [];
        dispatch({
            type: GETSHOPPINGCART,
            carrito
        })    
    }
}

export function editTotalOrder(game,perfil,orden){
    console.log('llegueeeeeeeeeeee',game,perfil,orden)
    const precio={
        'precio':game.precio
    }
    return function(dispatch){
    return fetch(`http://localhost:3001/user/edit/${perfil.id}/order`  , {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(precio),
        mode: 'cors', 
        cache: 'default',
        headers:{
            "Content-type": "application/json; charset=UTF-8",
        } 
    }) 
    .then(json => {
    console.log('debería ser el precio',json)
        dispatch({
            type: EDITTOTALORDER,
            payload: json
        })
    })
    .catch(err => console.log(err))
    }
}

export function addToShoppingCart (game, user, autenticado) {

    return function(dispatch){
        if (autenticado) {
            const userId = user.id;
            const gameId = {gameId: game.id}
            const precio = {precio: game.precio}
            console.log('precio',userId,gameId,'aasd',precio);
            fetch(`http://localhost:3001/user/${userId}/order`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({gameId,precio}), 
                headers:{
                    "Content-type": "application/json; charset=UTF-8",
                }  
            })         
            .then(response => response.json())
            .then(game => {
                console.log("este es el json", game)
                dispatch({
                    type: ADDTOSHOPPINGCART,
                    game,
                })
            })
            .catch(err => console.log(err))
            return    
        }
        if (!localStorage.getItem('carrito')) {
            localStorage.setItem('carrito', '[]')
        }

        var carrito = JSON.parse(localStorage.getItem('carrito'))
        console.log(carrito);
        var enCarrito = carrito.find(e => e.id === game.id);

        if (enCarrito) {
            game.cantidad = enCarrito.cantidad + 1
            carrito = carrito.filter(g => g.id !== game.id).concat(game);
            localStorage.setItem('carrito', JSON.stringify(carrito))
            dispatch({
                type: ACTUALIZACANTIDAD,
                game,
            })    

        } else {
            game.cantidad = 1
            carrito = carrito.filter(g => g.id !== game.id).concat(game);
            localStorage.setItem('carrito', JSON.stringify(carrito))
            dispatch({
                type: ADDTOSHOPPINGCART,
                game,
            })    
        }

    }
}

export function getAllProducts () {
    return function(dispatch) {
        
        fetch('http://localhost:3001/productos')
        .then(response => response.json())
        .then(json => { 
           
            dispatch({
            type: GETALLPRODUCTS, 
            juegos: json,
        })
    })
    .catch(err => console.log(err));
    }
}

export function getAllCategories () {
    return function(dispatch) {
        fetch('http://localhost:3001/categorias')
        .then(response => response.json())
        .then(json => { 
            dispatch({
            type: GETALLCATEGORIES, 
            categories: json,
        })
    })
    .catch(err => console.log(err));
    }
}

export function getProduct(id) {
    return function(dispatch){
        console.log( id)
        fetch(`http://localhost:3001/productos/${id}`)
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: GETPRODUCT,
                id: json
            })
        })
     .catch(err => console.log(err))
    }
}
export function getCategory(id) {
    return function(dispatch){
        console.log( id)
        fetch(`http://localhost:3001/categorias/${id}`)
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: GETCATEGORY,
                id: json
            })
        })
     .catch(err => console.log(err))
    }
}
export function addCategory(input){
    console.log('este es el injput',input);
 return function(dispatch){
    fetch('http://localhost:3001/categorias'  , {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(input),
        headers:{
            "Content-type": "application/json; charset=UTF-8",
        }  
    }) //no me entra el json, porque esta en pending en network
    .then(response => response.json())
    .then(json => {
        console.log("este es el json", json)
        dispatch({
            type: ADDCATEGORY,
            categoria: json
        })
    })
    .catch(err => console.log(err))
}
}


export function addProduct(input) {
    return function(dispatch){
        fetch('http://localhost:3001/productos'  , {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(input),
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            }  
        })
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: ADDPRODUCT,
                product: json
            });
            input.categorias.forEach( cat => {
                fetch(`http://localhost:3001/productos/${json.id}/categoria/${cat.id}`, {
                    method: 'POST',
                    mode: 'cors',   
                })
                .catch(err => console.log(err));
            })
            console.log(input.fotos)
            input.fotos.forEach(img => {
                fetch(`http://localhost:3001/productos/${json.id}/img/${img}`, {
                    method: 'POST',
                    mode: 'cors', 
                })
                .catch(err => console.log(err));
            })
            return json
        }).then( res => console.log(res))
        .catch(err => console.log(err))
    }
}


export function searchBar(juego){
    console.log(juego)
            return function(dispatch) {
                 fetch(`http://localhost:3001/productos/search?query=${juego}`,{ method: 'GET',
                 mode: 'cors', 
                 cache: 'default'
              })
                .then(response =>  response.json())
                .then(response => {
                    if (response.length === 0){
                        alert('No se econtró el producto')
                    }
                        dispatch({ type: SEARCHBAR, payload: response});
                    }).catch(err=>console.log(err))
            };
   }
   
export function filterProductsByCategory (categoria) {
    return function(dispatch) {
        fetch(`http://localhost:3001/productos/categorias/${categoria}`)
        .then(response => response.json())
        .then(json => { 
            dispatch({
                type: FILTERPRODUCTSBYCATEGORY, 
                juegos: json,
                categoria,
            })
        })
    .catch(err => console.log(err));
    }
}

export function addUser(input){
    console.log(input)
    return function(dispatch){
       return fetch('http://localhost:3001/user'  , {
           
           method: 'POST',
           body: JSON.stringify(input),
           headers:{
               "Content-type": "application/json; charset=UTF-8",
           } 
       }) 
       .then(json => {
        console.log(json)
           dispatch({
               type: ADDUSER,
               payload: json
           })
       })
       .catch(err => console.log(err))
   }
   }

export function resetFilter () {
    return {
        type: RESETFILTER,
    }
}

export function getOrders () {
    return function(dispatch) {
       return fetch('http://localhost:3001/order',{credentials: 'include'})
        .then(response => response.json())
            .then(json => { 
                console.log(json)
                dispatch({
                type: GETORDERS, 
                orders: json,
            })
        })
        .catch(err => console.log(err));
    }
}



export function deleteProduct(id){
    console.log(id)
    return function(dispatch){
       return fetch(`http://localhost:3001/productos/${id}`  , {
        credentials: 'include',
           method: 'DELETE',
           mode: 'cors', 
            cache: 'default',
           headers:{
               "Content-type": "application/json; charset=UTF-8",
           } 
       }) 
       .then(json => {
        console.log(json)
           dispatch({
               type: DELETEPRODUCT,
               payload: json
           })
       })
       .catch(err => console.log(err))
   }
   }

export function editOrder(input, id){
    console.log("este es tu input del action",input);
    var estado = {
        'estado': input,
    }
    return function(dispatch){
        return fetch(`http://localhost:3001/order/${id}`, {
            
            credentials: 'include',
            method: 'PUT',
            body: JSON.stringify(estado) ,
            mode: 'cors',
            cache: 'default',
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        
        .catch(err => console.log(err))
    }
}

export function editProduct(input){
    console.log(input)
    return function(dispatch){
    return fetch(`http://localhost:3001/productos/${input.id}`  , {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(input),
        mode: 'cors', 
        cache: 'default',
        headers:{
            "Content-type": "application/json; charset=UTF-8",
        } 
    }) 
    .then(json => {
    console.log(json)
        dispatch({
            type: EDITPRODUCT,
            payload: json
        })
    })
    .catch(err => console.log(err))
    }
}

export function editCategory(input){
    console.log(input)
    return function(dispatch){
    return fetch(`http://localhost:3001/categorias/${input.id}`  , {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(input),
        mode: 'cors', 
        cache: 'default',
        headers:{
            "Content-type": "application/json; charset=UTF-8",
        } 
    }) 
    .then(json => {
    console.log(json)
        dispatch({
            type: EDITCATEGORY,
            categoria: json,
            payload: []
        })
    })
    .catch(err => console.log( "ESTE ES TU ERROR",err))
    }
}

export function getOrder (id) {
    return function(dispatch) {
        fetch(`http://localhost:3001/order/${id}`)
        
        .then(response => response.json())
      
        .then(json => { 
            console.log('llego esto : ',json)
            dispatch({
            type: GETORDER, 
            order: json,
        })
    })
    .catch(err => console.log(err));
    }

}

export function getOrdersById (id) {
    return function(dispatch) {
        fetch(`http://localhost:3001/order/historial/${id}`,{credentials: 'include'})
        .then(response => response.json())
            .then(payload => { 
                dispatch({
                type: GETORDERSBYID, 
                payload: payload,
            })
        })
        .catch(err => console.log(err));
    }
}

export function deleteCategory(id){
    return function(dispatch){
       return fetch(`http://localhost:3001/categorias/${id}`  , {
        credentials: 'include',
           method: 'DELETE',
           mode: 'cors', 
            cache: 'default',
           headers:{
               "Content-type": "application/json; charset=UTF-8",
           } 
       }) 
       .then(json => {
           console.log(json)
           dispatch({
               type: DELETECATEGORY,
               payload: json
           })
       })
       .catch(err => console.log(err))
   }
}


export function getAllUsers () {
    return function(dispatch) {
        fetch('http://localhost:3001/user',{credentials: 'include'})
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: GETALLUSERS,
                users: json
            })
        })
    }
}

export function deleteUser(id){
    console.log(id)
    return function(dispatch){
       return fetch(`http://localhost:3001/user/${id}/deleteUser`  , {
        credentials: 'include',
           method: 'PUT',
           mode: 'cors', 
            cache: 'default',
           headers:{
               "Content-type": "application/json; charset=UTF-8",
           } 
       }) 
       .then(json => {
           console.log('este es el json:',json)
           dispatch({
               type: DELETEUSER,
               payload: json
           })
       })
       .catch(err => console.log(err))
   }
}

export function addReview(input){
    console.log("ESTEEEE",input)
    return function(dispatch){
       return fetch(`http://localhost:3001/productos/${input.id}/review`  , {
           method: 'POST',
           mode: 'cors', 
           cache: 'default',
           body: JSON.stringify(input),
           headers:{
               "Content-type": "application/json; charset=UTF-8",
           } 
       }) 
       .then(json => {
        console.log("ESTAAAA ES LA RESPONSE",json)
           dispatch({
               type: ADDREVIEW,
               payload: json
           })
       })
       .catch(err => console.log("ESTEEEEE ES TU ERROR",err))
   }
   }

   export function getPerfil () {
    return function(dispatch) {
        
        fetch('http://localhost:3001/auth/perfil',
        {credentials: 'include'})
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: GETPERFIL,
                payload: json
            })
        })
    }
}

export function resetPassword(id){
    console.log(id)
    return function(dispatch){
    return fetch(`http://localhost:3001/user/${id}`  , {
        credentials: 'include',
        method: 'PUT',
        mode: 'cors', 
        cache: 'default',
        headers:{
            "Content-type": "application/json; charset=UTF-8",
        } 
    }) 
    .then(json => {
    console.log('este es el json:', json)
        dispatch({
            type: RESETPASSWORD,
            payload:json
        })
    })
    .catch(err => console.log( "ESTE ES TU ERROR",err))
    }
}

export function newPassword(input, id){
    console.log(id)
    return function(dispatch){
    return fetch(`http://localhost:3001/user/newPass/${id}`  , {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(input),
        mode: 'cors', 
        cache: 'default',
        headers:{
            "Content-type": "application/json; charset=UTF-8",
        } 
    }) 
    .then(json => {
    console.log('este es el json:', json)
        dispatch({
            type: NEWPASSWORD,
            payload:json
        })
    })
    .catch(err => console.log( "ESTE ES TU ERROR",err))
    }
}

 /* export function mercadoPago(input){
 return function(dispatch){
    fetch('http://localhost:3001/checkout', 
    {
         credentials: 'include', 
        method: 'POST',
         body: JSON.stringify(input),  
           mode: 'cors',   
         cache: 'default',
         headers:{
            "Content-type": "application/json; charset=UTF-8",
        }  
    }) //no me entra el json, porque esta en pending en network
    .then(response =>  response.json())
     .then(json => {
        console.log("este es el json", json) 
        dispatch({
            type: MERCADOPAGO,
            payload: json
        })
     })
    .catch(err => console.log("esteeee es tu errror viejita",err))

}
} */
//
export function resetCarrito() {
    return {
        type:RESETCARRITO,
        
    }
}
