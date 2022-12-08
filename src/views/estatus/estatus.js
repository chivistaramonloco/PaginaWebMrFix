import './estatus.css'
import React, { Component } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFloppyDisk, faRectangleXmark,  faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader,FormGroup } from 'reactstrap';
import regresar from "./../viewimages/regresar.png";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
window.Swal = Swal;
class App extends Component {
state={
  data:[],
  modalE: false,
  form:{
    IDReparacion:'',
    IDVenta:'',
    Estatus:'',
    IDServicio:'',
    IDVehiculo:'',
    IDMecanico:''
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

 peticionDelete=  () =>{
  Swal.fire({
      title: 'Estas seguro de eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then(async(result) => {
      if (result.isConfirmed) {
        axios.get(`https://apifix.azurewebsites.net/API/reparaciones/eliminar/`+this.state.form.IDReparacion)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Servicio eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      }
    
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
        IDReparacion:reparacion.IDReparacion,
        IDVenta:reparacion.IDVenta,
        Estatus:reparacion.Estatus,
        IDServicio:reparacion.IDServicio,
        IDVehiculo:reparacion.IDVehiculo,
        IDMecanico:reparacion.IDMecanico
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
    let checador = 0;
    if (est.length===0 )  {
      document.getElementById("msgTS").innerText = "Campo Vacío";
      document.getElementById("msgTS").style.color= "red";
      document.getElementById("Estatus").style.borderColor="red";
    }else{
      document.getElementById("msgTS").innerText = "";
      document.getElementById("msgTS").style.color= "";
      document.getElementById("Estatus").style.borderColor="";
      if(est.match(validanom)){
        checador+=1;
        document.getElementById("msgTS").innerText = "";
        document.getElementById("msgTS").style.color= "";
        document.getElementById("Estatus").style.borderColor="";
      }
      else {
        document.getElementById("msgTS").innerText = "solo acepta letras, minimo 4 letras y maximo 500";
        document.getElementById("msgTS").style.color= "red";
        document.getElementById("Estatus").style.borderColor="red";
      }
    }
    
      if(checador===1){
          this.peticionPut();
        
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
        <th>IDServicio</th>
        <th>IDVehiculo</th>
        <th>IDMecanico</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(reparacion=>{
          return(
          <tr>
            <td>{reparacion.IDReparacion}</td>
            <td>{reparacion.IDVenta}</td>
            <td>{reparacion.Estatus}</td>
            <td>{reparacion.IDServicio}</td>
            <td>{reparacion.IDVehiculo}</td>
            <td>{reparacion.IDMecanico}</td>
            <td>
              <button className="btn btn-primary" onClick={()=>{this.seleccionarReparacion(reparacion); this.modalE()}}><FontAwesomeIcon icon={faEdit}/></button>
              <button className="btn btn-danger" onClick={()=>{this.seleccionarReparacion(reparacion); this.peticionDelete()}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                    <input className="form-control" type="texte" name="IDVenta" readOnly id="IDVenta"  onChange={this.handleChange} value={form?form.IDVenta:''}/>
                    <label>ID Venta</label>
                    <input className="form-control" type="texte" name="IDVenta" readOnly id="IDVenta"  onChange={this.handleChange} value={form?form.IDVenta:''}/>
                    <FormGroup>
                    <label>Estatus</label>
                    <input class="form-control " type="texte"  name="Estatus"   id="Estatus"  onChange={this.handleChange} value={form?form.Estatus:''}/>
                    <span id="msgTS" class="color"></span>
                    </FormGroup>
                    <label>ID Servicio</label>
                    <input className="form-control" type="texte"   name="IDServicio"  readOnly id="IDServicio"  onChange={this.handleChange} value={form?form.IDServicio: ''}/>
                    <label>ID Vehiculo</label>
                    <input className="form-control" type="texte"   name="IDVehiculo" readOnly id="IDVehiculo"  onChange={this.handleChange} value={form?form.IDVehiculo: ''}/>
                    <label>ID Mecanico</label>
                    <input className="form-control" type="texte"   name="IDMecanico" readOnly id="IDMecanico"  onChange={this.handleChange} value={form?form.IDMecanico: ''}/>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-primary" onClick={()=>this.validaciones()}>
                  <FontAwesomeIcon icon={faFloppyDisk}/>
                  </Button>
                    <Button className="btn btn-danger" onClick={()=>this.modalE()}><FontAwesomeIcon icon={faRectangleXmark}/></Button>
                </ModalFooter>
          </Modal> 
  </div>
  );

}
}
export default App;