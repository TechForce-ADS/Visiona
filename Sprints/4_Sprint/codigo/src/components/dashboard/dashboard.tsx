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

  useEffect(() => {
    // Verificar se há um usuário logado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn ) {
      window.location.href = 'http://localhost:3000/';
    }
  }, []);

  useEffect(() => {
    // Verificar se há um usuário é admin
    const adm = localStorage.getItem('adm');
    if (adm !== 'true') {
      window.location.href = 'http://localhost:3000/';
    }
  }, []);

  return (

    <div>
      <Navbar />

      
      <div className='containerDash'>
      <h1 id='tituto'>Dashboard</h1>
      <h1 id='total'>Total de usuários: {totalUsers}</h1>
      <div className='cubos'>
        <div className='cubo'>
          <Grafico />
        </div>
        <div className='cubo'>
          <Graficoatv />
        </div>
        </div>
      </div>
      
    </div>


  );
};
export default Dashboard;