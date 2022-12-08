import "./ventas.css"
import React, {useEffect, useRef, useState} from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
import { useReactToPrint } from 'react-to-print';
import regresar from "./../viewimages/regresar.png";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {FormGroup } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
window.Swal = Swal;
 export default function Ventas() {
  const [productos, setProductos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [cart1, setCart1] = useState([]);
  const [idcl, setidcli] = useState([]);
  const [idem, setidemp] = useState([]);
  const [idser, setidser] = useState([]);
  const [idveh, setidveh] = useState([]);
  const [idmec, setidmec] = useState([]);
  const [last, setlast] = useState([]);
  const [Subtotal, setSubtotal] = useState(0);
  const [Subtotal1, setSubtotal1] = useState(0);
    const ComponentToPrint = React.forwardRef((props, ref) => {
    const {cart, Subtotal} = props;
    return ( 
 
      <div class="ticket">
            
      <div ref={ref} className="p-5">
      <p>Venta ralizada por: {gide()}</p>
      <p>Cliente: {gidc()}</p>
      <p>Fecha: {fechas()}</p>
          <table className='table'>
          
                  <thead>
                    <tr>
                      <td>ID</td>
                      <td>Nombre</td>
                      <td>Precio</td>
                      <td>Cantidad</td>
                      <td>Subtotal</td>
                    </tr>
                  </thead>
                  <tbody>                
                     { cart ? cart.map((cartProduct, key)  => 
                     <tr key={key}>
                      <td>{cartProduct.IDProducto}</td>
                      <td>{cartProduct.NombreProducto}</td>
                      <td>{cartProduct.PrecioProducto}</td>
                      <td>{cartProduct.quantity}</td>
                      <td>{cartProduct.Subtotal}</td>
                    </tr>)
                    : ''} 
                  { cart1 ? cart1.map((cartservicio, key) => 
                    <tr key={key}>
                      <td>{cartservicio.IDServicio}</td>
                      <td>{cartservicio.TipoServicio}</td>
                      <td>{cartservicio.CostoServicio}</td>
                      <td>{cartservicio.quantity1}</td>
                      <td>{cartservicio.Subtotal1}</td>
                    </tr>)
                    : ''} 
                </tbody>
                </table>
                <h4 className='px-2'>Total: ${(Subtotal+Subtotal1)}</h4>
                </div>
              
      </div>
      
    );
   
  }
 
  );
  
  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  }

  const fetchProductos = async() => {
   
    const result = await axios.get('https://apifix.azurewebsites.net/API/productos');
    const result2 = await axios.get('https://apifix.azurewebsites.net/API/servicios');
    const result3 = await axios.get('https://apifix.azurewebsites.net/API/clientes/idc');
    const result4 = await axios.get('https://apifix.azurewebsites.net/API/empleados/ide');
    const result5 = await axios.get('https://apifix.azurewebsites.net/API/servicios/ids');
    const result6 = await axios.get('https://apifix.azurewebsites.net/API/vehiculos/idv');
    const result7 = await axios.get('https://apifix.azurewebsites.net/API/mecanicos/idm');
    const result8 =  await axios.get('https://apifix.azurewebsites.net/API/ventas/last');
   
    setProductos(await result.data);
    setServicios(await result2.data);
    setidcli(await result3.data);
    setidemp(await result4.data);
    setidser(await result5.data);
    setidveh(await result6.data);
    setidmec(await result7.data);
    setlast(await result8.data);
    setIsLoading(false);
    
  }

  const addProductToCart = async(product) =>{
    // check if the adding product exist
    let findProductInCart = await cart.find(i=>{
      return i.IDProducto === product.IDProducto
    });
    

    if(findProductInCart){
      let newCart = [];
      let newItem;

      cart.forEach(cartItem => {
        if(cartItem.IDProducto === product.IDProducto){
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            Subtotal: cartItem.PrecioProducto * (cartItem.quantity + 1)
          }
          newCart.push(newItem);
        }else{
          newCart.push(cartItem);
        }
      });

      setCart(newCart);
      toast(`Added ${newItem.NombreProducto} to cart`,toastOptions)

    }else{
      let addingProduct = {
        ...product,
        'quantity': 1,
        'Subtotal': product.PrecioProducto,
      }
      setCart([...cart, addingProduct]);
      toast(`Added ${product.NombreProducto} to cart`, toastOptions)
    }

  }

  const agregraservicio = async(servicios) =>{
    // check if the adding product exist
    let encontrarservicio = await cart1.find(i=>{
      return i.IDServicio === servicios.IDServicio
    });
    

    if(encontrarservicio){
      let newCart1 = [];
      let newItem1;

      cart1.forEach(cartItem1 => {
        if(cartItem1.IDServicio === servicios.IDServicio){
          newItem1 = {
            ...cartItem1,
            quantity1: cartItem1.quantity1 + 1,
            Subtotal1: cartItem1.CostoServicio * (cartItem1.quantity1 + 1)
          }
          newCart1.push(newItem1);
        }else{
          newCart1.push(cartItem1);
        }
      });

      setCart1(newCart1);
      toast(`Added ${newItem1.TipoServicio} to cart`,toastOptions)

    }else{
      let aggservicio = {
        ...servicios,
        'quantity1': 1,
        'Subtotal1': servicios.CostoServicio,
      }
      setCart1([...cart1, aggservicio]);
      toast(`Added ${servicios.TipoServicio} to cart`, toastOptions)
    }

  }

  const removeProduct = async(product) =>{
    const newCart =cart.filter(cartItem => cartItem.IDProducto !== product.IDProducto);
    setCart(newCart);
  }

  const quitarservicio = async(servicios) =>{
    const newCart =cart1.filter(cartItem => cartItem.IDServicio !== servicios.IDServicio);
    setCart1(newCart);
  }

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => (componentRef.current),
  });
  const handlePrint = () => {
    Swal.fire({
      title: 'Esta seguro que quiere realizar la venta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then(async(result) => {
      if (result.isConfirmed) {

          peticionPostV();
          peticionPostR();
          handleReactToPrint();
      }
    }
    )
  }

 
  useEffect(() => {
    fetchProductos();
  },[]);


  useEffect(() => {
    let newSubtotal = 0;
    let newSubtotal1 = 0;
    cart.forEach(icart => {
      newSubtotal = newSubtotal + parseFloat(icart.Subtotal);
    });
    setSubtotal(newSubtotal);
    cart1.forEach(icart => {
      newSubtotal1 = newSubtotal1 + parseFloat(icart.Subtotal1);
    });
    setSubtotal1(newSubtotal1);
  },[cart,cart1])

  const [status, setStatus] = useState(null);
  const [status2, setStatus2] = useState(null);
  const [status3, setStatus3] = useState(null);
  const [status4, setStatus4] = useState(null);
  const [status5, setStatus5] = useState(null);
  
  const total=Subtotal+Subtotal1;
  function changeStatus(e) {
    setStatus(e.target.value);
  }
  function changeStatus2(e) {
    setStatus2(e.target.value);
  }
  function changeStatus3(e) {
    setStatus3(e.target.value);
  }
  function changeStatus4(e) {
    setStatus4(e.target.value);
  }
  function changeStatus5(e) {
    setStatus5(e.target.value);
  }
  const gtotal=()=>{
    state.formV.Total=total;
    return  state.formV.Total;
   }
  const gide=()=>{
    state.formV.IDEmpleado=status2;
    return  state.formV.IDEmpleado;
   }
   const gidc=()=>{
    state.formV.IDCliente=status;
    return state.formV.IDCliente;
   }
   const gids=()=>{
    state.formR.IDServicio=status3;
    return state.formR.IDServicio;
   }
   const gidv=()=>{
    state.formR.IDVehiculo=status4;
    return state.formR.IDVehiculo;
   }
   const gidm=()=>{
    state.formR.IDMecanico=status5;
    return state.formR.IDMecanico;
   }
   const gidven=()=>{
    last.map(venta=>{    
      return  state.formR.IDVenta=venta.IDVenta ;  
        })
    return state.formR.IDVenta
   }
   const gestatu=()=>{
    state.formR.Estatus='En espera';
    return state.formR.Estatus
   }
   const fechas=()=>{
    const current = new Date();
    const fecha = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    state.formV.FechaVenta= fecha;
    return state.formV.FechaVenta;
  }
  
  const peticionPostV=async()=>{
  await axios.post(`https://apifix.azurewebsites.net/API/ventas/agregar/`,state.formV).then(response=>{
   }).then(async() => {
    
     Swal.fire({
       position: 'center',
       icon: 'success',
       title: 'Venta hecha correctamente',
       showConfirmButton: false,
       timer: 1500
     
     })
    
   })
   
 } 
 const peticionPostR=async()=>{
await axios.post(`https://apifix.azurewebsites.net/API/reparaciones/agregar/`,state.formR).then(response=>{
}).then(async() => {

})
 }
