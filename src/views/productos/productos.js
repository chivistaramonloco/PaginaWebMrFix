import './productos.css'
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
  modalP: false,
  form:{
    IDProducto: '',
    NombreProducto: '',
    MarcaProducto: '',
    DescripcionProducto: '',
    PrecioProducto:'',
    ExistenciaProducto: ''
  } 
}

peticionGet=async()=>{
await axios.get(`https://apifix.azurewebsites.net/API/productos`).then(response=>{
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}

peticionPost=async()=>{
 await axios.post(`https://apifix.azurewebsites.net/API/productos/agregar/`,this.state.form).then(response=>{
  }).then(async() => {
   
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Producto agregado correctamente',
      showConfirmButton: false,
      timer: 1500
    
    })
    this.modalP();
    this.peticionGet();
  })
}

peticionPut=()=>{
   axios.put(`https://apifix.azurewebsites.net/API/productos/actualizar/`, this.state.form).then(response=>{
  }).then(async() => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Producto editado correctamente',
      showConfirmButton: false,
      timer: 1500
      
    })
    this.modalP();
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
        axios.get(`https://apifix.azurewebsites.net/API/productos/eliminar/`+this.state.form.IDProducto)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Producto eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      }
    
      this.peticionGet();
    })
}


modalP=()=>{
  this.setState({modalP: !this.state.modalP});
}

seleccionarProducto=(producto)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
        IDProducto: producto.IDProducto,
        NombreProducto: producto.NombreProducto,
        MarcaProducto: producto.MarcaProducto,
        DescripcionProducto: producto.DescripcionProducto,
        PrecioProducto: producto.PrecioProducto,
        ExistenciaProducto: producto.ExistenciaProducto

    }
  })
}

