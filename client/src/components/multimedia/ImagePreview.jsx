import React, {useEffect, useState} from 'react';
import {GrEdit, GrTrash} from 'react-icons/gr';
import s from './ImagePreview.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {eliminaImagen} from '../../Redux/actions'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Link} from 'react-router-dom'
import {FiCheckSquare} from 'react-icons/fi'
import {addImage, removeImage} from '../../Redux/actions'


const ImagePreview = ({img}) => {
    const MySwal = withReactContent(Swal)

    const [selected, setSelected] = useState(false);
    const imagesToAdd = useSelector(state => state.imagesToAdd)

    const {id, caption, url, thumb_url, tags, alt, position} = img
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (imagesToAdd.includes(id)) setSelected(true);
    },[imagesToAdd.length])

    const imageSelection = () => {
        if (!selected) {
            setSelected(!selected)
            dispatch(addImage(id))
        }
        if (selected) {
            setSelected(!selected)
            dispatch(removeImage(id));
        }
        
    } 

    const deleteImage = () => {
        MySwal.fire({
            html: <p>{`Esto borrará la imagen de forma permanente. ¿Desea continuar?`}</p>,
            icon: 'question',
            confirmButtonText: 'Eliminar imagen',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
        })
        .then(result => {
            if (result.isConfirmed) {
                dispatch(eliminaImagen(img.id))
            }
        })
    }


    return (
        <div className={s.imagePreviewCard}>
            <div className={s.imageDiv}>
                <img src={thumb_url} alt={alt} onClick={imageSelection}/>
                <div onClick={imageSelection} className={selected?s.selected:s.unselected} ><FiCheckSquare /></div>
            </div>
            <div className={s.title}>
                <p>{caption}</p>
                <div className={s.icons}>
                    <Link to={`/galeria/edit/${id}`}> <GrEdit/> {/**Abre formulario para editar la info de la foto */} </Link>
                    <GrTrash onClick={deleteImage} /> {/**Elimina la imágen de la galería */}
                </div>
            </div>
        </div>
    )
}

export default ImagePreview