const state={
  data:[],
  cliente:[],
  formR:{
    IDReparacion: '',
    IDVenta: '',
    Estatus: '',
    IDServicio: '',
    IDVehiculo: '',
    IDMecanico: ''
  },
  formV:{
    IDVenta: '',
    FechaVenta: '',
    IDCliente: '',
    IDEmpleado: '',
    Total:''
    
  },
  formP:{
    IDVenta: '',
    IDProducto: '',
    Cantidadprod: '',
    Subtotal: ''
  }
}
const validaciones=()=>{
  let ts = document.getElementById("IDCliente").value;
  let cs = document.getElementById("IDEmpleado").value;
  

  let checador = 0;
  if (ts.length===0 )  {
    document.getElementById("msgIDC").innerText = "Campo Vacío";
    document.getElementById("msgIDC").style.color= "red";
    document.getElementById("IDCliente").style.borderColor="red";
  }else{
    checador+=1;
    document.getElementById("msgIDC").innerText = "";
    document.getElementById("msgIDC").style.color= "";
    document.getElementById("IDCliente").style.borderColor="";
  }
    
    if ( cs.length===0)  {
      document.getElementById("msgIDE").innerText = "Campo Vacío";
      document.getElementById("msgIDE").style.color= "red";
      document.getElementById("IDEmpleado").style.borderColor="red";
      
    }else{
      checador+=1;
      document.getElementById("msgIDE").innerText = "";
      document.getElementById("msgIDE").style.color= "";
      document.getElementById("IDEmpleado").style.borderColor="";
    }
  
if(Subtotal1  === 0  ){
  if(checador===2){   
    handlePrint()
  }else{
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Faltan campos por llenar',
      showConfirmButton: false,
      timer: 1500
    })
  }
}else{
  let se = document.getElementById("IDServicio").value;
  let ve = document.getElementById("IDVehiculo").value;
  let me = document.getElementById("IDMecanico").value;
  if ( se.length===0)  {
    document.getElementById("msgIDS").innerText = "Campo Vacío";
    document.getElementById("msgIDS").style.color= "red";
    document.getElementById("IDServicio").style.borderColor="red";
    
  }else{
    checador+=1;
    document.getElementById("msgIDS").innerText = "";
    document.getElementById("msgIDS").style.color= "";
    document.getElementById("IDServicio").style.borderColor="";
  }
  if ( ve.length===0)  {
    document.getElementById("msgIDV").innerText = "Campo Vacío";
    document.getElementById("msgIDV").style.color= "red";
    document.getElementById("IDVehiculo").style.borderColor="red";
    
  }else{
    checador+=1;
    document.getElementById("msgIDV").innerText = "";
    document.getElementById("msgIDV").style.color= "";
    document.getElementById("IDVehiculo").style.borderColor="";
  }
  if ( me.length===0)  {
    document.getElementById("msgIDM").innerText = "Campo Vacío";
    document.getElementById("msgIDM").style.color= "red";
    document.getElementById("IDMecanico").style.borderColor="red";
    
  }else{
    checador+=1;
    document.getElementById("msgIDM").innerText = "";
    document.getElementById("msgIDM").style.color= "";
    document.getElementById("IDMecanico").style.borderColor="";
  }
  if(checador===5){
    handlePrint()
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
}
  return (
      <div className='general'>
        <div className="App">
        <div >
        <meta charSet="UTF-8" />
        <title>MR.FIX</title>
        <div id="imagen">
        <Link to='/Menu'>
      <img src={regresar} alt="imagen para regresar al menú"  className="icon" align="right" width="150%" height="150%"/>
      </Link>
        </div>
        <div id="titulos">
          <p id="header">MR.FIX</p>
          <p id="name">VENTAS</p>
          <p id="subheader">TALLER MECANICO</p>
        </div>
        </div>
     </div> <div className='mt-3'>
          { (Subtotal1 || Subtotal) !== 0 ? <div>
            <button className='btn btn-primary' onClick={validaciones}>
              Pagar
            </button>
          </div> : 'Por favor, agrega un producto o servicio'
          }
        </div>
        <div class="float-container">
        <div class="float-child">
        <FormGroup> 
<label>Cliente</label>
    <select type="texts" name="IDCliente" id="IDCliente" onChange={changeStatus} >  
    <option></option>
    {idcl.map(cliente=>{    
    return <option key={cliente.IDCliente} value={cliente.IDCliente}>{cliente.IDCliente}</option>;  
      })}  
    </select>
    <span id="msgIDC" class="color"></span>
    </FormGroup> 
<FormGroup> 
<label>Administrador</label>
    <select type="texts" name="IDEmpleado" id="IDEmpleado" onChange={changeStatus2} >  
    <option></option>
    {idem.map(empleado=>{    
    return <option key={empleado.IDEmpleado} value={empleado.IDEmpleado}>{empleado.IDEmpleado}</option>;  
      })} 
    </select>
    <span id="msgIDE" class="color"></span>
    </FormGroup>  
    <p type ="mostrar">{fechas()}{gide()}{gidc()}{gtotal()}{gids()}{gidven()}
      {gidv()}
     {gidm()}
      {gestatu()}</p>
    { (Subtotal1  ) !== 0 ? 
        <div >
          <p>Datos para una reparación</p>
          <FormGroup> 
          <label>IDServicio</label>
          <select type="texts" name="IDServicio" id="IDServicio" onChange={changeStatus3} >  
          <option></option>
          {idser.map(servicio=>{    
          return <option key={servicio.IDServicio} value={servicio.IDServicio}>{servicio.IDServicio}</option>;  
           })} 
          </select>
          <span id="msgIDS" class="color"></span>
          </FormGroup>
          <FormGroup> 
          <label>IDVehiculo</label>
          <select type="texts" name="IDVehiculo" id="IDVehiculo" onChange={changeStatus4} >  
          <option></option>
          {idveh.map(vehiculo=>{    
          return <option key={vehiculo.IDVehiculo} value={vehiculo.IDVehiculo}>{vehiculo.IDVehiculo}</option>;  
           })} 
          </select>
          <span id="msgIDV" class="color"></span>
          </FormGroup> 
          <FormGroup>
          <label>IDMecanico</label>
          <select type="texts" name="IDMecanico" id="IDMecanico" onChange={changeStatus5} >  
          <option></option>
          {idmec.map(mecanico=>{    
          return <option key={mecanico.IDMecanico} value={mecanico.IDMecanico}>{mecanico.IDMecanico}</option>;  
           })} 
          </select>
           <span id="msgIDM" class="color"></span>
           </FormGroup> 
          </div> : ''
          
          }
    </div>
       
        </div>
     <div class="grid">
     <div className="tables"> 
     <div class="one">  
     <p></p>
        <div className='col-lg-50'>
          {isLoading ? 'Loading' : <div className='row' >
              {productos.map((product, key) =>
                <div key={key} className='col-lg-6 mb-5 ' >
                  <div className="pos-item px-4 text-center border border-blue-900"  onClick={() => addProductToCart(product)}>
                      <p>{product.NombreProducto}</p>
                      <img src={product.image} alt="imagen para productos" />
                      <p>${product.PrecioProducto}</p>
                  </div>
                </div>
              )}
              {servicios.map((servicio, key) =>
                <div key={key} className='col-lg-6 mb-5'>
                  <div className='pos-item px-4 text-center border' onClick={() => agregraservicio(servicio)}>
                      <p>{servicio.TipoServicio}</p>
                      <img src={servicio.image} alt="imagen para servicios" />
                      <p>${servicio.CostoServicio}</p>
                  </div>

                </div>
                
              )}
              
            </div>}
            
        </div>
        </div>
        </div>
        <div style={{display: "none"}}>
              <ComponentToPrint cart={cart} Subtotal={Subtotal} ref={componentRef}/>
              </div>
        <div class="two"> 
        <div className='col-lg-15'>        
              <div>
              <tr></tr>
              <div className='table-responsive bg-dark'>
              <p className="titulo">PRODUCTOS</p>
                <table className='table table-responsive table-dark table-hover'>
                  <thead>
                    <tr>
                      <td>ID</td>
                      <td>Nombre</td>
                      <td>Precio</td>
                      <td>Cantidad</td>
                      <td>Total</td>
                      <td>Accion</td>
                    </tr>
                  </thead>
                  <tbody>
                    { cart ? cart.map((cartProduct, key) => <tr key={key}>
                      <td>{cartProduct.IDProducto}</td>
                      <td>{cartProduct.NombreProducto}</td>
                      <td>{cartProduct.PrecioProducto}</td>
                      <td>{cartProduct.quantity}</td>
                      <td>{cartProduct.Subtotal}</td>
                      <td>
                        <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)}>Remove</button>
                      </td>
                    </tr>)
                    : 'No Item in Cart'}
                  </tbody>
                </table>
                <h2 className='px-2 text-white'>Subtotal: ${Subtotal}</h2>
              </div>
        </div>
        </div>
        </div>
        <div class="three"> 
        <div className='col-lg-14'>         
              <div style={{display: "none"}}>
              </div>           
              <div className='table-responsive bg-dark'>
              <p className="titulo">SERVICIOS</p>
                <table className='table table-responsive table-dark table-hover'>
                  <thead>                  
                    <tr>
                      <td>ID</td>
                      <td>Nombre</td>
                      <td>Precio</td>
                      <td>Cantidad</td>
                      <td>Total</td>
                      <td>Accion</td>
                    </tr>
                  </thead>
                  <tbody>
                    { cart1 ? cart1.map((cartservicio, key) => 
                    <tr key={key}>
                      <td>{cartservicio.IDServicio}</td>
                      <td>{cartservicio.TipoServicio}</td>
                      <td>{cartservicio.CostoServicio}</td>
                      <td>{cartservicio.quantity1}</td>
                      <td>{cartservicio.Subtotal1}</td>
                      <td>
                        <button className='btn btn-danger btn-sm' onClick={() => quitarservicio(cartservicio)}>Remove</button>
                      </td>

                    </tr>)

                    : 'No Item in Cart'}
                  </tbody>
                </table>
                <h2 className='px-2 text-white'>Subtotal: ${Subtotal1}</h2>
              </div>
        </div>      
        </div>       
        </div>
        
      </div> 
  )
}