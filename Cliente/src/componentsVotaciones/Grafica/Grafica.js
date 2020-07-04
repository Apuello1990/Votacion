import React,{useContext,useEffect} from 'react';
import eventoContext from '../../context/eventos/eventoContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


const Grafica = () => {

  const eventosContext = useContext(eventoContext)
  const {obtenerGrafica,graficaEventos} = eventosContext;

 useEffect(() => {
  obtenerGrafica()
},[])

 //console.log(graficaEventos)
  let datos = [];

  for (var i = 0; i < graficaEventos.length; i++) {
    datos.push({
        name:graficaEventos[i].nombre_evento[0].nombre,
        total: graficaEventos[i].total
    });
}
//console.log(datos)
    return(
      <BarChart
      className="mt-10"
      width={700}
      height={500}
      data={datos}
      margin={{
      top: 5, right: 30, left: 30, bottom: 5,
      }}
  >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="total" fill="#3182ce" />
  </BarChart>

      );
}
 
export default Grafica;