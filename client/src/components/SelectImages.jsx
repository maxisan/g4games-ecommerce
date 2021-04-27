import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllImages} from '../Redux/actions';
import ThumbImages from './ThumbImages'

const SelectImages = () => {

    const dispatch = useDispatch();
    const images = useSelector(state => state.images);
    const imagesToAdd = useSelector(state => state.imagesToAdd)
    


    useEffect(() => {
        dispatch(getAllImages())
    }, images.length)
    
    
    return (
        // cada una de las imágenes en miniatura con un comportamiento especial
        // Estas se van a ir "vinculando" con el producto creado
            <div className='imagesContainer'>
                {images.map(image => <ThumbImages caption={image.caption} url={image.url} id={image.id} />)}
            </div>
    );
}

export default SelectImages