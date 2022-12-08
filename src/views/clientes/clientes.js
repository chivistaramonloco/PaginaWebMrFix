import './clientes.css'
import React, { Component } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFloppyDisk, faRectangleXmark, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader,FormGroup } from 'reactstrap';
import regresar from "./../viewimages/regresar.png";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
window.Swal = Swal;
class App extends Component {
state={
  data:[],
  modalC: false,
  form:{
    IDCliente: '',
    NombreCliente: '',
    ApePatCliente: '',
    ApeMatCliente: '',
    CorreoCliente: '',
    TelefonoCliente: '',
    Username: '',
    Contrasena: ''
  }
}

peticionGet=async()=>{
await axios.get(`https://apifix.azurewebsites.net/API/clientes`).then(response=>{
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}

peticionPost=async()=>{
 await axios.post(`https://apifix.azurewebsites.net/API/clientes/agregar/`,this.state.form).then(response=>{
  }).then(async() => {
   
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cliente agregado correctamente',
      showConfirmButton: false,
      timer: 1500
    
    })
    this.modalC();
    this.peticionGet();
  })
}

peticionPut=()=>{
  axios.put(`https://apifix.azurewebsites.net/API/clientes/actualizar/`, this.state.form).then(response=>{
  }).then(async() => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cliente editado correctamente',
      showConfirmButton: false,
      timer: 1500
    })
    this.modalC();
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
        axios.get(`https://apifix.azurewebsites.net/API/clientes/eliminar/`+this.state.form.IDCliente)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cliente eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      }
    
      this.peticionGet();
    })
}
modalC=()=>{
  this.setState({modalC: !this.state.modalC});
}

