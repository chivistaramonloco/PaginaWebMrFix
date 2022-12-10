import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './views/login';
import Menu from './views/menu';
import Ventas from './views/ventas/ventas';
import Clientes from './views/clientes/clientes';
import Vehiculos from './views/vehiculos/vehiculos';
import Servicios from './views/servicios/servicios';
import Administrador from './views/administrador/administrador';
import Mecanico from './views/mecanico/mecanico';
import Productos from './views/productos/productos';
import Estatus from './views/estatus/estatus';
import Estatuss from './views/estatus/estatuss';
import Historial from './views/estatus/historialestatus';
function App( ) {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/Menu' element={<Menu />} />
        <Route path='/Ventas' element={<Ventas />} />
        <Route path='/Clientes' element={<Clientes />} />
        <Route path='/Vehiculos' element={<Vehiculos />} />
        <Route path='/Servicios' element={<Servicios />} />
        <Route path='/Administrador' element={<Administrador />} />
        <Route path='/Mecanico' element={<Mecanico />} />
        <Route path='/Productos' element={<Productos />} />
        <Route path='/Estatus' element={<Estatus />} />
        <Route path='/Estatuss' element={<Estatuss />} />
        <Route path='/Historial' element={<Historial/>} />
      </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
