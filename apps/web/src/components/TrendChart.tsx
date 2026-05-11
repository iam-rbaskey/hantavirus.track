'use client';

import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';

export const TrendChart = () => {
  const options = useMemo(() => {
    // Generate some mock data for the 30-day trend to make the dashboard look active
    const days = Array.from({ length: 30 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (29 - i));
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    });

    const casesData = days.map((_, i) => Math.floor(Math.random() * 10) + i * 2);
    const deathsData = casesData.map(c => Math.floor(c * 0.3));

    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(11, 11, 15, 0.9)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        textStyle: { color: '#fff' }
      },
      legend: {
        data: ['Cases', 'Fatalities'],
        textStyle: { color: '#A1A1AA' },
        top: 0
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: days,
        axisLabel: { color: '#A1A1AA' },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#A1A1AA' },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)', type: 'dashed' } }
      },
      series: [
        {
          name: 'Cases',
          type: 'line',
          smooth: true,
          lineStyle: { width: 3, color: '#FFB547' },
          showSymbol: false,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(255, 181, 71, 0.3)' },
                { offset: 1, color: 'rgba(255, 181, 71, 0)' }
              ]
            }
          },
          data: casesData
        },
        {
          name: 'Fatalities',
          type: 'line',
          smooth: true,
          lineStyle: { width: 3, color: '#FF4D4D' },
          showSymbol: false,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(255, 77, 77, 0.3)' },
                { offset: 1, color: 'rgba(255, 77, 77, 0)' }
              ]
            }
          },
          data: deathsData
        }
      ]
    };
  }, []);

  return (
    <ReactECharts 
      option={options} 
      style={{ height: '100%', minHeight: '280px', width: '100%' }} 
      theme="dark"
      opts={{ renderer: 'svg' }}
    />
  );
};
