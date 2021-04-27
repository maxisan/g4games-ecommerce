import React, { useEffect } from 'react'
import { useState } from 'react'
import {FiCheckSquare} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import {addImage, removeImage} from '../Redux/actions'

const ThumbImages = ({caption, url, id}) => {
    const imagesToAdd = useSelector(state => state.imagesToAdd);
    const [selected, setSelected] = useState(false)

    useEffect(() => {
        if (imagesToAdd.includes(id)) setSelected(true);
    },(id))

    const dispatch = useDispatch();

    const imageSelection = (id) => {
        if (!selected) {
            setSelected(!selected)
            dispatch(addImage(id))
        }
        if (selected) {
            setSelected(!selected)
            dispatch(removeImage(id));
        }
        
    } 

    
    return (
        <div className={selected ? 'thumbImage selected': 'thumbImage'} onClick={() => imageSelection(id)}>
            <img src={url} />
            <p><b>{caption}</b></p>
            <FiCheckSquare className={selected ? 'check selected': 'check'} />

        </div>
    )
}

export default ThumbImages