seleccionarCliente=(cliente)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
    IDCliente: cliente.IDCliente,
    NombreCliente: cliente.NombreCliente,
    ApePatCliente: cliente.ApePatCliente,
    ApeMatCliente: cliente.ApeMatCliente,
    CorreoCliente: cliente.CorreoCliente,
    TelefonoCliente: cliente.TelefonoCliente,
    Username: cliente.Username,
    Contrasena: cliente.Contrasena

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
  limpiarFormulario() {
    document.getElementById("miForm").reset();
  }
  validaciones=()=>{
    var validauser= /^[a-zA-Z0-9_-]{4,25}$/;
    var validanom= /^[a,-z,-A,-Z,-À,-ÿ,-0,-9,-\s+]{4,500}$/;
    var validacontra= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,20}$/;
    var validacoreo= /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; 
    let nc = document.getElementById("NombreCliente").value;
    let nap = document.getElementById("ApePatCliente").value;
    let nam = document.getElementById("ApeMatCliente").value;
    let cc = document.getElementById("CorreoCliente").value;
    let tc = document.getElementById("TelefonoCliente").value;
    let un = document.getElementById("Username").value;
    let ca = document.getElementById("Contrasena").value;
    let checador = 0;
    if (nc.length===0 )  {
      document.getElementById("msgNOM").innerText = "Campo Vacío";
      document.getElementById("msgNOM").style.color= "red";
      document.getElementById("NombreCliente").style.borderColor="red";
    }else{
      document.getElementById("msgNOM").innerText = "";
      document.getElementById("msgNOM").style.color= "";
      document.getElementById("NombreCliente").style.borderColor="";
      if(nc.match(validanom)){
        checador+=1;
        document.getElementById("msgNOM").innerText = "";
        document.getElementById("msgNOM").style.color= "";
        document.getElementById("NombreCliente").style.borderColor="";
      }
      else {
        document.getElementById("msgNOM").innerText = "solo acepta letras, minimo 4 letras y maximo 30";
        document.getElementById("msgNOM").style.color= "red";
        document.getElementById("NombreCliente").style.borderColor="red";
      }
    }
    if (nap.length===0 )  {
      document.getElementById("msgNAP").innerText = "Campo Vacío";
      document.getElementById("msgNAP").style.color= "red";
      document.getElementById("ApePatCliente").style.borderColor="red";
    }else{
      document.getElementById("msgNAP").innerText = "";
      document.getElementById("msgNAP").style.color= "";
      document.getElementById("ApePatCliente").style.borderColor="";
      if(nap.match(validanom)){
        checador+=1;
        document.getElementById("msgNAP").innerText = "";
        document.getElementById("msgNAP").style.color= "";
        document.getElementById("ApePatCliente").style.borderColor="";
      }
      else {
        document.getElementById("msgNAP").innerText = "solo acepta letras, minimo 4 letras y maximo 30";
        document.getElementById("msgNAP").style.color= "red";
        document.getElementById("ApePatCliente").style.borderColor="red";
      }
    }
    if (nam.length===0 )  {
      document.getElementById("msgNAM").innerText = "Campo Vacío";
      document.getElementById("msgNAM").style.color= "red";
      document.getElementById("ApeMatCliente").style.borderColor="red";
    }else{
      document.getElementById("msgNAM").innerText = "";
      document.getElementById("msgNAM").style.color= "";
      document.getElementById("ApeMatCliente").style.borderColor="";
      if(nam.match(validanom)){
        checador+=1;
        document.getElementById("msgNAM").innerText = "";
        document.getElementById("msgNAM").style.color= "";
        document.getElementById("ApeMatCliente").style.borderColor="";
      }
      else {
        document.getElementById("msgNAM").innerText = "solo acepta letras, minimo 4 letras y maximo 30";
        document.getElementById("msgNAM").style.color= "red";
        document.getElementById("ApeMatCliente").style.borderColor="red";
      }
    }
    if (cc.length===0 )  {
      document.getElementById("msgCORREO").innerText = "Campo Vacío"
      document.getElementById("msgCORREO").style.color= "red"
      document.getElementById("CorreoCliente").style.borderColor="red"
    }else{
      document.getElementById("msgCORREO").innerText = ""
      document.getElementById("msgCORREO").style.color= ""
      document.getElementById("CorreoCliente").style.borderColor=""
      if(cc.match(validacoreo)){
        checador+=1;
        document.getElementById("msgCORREO").innerText = "";
        document.getElementById("msgCORREO").style.color= ""
        document.getElementById("CorreoCliente").style.borderColor=""
      }
      else {
        document.getElementById("msgCORREO").innerText = "Letras, numeros, guion y guion_bajo, debe de llevar un @ y un dominio";
        document.getElementById("msgCORREO").style.color= "red"
        document.getElementById("CorreoCliente").style.borderColor="red"
      }
    }
      if (tc.length===0)  {
        document.getElementById("msgTEL").innerText = "Campo Vacío";
        document.getElementById("msgTEL").style.color= "red"
        document.getElementById("TelefonoCliente").style.borderColor="red"
        
      }else{
        document.getElementById("msgTEL").innerText = "";
        document.getElementById("msgTEL").style.color= ""
        document.getElementById("TelefonoCliente").style.borderColor=""
     
          if(isNaN(tc)){
            document.getElementById("msgTEL").innerText = "solo acepta numeros, minimo 10 numeros y maximo 15";
            document.getElementById("msgTEL").style.color= "red"
            document.getElementById("TelefonoCliente").style.borderColor="red"
           
          }else{
            checador+=1
            document.getElementById("msgTEL").innerText = "";
            document.getElementById("msgTEL").style.color= ""
            document.getElementById("TelefonoCliente").style.borderColor=""
          }
      }
      if (un.length===0 )  {
        document.getElementById("msgUN").innerText = "Campo Vacío";
        document.getElementById("msgUN").style.color= "red";
        document.getElementById("Username").style.borderColor="red";
      }else{
        document.getElementById("msgUN").innerText = "";
        document.getElementById("msgUN").style.color= "";
        document.getElementById("Username").style.borderColor="";
        if(un.match(validauser)){
          checador+=1;
          document.getElementById("msgUN").innerText = "";
          document.getElementById("msgUN").style.color= "";
          document.getElementById("Username").style.borderColor="";
        }
        else {
          document.getElementById("msgUN").innerText = "Letras, numeros, guion y guion_bajo, minimo 4 letras y maximo 16";
          document.getElementById("msgUN").style.color= "red";
          document.getElementById("Username").style.borderColor="red";
        }
      }
      if (ca.length===0 )  {
        document.getElementById("msgCA").innerText = "Campo Vacío";
        document.getElementById("msgCA").style.color= "red";
        document.getElementById("Contrasena").style.borderColor="red";
      }else{
        document.getElementById("msgCA").innerText = "";
        document.getElementById("msgCA").style.color= "";
        document.getElementById("Contrasena").style.borderColor="";
        if(ca.match(validacontra)){
          checador+=1;
          document.getElementById("msgCA").innerText = "";
          document.getElementById("msgCA").style.color= "";
          document.getElementById("Contrasena").style.borderColor="";
        }
        else {
          document.getElementById("msgCA").innerText = "Minimo 8 letras, una minuscula, una mayuscula y un numero";
          document.getElementById("msgCA").style.color= "red";
          document.getElementById("Contrasena").style.borderColor="red";
        }
      }
      if(checador===7){
        if(this.state.tipoModal==='insertar'){
          this.peticionPost();
        }else{
          this.peticionPut();
        }
      }
  }

  render(){
  const {form}=this.state;
  return (
    <div className="App">
        <div >
        <meta charSet="UTF-8" />
        <title>MR.FIX</title>
        <link rel="stylesheet" href="./clientes.css" />
        <div id="imagen">
        <Link to='/Menu'>
      <img src={regresar} alt="imagen para regresar al menú" className="icon" align="right" width="150%" height="150%"/>
      </Link>
        </div>
        <div id="titulo">
          <p id="header">MR.FIX</p>
          <p id="name">CLIENTES</p>
          <p id="subheader">TALLER MECANICO</p>
        </div>
        </div>
        <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalC()}}>Agregar Cliente</button>
    <div class="table"> 
    <table class="table" >
        <thead>
        <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Apellido paterno</th>
        <th>Apellido materno</th>
        <th>Correo</th>
        <th>Telefono</th>
        <th>Username</th>
        <th>Contraseña</th>
        <th></th>
        <th></th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(cliente=>{
          return(
          <tr>
            <td>{cliente.IDCliente}</td>
            <td>{cliente.NombreCliente}</td>
            <td>{cliente.ApePatCliente}</td>
            <td>{cliente.ApeMatCliente}</td>
            <td>{cliente.CorreoCliente}</td>
            <td>{cliente.TelefonoCliente}</td>
            <td>{cliente.Username}</td>
            <td>{cliente.Contrasena}</td>
            <td>
              <button  className="btn btn-primary"  onClick={()=>{this.seleccionarCliente(cliente); this.modalC()}}><FontAwesomeIcon icon={faEdit}/></button>
              <button className="btn btn-danger" onClick={()=>{this.seleccionarCliente(cliente); this.peticionDelete()}}><FontAwesomeIcon icon={faTrashAlt}/></button>
            </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    </div>
    <Modal isOpen={this.state.modalC}>
                <ModalHeader style={{display: 'block'}}>
                CLIENTES
                </ModalHeader>
                <ModalBody>
                    <label>ID</label>
                    <input className="form-control" type="texte" name="IDCliente" id="IDCliente" readOnly onChange={this.handleChange} value={form?form.IDCliente:''}/>
                    <FormGroup>
                    <label>Nombre</label>
                    <input className="form-control" type="texte" name="NombreCliente" id="NombreCliente" onChange={this.handleChange} value={form?form.NombreCliente: ''}/>
                    <span id="msgNOM" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Apellido paterno</label>
                    <input className="form-control" type="texte" name="ApePatCliente" id="ApePatCliente" onChange={this.handleChange} value={form?form.ApePatCliente: ''}/>
                    <span id="msgNAP" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Apellido materno</label>
                    <input className="form-control" type="texte" name="ApeMatCliente" id="ApeMatCliente" onChange={this.handleChange} value={form?form.ApeMatCliente: ''}/>
                    <span id="msgNAM" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Correo</label>
                    <input className="form-control" type="texte" name="CorreoCliente" id="CorreoCliente" onChange={this.handleChange} value={form?form.CorreoCliente: ''}/>
                    <span id="msgCORREO" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Telefono</label>
                    <input className="form-control" type="texte" name="TelefonoCliente"  minLength="10" maxLength="15" id="TelefonoCliente" onChange={this.handleChange} value={form?form.TelefonoCliente: ''}/>
                    <span id="msgTEL" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Username</label>
                    <input className="form-control" type="texte" name="Username" id="Username" onChange={this.handleChange} value={form?form.Username: ''}/>
                    <span id="msgUN" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Contraseña</label>
                    <input className="form-control" type="password" name="Contrasena" minLength= "8" id="Contrasena" onChange={this.handleChange} value={form?form.Contrasena: ''}/>
                    <span id="msgCA" class="color"></span>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                  {this.state.tipoModal==='insertar'?
                    <Button className="btn btn-primary" onClick={()=>this.validaciones()}>
                    <FontAwesomeIcon icon={faFloppyDisk}/>
                  </Button>: <Button className="btn btn-primary" onClick={()=>this.validaciones()}>
                  <FontAwesomeIcon icon={faFloppyDisk}/>
                  </Button>
                  }
                    <Button className="btn btn-danger" onClick={()=>this.modalC()}><FontAwesomeIcon icon={faRectangleXmark}/></Button>
                </ModalFooter>
          </Modal> 
  </div>
  );
}
}
export default App;