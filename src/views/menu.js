import './menu.css';
import ventas from "./viewimages/ventas.png";
import clientes from "./viewimages/clientes.png";
import vehiculos from "./viewimages/vehiculos.png";
import productos from "./viewimages/productos.png";
import servicios from "./viewimages/servicios.png";
import administrador from "./viewimages/admini.png";
import mecanico from "./viewimages/mecanico.png";
import estatus from "./viewimages/estatus.png";
import logomrfix from "./viewimages/logmrfix.png";
import {Link} from 'react-router-dom'
import { Component } from 'react';
import regresar from "./viewimages/cerrar.png";
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
window.Swal = Swal;
const cookies = new Cookies();
class menu extends Component {
  cerrarSesion = () => {
    Swal.fire({
      title: '¿Estás seguro que desea cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then(async(result) => {
      if (result.isConfirmed) {
        cookies.remove('Username', { path: "/" });
        window.location.href = './';
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se cerró la sesión',
          showConfirmButton: false,
          timer: 1500
        })
      }
      
    })
   
  }
  componentDidMount() {
    if (!cookies.get('Username')) {
      window.location.href = "./Menu";
    }
  }

  render(){
    return ( 		
		<div className="general">
        <meta charSet="UTF-8" />
        <title>MR.FIX</title>
        <link rel="stylesheet" href="./menu.css" />
        <div id="imagen">
		    <img src={logomrfix} alt="logoMrfix" className="logo" />
        </div>
     <img src={regresar} alt="imagen para regresar al login" onClick={()=>this.cerrarSesion()} className="icon" align="right" width="150%" height="150%"/>
        <div id="tituloe">
          <p id="headere">MR.FIX</p>
          <p id="subheadere">TALLER MECANICO</p>
        </div>
        <header >
          <div className="contenedor" id="uno">
          <Link to='/Ventas'>
		  <img src={ventas} alt="imagen de ventas" className="icon"/>
            <p className="texto">VENTAS</p>
            </Link>
          </div>
          <div className="contenedor" id="dos">
          <Link to='/Clientes'>
		  <img src={clientes} alt="imagen de clientes" className="icon"/>
            <p className="texto">CLIENTES</p>
            </Link>
          </div>
          <div className="contenedor" id="tres">
          <Link to='/Vehiculos'>
		  <img src={vehiculos} alt="imagen de vehiculos" className="icon"/>
            <p className="texto">VEHICULOS</p>
            </Link>
          </div>
          <div className="contenedor" id="cuatro">
          <Link to='/Servicios'>
		  <img src={servicios} alt="imagen de servicios" className="icon"/>
            <p className="texto">SERVICIOS</p>
            </Link>
          </div>
          <div className="contenedor" id="cinco">
          <Link to='/Administrador'>
		  <img src={administrador} alt="imagen de administrador" className="icon"/>
            <p className="texto1">ADMINISTRADOR</p>
            </Link>
          </div>
          <div className="contenedor" id="seis">
          <Link to='/Mecanico'>
		  <img src={mecanico} alt="imagen de mecanico" className="icon"/>
            <p className="texto">MECANICO</p>
            </Link>
          </div>
          <div className="contenedor" id="siete">
          <Link to='/Productos'>
		  <img src={productos} alt="imagen de productos" className="icon"/>
            <p className="texto">PRODUCTOS</p>
            </Link>
          </div>
          <div className="contenedor" id="ocho">
          <Link to='/Estatus'>
		  <img src={estatus} alt="imagen de estatus" className="icon"/>
            <p className="texto">ACTUALIZAR ESTATUS</p>
            </Link>
          </div>
        </header>
      </div>
	  
		);
  }
}
document.body.style.backgroundColor = '#2608cc' ;
export default menu;
