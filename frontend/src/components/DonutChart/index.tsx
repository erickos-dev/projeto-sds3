import axios from "axios";
import { type } from "os";
import ReactApexChart from "react-apexcharts";
import { SaleSum } from "types/sale";
import { BASE_URL } from "utils/requests";

type ChartData = {
    labels: string[],
    series: number[],
}

const DonutChart = () => {


    let chartData: ChartData = { labels: [], series: [] };

    axios.get(`${BASE_URL}/sales/amount-by-seller`)
        .then(response => {
           const data = response.data as SaleSum[];
           const myLabels = data.map(label => label.sellerName);
           const mySeries = data.map(series => series.sum);

           chartData = {labels: myLabels, series: mySeries};
           console.log("🚀 ~ file: index.tsx ~ line 24 ~ DonutChart ~ chartData", chartData)

        })

  // const mockData = {
  //     series: [477138, 499928, 444867, 220426, 473088],
  //     labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
  // }

    const options = {
        legend: {
            show: true
        }
    }


    return (
        <ReactApexChart options={{ ...options, labels: chartData.labels }} series={chartData.series} type="donut" height={350} />
    );
}

export default DonutChart;
