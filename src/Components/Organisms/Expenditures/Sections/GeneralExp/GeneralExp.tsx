import { NameTotalType } from "../../Expenditures"
import styles from "./GeneralExp.module.scss"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const BG_COLORS =[
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)'
]

const BORDER_COLORS = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
]



function GeneralExp({expenditures, total}:{expenditures:NameTotalType|undefined, total:number}) {

    const names = expenditures ? expenditures.map(element => element.name) : []
    const amounts = expenditures ? expenditures.map(element => element.amount) : []

    const data = {
        labels: names,
        datasets: [
          {
            label: 'PLN',
            data: amounts,
            backgroundColor: BG_COLORS,
            borderColor: BORDER_COLORS,
            borderWidth: 1,
          },
        ],
      };

    return (
        <div className={styles.container}>

            <div className={styles.pie}>
                <Pie data={data} />
            </div>
            
        </div>
    )
}

export default GeneralExp