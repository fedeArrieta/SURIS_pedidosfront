import React, { useState, useEffect } from "react";
import axios from "axios";
import './PedidoForm.css'; 

const PedidoForm = () => {
  const [articulos, setArticulos] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [selectedArticulos, setSelectedArticulos] = useState([]);
  const [selectedVendedor, setSelectedVendedor] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Cargar la lista de artículos desde el backend
  useEffect(() => {
    axios.get("https://localhost:7088/api/articulos")
      .then(response => setArticulos(response.data))
      .catch(error => console.error("Error al cargar artículos:", error));
  }, []);

  // Cargar la lista de vendedores desde el backend
  useEffect(() => {
    axios.get("https://localhost:7088/api/vendedores")
      .then(response => setVendedores(response.data))
      .catch(error => console.error("Error al cargar vendedores:", error));
  }, []);

  // Manejar la selección de artículos
  const handleArticuloSelect = (articulo) => {
    setSelectedArticulos(prev => {
      if (prev.includes(articulo)) {
        return prev.filter(a => a.codigo !== articulo.codigo);
      } else {
        return [...prev, articulo];
      }
    });
  };

  // Manejar la generación del pedido
  const handleGenerarPedido = () => {
    if (!selectedVendedor) {
      setMensaje("Debe seleccionar un vendedor.");
      return;
    }
    if (selectedArticulos.length === 0) {
      setMensaje("Debe seleccionar al menos un artículo.");
      return;
    }

    // El pedido que se enviará al backend debe contener el vendedor y la lista completa de artículos
    const pedido = {
      vendedor: selectedVendedor, 
      articulos: selectedArticulos, 
      FechaPedido: new Date().toISOString(),
      totalPedido: 0,
      errores: [], 
      strError:""
    };

    // Hacer la solicitud POST para generar el pedido
    axios.post("https://localhost:7088/api/pedido", pedido)
      .then(response => {
        setMensaje(`Pedido generado con éxito.<br /> Hora del Pedido: ${new Date(response.data.fecha)}<br /> Total: $${response.data.total}`);
        setSelectedArticulos([]); 
        setSelectedVendedor(""); 
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.strError) {
          setMensaje(`Errores detectados al generar el pedido:<br /> ${error.response.data.strError}`);
        } 
      });
  };

  return (
    <div>
      <h1>Generar Pedido</h1>

      <div>
        <label htmlFor="vendedor">Vendedor: </label>
        <select
          id="vendedor"
          value={selectedVendedor}
          onChange={e => setSelectedVendedor(e.target.value)}
        >
          <option value="">-- Seleccionar --</option>
          {vendedores.map(vendedor => (
            <option key={vendedor.id} value={vendedor.descripcion}>
              {vendedor.descripcion}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h2>Seleccionar Artículos</h2>
        <table className="table-articulos">
          <thead>
            <tr>
              <th className="col-seleccionar ">Seleccionar</th>
              <th className="col-descripcion">Descripción</th>
              <th className="col-precio">Precio</th>
              <th className="col-deposito">Depósito</th>
            </tr>
          </thead>
          <tbody>
            {articulos.map(articulo => (
              <tr key={articulo.codigo}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedArticulos.includes(articulo)}
                    onChange={() => handleArticuloSelect(articulo)}
                  />
                </td>
                <td className="col-descripcion">{articulo.descripcion}</td>
                <td className="col-precio">{articulo.precio.toFixed(2)}</td>
                <td className="col-deposito">{articulo.deposito}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2><button className="btn-generar-pedido" onClick={handleGenerarPedido}>Generar Pedido</button></h2>

      {mensaje && <p dangerouslySetInnerHTML={{ __html: mensaje }} />}
    </div>
  );
};

export default PedidoForm;