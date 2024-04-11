import React from 'react';
import { 
    AreaChart, 
    CartesianGrid, 
    XAxis, 
    YAxis, 
    Tooltip, 
    ResponsiveContainer,
    Area
} from './../../../../components/recharts';

import colors from './../../../../colors';

const data = [
      {name: '0', uv: 4000, pv: 2400, amt: 2400},
      {name: '10', uv: 3000, pv: 1398, amt: 2210},
      {name: '20', uv: 2000, pv: 9800, amt: 2290},
      {name: '30', uv: 2780, pv: 3908, amt: 2000},
      {name: '40', uv: 1890, pv: 4800, amt: 2181},
      {name: '50', uv: 2390, pv: 3800, amt: 2500},
      {name: '60', uv: 3490, pv: 4300, amt: 2100},
];

const StackedAreaChart = () => (
    <ResponsiveContainer width='100%' aspect={6.0/3.0}>
        <AreaChart data={data}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Area dataKey='uv' stackId="1" stroke={ colors['primary'] } fill={ colors['primary-03'] } />
            <Area dataKey='amt' stackId="1" stroke={ colors['success'] } fill={ colors['success-03'] } />
        </AreaChart>
    </ResponsiveContainer>

)

export { StackedAreaChart };
