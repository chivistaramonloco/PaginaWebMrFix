import '../vehiculos/vehiculos.css'
import React, { Component} from 'react';
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
  cliente:[],
  modalV: false,
  form:{
    IDVehiculo: '',
    MarcaVehiculo: '',
    NombreVehiculo: '',
    ModeloVehiculo: '',
    IDCliente: '',
    ClienteCompleto:''
  } 
}
peticionGet=async()=>{
await axios.get(`https://apifix.azurewebsites.net/API/vehiculos`).then(response=>{
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}

peticionGetid=async()=>{
  await axios.get(`https://apifix.azurewebsites.net/API/clientes/nc`).then((response)=>{
    this.setState({  cliente: response.data });
  }).catch(error=>{
    console.log(error.message);
  })
  }

peticionPost=async()=>{
 await axios.post(`https://apifix.azurewebsites.net/API/vehiculos/agregar/`,this.state.form).then(response=>{
  }).then(async() => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Vehiculo agregado correctamente',
      showConfirmButton: false,
      timer: 1500
    })
    this.modalV();
    this.peticionGet();
  })
}

peticionPut=()=>{
  axios.put(`https://apifix.azurewebsites.net/API/vehiculos/actualizar/`, this.state.form).then(response=>{
  }).then(async() => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Vehiculo editado correctamente',
      showConfirmButton: false,
      timer: 1500
      
    })
    this.modalV();
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
        axios.get(`https://apifix.azurewebsites.net/API/vehiculos/eliminar/`+this.state.form.IDVehiculo)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Vehiculo eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      }
      this.peticionGet();
    })
}


