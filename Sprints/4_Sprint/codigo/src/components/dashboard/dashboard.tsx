import './dashboard.css'
import Navbar from '../navbar/navbar';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, ArcElement, DoughnutController, Tooltip, Legend } from 'chart.js'
import Grafico from './graficoadm';
import Graficoatv from './graficoAtv';

Chart.register(ArcElement);
Chart.register(DoughnutController);
Chart.register(Tooltip);
Chart.register(Legend);





const Dashboard: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get('http://localhost:3333/users');
        setTotalUsers(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);



  return (

    <div>
      <Navbar />

      
      <div className='container'>
      <h1 className='total'>Total de usuários: {totalUsers}</h1>
        <div className='cubo'>
          <Grafico />
        </div>
        <div className='cubo'>
          <Graficoatv />
        </div>
      </div>
      
    </div>


  );
};
export default Dashboard;