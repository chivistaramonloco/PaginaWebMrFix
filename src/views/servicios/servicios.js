import './servicios.css'
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
  modalS: false,
  form:{
    IDServicio: '',
    TipoServicio: '',
    CostoServicio: ''
  }
}

peticionGet=async()=>{
await axios.get(`https://apifix.azurewebsites.net/API/servicios`).then(response=>{
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}

peticionPost=async()=>{
    await axios.post(`https://apifix.azurewebsites.net/API/servicios/agregar/`,this.state.form).then(response=>{
    }).then(async() => {
     
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Servicio agregado correctamente',
        showConfirmButton: false,
        timer: 1500
      
      })
      this.modalS();
      this.peticionGet();
    })


}

peticionPut=()=>{
  axios.put(`https://apifix.azurewebsites.net/API/servicios/actualizar/`, this.state.form).then(response=>{
  }).then(async() => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Servicio editado correctamente',
      showConfirmButton: false,
      timer: 1500
      
    })
    this.modalS();
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
        axios.get(`https://apifix.azurewebsites.net/API/servicios/eliminar/`+this.state.form.IDServicio)
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


modalS=()=>{
  this.setState({modalS: !this.state.modalS});
}

seleccionarServicio=(servicios)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
    IDServicio: servicios.IDServicio,
    TipoServicio:  servicios.TipoServicio,
    CostoServicio: servicios.CostoServicio
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
    var validanom= /^[a,-z,-A,-Z,-À,-ÿ,-0,-9,-\s+]{1,500}$/;
    let ts = document.getElementById("TipoServicio").value;
    let cs = document.getElementById("CostoServicio").value;
    let checador = 0;
    if (ts.length===0 )  {
      document.getElementById("msgTS").innerText = "Campo Vacío";
      document.getElementById("msgTS").style.color= "red";
      document.getElementById("TipoServicio").style.borderColor="red";
    }else{
      document.getElementById("msgTS").innerText = "";
      document.getElementById("msgTS").style.color= "";
      document.getElementById("TipoServicio").style.borderColor="";
      if(ts.match(validanom)){
        checador+=1;
        document.getElementById("msgTS").innerText = "";
        document.getElementById("msgTS").style.color= "";
        document.getElementById("TipoServicio").style.borderColor="";
      }
      else {
        document.getElementById("msgTS").innerText = "solo acepta letras, minimo 4 letras y maximo 50";
        document.getElementById("msgTS").style.color= "red";
        document.getElementById("TipoServicio").style.borderColor="red";
      }
    }
      
      if ( cs.length===0)  {
        document.getElementById("msgCS").innerText = "Campo Vacío";
        document.getElementById("msgCS").style.color= "red";
        document.getElementById("CostoServicio").style.borderColor="red";
        
      }else{
        document.getElementById("msgCS").innerText = "";
        document.getElementById("msgCS").style.color= "";
        document.getElementById("CostoServicio").style.borderColor="";
     
          if(isNaN(cs)){
            document.getElementById("msgCS").innerText = "solo acepta numeros, minimo 1 numero y maximo 8";
            document.getElementById("msgCS").style.color= "red";
            document.getElementById("CostoServicio").style.borderColor="red";
           
          }else{
            checador+=1
            document.getElementById("msgCS").innerText = "";
            document.getElementById("msgCS").style.color= "";
            document.getElementById("CostoServicio").style.borderColor="";
          }
      }
      if(checador===2){
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
          <p id="name">SERVICIOS</p>
          <p id="subheader">TALLER MECANICO</p>
        </div>
        </div>
        <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalS()}}>Agregar Servicio</button>
    <div class="table"> 
    <table class="table" >
          <thead>
        <tr>
        <th>IDServicio</th>
        <th>Tipo de servicio</th>
        <th>Costo servicios</th>
        <th></th>
        <th></th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(servicios=>{
          return(
          <tr>
            <td>{servicios.IDServicio}</td>
            <td>{servicios.TipoServicio}</td>
            <td>{Intl.NumberFormat('en-US',
                { style: 'currency', currency: 'USD' }
                ).format(servicios.CostoServicio)}</td>
            <td>
              <button className="btn btn-primary" onClick={()=>{this.seleccionarServicio(servicios); this.modalS()}}><FontAwesomeIcon icon={faEdit}/></button>
              <button className="btn btn-danger" onClick={()=>{this.seleccionarServicio(servicios); this.peticionDelete()}}><FontAwesomeIcon icon={faTrashAlt}/></button>
            </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    </div>
    
    <Modal isOpen={this.state.modalS}>
                <ModalHeader style={{display: 'block'}}>
                  SERVICIOS
                </ModalHeader>
                <ModalBody>
                  
                    <label>ID</label>
                    <input className="form-control" type="texte" name="IDServicio" readOnly id="IDServicio"  onChange={this.handleChange} value={form?form.IDServicio:''}/>
                    <FormGroup>
                    <label>Tipo de servicio</label>
                    <input class="form-control " type="texte"  name="TipoServicio"   id="TipoServicio"  onChange={this.handleChange} value={form?form.TipoServicio:''}/>
                    <span id="msgTS" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Costo servicio</label>
                    <input className="form-control" type="texte"   name="CostoServicio"  minLength="1" maxLength="8" id="CostoServicio"  onChange={this.handleChange} value={form?form.CostoServicio: ''}/>
                    <span id="msgCS"  class="color" ></span>
                    </FormGroup>
                  
                </ModalBody>
                <ModalFooter>
                {this.state.tipoModal==='insertar'?
                    <Button  className="btn btn-primary" onClick={()=>this.validaciones()}>
                    <FontAwesomeIcon icon={faFloppyDisk}/>
                  </Button>: <Button className="btn btn-primary" onClick={()=>this.validaciones()}>
                  <FontAwesomeIcon icon={faFloppyDisk}/>
                  </Button>
                  }
                    <Button className="btn btn-danger" onClick={()=>this.modalS()}><FontAwesomeIcon icon={faRectangleXmark}/></Button>
                </ModalFooter>
          </Modal> 
  </div>
  );

}
}
export default App;