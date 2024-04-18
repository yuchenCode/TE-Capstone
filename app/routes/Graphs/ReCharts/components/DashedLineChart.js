import React from 'react';
import { 
    Line, 
    CartesianGrid, 
    XAxis, 
    YAxis, 
    Tooltip, 
    ResponsiveContainer,
    Legend, 
    LineChart,
    Dot
} from './../../../../components/recharts';

import colors from './../../../../colors';

const data = [
      {name: '0.0', actual: 0.1, predicted: 0.2},
      {name: '0.1', actual: 0.2, predicted: 0.3},
      {name: '0.2', actual: 0.3, predicted: 0.3339},
      {name: '0.3', actual: 0.4, predicted: 0.332},
      {name: '0.4', actual: 0.5, predicted: 0.6},
      {name: '0.5', actual: 0.6, predicted: 0.7},
      {name: '0.6', actual: 0.7, predicted: 0.8},
];

const generateDot = ({stroke, ...other}) => (
    <Dot
        { ...other }
        r={ 5 }
        fill={ stroke }
        stroke={ colors['white'] }
        strokeWidth={ 3 }
        strokeDasharray={ 0 }
    />
);

const DashedLineChart = () => (
    <ResponsiveContainer width='100%' aspect={6.0/3.0}>
        <LineChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <CartesianGrid strokeDasharray="3 3"/>
           <XAxis dataKey="name"/>
           <YAxis/>
           <Tooltip/>
           <Legend />
           <Line dataKey="actual" stroke={ colors['primary'] } activeDot={{r: 5}} dot={generateDot} strokeDasharray="5 5" />
           <Line dataKey="predicted" stroke={ colors['purple'] } activeDot={{r: 5}} dot={generateDot} strokeDasharray="3 4 5 2" />
      </LineChart>
    </ResponsiveContainer>

)

export { DashedLineChart };
