import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllImages } from '../../Redux/actions'
import ImagePreview from './ImagePreview';
import s from './ImagesGallery.module.css';
import {Link} from 'react-router-dom'
import {RiImageAddLine} from 'react-icons/ri'

const ImagesGallery = () => {
    
    const dispatch = useDispatch();
    const images = useSelector(state => state.images)

    useEffect( () => {
        dispatch(getAllImages())
        window.scrollTo(0,0)
    }, [])

    return (
        <div>
            <div className={s.navGallery}>
                <Link to='/galeria/add'><button type='button' className={s.addImageButton}> <RiImageAddLine/>  Añadir nueva imagen</button></Link>
                <button type='button' className={s.addImageButton}> <RiImageAddLine/>  Seleccionar imágenes</button>
                
            </div>
            <div className={s.gallery}>
                {images.map(img => 
                <ImagePreview 
                    img={{...img}}    
                />)}
            </div>

        </div>
    )
}

export default ImagesGallery