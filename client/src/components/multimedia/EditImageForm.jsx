import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {editarImagen} from '../../Redux/actions'
import {useHistory} from 'react-router-dom'
import s from './EditImageForm.module.css'

const EditImageForm = (props) => {


    const history = useHistory()
    const dispatch = useDispatch()
    
    const {id} = props.match.params

    const [input, setInput] = useState({
        id,
        public_id: '',
        title: '',
        alt: '',
        description: '',
        tags: '',
        position: '',
        image: '',
    })
    
    useState(() => {
        fetch(`http://localhost:3001/images/get/${id}`)
        .then(response => response.json())
        .then(image => setInput({
            ...input,
            public_id: image.public_id,
            title: image.caption,
            alt: image.alt,
            description: image.description,
            tags: image.tags,
            position: image.position,
            image: image.url,

        }))
    }, [input])

    const handleInputChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    const handleCancel = () => {
        history.goBack()
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log('editting')
        console.log(input);
        dispatch(editarImagen(input))
        history.goBack()
    }

    return (
        <div className={s.ventanaGeneral}>
            <h2>Editar imagen</h2>
            <div className={s.previewImage}>
                <img src={input.image} alt="image-preview"/>
                <p>{input.public_id}</p>
            </div>

            <form action="" className={s.form} onSubmit={handleSubmit}>
                <label className={input.title? s.labelActive:s.labelInactive}>Título de la imágen</label><br/>              
                <input className={s.inputs} type="text" name='title' onChange={handleInputChange} value={input.title} placeholder='Título de la imágen'/> <br/>
                <label className={input.alt? s.labelActive:s.labelInactive}>Título alternativo</label> <br/>              
                <input className={s.inputs} placeholder='Título alternativo' type="text" name='alt' onChange={handleInputChange} value={input.alt} /> <br/>
                <label className={input.description? s.labelActive:s.labelInactive}>Descripción</label><br/>               
                <textarea className={s.inputs} placeholder='Descripción' name='description' rows='3' onChange={handleInputChange} value={input.description} /> <br/>
                <label className={input.tags? s.labelActive:s.labelInactive}>Etiquetas (separadas por coma)</label> <br/>              
                <input type="text" name='tags'className={s.inputs} placeholder='Etiquetas (separadas por coma)' onChange={handleInputChange} value={input.tags} /> <br/>
                <label className={s.radio}>¿Esta imágen va en una ubicación especial? <br/>
                    <input type="radio"  id="ninguna" value='ninguna' name='position' defaultChecked onChange={handleInputChange}/>
                    <label for="ninguna">Ninguna </label> <br/>
                    <input type="radio" id="tarjeta" value='tarjeta' name='position' onChange={handleInputChange}/>
                    <label for="tarjeta">Tarjeta del catálogo </label> <br/>
                    <input type="radio" id="portada" value='portada' name='position' onChange={handleInputChange}/>
                    <label for="portada">Portada en página del juego </label> <br/>
                </label> <br/>
                <button className={s.submitButton} type='submit' onSubmit={handleSubmit}> Editar imagen</button> <br/>
                <button className={s.cancelButton} type='button' onClick={handleCancel}> Cancelar</button> <br/>
            </form>
        </div>
    )
}

export default EditImageForm