import React, { useState, useEffect } from "react";
import {useDispatch, useSelector } from 'react-redux'
import {searchBar} from '../Redux/actions'
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
//estilos
import styles from './css/styles.css' 


 

export default function Search () {
  const history = useHistory();
  const [juego, setJuego] = useState("");
  const search = useSelector((state)=>(state.search))
  
  const dispatch = useDispatch();

  useEffect(() => {
    if(search.length){
       history.push(`/productoSearch`)
 }

   }, [search]);
  function onSubmit(){
    var game = juego.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    dispatch(searchBar(game))
    
  }
console.log('search',search)
return (
  <div className="Search" >
    <input className="inputNav"
    placeholder="Búsqueda"
      value={juego}
      type="text"
      onChange={e => setJuego(e.target.value)}
    />
    <submit onClick={onSubmit} className="btn_srch" type="submit" value="SEARCH"><i class="fas fa-search"></i></submit>  
  </div>
);
}

/* function mapStateToProps({juego}) {
  return {value: juego};
}

function mapDispatchToProps(dispatch) {
  return {searchBar};
} */

/* export default connect(mapStateToProps, mapDispatchToProps)(Search); */