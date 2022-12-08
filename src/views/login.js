import './login.css';
import React, { Component } from 'react';
import axios from "axios";
import logomrfix from "./viewimages/logmrfix.png";
import {FormGroup } from 'reactstrap';
import Cookies from 'universal-cookie';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
window.Swal = Swal;
const cookies = new Cookies();
class Login extends Component {
  state = {
    data: [],
    form: {
      Username: '',
      Contrasena: ''
    }
  }

  handleChange = async e => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
  }
  validacionesM=()=>{
    let ts = document.getElementById("Username").value;
    let cs = document.getElementById("Contrasena").value;
    
  
    let checador = 0;
    if (ts.length===0 )  {
      document.getElementById("msgIDU").style.color= "red";
      document.getElementById("Username").style.borderColor="red";
    }else{
      checador+=1;
      document.getElementById("msgIDU").style.color= "";
      document.getElementById("Username").style.borderColor="";
    }
      
      if ( cs.length===0)  {
        document.getElementById("msgIDC").style.color= "red";
        document.getElementById("Contrasena").style.borderColor="red";
        
      }else{
        checador+=1;
        document.getElementById("msgIDC").style.color= "";
        document.getElementById("Contrasena").style.borderColor="";
      }
        if(checador===2){   
          this.iniciarSesionMecanico();
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Faltan campos por llenar',
            showConfirmButton: false,
            timer: 1500
          })
        }
    }
 validaciones=()=>{
    let ts = document.getElementById("Username").value;
    let cs = document.getElementById("Contrasena").value;
    
    let checador = 0;
    if (ts.length===0 )  {
      document.getElementById("msgIDU").style.color= "red";
      document.getElementById("Username").style.borderColor="red";
    }else{
      checador+=1;
      document.getElementById("msgIDU").style.color= "";
      document.getElementById("Username").style.borderColor="";
    }
      
      if ( cs.length===0)  {
        document.getElementById("msgIDC").style.color= "red";
        document.getElementById("Contrasena").style.borderColor="red";
        
      }else{
        checador+=1;
        document.getElementById("msgIDC").style.color= "";
        document.getElementById("Contrasena").style.borderColor="";
      }
        if(checador===2){   
          this.iniciarSesion();
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Faltan campos por llenar',
            showConfirmButton: false,
            timer: 1500
          })
        }
    }
  iniciarSesion = async () => {
    axios.get(`https://conecttaller.azurewebsites.net/API/empleados/login/` + this.state.form.Username)
      .then(response => {
        return response.data;
      })
      .then(response => {
        if (response.length > 0) {
          axios.get(`https://conecttaller.azurewebsites.net/API/empleados/loginc/` + this.state.form.Contrasena)
            .then(response => {
              return response.data;
            })
            .then(response => {
              if (response.length > 0) {
                var respuesta = response[0];
                cookies.set('Username', respuesta.Username, { path: "/" });
                cookies.set('Contrasena', respuesta.Contrasena, { path: "/" });
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: (`Bienvenido ${respuesta.Username}`),
                  showConfirmButton: false,
                  timer: 1500
                })
                window.location.href = "./Menu";
              } else {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'El usuario o la contraseña no son correctos',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
            })
            .catch(error => {
              console.log(error);
            })
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'El usuario o la contraseña no son correctos',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  iniciarSesionMecanico = async () => {
    axios.get(`https://conecttaller.azurewebsites.net/API/mecanicos/login/` + this.state.form.Username)
      .then(response => {
        return response.data;
      })
      .then(response => {
        if (response.length > 0) {
          axios.get(`https://conecttaller.azurewebsites.net/API/mecanicos/loginc/` + this.state.form.Contrasena)
            .then(response => {
              return response.data;
            })
            .then(response => {
              if (response.length > 0) {
                var respuesta = response[0];
                cookies.set('Username', respuesta.Username, { path: "/" });
                cookies.set('Contrasena', respuesta.Contrasena, { path: "/" });
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: (`Bienvenido ${respuesta.Username}`),
                  showConfirmButton: false,
                  timer: 1500
                })
                window.location.href = "./Estatuss";
              } else {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'El usuario o la contraseña no son correctos',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
            })
            .catch(error => {
              console.log(error);
            })
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'El usuario o la contraseña no son correctos',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
      .catch(error => {
        console.log(error);
      })
  }
  componentDidMount() {
    if (cookies.get('Username')) {
      window.location.href = "./Menu";
    }
  }


  render() {
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <br></br>
            <h1>BIENVENIDO A MR.FIX</h1>
            <img src={logomrfix} className="profile" id="icon" alt="User Icon" />
            <br></br>
          </div>
          <FormGroup>
          <input type="text" className="form-control" name='Username' id='Username' placeholder="Usuario" onChange={this.handleChange} value={this.state.form.Username} />
          <span id="msgIDU" class="color"></span>
          </FormGroup> 
          <FormGroup>
          <input type="password"  name='Contrasena' id='Contrasena' placeholder="Contraseña" onChange={this.handleChange} value={this.state.form.Contrasena} />
         
          </FormGroup> 
          <span id="msgIDC" class="color"></span>
          <Button onClick={() => this.validaciones()}> Iniciar Sesión Administrador </Button>
          <Button onClick={() => this.validacionesM()}> Iniciar Sesión Mecanico </Button>
        </div>
      </div>
    );
  }
}

export default Login