handleChange=async e=>{
e.persist();
await this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value,
  
    
  }
});
console.log(this.state.form);
}


  componentDidMount() {
    this.peticionGet();
  }
  validaciones=()=>{
    var validanom= /^[a,-z,-A,-Z,-À,-ÿ,-0,-9,-\s+]{2,1000}$/;
    let np = document.getElementById("NombreProducto").value;
    let mp = document.getElementById("MarcaProducto").value;
    let dp = document.getElementById("DescripcionProducto").value;
    let pp = document.getElementById("PrecioProducto").value;
    let ep = document.getElementById("ExistenciaProducto").value;
    let checador = 0;
    if (np.length===0 )  {
      document.getElementById("msgNOM").innerText = "Campo Vacío";
      document.getElementById("msgNOM").style.color= "red";
      document.getElementById("NombreProducto").style.borderColor="red";
    }else{
      document.getElementById("msgNOM").innerText = "";
      document.getElementById("msgNOM").style.color= "";
      document.getElementById("NombreProducto").style.borderColor="";
      if(np.match(validanom)){
        checador+=1;
        document.getElementById("msgNOM").innerText = "";
        document.getElementById("msgNOM").style.color= "";
        document.getElementById("NombreProducto").style.borderColor="";
      }
      else {
        document.getElementById("msgNOM").innerText = "solo acepta letras, minimo 4 letras y maximo 30";
        document.getElementById("msgNOM").style.color= "red";
        document.getElementById("NombreProducto").style.borderColor="red";
      }
    }
    if (mp.length===0 )  {
      document.getElementById("msgMARCA").innerText = "Campo Vacío"
      document.getElementById("msgMARCA").style.color= "red"
      document.getElementById("MarcaProducto").style.borderColor="red"
    }else{
      document.getElementById("msgMARCA").innerText = ""
      document.getElementById("msgMARCA").style.color= ""
      document.getElementById("MarcaProducto").style.borderColor=""
      if(mp.match(validanom)){
        checador+=1;
        document.getElementById("msgMARCA").innerText = "";
        document.getElementById("msgMARCA").style.color= ""
        document.getElementById("MarcaProducto").style.borderColor=""
      }
      else {
        document.getElementById("msgMARCA").innerText = "solo acepta letras, minimo 4 letras y maximo 500";
        document.getElementById("msgMARCA").style.color= "red"
        document.getElementById("MarcaProducto").style.borderColor="red"
      }
    }
    if (dp.length===0 )  {
      document.getElementById("msgDES").innerText = "Campo Vacío";
      document.getElementById("msgDES").style.color= "red"
      document.getElementById("DescripcionProducto").style.borderColor="red"
    }else{
      checador+=1;
      document.getElementById("msgDES").innerText = "";
      document.getElementById("msgDES").style.color= ""
      document.getElementById("DescripcionProducto").style.borderColor=""
  
    }
      if ( pp.length===0)  {
        document.getElementById("msgPRE").innerText = "Campo Vacío";
        document.getElementById("msgPRE").style.color= "red"
        document.getElementById("PrecioProducto").style.borderColor="red"
        
      }else{
        document.getElementById("msgPRE").innerText = "";
        document.getElementById("msgPRE").style.color= ""
        document.getElementById("PrecioProducto").style.borderColor=""
     
          if(isNaN(pp)){
            document.getElementById("msgPRE").innerText = "solo acepta numeros, minimo 1 numero y maximo 8";
            document.getElementById("msgPRE").style.color= "red"
            document.getElementById("PrecioProducto").style.borderColor="red"
           
          }else{
            checador+=1
            document.getElementById("msgPRE").innerText = "";
            document.getElementById("msgPRE").style.color= ""
            document.getElementById("PrecioProducto").style.borderColor=""
          }
      }
      if (ep.length===0)  {
        document.getElementById("msgEXI").innerText = "Campo Vacío";
        document.getElementById("msgEXI").style.color= "red"
        document.getElementById("ExistenciaProducto").style.borderColor="red"
        
      }else{
        document.getElementById("msgEXI").innerText = "";
        document.getElementById("msgEXI").style.color= ""
        document.getElementById("ExistenciaProducto").style.borderColor=""
     
          if(isNaN(ep)){
            document.getElementById("msgEXI").innerText = "solo acepta numeros, minimo 1 numero y maximo 8";
            document.getElementById("msgEXI").style.color= "red"
            document.getElementById("ExistenciaProducto").style.borderColor="red"
           
          }else{
            checador+=1
            document.getElementById("msgEXI").innerText = "";
            document.getElementById("msgEXI").style.color= ""
            document.getElementById("ExistenciaProducto").style.borderColor=""
          }
      }
      if(checador===5){
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
          <p id="name">PRODUCTOS</p>
          <p id="subheader">TALLER MECANICO</p>
        </div>
        </div>
        <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalP()}}>Agregar Producto</button>
    <div class="table" > 
    <table class="table" >
        <thead>
        <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Marca</th>
        <th>Descripción</th>
        <th>Precio</th>
        <th>Existencia</th>
        <th></th>
        <th></th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(producto=>{
          return(
          <tr>
            <td>{producto.IDProducto}</td>
            <td>{producto.NombreProducto}</td>
            <td>{producto.MarcaProducto}</td>
            <td>{producto.DescripcionProducto}</td>
            <td>{Intl.NumberFormat('en-US',
                { style: 'currency', currency: 'USD' }
                ).format(producto.PrecioProducto)}</td>
            <td>{producto.ExistenciaProducto}</td>
            <td>
              <button className="btn btn-primary" onClick={()=>{this.seleccionarProducto(producto); this.modalP()}}><FontAwesomeIcon icon={faEdit}/></button>
              <button className="btn btn-danger" onClick={()=>{this.seleccionarProducto(producto); this.peticionDelete()}}><FontAwesomeIcon icon={faTrashAlt}/></button>
            </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    </div>

    <Modal isOpen={this.state.modalP}>
                <ModalHeader style={{display: 'block'}}>
                  PRODUCTOS
                </ModalHeader>
                <ModalBody>
                    <label >ID</label>
                    <input className="form-control" type="texte" name="IDProducto" id="IDProducto" readOnly onChange={this.handleChange} value={form?form.IDProducto:''}/>
                    <FormGroup>
                    <label>Nombre</label>
                    <input className="form-control" type="texte" name="NombreProducto" id="NombreProducto" onChange={this.handleChange} value={form?form.NombreProducto:''}/>
                    <span id="msgNOM" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Marca</label>
                    <input className="form-control" type="texte" name="MarcaProducto" id="MarcaProducto" onChange={this.handleChange} value={form?form.MarcaProducto:''}/>
                    <span id="msgMARCA" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Descripcion</label>
                    <input className="form-control" type="texte" name="DescripcionProducto" id="DescripcionProducto" onChange={this.handleChange} value={form?form.DescripcionProducto:''}/>
                    <span id="msgDES" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Precio</label>
                    <input className="form-control" type="texte" name="PrecioProducto" minLength="1" maxLength="8" id="PrecioProducto" onChange={this.handleChange} value={form?form.PrecioProducto:''}/>
                    <span id="msgPRE" class="color"></span>
                    </FormGroup>
                    <FormGroup>
                    <label>Existencia</label>
                    <input className="form-control" type="texte" name="ExistenciaProducto" minLength="1" maxLength="8" id="ExistenciaProducto" onChange={this.handleChange} value={form?form.ExistenciaProducto:''}/>
                    <span id="msgEXI" class="color"></span>
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
                    <Button className="btn btn-danger" onClick={()=>this.modalP()}><FontAwesomeIcon icon={faRectangleXmark}/></Button>
                </ModalFooter>
          </Modal> 
  </div>
  );
}
}
export default App;
		         
    