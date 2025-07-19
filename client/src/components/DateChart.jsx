
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const DateChart = ({ data }) => {
    // Convert date strings to Date objects and sort
    const sortedData = data.map(item => ({
        ...item,
        date: new Date(item.date)
    })).sort((a, b) => a.date - b.date);
    
    // Prepare data for the chart
    const chartData = sortedData.map(item => ({
        x: item.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        y: item.amount
    }));
    
    return (
        <div>
        <h2>Date vs Amount Chart</h2>
        <LineChart width={600} height={300} data={chartData}>
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="y" stroke="#8884d8" />
        </LineChart>
        </div>
    );

}

export default DateChart;