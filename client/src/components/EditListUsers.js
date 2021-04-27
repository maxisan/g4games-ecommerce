import React from 'react';
import EditUserCard from './EditUserCard'
import Footer from './Footer'
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from 'react-redux';
import {
        Link
      } from "react-router-dom";
import MenuAdm from './MenuAdm'
const EditListUser = () => {

        const user = useSelector(state => state.users);
        
        
        return (
                <div className="spacer-four"> 
                <button className="btn-do-admin" ><Link  to="/admin/NuevoAdmin" className="boton-upgrade" >Promover a administrador a un usuario </Link></button>
                <MenuAdm/>
                
                                <div className="lista-cards-editcat">
                                        
                                {user.map(oneUser => {           
                                return <EditUserCard

                                        id={oneUser.id}
                                        username={oneUser.username}
                                        password={oneUser.password}
                                        estadoUser={oneUser.estadoUser}
                                        email={oneUser.email}
                                        
                                        
                                        
                                />
                                 
                                })}
                                </div>
                                
                                

                        </div>
                )
        };


export default EditListUser;