import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllImages } from '../../Redux/actions'
import ImagePreview from './ImagePreview';
import s from './SelectImages.module.css';
import {Link, useHistory} from 'react-router-dom'
import {RiImageAddLine} from 'react-icons/ri'

const SelectImages = (props) => {
    
    console.log(props);

    const dispatch = useDispatch();
    const images = useSelector(state => state.images)
    const imagesToAdd = useSelector(state => state.imagesToAdd)

    useEffect( () => {
        dispatch(getAllImages())
        window.scrollTo(0,0)
    }, [images.length])

    const history = useHistory()
    var formData = props.location.state


    const goFormProduct = () => {
        formData = {
            ...formData,
            fotos: imagesToAdd
        }
        history.push('/admin/formProducto', formData)
    }

    return (
        <div>
            <div className={s.navGallery}>
                <Link to='/galeria/add'><button type='button' className={s.addImageButton}> <RiImageAddLine/>  Añadir nueva imagen</button></Link>
                <button type='button' className={s.addImageButton} onClick={goFormProduct}> <RiImageAddLine/>  Seleccionar imágenes</button>
                
            </div>
            <div className={s.gallery}>
                {images.map(img => 
                <ImagePreview
                    key={img.id}
                    img={{...img}}    
                />)}
            </div>

        </div>
    )
}

export default SelectImages