import axios from "axios";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { SaleSum } from "types/sale";
import { BASE_URL } from "utils/requests";

type ChartData = {
    labels: string[],
    series: number[],
}

const DonutChart = () => {

    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/amount-by-seller`)
            .then(response => {
                const data = response.data as SaleSum[];
                const myLabels = data.map(label => label.sellerName);
                const mySeries = data.map(series => series.sum);

                setChartData({ labels: myLabels, series: mySeries });
                //console.log("🚀 ~ file: index.tsx ~ line 24 ~ DonutChart ~ chartData", chartData)

            })
    }, [])

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
