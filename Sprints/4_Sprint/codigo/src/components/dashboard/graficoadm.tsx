import './dashboard.css'
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, ArcElement, DoughnutController, Tooltip, Legend } from 'chart.js'


Chart.register(ArcElement);
Chart.register(DoughnutController);
Chart.register(Tooltip);
Chart.register(Legend);



type Data = {

  labels: ['Administradores', 'Comuns'],
  datasets: {
    label: '- Quantidade de usuarios';
    data: number[];
    borderWidth: number[],
    borderColor: string[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
  }[];
}


const Grafico: React.FC = () => {
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
    const activeUsers = responseData.filter((user: any) => user.adm === true).length;
    const inactiveUsers = responseData.filter((user: any) => user.adm === false).length;
    

    const data: Data = {
        labels: ['Administradores', 'Comuns'],
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
   
  );
};
export default Grafico;