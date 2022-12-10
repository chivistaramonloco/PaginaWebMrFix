import './estatus.css'
import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import regresar from "./../viewimages/regresar.png";
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
window.Swal = Swal;
const cookies = new Cookies();
class App extends Component {
state={
  data:[],
  modalE: false,
  form:{
    IDReparacion: '',
    IDVenta: '',
    Estatus: '',
    Observaciones: '',
    TipoServicio: '',
    Vehiculo: '',
    Mecanico: ''
  }
}


peticionGet=async()=>{
await axios.get(`https://apifix.azurewebsites.net/API/historial`).then(response=>{
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}




handleChange=async e=>{

e.persist();
await this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }
});  
console.log(this.state.form);
}
  componentDidMount() {
    this.peticionGet();
    if (!cookies.get('Username')) {
      
    }
  }

  cambiar(){ 
    axios.get(`https://apifix.azurewebsites.net/API/empleados/login/` + cookies.get("Username"))
          .then(response => {
          return response.data;
          })
         .then(response => {
         if (response.length > 0) {
          window.location.href = './Estatus';
       }else{
        axios.get(`https://apifix.azurewebsites.net/API/mecanicos/login/` + cookies.get("Username"))
        .then(response => {
        return response.data;
        })
       .then(response => {
       if (response.length > 0) {
        window.location.href = './Estatuss';
     }else{
    
     }
    })
       }
      })
    }
  
  render(){
  return (
    <div className="App">
       <div >
        <meta charSet="UTF-8" />
        <title>MR.FIX</title>
        <link rel="stylesheet" href="./menu.css" />
        <div id="imagen">
      <img src={regresar} onClick={()=>this.cambiar()} alt="imagen para regresar al menú" className="icon" align="right" width="150%" height="150%"/>
        </div>
        <div id="titulo">
          <p id="header">MR.FIX</p>
          <p id="name">REPARACIONES FINALIZADAS</p>
          <p id="subheader">TALLER MECANICO</p>
        </div>
        </div>
   <div class="table"> 
    <table class="table" >
          <thead>
        <tr>
        <th>IDReparacion</th>
        <th>IDVenta</th>
        <th>Estatus</th>
        <th>Observaciones</th>
        <th>Servicio</th>
        <th>Vehiculo</th>
        <th>Mecanico</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(reparacion=>{
          return(
          <tr>
            <td>{reparacion.IDReparacion}</td>
            <td>{reparacion.IDVenta}</td>
            <td>{reparacion.Estatus}</td>
            <td>{reparacion.Observaciones}</td>
            <td>{reparacion.TipoServicio}</td>
            <td>{reparacion.Vehiculo}</td>
            <td>{reparacion.Mecanico}</td>
            <td>
            </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    </div>
  </div>
  );

}
}
export default App;