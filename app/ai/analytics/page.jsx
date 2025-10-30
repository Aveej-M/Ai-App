'use client'
import React, { useState, useEffect } from 'react'
import DateRangeInput from '../../compenents/Calender';
import { analyticsItems as staticItems, analyticsData } from '../../data/analyticsData';
import Image from 'next/image';
import { parse, format } from 'date-fns';
import { PieChart, Pie, Cell } from 'recharts';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';


const Analytics = () => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [filteredItems, setFilteredItems] = useState([]);
  const COLORS = ['#00c951'];

  const getDateRangeArray = (start, end) => {
    const arr = [];
    const current = new Date(start);

    while (current <= end) {
      arr.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return arr;
  };

  useEffect(() => {
    const [startDate, endDate] = dateRange;
    const allDates = getDateRangeArray(startDate, endDate);

    const updated = allDates.map((date) => {
      const formatedDate = format(date, 'dd MMM yyyy');
      const existing = analyticsData.find(d => d.date === formatedDate);

      return {
        // ...item,
        date: formatedDate,
        count: existing ? existing.count : 0,
        msg: existing ? existing.msg : 0,
        like: existing ? existing.like : 0,
        dislike: existing ? existing.dislike : 0,
      };
    });

    setFilteredItems(updated);
  }, [dateRange]);

  const formattedAnalyticsData = filteredItems.map(item => ({
    ...item,
    formattedDate: format(parse(item.date, 'dd MMM yyyy', new Date()), 'd/M')
  }));

  const chatCount = filteredItems.reduce((sum, item) => sum + item.count, 0);
  const msgCount = filteredItems.reduce((sum, item) => sum + item.msg, 0);
  const likeCount = filteredItems.reduce((sum, item) => sum + item.like, 0);
  const disLikeCount = filteredItems.reduce((sum, item) => sum + item.dislike, 0);

  const pieData = [
    { name: 'Web Chat', value: chatCount },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div className="bg-white border border-gray-300 p-3 rounded shadow-md text-sm">
          <p><strong>Date:</strong> {data.date}</p>
          <p><strong>Chats:</strong> {data.count}</p>
        </div>
      );
    }

    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: '#dcfce7',
            border: '1px solid #d1d5dc',
            padding: '10px',
            position: 'relative',
            top: '-100px', // 🔁 Adjust position here
            left: '-60px', // 🔁 Adjust position here
            transform: 'translate(50%, 50%)',
            pointerEvents: 'none',
            zIndex: 999,
            borderRadius: '5px',
            color: '#6a7282',
            fontSize: '14px',
          }}
        >
          <p>{payload[0].name}: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };


  return (
    <>
      <div className='fixed top-[188] text-black flex flex-col w-[-webkit-fill-available] h-[-webkit-fill-available] p-3 overflow-x-auto scrollbar-hide'>
        <div className='flex justify-end'>
          <DateRangeInput onRangeChange={setDateRange} />
        </div>

        <div className='grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1'>
          <div
            className='flex flex-col justify-between p-5 border border-gray-300 h-[150] gray-border'
          >
            <Image
              src="/Analytics/Chat 1.png"
              alt='Chat icon'
              height={25}
              width={25}
            />
            <div className='flex gap-3'>
              <h1 className='text-5xl'>{chatCount}</h1>
              <div className='flex h-full items-end text-gray-500'>
                <p>Total Chats</p>
              </div>
            </div>

          </div>

          <div
            className='flex flex-col justify-between p-5 border border-gray-300 h-[150] gray-border'
          >
            <Image
              src='/Analytics/Chat 2.png'
              alt='Chat icon'
              height={25}
              width={25}
            />
            <div className='flex gap-3'>
              <h1 className='text-5xl'>{msgCount}</h1>
              <div className='flex h-full items-end text-gray-500'>
                <p>Total Messages</p>
              </div>
            </div>

          </div>

          <div
            className='flex flex-col justify-between p-5 border border-gray-300 h-[150] gray-border'
          >
            <Image
              src='/Analytics/like.png'
              alt='Chat icon'
              height={25}
              width={25}
            />
            <div className='flex gap-3'>
              <h1 className='text-5xl'>{likeCount}</h1>
              <div className='flex h-full items-end text-gray-500'>
                <p>Messages with thumbs up</p>
              </div>
            </div>

          </div>

          <div
            className='flex flex-col justify-between p-5 border border-gray-300 h-[150] gray-border'
          >
            <Image
              src='/Analytics/Dislike.png'
              alt='Chat icon'
              height={25}
              width={25}
            />
            <div className='flex gap-3'>
              <h1 className='text-5xl'>{disLikeCount}</h1>
              <div className='flex h-full items-end text-gray-500'>
                <p>Messages with thumbs down</p>
              </div>
            </div>

          </div>
        </div>

        <div className='flex-items h-[100%] py-3'>
          <div className='w-[60%] h-full gray-border p-5'>
            <h1 className='text-[20px]'>Chats</h1>

            {chatCount == 0 ? (
              <div className='w-full h-full flex-items flex-col'>
                <Image
                  className='w-[80px]'
                  src="/folder.png"
                  alt="Folder icon"
                  height={40}
                  width={40}
                />
                <h1 className='text-2xl text-black'>No data</h1>
              </div>
            ) : (
              <>

                <ResponsiveContainer width="100%" height="100%" className="pb-5">
                  <AreaChart
                    data={formattedAnalyticsData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >

                    <XAxis dataKey="formattedDate"
                      tick={{ fontSize: 12, fill: '#6a7282' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: '#6a7282' }}
                      tickLine={false}
                    />
                    <Tooltip content={CustomTooltip} cursor={false} />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#00c951"
                      strokeWidth={2}
                      fill="#dcfce7"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </>
            )}

          </div>
          <div className='w-[40%] h-full gray-border p-5'>
            <h1 className='text-[20px] absolute'>Chats by Channel</h1>
            {chatCount == 0 ? (
              <div className='w-full h-full flex-items flex-col'>
                <Image
                  className='w-[80px]'
                  src="/folder.png"
                  alt="Folder icon"
                  height={40}
                  width={40}
                />
                <h1 className='text-2xl text-black'>No data</h1>
              </div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius='90%'
                      fill="#00C49F"
                      paddingAngle={180}
                      dataKey="value"
                      labelLine={false}
                      startAngle={90}
                      endAngle={-270}
                      label={({ cx, cy }) => {
                        return (
                          <text
                            x={cx}
                            y={cy + 15}
                            textAnchor="middle"
                            dominantBaseline=""
                            fontSize={15}
                            fill="white"
                          >
                            {`${chatCount}`}
                          </text>
                        );
                      }}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip className="pieTooltip" content={CustomPieTooltip} />
                    <Legend verticalAlign='top' align='right' />
                  </PieChart>
                </ResponsiveContainer>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default Analytics