modalV=()=>{
  this.setState({modalV: !this.state.modalV});
}
  seleccionarVehiculo=(vehiculo)=>{
    this.setState({
      tipoModal: 'actualizar',
      form: {
      IDVehiculo: vehiculo.IDVehiculo,
      MarcaVehiculo: vehiculo.MarcaVehiculo,
      NombreVehiculo: vehiculo.NombreVehiculo,
      ModeloVehiculo: vehiculo.ModeloVehiculo,
      IDCliente: vehiculo.IDCliente
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
    this.peticionGetid();
  }
  validaciones=()=>{
    var validanom= /^[a,-z,-A,-Z,-À,-ÿ,-0,-9,-\s+]{4,500}$/;
    let mv = document.getElementById("MarcaVehiculo").value;
    let nv = document.getElementById("NombreVehiculo").value;
    let modelov = document.getElementById("ModeloVehiculo").value;
    let ic = document.getElementById("IDCliente").value;
    let checador = 0;
    if (mv.length===0 )  {
      document.getElementById("msgMV").innerText = "Campo Vacío";
      document.getElementById("msgMV").style.color= "red";
      document.getElementById("MarcaVehiculo").style.borderColor="red";
    }else{
      document.getElementById("msgMV").innerText = "";
      document.getElementById("msgMV").style.color= "";
      document.getElementById("MarcaVehiculo").style.borderColor="";
      if(mv.match(validanom)){
        checador+=1;
        document.getElementById("msgMV").innerText = "";
        document.getElementById("msgMV").style.color= "";
        document.getElementById("MarcaVehiculo").style.borderColor="";
      }
      else {
        document.getElementById("msgMV").innerText = "solo acepta letras, minimo 4 letras y maximo 50";
        document.getElementById("msgMV").style.color= "red";
        document.getElementById("MarcaVehiculo").style.borderColor="red";
      }
    }
    if (nv.length===0 )  {
      document.getElementById("msgNV").innerText = "Campo Vacío";
      document.getElementById("msgNV").style.color= "red";
      document.getElementById("NombreVehiculo").style.borderColor="red";
    }else{
      document.getElementById("msgNV").innerText = "";
      document.getElementById("msgNV").style.color= "";
      document.getElementById("NombreVehiculo").style.borderColor="";
      if(nv.match(validanom)){
        checador+=1;
        document.getElementById("msgNV").innerText = "";
        document.getElementById("msgNV").style.color= "";
        document.getElementById("NombreVehiculo").style.borderColor="";
      }
      else {
        document.getElementById("msgNV").innerText = "solo acepta letras, minimo 4 letras y maximo 50";
        document.getElementById("msgNV").style.color= "red";
        document.getElementById("NombreVehiculo").style.borderColor="red";
      }
    }
      if (modelov.length===0)  {
        document.getElementById("msgMODELOV").innerText = "Campo Vacío";
        document.getElementById("msgMODELOV").style.color= "red";
        document.getElementById("ModeloVehiculo").style.borderColor="red";
        
      }else{
        document.getElementById("msgMODELOV").innerText = "";
        document.getElementById("msgMODELOV").style.color= "";
        document.getElementById("ModeloVehiculo").style.borderColor="";
          if(isNaN(modelov)){
            document.getElementById("msgMODELOV").innerText = "solo acepta numeros, minimo y maximo 4 numeros";
            document.getElementById("msgMODELOV").style.color= "red";
            document.getElementById("ModeloVehiculo").style.borderColor="red";
           
          }else{
            checador+=1
            document.getElementById("msgMODELOV").innerText = "";
            document.getElementById("msgMODELOV").style.color= "";
            document.getElementById("ModeloVehiculo").style.borderColor="";
          }
      }
      if (ic.length===0)  {
        document.getElementById("msgID").innerText = "Campo Vacío";
        document.getElementById("msgID").style.color= "red";
        document.getElementById("IDCliente").style.borderColor="red";
        
      }else{
        checador+=1
        document.getElementById("msgID").innerText = "";
        document.getElementById("msgID").style.color= "";
        document.getElementById("IDCliente").style.borderColor="";
      }
      if(checador===4){
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
      <img src={regresar} alt="imagen para regresar al menú"  className="icon" align="right" width="150%" height="150%"/>
      </Link>
        </div>
        <div id="titulo">
          <p id="header">MR.FIX</p>
          <p id="name">VEHICULOS</p>
          <p id="subheader">TALLER MECANICO</p>
        </div>
        </div>
        <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalV()}}>Agregar Vehiculo</button>
    <div class="table"> 
    <table class="table" >
          <thead>
        <tr>
        <th>ID</th>
        <th>Marca</th>
        <th>Nombre</th>
        <th>Modelo</th>
        <th>Cliente</th>
        <th></th>
        <th></th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(vehiculo=>{
          return(
          <tr>
            <td>{vehiculo.IDVehiculo}</td>
            <td>{vehiculo.MarcaVehiculo}</td>
            <td>{vehiculo.NombreVehiculo}</td>
            <td>{vehiculo.ModeloVehiculo}</td>
            <td>{vehiculo.ClienteCompleto}</td>
            <td>
              <button className="btn btn-primary" onClick={()=>{this.seleccionarVehiculo(vehiculo); this.modalV()}}><FontAwesomeIcon icon={faEdit}/></button>
              <button className="btn btn-danger" onClick={()=>{this.seleccionarVehiculo(vehiculo); this.peticionDelete()}}><FontAwesomeIcon icon={faTrashAlt}/></button>
            </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    </div>
    <Modal isOpen={this.state.modalV}>
                <ModalHeader style={{display: 'block'}}>
                  VEHICULOS
                </ModalHeader>
                <ModalBody>
                    <label>ID</label>
                    <input className="form-control" type="texte" name="IDVehiculo" id="IDVehiculo" readOnly onChange={this.handleChange} value={form?form.IDVehiculo:''}/>
                    <FormGroup>
                    <label>Marca</label>
                    <input className="form-control" type="texte" name="MarcaVehiculo" id="MarcaVehiculo" onChange={this.handleChange} value={form?form.MarcaVehiculo: ''}/>
                    <span id="msgMV" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Modelo</label>
                    <input className="form-control" type="texte" name="NombreVehiculo" id="NombreVehiculo" onChange={this.handleChange} value={form?form.NombreVehiculo: ''}/>
                    <span id="msgNV" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Año</label>
                    <input className="form-control" type="texte" name="ModeloVehiculo" minLength="4" maxLength="4" id="ModeloVehiculo" onChange={this.handleChange} value={form?form.ModeloVehiculo: ''}/>
                    <span id="msgMODELOV" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>IDCliente</label>
                    <select type="texte" name="IDCliente" id="IDCliente" onChange={this.handleChange} value={form?form.IDCliente: ''}  >  
                    <option></option>
                    {this.state.cliente.map(cliente=>{     
                    return <option key={cliente.NombreCompleto} value={cliente.IDCliente}>{cliente.NombreCompleto}</option>;  
                    })}  
                    </select> 
                    <span id="msgID" class="color"></span>
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
                    <Button className="btn btn-danger" onClick={()=>this.modalV()}><FontAwesomeIcon icon={faRectangleXmark}/></Button>
                </ModalFooter>
          </Modal> 
  </div>
  );
}
}
export default App;