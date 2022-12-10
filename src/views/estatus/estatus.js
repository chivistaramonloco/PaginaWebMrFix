import './estatus.css'
import React, { Component } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFloppyDisk, faRectangleXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader, FormGroup } from 'reactstrap';
import regresar from "./../viewimages/regresar.png";
import historial from "./../viewimages/historial.png";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
window.Swal = Swal;
class App extends Component {
state={
  data:[],
  modalE: false,
  form:{
    IDReparacion: '',
    IDVenta:'',
    Estatus: '',
    Observaciones: '',
    TipoServicio:'',
    Vehiculo:'',
    Mecanico:''
  }
}

peticionGet=async()=>{
await axios.get(`https://apifix.azurewebsites.net/API/reparaciones`).then(response=>{
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}

peticionPut=()=>{
  axios.put(`https://apifix.azurewebsites.net/API/reparaciones/actualizar/`, this.state.form).then(response=>{
  }).then(async() => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Servicio editado correctamente',
      showConfirmButton: false,
      timer: 1500
      
    })
    this.modalE();
    this.peticionGet();
  })
}
peticionPost=async()=>{
  await axios.get(`https://apifix.azurewebsites.net/API/reparaciones/eliminar/`+this.state.form.IDReparacion)
   await axios.post(`https://apifix.azurewebsites.net/API/historial/agregar/`,this.state.form).then(response=>{
   }).then(async() => {
     Swal.fire({
       position: 'center',
       icon: 'success',
       title: 'Reparación finalizada',
       showConfirmButton: false,
       timer: 1500
     })
     this.modalE();
    this.peticionGet();
   })
}


modalE=()=>{
  this.setState({modalE: !this.state.modalE});
}

seleccionarReparacion=(reparacion)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
        IDReparacion: reparacion.IDReparacion,
        IDVenta: reparacion.IDVenta,
        Estatus: reparacion.Estatus,
        Observaciones: reparacion.Observaciones,
        TipoServicio: reparacion.TipoServicio,
        Vehiculo: reparacion.Vehiculo,
        Mecanico: reparacion.Mecanico
    }
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
  }
  validaciones=()=>{
    var validanom= /^[a,-z,-A,-Z,-À,-ÿ,-0,-9,-\s+]{4,500}$/;
    let est = document.getElementById("Estatus").value;
    let obs = document.getElementById("Observaciones").value;
    let checador = 0;
    if (est.length===0 )  {
      document.getElementById("msgTS").innerText = "Campo Vacío";
      document.getElementById("msgTS").style.color= "red";
      document.getElementById("Estatus").style.borderColor="red";
    }else{
      checador+=1;
      document.getElementById("msgTS").innerText = "";
      document.getElementById("msgTS").style.color= "";
      document.getElementById("Estatus").style.borderColor="";
    }
    if (obs.length===0 )  {
      document.getElementById("msgOS").innerText = "Campo Vacío";
      document.getElementById("msgOS").style.color= "red";
      document.getElementById("Observaciones").style.borderColor="red";
    }else{
      document.getElementById("msgOS").innerText = "";
      document.getElementById("msgOS").style.color= "";
      document.getElementById("Observaciones").style.borderColor="";
      if(obs.match(validanom)){
        checador+=1;
        document.getElementById("msgOS").innerText = "";
        document.getElementById("msgOS").style.color= "";
        document.getElementById("Observaciones").style.borderColor="";
      }
      else {
        document.getElementById("msgOS").innerText = "solo acepta letras, minimo 4 letras y maximo 500";
        document.getElementById("msgOS").style.color= "red";
        document.getElementById("Observaciones").style.borderColor="red";
      }
    }
    
      if(checador===2){
          this.peticionPut();
      }
  }
cambiar=()=>{
  let get=document.getElementById("Estatus").value;
  if(get==="Finalizado"){
    this.peticionPost();
  }else{
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Seleccione el estatus Finalizado',
      showConfirmButton: false,
      timer: 3000
    })
  }
}

  render(){
  const {form}=this.state; 
  return (
    <div className="App">
       <div >
        <meta charSet="UTF-8" />
        <title>MR.FIX</title>
        <link rel="stylesheet" href="./menu.css" />
        <div id="imagen">
        <Link to='/Menu'>
      <img src={regresar} alt="imagen para regresar al menú" className="icon" align="right" width="150%" height="150%"/>
      </Link>
      <Link to='/Historial'>
      <img src={historial} alt="historial" className="icon" align="right" width="150%" height="150%" padding= "150px"/>
      </Link>
        </div>
        <div id="titulo">
          <p id="header">MR.FIX</p>
          <p id="name">REPARACIONES</p>
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
              <button className="btn btn-primary" onClick={()=>{this.seleccionarReparacion(reparacion); this.modalE()}}><FontAwesomeIcon icon={faEdit}/></button>
              </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    </div>
    <Modal isOpen={this.state.modalE}>
                <ModalHeader style={{display: 'block'}}>
                  REPARACIONES
                </ModalHeader>
                <ModalBody>
                    <label>ID Reparacion</label>
                    <input className="form-control" type="texte" name="IDReparacion" readOnly id="IDReparacion"  onChange={this.handleChange} value={form?form.IDReparacion:''}/>
                    <label>ID Venta</label>
                    <input className="form-control" type="texte" name="IDVenta" readOnly id="IDVenta"  value={form?form.IDVenta:''}/>
                    <FormGroup>
                    <label>Estatus</label>
                    <select className="form-control" type="texte" name="Estatus" id="Estatus" onChange={this.handleChange} value={form?form.Estatus: ''}  >  
                    <option></option> 
                    <option>En espera</option> 
                    <option>En diagnostico</option> 
                    <option>En reparación</option> 
                    <option>Listo para entregar</option> 
                    <option>Finalizado</option> 
                    </select> 
                    <span id="msgTS" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Observaciones</label>
                    <input className="form-control" type="texte"  name="Observaciones"  id="Observaciones"  onChange={this.handleChange} value={form?form.Observaciones: ''}/>
                    <span id="msgOS" class="color"></span>
                    </FormGroup>
                    <label>Tipo de Servicio</label>
                    <input className="form-control" type="texte"   name="TipoServicio" readOnly id="TipoServicio" value={form?form.TipoServicio:''}/>
                    <label>Vehiculo</label>
                    <input className="form-control" type="texte"   name="Vehiculo" readOnly id="Vehiculo"  value={form?form.Vehiculo:''}/>
                    <label>Mecanico</label>
                    <input className="form-control" type="texte"   name="Mecanico" readOnly id="Mecanico"  value={form?form.Mecanico:''}/>
                </ModalBody>
                <ModalFooter>
                <Button onClick={()=>this.cambiar()}>Finalizar reparación:<FontAwesomeIcon icon={faCheck}/></Button>
                    <Button className="btn btn-primary" onClick={()=>this.validaciones()}>
                  Actualizar:<FontAwesomeIcon icon={faFloppyDisk}/>
                  </Button>
                    <Button className="btn btn-danger" onClick={()=>this.modalE()}><FontAwesomeIcon icon={faRectangleXmark}/></Button>
                </ModalFooter>
          </Modal> 
  </div>
  );

}
}
export default App;