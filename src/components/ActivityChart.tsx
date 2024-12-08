'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface ActivityData {
  date: string
  contributions: number
}

const generateActivityData = (): ActivityData[] => {
  const data: ActivityData[] = []
  const today = new Date()
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      contributions: Math.floor(Math.random() * 20)
    })
  }
  return data
}

export function ActivityChart() {
  const activityData = generateActivityData()

  const data = {
    labels: activityData.map(d => d.date),
    datasets: [
      {
        label: 'Contributions',
        data: activityData.map(d => d.contributions),
        borderColor: '#9333ea', // Purple line
        backgroundColor: 'rgba(147, 51, 234, 0.1)', // Light purple background
        tension: 0.3,
        fill: true,
      },
    ],
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#9333ea', // Purple background
        titleColor: '#ffffff', // White text
        bodyColor: '#ffffff', // White text
        borderColor: '#9333ea',
        borderWidth: 1,
        padding: 12,
        boxPadding: 4,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 7,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'hsl(var(--border) / 0.5)',
        },
        ticks: {
          font: {
            size: 12,
          },
          stepSize: 5,
        },
      },
    },
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Activity Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}
