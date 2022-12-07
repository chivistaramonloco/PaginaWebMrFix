import './administrador.css'
import React, { Component } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFloppyDisk, faRectangleXmark, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader, FormGroup } from 'reactstrap';
import regresar from "./../viewimages/regresar.png";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
window.Swal = Swal;
class App extends Component {
state={
  data:[],
  modalA: false,
  form:{
    IDEmpleado: '',
    NombreEmpleado: '',
    ApePatEmpleado: '',
    ApeMatEmpleado: '',
    CorreoEmpleado: '',
    TelefonoEmpleado: '',
    Username: '',
    Contrasena: ''
  }
}

peticionGet=async()=>{
await axios.get(`https://conecttaller.azurewebsites.net/API/empleados`).then(response=>{
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}

peticionPost=async()=>{
 await axios.post(`https://conecttaller.azurewebsites.net/API/empleados/agregar/`,this.state.form).then(response=>{
  }).then(async() => {
   
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Administrador agregado correctamente',
      showConfirmButton: false,
      timer: 1500
    
    })
    this.modalA();
    this.peticionGet();
  })
}

peticionPut=()=>{
  axios.put(`https://conecttaller.azurewebsites.net/API/empleados/actualizar/`, this.state.form).then(response=>{
    
  }).then(async() => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Administrador editado correctamente',
      showConfirmButton: false,
      timer: 1500
      
    })
    this.modalA();
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
        axios.get(`https://conecttaller.azurewebsites.net/API/empleados/eliminar/`+this.state.form.IDEmpleado)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Administrador eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      }
    
      this.peticionGet();
    })
}


modalA=()=>{
  this.setState({modalA: !this.state.modalA});
}

