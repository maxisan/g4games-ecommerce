import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import {cargarImagen} from '../../Redux/actions'
import s from './UploadImageForm.module.css'
import {AiOutlineCloudUpload} from 'react-icons/ai'
import { useHistory } from 'react-router-dom'

const UploadImageForm = () => {

    const history = useHistory()

    const dispatch = useDispatch()
    
    const [input, setInput] = useState({
        title: '',
        alt: '',
        description: '',
        tags: '',
        position: '',
        image: '',
        imageName: '',
    })
    

    const handleInputChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    const handleImageChange = e => {
        const file = e.target.files[0];
        console.log(file);
        previewImage(file);
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (input.image) {
            console.log('submitting')
            uploadImage(input)
            history.goBack()
            return
        }
        alert('Ninguna imagen seleccionada')
    }

    const handleCancel = () => {
        history.goBack()
    }

    const uploadImage = imageEncoded64 => {
        console.log(imageEncoded64)
        dispatch(cargarImagen(imageEncoded64))
    }

    const previewImage = (file) => {
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setInput({
                    ...input,
                    image: reader.result,
                    imageName: file.name
                });
            }
        }

    } 

    return (
        <div className={s.ventanaGeneral}>
            <h2>Añadir una nueva imagen</h2>
            <label className={s.previewImage} for='image'>
                {input.image ?
                <div>
                    <img src={input.image} alt="image-preview"/>
                    <p>{input.imageName}</p>
                </div> : 
                <div>
                    <AiOutlineCloudUpload style={{fontSize: "4em", color: 'gray'}}/>
                    <p>Clic aquí para seleccionar una imágen</p>
                </div> }
            </label>

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
                <input style={{display: 'none'}} type="file" name='image' id='image'  onChange={handleImageChange} /> <br/>
                <button className={s.submitButton} type='submit' onSubmit={handleSubmit}> Cargar imagen</button> <br/>
                <button className={s.cancelButton} type='button' onClick={handleCancel}> Cancelar</button> <br/>
            </form>
        </div>
    )
}

export default UploadImageForm