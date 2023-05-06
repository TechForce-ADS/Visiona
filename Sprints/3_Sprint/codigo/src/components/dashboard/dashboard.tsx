import './dashboard.css'
import Navbar from '../navbar/navbar';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, ArcElement, DoughnutController, Tooltip, Legend } from 'chart.js'
Chart.register(ArcElement);
Chart.register(DoughnutController);
Chart.register(Tooltip);

Chart.register(Legend);




type Data = {

  labels: ['Usuários Ativos', 'Usuários Inativos'],
  datasets: {
    label: '- Quantidade de usuarios';
    data: number[];
    borderWidth: number[],
    borderColor: string[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
  }[];
}



async function getTotalUsers(): Promise<number> {
  try {
    const response = await axios.get('http://localhost:3333/users');
    return response.data.length;
  } catch (error) {
    console.log(error);
    return 0; // ou qualquer outro valor que você deseje retornar em caso de erro
  }
}


const Dashboard: React.FC = () => {
  const [data, setData] = useState<Data>();
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get('http://localhost:3333/users');
        const formattedData = formatData(response.data);
        setData(formattedData);
        setTotalUsers(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);




  const formatData = (responseData: any) => {
    const activeUsers = responseData.filter((user: any) => user.status === true).length;
    const inactiveUsers = responseData.filter((user: any) => user.status === false).length;
    

    const data: Data = {
      labels: ['Usuários Ativos', 'Usuários Inativos'],
      datasets: [
        {
          label: '- Quantidade de usuarios',
          data: [activeUsers, inactiveUsers],
          backgroundColor: ['#36a2eb', '#ff6384'],
          borderWidth: [3],
          borderColor: ['black'],
          hoverBackgroundColor: ['#AA77eb', '#ff0084'],
        },
      ],
    };
    return data
    ;
  };

  return (

    <div>
      <Navbar />
      <div className='container'>
      <h1 className='total'>Total de usuários cadastrados: {totalUsers}</h1>
        <div className='cubo'>
          {data && (
            <div>
              <Doughnut
                data={data}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: 'bottom',
                      labels: {
                        color: '#333',
                        font: {
                          size: 14,
                          weight: 'bold',
                        },
                      },
                    },
                    tooltip: {
                      enabled: true,
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;