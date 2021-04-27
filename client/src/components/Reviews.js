import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {getAllReviews} from '../Redux/actions';
import {FormReview} from './FormReview'

    const Reviews = ({id}) => {
        /// cuando lo renderizo se lo paso por id 
        /// disparo el dispatch cuando se renderiza, mediante un use efect (ojo con la condicion de corte)
        /// me traigo el use selector el estado de react para hacerle un map y que me renderize lo que hay en este estado..
        const idR = id
        const dispatch = useDispatch();
        const reviews = useSelector(state => state.reviews)//nombre de estado --- donde se dispare el getAlll);
        const perfil = useSelector(state => state.perfil)
        useEffect(() => {
            dispatch(getAllReviews(id)) 
        }, [reviews.length]) 
            return (
            <div className="distancia">
                <FormReview 
                    id={idR}
                />
                {reviews.map(oneReview => 
                <div className="resenia"> 
                    <div>
                    <h5>{oneReview.updatedAt && oneReview.updatedAt.substring(0,10)}</h5> 
                    <h4>{perfil.username}</h4>
                    <h3>{oneReview.puntaje} Estrellas!</h3>
                    <p>{oneReview.opinion}</p>

                    </div>
                </div>
                )}

            </div>
            )

    };

    export default Reviews;



 