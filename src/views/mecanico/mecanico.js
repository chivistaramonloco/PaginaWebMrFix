import '../mecanico/mecanico.css'
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
  modalM: false,
  form:{
    IDMecanico: '',
    NombreMecanico: '',
    ApePatMecanico: '',
    ApeMatMecanico: '',
    CorreoMecanico: '',
    TelefonoMecanico: '',
    Username: '',
    Contrasena: ''

  }
}

peticionGet=async()=>{
await axios.get(`https://apifix.azurewebsites.net/API/mecanicos`).then(response=>{
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}

peticionPost=async()=>{
 await axios.post(`https://apifix.azurewebsites.net/API/mecanicos/agregar/`,this.state.form).then(response=>{
  }).then(async() => {
   
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Mecanico agregado correctamente',
      showConfirmButton: false,
      timer: 1500
    
    })
    this.modalM();
    this.peticionGet();
  })
}

peticionPut=()=>{
  axios.put(`https://apifix.azurewebsites.net/API/mecanicos/actualizar/`, this.state.form).then(response=>{
    
  }).then(async() => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Mecanico editado correctamente',
      showConfirmButton: false,
      timer: 1500
      
    })
    this.modalM();
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
        axios.get(`https://apifix.azurewebsites.net/API/mecanicos/eliminar/`+this.state.form.IDMecanico)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Mecanico eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      }
    
      this.peticionGet();
    })
}


modalM=()=>{
  this.setState({modalM: !this.state.modalM});
}

