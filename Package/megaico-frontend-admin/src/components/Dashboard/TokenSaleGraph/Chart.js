import React from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export default function Chart({ d }) {
  const getTranx = useSelector((state) => state.auth.transactionLists);
  let subStringStart = 4;
  let subStringEnd = d === 7 ? 11 : d === 30 ? 11 : 7;
  const obj = {};
  getTranx.forEach((token) => {
    let a = token.tokens ? (token.tokens ? token.tokens : 0) : 0;
    obj[
      new Date(token.updated_at)
        .toDateString()
        .substring(subStringStart, subStringEnd)
    ]
      ? (obj[
          new Date(token.updated_at)
            .toDateString()
            .substring(subStringStart, subStringEnd)
        ] =
          obj[
            new Date(token.updated_at)
              .toDateString()
              .substring(subStringStart, subStringEnd)
          ] + Number(a.toPrecision(40)))
      : (obj[
          new Date(token.updated_at)
            .toDateString()
            .substring(subStringStart, subStringEnd)
        ] = Number(a.toPrecision(40)));
  });

  function createData(day, amount) {
    return { day, amount };
  }

  let data = [];
  for (let i = 0; i < d; i++) {
    let start = new Date();
    start.setDate(start.getDate() - (d === 12 ? i * 30 : i));
    start.setHours(0, 0, 0, 0);
    let date1 = start.toDateString().substring(subStringStart, subStringEnd);
    data = [
      createData(date1, Number(obj[date1] ? obj[date1].toPrecision(40) : 0)),
      ...data,
    ];
  }

  const data2 = [
    { day: 'Mar 05 ', amount: 5 },
    { day: 'Mar 06 ', amount: 7 },
    { day: 'Mar 07 ', amount: 8 },
    { day: 'Mar 08 ', amount: 4 },
    { day: 'Mar 09 ', amount: 2 },
    { day: 'Mar 10 ', amount: 6 },
    { day: 'Mar 11 ', amount: 5 },
  ];
  return (
    <React.Fragment>
      <ResponsiveContainer height='100%' maxHeight={200}>
        <LineChart data={data2}>
          <defs>
            <linearGradient id='colorUv'>
              <stop stopColor='blue' />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='day'
            axisLine={{ stroke: '#EAF0F4' }}
            style={{
              fontSize: 'small',
              opacity: '.7',
              color: 'purple',
            }}
          />
          <YAxis
            tickCount={4}
            axisLine={{ stroke: '#EAF0F4' }}
            style={{ fontSize: 'small', opacity: '.7' }}
          />
          <Tooltip />
          <Line
            type='monotone'
            dataKey='amount'
            stroke='#2c80ff'
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
