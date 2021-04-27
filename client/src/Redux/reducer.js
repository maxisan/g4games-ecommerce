
import {  
  ADDPRODUCT, 
  GETALLPRODUCTS, 
  GETPRODUCT,
  ADDCATEGORY, 
  SEARCHBAR, 
  GETALLCATEGORIES, 
  FILTERPRODUCTSBYCATEGORY, 
  RESETFILTER, 
  ADDUSER, 
  GETALLIMAGES,
  ADDIMAGE,
  REMOVEIMAGE,
  GETORDERS,
  ADDTOSHOPPINGCART,
  GETORDER,
  DELETEPRODUCT,
  EDITORDER,
  EDITPRODUCT,
  EDITCATEGORY,
  DELETECATEGORY,
  CLEARSHOPPINGCART,
  GETSHOPPINGCART,
  GETCATEGORY,
  GETALLUSERS,
  ADDREVIEW,
  GETALLREVIEWS,
  GETPERFIL,
  AUTENTICADO,
  NO_AUTENTICADO,
  LOGOUT,
  USERAADMIN,
  ACTUALIZACANTIDAD,
  QUITARPRODUCTO,
  RESETPASSWORD,
  DELETEUSER,
  NEWPASSWORD,
  CARGARIMAGEN,
  ELIMINAIMAGEN,
  EDITARIMAGEN,
  MERCADOPAGO,
  GETORDERSBYID,
  RESETCARRITO,
  CLEARIMAGES,
 

} from "./actions";


const initialState = {
  products: [],
  filters: {
    isFiltered: false,
    category: '',
    search: ''
  },
  
  producto:{},
  categories:[],
  oneCategory:{},
  users:[],
  carrito:[],
  carritoEliminado:[],
  categorias:{},
  orders:[],
  order:[],
  productId:[],
  search:[],
  images: [],
  imagesToAdd: [], //imágenes que se seleccionan para vincular a un producto nuevo
  productoeliminado:[],
  categoriaeliminada:[],
  usuarioeliminado:[],
  reviews:[],
  perfil:{},
  autenticado:false,
  nuevoAdmin:[],
  passwordReset:[],
  newPassword:[],
  mercadopago:[],

  historial:[],


};


export default function reducer(state = initialState, action){
  
  switch (action.type) {

    case CLEARIMAGES:
      return {
        ...state,
        imagesToAdd: []
      }

    case EDITARIMAGEN:
      return {
        ...state,
        images: state.images.map(image => {
          if (image.id === action.image.id) {
            return action.image
          }
          return image
        })
      }

    case ELIMINAIMAGEN:
        return {
          ...state,
          images: state.images.filter(img => img.id !== action.image.id)
        }
    case CARGARIMAGEN:
      return {
        ...state,
        images: [action.image, ...state.images],
        imagesToAdd: state.imagesToAdd.concat(action.image)
      }
    case ACTUALIZACANTIDAD:
      return {
        ...state,
        carrito: state.carrito.map(e => {
          if (action.autenticado) {
            if (e.id === action.productId) {
              e.orders[0].productorders.cantidad = action.cantidad
            }
            return e
          }
          if (e.id === action.productId) {
            e.cantidad = action.cantidad;
          }
          return e
        })
      }
    case AUTENTICADO:
      return {
        ...state,
        autenticado: true,
        perfil: action.user
      }
    
    case NO_AUTENTICADO:
      return {
        ...state,
        autenticado: false,
        perfil: {}
      }
      
    case REMOVEIMAGE:
      return {
        ...state,
        imagesToAdd: state.imagesToAdd.filter(img => img !== action.id)
      }

    case ADDIMAGE:
      return {
        ...state,
        imagesToAdd: state.imagesToAdd.concat(action.id)
      }


    case GETALLPRODUCTS:
      
      return {
        ...state,
        products: action.juegos
      }
    case CLEARSHOPPINGCART:
      return {
        ...state,
        carrito: []
      }
    case GETSHOPPINGCART:
      console.log('action.carrito: ',action.carrito)
      return {
        ...state,
        carrito: action.carrito
      }
    case GETALLCATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    case FILTERPRODUCTSBYCATEGORY:
      return {
        ...state,
        products: action.juegos,
        filters: {
          isFiltered: true,
          category: action.categoria,
          search: state.filters.search
        },
      }
    case ADDPRODUCT:
      return {
        ...state,
        products: state.products.concat(action.product)
      }
    case GETPRODUCT:
      return {
        ...state,
        producto: action.id
      }
      case GETCATEGORY:
      return {
        ...state,
        oneCategory: action.id
      }
    case ADDCATEGORY:
      return {
        ...state,
        categorias:action.categoria
      }
      case SEARCHBAR:
      return {
         ...state, 
         search: action.payload,
         filter: true,  
      }
      case ADDUSER:
      return {
         ...state, 
         users: state.users.concat(action.payload)
      }
      case RESETFILTER:
        return {
          ...state,
          filters: {
            isFiltered: false,
            category: '',
            search: ''
          },
        }
      case GETALLIMAGES:
        return {
          ...state,
          images: action.json
        }
      case GETORDERS:
      return {
        ...state,
        orders: action.orders
      }
      case GETORDER:
        console.log('action.order: ',action.order)
      return {
        ...state,
        order: action.order
        
      }
      case ADDTOSHOPPINGCART:
        return {
          ...state,
          carrito: state.carrito.concat(action.game)
        }
      
      case QUITARPRODUCTO:
        return {
          ...state,
          carrito: state.carrito.filter(g => g.id !== action.productId)
        }

      case DELETEPRODUCT:
        return {...state,
          productoeliminado: state.products.filter(action.payload.id)
        }
       
      case EDITORDER:
        console.log("este es el action order del reducer", state.order)
        return {
          ...state,
          order: state.order,
        }  
        

      case EDITPRODUCT:
        console.log("FIJATE ES EL ACTION PRODUCT DEL REDUCER", state.products)
        return {...state,
          products: state.products
        }
      case EDITCATEGORY:
        return {...state,
          categorias: action.categoria
        }
      case DELETECATEGORY:
        return {...state,
          categoriaeliminada: state.categorias.filter(action.payload.id)
          }
      case GETALLUSERS:
        return {
          ...state,
          users: action.users
        }
      case DELETEUSER:
        return {...state,
          usuarioeliminado: state.users.filter(action.payload.id)
        }
        case ADDREVIEW:
          return {
            ...state,
            reviews: state.reviews.concat(action.payload)
          }
        case GETALLREVIEWS:
        return {
          ...state,
          reviews: action.reviews
        }
        case GETPERFIL:
        return {
          ...state,
          perfil: action.payload,
          autenticado:true
        }
        case LOGOUT:
        return {
          ...state,
          perfil: action.payload,
          autenticado:false
        }
        case USERAADMIN:
        return {
        ...state,
        nuevoAdmin: action.payload
      }
        case RESETPASSWORD:
        return {
          ...state,
          passwordReset: action.payload
        }
        case NEWPASSWORD:
        return {
          ...state,
          newPassword: action.payload
        }
        case RESETCARRITO: ///
          return {
            ...state,
            carrito: []
          }
        

        case GETORDERSBYID:
          return {
            ...state,
            historial: action.payload
          }

      default:
      return state;
  }
  
} 