seleccionarMecanico=(mecanico)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
    IDMecanico: mecanico.IDMecanico,
    NombreMecanico: mecanico.NombreMecanico,
    ApePatMecanico: mecanico.ApePatMecanico,
    ApeMatMecanico: mecanico.ApeMatMecanico,
    CorreoMecanico: mecanico.CorreoMecanico,
    TelefonoMecanico: mecanico.TelefonoMecanico,
    Username: mecanico.Username,
    Contrasena: mecanico.Contrasena
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
    var validacontra= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,50}$/;
    var validacoreo= /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; 
    let nm = document.getElementById("NombreMecanico").value;
    let nap = document.getElementById("ApePatMecanico").value;
    let nam = document.getElementById("ApeMatMecanico").value;
    let cm = document.getElementById("CorreoMecanico").value;
    let tm = document.getElementById("TelefonoMecanico").value;
    let un = document.getElementById("Username").value;
    let ca = document.getElementById("Contrasena").value;
    let checador = 0;
    if (nm.length===0 )  {
      document.getElementById("msgNOM").innerText = "Campo Vacío";
      document.getElementById("msgNOM").style.color= "red";
      document.getElementById("NombreMecanico").style.borderColor="red";
    }else{
      document.getElementById("msgNOM").innerText = "";
      document.getElementById("msgNOM").style.color= "";
      document.getElementById("NombreMecanico").style.borderColor="";
      if(nm.match(validanom)){
        checador+=1;
        document.getElementById("msgNOM").innerText = "";
        document.getElementById("msgNOM").style.color= "";
        document.getElementById("NombreMecanico").style.borderColor="";
      }
      else {
        document.getElementById("msgNOM").innerText = "solo acepta letras, minimo 4 letras y maximo 30";
        document.getElementById("msgNOM").style.color= "red";
        document.getElementById("NombreMecanico").style.borderColor="red";
      }
    }
    if (nap.length===0 )  {
      document.getElementById("msgNAP").innerText = "Campo Vacío";
      document.getElementById("msgNAP").style.color= "red";
      document.getElementById("ApePatMecanico").style.borderColor="red";
    }else{
      document.getElementById("msgNAP").innerText = "";
      document.getElementById("msgNAP").style.color= "";
      document.getElementById("ApePatMecanico").style.borderColor="";
      if(nap.match(validanom)){
        checador+=1;
        document.getElementById("msgNAP").innerText = "";
        document.getElementById("msgNAP").style.color= "";
        document.getElementById("ApePatMecanico").style.borderColor="";
      }
      else {
        document.getElementById("msgNAP").innerText = "solo acepta letras, minimo 4 letras y maximo 30";
        document.getElementById("msgNAP").style.color= "red";
        document.getElementById("ApePatMecanico").style.borderColor="red";
      }
    }
    if (nam.length===0 )  {
      document.getElementById("msgNAM").innerText = "Campo Vacío";
      document.getElementById("msgNAM").style.color= "red";
      document.getElementById("ApeMatMecanico").style.borderColor="red";
    }else{
      document.getElementById("msgNAM").innerText = "";
      document.getElementById("msgNAM").style.color= "";
      document.getElementById("ApeMatMecanico").style.borderColor="";
      if(nam.match(validanom)){
        checador+=1;
        document.getElementById("msgNAM").innerText = "";
        document.getElementById("msgNAM").style.color= "";
        document.getElementById("ApeMatMecanico").style.borderColor="";
      }
      else {
        document.getElementById("msgNAM").innerText = "solo acepta letras, minimo 4 letras y maximo 30";
        document.getElementById("msgNAM").style.color= "red";
        document.getElementById("ApeMatMecanico").style.borderColor="red";
      }
    }
    if (cm.length===0 )  {
      document.getElementById("msgCORREO").innerText = "Campo Vacío"
      document.getElementById("msgCORREO").style.color= "red"
      document.getElementById("CorreoMecanico").style.borderColor="red"
    }else{
      document.getElementById("msgCORREO").innerText = ""
      document.getElementById("msgCORREO").style.color= ""
      document.getElementById("CorreoMecanico").style.borderColor=""
      if(cm.match(validacoreo)){
        checador+=1;
        document.getElementById("msgCORREO").innerText = "";
        document.getElementById("msgCORREO").style.color= ""
        document.getElementById("CorreoMecanico").style.borderColor=""
      }
      else {
        document.getElementById("msgCORREO").innerText = "Letras, numeros, guion y guion_bajo, debe de llevar un @ y un dominio";
        document.getElementById("msgCORREO").style.color= "red"
        document.getElementById("CorreoMecanico").style.borderColor="red"
      }
    }
      if (tm.length===0)  {
        document.getElementById("msgTEL").innerText = "Campo Vacío";
        document.getElementById("msgTEL").style.color= "red"
        document.getElementById("TelefonoMecanico").style.borderColor="red"
        
      }else{
        document.getElementById("msgTEL").innerText = "";
        document.getElementById("msgTEL").style.color= ""
        document.getElementById("TelefonoMecanico").style.borderColor=""
     
          if(isNaN(tm)){
            document.getElementById("msgTEL").innerText = "solo acepta numeros, minimo 10 numeros y maximo 15";
            document.getElementById("msgTEL").style.color= "red"
            document.getElementById("TelefonoMecanico").style.borderColor="red"
           
          }else{
            checador+=1
            document.getElementById("msgTEL").innerText = "";
            document.getElementById("msgTEL").style.color= ""
            document.getElementById("TelefonoMecanico").style.borderColor=""
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
          <p id="name">MECANICOS</p>
          <p id="subheader">TALLER MECANICO</p>
        </div>
        </div>
        <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalM()}}>Agregar Mecanico</button>
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
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(mecanico=>{
          return(
          <tr>
            <td>{mecanico.IDMecanico}</td>
            <td>{mecanico.NombreMecanico}</td>
            <td>{mecanico.ApePatMecanico}</td>
            <td>{mecanico.ApeMatMecanico}</td>
            <td>{mecanico.CorreoMecanico}</td>
            <td>{mecanico.TelefonoMecanico}</td>
            <td>{mecanico.Username}</td>
            <td>{mecanico.Contrasena}</td>
            <td>
              <button className="btn btn-primary" onClick={()=>{this.seleccionarMecanico(mecanico); this.modalM()}}><FontAwesomeIcon icon={faEdit}/></button>
              <button className="btn btn-danger" onClick={()=>{this.seleccionarMecanico(mecanico); this.peticionDelete()}}><FontAwesomeIcon icon={faTrashAlt}/></button>
            </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    </div>

    <Modal isOpen={this.state.modalM}>
                <ModalHeader style={{display: 'block'}}>
                  MECANICO
                </ModalHeader>
                <ModalBody>
                    <label>ID</label>
                    <input className="form-control" type="texte" name="IDMecanico" id="IDMecanico" readOnly onChange={this.handleChange} value={form?form.IDMecanico:''}/>
                    <FormGroup>
                    <label>Nombre</label>
                    <input className="form-control" type="texte" name="NombreMecanico" id="NombreMecanico" onChange={this.handleChange} value={form?form.NombreMecanico: ''}/>
                    <span id="msgNOM" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Apellido paterno</label>
                    <input className="form-control" type="texte" name="ApePatMecanico" id="ApePatMecanico" onChange={this.handleChange} value={form?form.ApePatMecanico: ''}/>
                    <span id="msgNAP" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Apellido materno</label>
                    <input className="form-control" type="texte" name="ApeMatMecanico" id="ApeMatMecanico" onChange={this.handleChange} value={form?form.ApeMatMecanico: ''}/>
                    <span id="msgNAM" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Correo</label>
                    <input className="form-control" type="texte" name="CorreoMecanico" id="CorreoMecanico" onChange={this.handleChange} value={form?form.CorreoMecanico: ''}/>
                    <span id="msgCORREO" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Telefono</label>
                    <input className="form-control" type="texte" name="TelefonoMecanico"  minLength="10" maxLength="15" id="TelefonoMecanico" onChange={this.handleChange} value={form?form.TelefonoMecanico: ''}/>
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
                    <Button className="btn btn-danger" onClick={()=>this.modalM()}><FontAwesomeIcon icon={faRectangleXmark}/></Button>
                </ModalFooter>
          </Modal> 
  </div>
  );
}
}
export default App;