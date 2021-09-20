import axios from "axios";
import { type } from "os";
import { useEffect, useState } from "react";

import ReactApexChart from "react-apexcharts";
import { SaleSucces } from "types/sale";
import { round } from "utils/format";
import { BASE_URL } from "utils/requests";




const BarChart = () => {
    type SeriesData = {
        name: string;
        data: number[];
    }
    
    type ChartData = {
        labels: {
            categories: string[];
        };
        series: SeriesData[];
    }
    
    const [chartData, setChartData] = useState<ChartData>({
        labels: {
            categories: []
        },
        series: [
            {
                name: "",
                data: []
            }
        ]
    })
    
    
useEffect(() => {
    axios.get(`${BASE_URL}/sales/success-by-seller`)
        .then(response => {
            const data = response.data as SaleSucces[];
            const myLabels = data.map(x => x.sellerName);
            const mySeries = data.map(x => round(100.0 * x.deals / x.visited, 1));

            setChartData({ labels: {
                categories: myLabels
            },
            series: [
                {
                    name: "% Success",
                    data: mySeries
                }
            ]});
            //console.log("🚀 ~ file: index.tsx ~ line 24 ~ DonutChart ~ chartData", chartData)

        })
}, [])
    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };
  
    return (
        <ReactApexChart options={{ ...options, xaxis: chartData.labels }} series={chartData.series} type="bar" height={350} />
    );
}

export default BarChart;
