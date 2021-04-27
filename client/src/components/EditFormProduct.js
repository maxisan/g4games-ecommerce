import React, { useState, useEffect } from 'react';
import validate from './validate';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, getAllProducts, getProduct } from '../Redux/actions';
import Select from 'react-select';
import { editProduct } from '../Redux/actions';
import { Link } from "react-router-dom";
import SelectImages from './SelectImages';

//estilos
import styles from './css/styles.css'

export function EditFormProducto(props) {
  const dispatch = useDispatch();
  const producto = useSelector(state => state.producto)
  const categorias = useSelector(state => state.categories)
  const imagesToAdd = useSelector(state => state.imagesToAdd);
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getProduct(id))
    setInput({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      descripcionCorta: producto.descripcionCorta,
      categorias: producto.categorias,
      fotos: producto.fotos,
      keyCode: producto.keyCode,
      tamanio: producto.tamanio,
      precio: producto.precio,
      stock: producto.stock,
      fechaLanzamiento: producto.fechaLanzamiento,
      clasificacion: producto.clasificacion,
      desarrollador: producto.desarrollador
    })
  }, [producto.id])


  const [input, setInput] = React.useState({
    id: "",
    nombre: "",
    descripcion: "",
    descripcionCorta: '',
    categorias: [],
    fotos: [],
    keyCode: "",
    tamanio: "",
    precio: "",
    stock: "",
    fechaLanzamiento: '',
    clasificacion: '',
    desarrollador: ''
  });

  const [errors, setErrors] = useState({});


  useEffect(() => {
    setErrors(validate(input))
    dispatch(getAllCategories())
  }, [input, producto.length])


  const onSubmit = (e) => {
    e.preventDefault();
    if (!Object.keys(errors).length) {
      dispatch(editProduct(input));
      alert('Producto creado');
      dispatch(getAllProducts())
    }
    else {
      alert(Object.values(errors).join("\n"));
    }
  }

  const onChange = (e) => {
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
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
      </div>
      <div className="spacer-four">

        <div className="contenedor-form-producto">
          <form onSubmit={onSubmit}>
            <label label for="exampleInputEmail1" className="label-blanco">Id</label>
            <br />

            <input className="input-cat-edit" id="exampleInputEmail1" type="text" name="id" placeholder="ID" value={input.id} />
            <br />
            <label label for="exampleInputEmail1" className="label-blanco">Nombre</label>
            <br />

            <input className="input-cat-edit" id="exampleInputEmail1" type="text" name="nombre" placeholder="Nombre" onChange={onChange} value={input.nombre} />
            <br />
            <label label for="exampleInputEmail1" className="label-blanco">Descripción</label>
            <br />

            <input className="input-cat-edit" id="exampleInputEmail1" type="text" name="descripcion" placeholder="Descripcion" onChange={onChange} value={input.descripcion} />
            <br />
            <label label for="exampleInputEmail1" className="label-blanco">Descripción corta</label>
            <br />

            <input className="input-cat-edit" id="exampleInputEmail1" type="text" name="descripcionCorta" placeholder="Descripcion Corta" onChange={onChange} value={input.descripcionCorta} />
            <br />


            <br />
            <label label for="exampleInputEmail1" className="label-blanco">Seleccionar categorías</label>

            <Select className="foto-select" options={options}  /* value={[{value:"adjakdjak", label:"jadkjadkajda"}]}  */ placeholder={producto.categorias} isMulti name='categorias' onChange={setCategorias} />

            <br />

            {/* <br />
            <input className="form-control" id="exampleInputEmail1"   type="text" name="fotos" placeholder="Fotos" onChange={onChange} value={input.fotos} />
          <br /> */}

            <div className="agrupador-fotos">
              <div className="posicionador-btn">
                <button type="button" data-bs-toggle="modal" className="seleccionarfotos" data-bs-target="#selectImagesModal">
                  Seleccionar imágenes  ({imagesToAdd.length} seleccionadas)
          </button>
              </div>

            </div>



            <label label for="exampleInputEmail1" className="label-blanco">Key Code</label>
            <br />
            <input className="input-cat-edit" id="exampleInputEmail1" type="integer" name="keyCode" placeholder="Key Code" onChange={onChange} value={input.keyCode} />
            <br />

            <label label for="exampleInputEmail1" className="label-blanco">Tamaño</label>
            <br />
            <input className="input-cat-edit" id="exampleInputEmail1" type="integer" name="tamanio" placeholder="Tamaño" onChange={onChange} value={input.tamanio} />
            <br />

            <label label for="exampleInputEmail1" className="label-blanco">Precio</label>
            <br />
            <input className="input-cat-edit" id="exampleInputEmail1" type="integer" name="precio" placeholder="Precio" onChange={onChange} value={input.precio} />
            <br />

            <label label for="exampleInputEmail1" className="label-blanco">Stock</label>
            <br />
            <input className="input-cat-edit" id="exampleInputEmail1" type="integer" name="stock" placeholder="Stock" onChange={onChange} value={input.stock} />
            <br />

            <label label for="exampleInputEmail1" className="label-blanco">Fecha de Lanzamiento</label>
            <br />
            <input type="text" name="fechaLanzamiento" placeholder="Fecha de Lanzamiento" className="input-cat-edit" onChange={onChange} value={input.fechaLanzamiento} />
            <br />

            <label label for="exampleInputEmail1" className="label-blanco">Clasificacion</label>
            <br />
            <input type="text" name="clasificacion" placeholder="Clasificacion" className="input-cat-edit" onChange={onChange} value={input.clasificacion} />
            <br />

            <label label for="exampleInputEmail1" className="label-blanco">Desarrollador</label>
            <br />
            <input type="text" name="desarrollador" placeholder="Desarrollador" className="input-cat-edit" onChange={onChange} value={input.desarrollador} />
            <br />
            <div className="org-btn-1">
              <button type="submit" className="btn-negro">Submit</button>
            </div>
          </form>

          <div className="org-btn-2">
            <Link to="/admin/EditCatalog">
              <button type="button" className="btn-negro">Seguir editando</button>
            </Link>
          </div>


        </div>
      </div>
    </>
  )

};

export default EditFormProducto;
