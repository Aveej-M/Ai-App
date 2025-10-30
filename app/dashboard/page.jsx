'use client'
import { useState } from "react";
import DateRangeInput from "../compenents/Calender";
import { Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import Image from "next/image";

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const gridData = [
    { label: 'Team', logo: '/Dashboard/bot.png' },
    { label: 'Chatbot', logo: '/Dashboard/team.png' },
    { label: 'AI Chatbot', logo: '/ai-icon.png' },
]

const renderActiveShape = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
}) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * (midAngle || 0));
    const cos = Math.cos(-RADIAN * (midAngle || 0));
    const sx = (cx || 0) + ((outerRadius || 0) + 10) * cos;
    const sy = (cy || 0) + ((outerRadius || 0) + 10) * sin;
    const mx = (cx || 0) + ((outerRadius || 0) + 30) * cos;
    const my = (cy || 0) + ((outerRadius || 0) + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={(outerRadius || 0) + 6}
                outerRadius={(outerRadius || 0) + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >
                {`PV ${value}`}
            </text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const Dashboard = () => {
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);

    return (
        <div className="w-full min-h-screen bg-gray-50 text-gray-800 flex flex-col">
            {/* Top Bar */}
            <div className="sticky top-0 z-10 h-14 bg-white border-b border-gray-200 flex justify-between items-center px-4 sm:px-6 lg:px-10 shadow-sm">
                <div className="flex items-center gap-4">
                    <i className="fa-regular fa-star text-green-500 text-lg"></i>
                    <div className="flex gap-2 bg-green-100 px-2 py-1 rounded-lg text-gray-600 text-sm">
                        <span className="bg-white px-2 py-1 rounded shadow-sm">CRM</span>
                        <span className="bg-white px-2 py-1 rounded shadow-sm">Chat</span>
                    </div>
                </div>
                <DateRangeInput onRangeChange={setDateRange} />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
                <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-3">
                    {gridData.map(({ label, logo }, index) => (
                        <div key={index} className="h-[300px] shadow rounded hover:shadow-2xl cursor-pointer">
                            <div>
                                <Image
                                    src={logo}
                                    alt="logo"
                                    height={50}
                                    width={50}
                                />
                                <h1>{label}</h1>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )

}

export default Dashboard