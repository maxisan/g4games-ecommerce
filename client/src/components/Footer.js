import React from 'react';


//estilos
import styles from './css/styles.css'



function Footer() {
    return (
       
            <footer>
                <div className="menu-footer">

                    <nav>
                        <div className="menus-horizontales-footer">
                            <ul className="menu_items-footer"> <i class="fab fa-linkedin"></i> Desarrolladores
                            <li><a href="https://www.linkedin.com/in/axel-mi%C3%B1o-ferreyra-939b10188/" target="_blank" className="links-footer">Axel Miño Ferreyra</a></li>
                                <li><a href="https://www.linkedin.com/in/tomas-martinez-2855821b5/" target="_blank" className="links-footer">Tomás Martinez </a></li>
                                <li><a href="https://www.linkedin.com/mwlite/in/gonzalo-martins-3b43101b2" target="_blank" className="links-footer">Gonzalo Martins</a></li>
                                <li><a href="https://www.linkedin.com/in/sebastian-doll-15689b112" target="_blank" className="links-footer">Sebastian Doll</a></li>
                                <li><a href="https://www.linkedin.com/in/maximiliano-sánchez-89863b141" target="_blank" className="links-footer">Maximiliano Sánchez</a></li>
                                <li><a href="https://www.linkedin.com/in/mateo-francisco-figueroa-b52b78191/" target="_blank" className="links-footer">Mateo Figueroa</a></li>
                            </ul>
                        </div>
                        <div className="menus-horizontales-footer">
                            <ul className="menu_items-footer"><i class="fas fa-cog"></i> Company
                            <li><a href="https://github.com/henry-labs/ecommerce-ft08-g04" target="_blank" className="links-footer"  >webft08</a></li>
                                <li><a href="https://github.com/henry-labs/ecommerce-ft08-g04" target="_blank" className="links-footer"  >ec-webft08-04</a></li>
                                <li ><a href="https://www.soyhenry.com/" className="links-footer" target="_blank" >Henry</a></li>

                            </ul>
                        </div>
                    </nav>
                </div>
            </footer>


        

    )
}

export default Footer