seleccionarEmpleado=(empleado)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
    IDEmpleado:  empleado.IDEmpleado,
    NombreEmpleado: empleado.NombreEmpleado,
    ApePatEmpleado: empleado.ApePatEmpleado,
    ApeMatEmpleado: empleado.ApeMatEmpleado,
    CorreoEmpleado:empleado.CorreoEmpleado,
    TelefonoEmpleado: empleado.TelefonoEmpleado,
    Username:empleado.Username,
    Contrasena: empleado.Contrasena
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
    var validauser= /^[a-zA-Z0-9_-]{4,25}$/;
    var validanom= /^[a,-z,-A,-Z,-À,-ÿ,-0,-9,-\s+]{4,500}$/;
    var validacontra= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,20}$/;
    var validacoreo= /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; 
    let ne = document.getElementById("NombreEmpleado").value;
    let nap = document.getElementById("ApePatEmpleado").value;
    let nam = document.getElementById("ApeMatEmpleado").value;
    let cp = document.getElementById("CorreoEmpleado").value;
    let tp = document.getElementById("TelefonoEmpleado").value;
    let un = document.getElementById("Username").value;
    let ca = document.getElementById("Contrasena").value;
    let checador = 0;
    if (ne.length===0 )  {
      document.getElementById("msgNOM").innerText = "Campo Vacío";
      document.getElementById("msgNOM").style.color= "red";
      document.getElementById("NombreEmpleado").style.borderColor="red";
    }else{
      document.getElementById("msgNOM").innerText = "";
      document.getElementById("msgNOM").style.color= "";
      document.getElementById("NombreEmpleado").style.borderColor="";
      if(ne.match(validanom)){
        checador+=1;
        document.getElementById("msgNOM").innerText = "";
        document.getElementById("msgNOM").style.color= "";
        document.getElementById("NombreEmpleado").style.borderColor="";
      }
      else {
        document.getElementById("msgNOM").innerText = "solo acepta letras, minimo 4 letras y maximo 30";
        document.getElementById("msgNOM").style.color= "red";
        document.getElementById("NombreEmpleado").style.borderColor="red";
      }
    }
    if (nap.length===0 )  {
      document.getElementById("msgNAP").innerText = "Campo Vacío";
      document.getElementById("msgNAP").style.color= "red";
      document.getElementById("ApePatEmpleado").style.borderColor="red";
    }else{
      document.getElementById("msgNAP").innerText = "";
      document.getElementById("msgNAP").style.color= "";
      document.getElementById("ApePatEmpleado").style.borderColor="";
      if(nap.match(validanom)){
        checador+=1;
        document.getElementById("msgNAP").innerText = "";
        document.getElementById("msgNAP").style.color= "";
        document.getElementById("ApePatEmpleado").style.borderColor="";
      }
      else {
        document.getElementById("msgNAP").innerText = "solo acepta letras, minimo 4 letras y maximo 30";
        document.getElementById("msgNAP").style.color= "red";
        document.getElementById("ApePatEmpleado").style.borderColor="red";
      }
    }
    if (nam.length===0 )  {
      document.getElementById("msgNAM").innerText = "Campo Vacío";
      document.getElementById("msgNAM").style.color= "red";
      document.getElementById("ApeMatEmpleado").style.borderColor="red";
    }else{
      document.getElementById("msgNAM").innerText = "";
      document.getElementById("msgNAM").style.color= "";
      document.getElementById("ApeMatEmpleado").style.borderColor="";
      if(nam.match(validanom)){
        checador+=1;
        document.getElementById("msgNAM").innerText = "";
        document.getElementById("msgNAM").style.color= "";
        document.getElementById("ApeMatEmpleado").style.borderColor="";
      }
      else {
        document.getElementById("msgNAM").innerText = "solo acepta letras, minimo 4 letras y maximo 30";
        document.getElementById("msgNAM").style.color= "red";
        document.getElementById("ApeMatEmpleado").style.borderColor="red";
      }
    }
    if (cp.length===0 )  {
      document.getElementById("msgCORREO").innerText = "Campo Vacío"
      document.getElementById("msgCORREO").style.color= "red"
      document.getElementById("CorreoEmpleado").style.borderColor="red"
    }else{
      document.getElementById("msgCORREO").innerText = ""
      document.getElementById("msgCORREO").style.color= ""
      document.getElementById("CorreoEmpleado").style.borderColor=""
      if(cp.match(validacoreo)){
        checador+=1;
        document.getElementById("msgCORREO").innerText = "";
        document.getElementById("msgCORREO").style.color= ""
        document.getElementById("CorreoEmpleado").style.borderColor=""
      }
      else {
        document.getElementById("msgCORREO").innerText = "Letras, numeros, guion y guion_bajo, debe de llevar un @ y un dominio";
        document.getElementById("msgCORREO").style.color= "red"
        document.getElementById("CorreoEmpleado").style.borderColor="red"
      }
    }
      if (tp.length===0)  {
        document.getElementById("msgTEL").innerText = "Campo Vacío";
        document.getElementById("msgTEL").style.color= "red"
        document.getElementById("TelefonoEmpleado").style.borderColor="red"
        
      }else{
        document.getElementById("msgTEL").innerText = "";
        document.getElementById("msgTEL").style.color= ""
        document.getElementById("TelefonoEmpleado").style.borderColor=""
     
          if(isNaN(tp)){
            document.getElementById("msgTEL").innerText = "solo acepta numeros, minimo 10 numeros y maximo 15";
            document.getElementById("msgTEL").style.color= "red"
            document.getElementById("TelefonoEmpleado").style.borderColor="red"
           
          }else{
            checador+=1
            document.getElementById("msgTEL").innerText = "";
            document.getElementById("msgTEL").style.color= ""
            document.getElementById("TelefonoEmpleado").style.borderColor=""
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
        <link rel="stylesheet" href="./menu.css" />
        <div id="imagen">
        <Link to='/Menu'>
      <img src={regresar} alt="imagen para regresar al menú" className="icon" align="right" width="150%" height="150%"/>
      </Link>
        </div>
        <div id="titulo">
          <p id="header">MR.FIX</p>
          <p id="name">ADMINISTRADORES</p>
          <p id="subheader">TALLER MECANICO</p>
        </div>
        </div> 
        <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalA()}}>Agregar Administrador</button>
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
        <th>Usarname</th>
        <th>Contraseña</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(empleado=>{
          return(
          <tr>
            <td>{empleado.IDEmpleado}</td>
            <td>{empleado.NombreEmpleado}</td>
            <td>{empleado.ApePatEmpleado}</td>
            <td>{empleado.ApeMatEmpleado}</td>
            <td>{empleado.CorreoEmpleado}</td>
            <td>{empleado.TelefonoEmpleado}</td>
            <td>{empleado.Username}</td>
            <td>{empleado.Contrasena}</td>
            <td>
              <button className="btn btn-primary" onClick={()=>{this.seleccionarEmpleado(empleado); this.modalA()}}><FontAwesomeIcon icon={faEdit}/></button>
              <button className="btn btn-danger" onClick={()=>{this.seleccionarEmpleado(empleado); this.peticionDelete()}}><FontAwesomeIcon icon={faTrashAlt}/></button>
            </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    </div>
    <Modal isOpen={this.state.modalA}>
    <ModalHeader style={{display: 'block'}}>
                ADMINISTRADOR
                </ModalHeader>
                <ModalBody>
                    <label>ID</label>
                    <input className="form-control" type="texte" name="IDEmpleado" id="IDEmpleado" readOnly onChange={this.handleChange} value={form?form.IDEmpleado:''}/>
                    <FormGroup>
                    <label>Nombre</label>
                    <input className="form-control" type="texte" name="NombreEmpleado" id="NombreEmpleado" onChange={this.handleChange} value={form?form.NombreEmpleado: ''}/>
                    <span id="msgNOM" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Apellido paterno</label>
                    <input className="form-control" type="texte" name="ApePatEmpleado" id="ApePatEmpleado" onChange={this.handleChange} value={form?form.ApePatEmpleado: ''}/>
                    <span id="msgNAP" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Apellido materno</label>
                    <input className="form-control" type="texte" name="ApeMatEmpleado" id="ApeMatEmpleado" onChange={this.handleChange} value={form?form.ApeMatEmpleado: ''}/>
                    <span id="msgNAM" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Correo</label>
                    <input className="form-control" type="texte" name="CorreoEmpleado" id="CorreoEmpleado" onChange={this.handleChange} value={form?form.CorreoEmpleado: ''}/>
                    <span id="msgCORREO" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Telefono</label>
                    <input className="form-control" type="texte" name="TelefonoEmpleado" minLength="10" maxLength="15" id="TelefonoEmpleado" onChange={this.handleChange} value={form?form.TelefonoEmpleado: ''}/>
                    <span id="msgTEL" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Username</label>
                    <input className="form-control" type="texte" name="Username" id="Username" onChange={this.handleChange} value={form?form.Username: ''}/>
                    <span id="msgUN" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Contraseña</label>
                    <input className="form-control" type="password" name="Contrasena"  minLength= "8" id="Contrasena" onChange={this.handleChange} value={form?form.Contrasena: ''}/>
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
                    <Button className="btn btn-danger" onClick={()=>this.modalA()}><FontAwesomeIcon icon={faRectangleXmark}/></Button>
                </ModalFooter>
          </Modal> 
  </div>
  );

}
}
export default App;