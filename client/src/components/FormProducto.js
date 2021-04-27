import React, { useState, useEffect } from 'react';
import validate from './validate';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getAllCategories, clearImages } from '../Redux/actions';
import Select from 'react-select';

//estilos
import styles from './css/styles.css'
import SelectImages from './SelectImages';
import ThumbImages from './ThumbImages';
import MenuAdm from './MenuAdm'
import {useHistory} from 'react-router-dom'

export function AddProducto(props) {
  var dataForm = props.location.state

  const [input, setInput] = useState({ ////
    nombre: "",
    descripcion: "",
    descripcionCorta: '',
    categorias: [],
    fotos: [],
    keyCode: 0,
    tamanio: 0,
    precio: 0,
    stock: "",
    fechaLanzamiento: '',
    clasificacion: '',
    desarrollador: ''
  });

  const history = useHistory()
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const categorias = useSelector(state => state.categories);
  const imagesToAdd = useSelector(state => state.imagesToAdd);
  const products = useSelector(state => state.products )

  if (dataForm) {
    for (const key in dataForm) {
      if(input[key] !== dataForm[key]) {
        setInput({
          ...input,
          [key]: dataForm[key]
        })
      }
    }
  }

  useEffect(() => {
    setErrors(validate(input))
    dispatch(getAllCategories())
  }, [input, categorias.length])

  const goToGallery = () => {
    history.push('/galeria/images/select', input)
  }

  console.log(props)

  const onSubmit = (e) => {
    e.preventDefault();
    if (!Object.keys(errors).length) {
      for (let i = 0; i < products.length; i++) {
        if(products[i].keyCode === input.keyCode) {
         return alert("modifique su keycode")
        }
      }
    }
    else {
      alert(Object.values(errors).join("\n"));
    }

    console.log(imagesToAdd);
    setInput({
      ...input,
      fotos: imagesToAdd,
    })
    console.log('antes de enviar: ',input)
    dispatch(addProduct(input));
    dispatch(clearImages())
    alert('Producto creado');
    dataForm = '';
    setInput({
      ...input,
      nombre: "",
      descripcion: "",
      descripcionCorta: '',
      categorias: [],
      fotos: [],
      keyCode: 0,
      tamanio: 0,
      precio: 0,
      stock: "",
      fechaLanzamiento: '',
      clasificacion: '',
      desarrollador: ''
    })
  }


  const onChange = (e) => {
    let newInput = {
      ...input,
      [e.target.name]: e.target.value
    };
    setInput(newInput);
  };

  const setCategorias = (selCateg) => {
    let categ = []
    categorias.forEach(c => {
      selCateg.forEach(s => {
        if (c.nombre === s.value) {
          categ.push(c);
        }
      })
    })

    setInput({
      ...input,
      categorias: categ
    })

  }

  const options = categorias.map(c => {
    return { value: c.nombre, label: c.nombre }
  });

  return (
    <>


      {/*<!-- Modal -->*/}{/*
      <div class="modal fade" id="selectImagesModal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <SelectImages />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => setInput({ ...input, fotos: imagesToAdd })}>Confirmar</button>
            </div>
          </div>
        </div>
      </div>*/}

      <div className="spacer-two">
        <MenuAdm />

        <div className="container-form-producto" >







          <form onSubmit={onSubmit}>

            <div className="agrupadorkcyt">
              <input type="text" name="nombre" placeholder="Nombre" className="input-form-producto" onChange={onChange} value={input.nombre} />
            </div>
            <div className="agrupadorkcyt">

              <input type="text" name="descripcion" placeholder="Descripcion" className="input-form-producto" onChange={onChange} value={input.descripcion} />



              <input type="text" name="descripcionCorta" placeholder="Descripcion Corta" className="input-form-producto" onChange={onChange} value={input.descripcionCorta} />
            </div>
            <br />



            <Select options={options} placeholder="Seleccionar categorías" className="selec-categorias" isMulti name='categorias' onChange={setCategorias} />




            <div className="agrupador-fotos">

              <button type="button" className="seleccionarfotos" onClick={goToGallery}> 
                Seleccionar imágenes <br />  ({imagesToAdd.length} seleccionadas)
              </button>
              
            </div>


            <div className="agrupadorkcyt">
              <label label for="exampleInputEmail1"  >Key Code</label>

              <label label for="exampleInputEmail1" >Tamaño</label>
            </div>
            <br />
            <div className="agrupadorkcyt">
              <input id="exampleInputEmail1" className="input-form-producto" type="integer"  name="keyCode" placeholder="Key Code" onChange={onChange} value={input.keyCode} />

              <input id="exampleInputEmail1" className="input-form-producto" type="number" min="1" name="tamanio" placeholder="Tamaño" onChange={onChange} value={input.tamanio} />



            </div>
            <br />

            <div className="agrupadorkcyt">
              <label label for="exampleInputEmail1" >Precio</label>

              <label label for="exampleInputEmail1" className="form-label">Stock</label>
            </div>
            <div className="agrupadorkcyt">
              <input id="exampleInputEmail1" className="input-form-producto" type="number" min="1" name="precio" placeholder="Precio" onChange={onChange} value={input.precio} />



              <input id="exampleInputEmail1" className="input-form-producto" type="number" min="1" name="stock" placeholder="Stock" onChange={onChange} value={input.stock} />
            </div>

            
            <div className="agrupadorkcyt">

              <input type="text" name="fechaLanzamiento" placeholder="Fecha de Lanzamiento" className="input-form-producto" onChange={onChange} value={input.fechaLanzamiento} />



              <input type="text" name="clasificacion" placeholder="Clasificacion" className="input-form-producto" onChange={onChange} value={input.clasificacion} />
            </div>
            
            <div className="agrupadorkcyt">

              <input type="text" name="desarrollador" placeholder="Desarrollador" className="input-form-producto" onChange={onChange} value={input.desarrollador} />

            </div>

            <button type="submit" className="btn-enviar">Enviar</button>
          </form>
        </div>
      </div>
    </>
  )

};

export default AddProducto;
