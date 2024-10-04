"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ResponsiveLine } from '@nivo/line'
import { DollarSign, TrendingUp, PieChart, Activity } from 'lucide-react'

const mockData = [
  {
    id: "revenue",
    color: "hsl(151, 50%, 60%)",
    data: [
      { x: "Jan", y: 4000 },
      { x: "Feb", y: 3000 },
      { x: "Mar", y: 2000 },
      { x: "Apr", y: 2780 },
      { x: "May", y: 1890 },
      { x: "Jun", y: 2390 },
    ]
  },
  {
    id: "expenses",
    color: "hsl(0, 100%, 60%)",
    data: [
      { x: "Jan", y: 2400 },
      { x: "Feb", y: 1398 },
      { x: "Mar", y: 9800 },
      { x: "Apr", y: 3908 },
      { x: "May", y: 4800 },
      { x: "Jun", y: 3800 },
    ]
  },
  {
    id: "profit",
    color: "hsl(45, 100%, 50%)",
    data: [
      { x: "Jan", y: 1600 },
      { x: "Feb", y: 1602 },
      { x: "Mar", y: -7800 },
      { x: "Apr", y: -1128 },
      { x: "May", y: -2910 },
      { x: "Jun", y: -1410 },
    ]
  }
]

export default function FinanceAnalytics() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8 text-sky-400">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.header variants={itemVariants} className="bg-gray-900 rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-sky-400">Financial Analytics</h1>
          <p className="text-sky-300 mt-2">Track your financial performance and metrics</p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} className="bg-gray-900 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-sky-400 mb-4">Total Revenue</h2>
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-500 mr-3" />
              <span className="text-3xl font-bold text-sky-300">$124,560</span>
            </div>
            <p className="text-green-500 flex items-center mt-2">
              <TrendingUp className="w-4 h-4 mr-1" />
              12% increase
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-900 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-sky-400 mb-4">Total Expenses</h2>
            <div className="flex items-center">
              <PieChart className="w-8 h-8 text-red-500 mr-3" />
              <span className="text-3xl font-bold text-sky-300">$98,230</span>
            </div>
            <p className="text-red-500 flex items-center mt-2">
              <TrendingUp className="w-4 h-4 mr-1" />
              8% increase
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-900 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-sky-400 mb-4">Net Profit</h2>
            <div className="flex items-center">
              <Activity className="w-8 h-8 text-yellow-500 mr-3" />
              <span className="text-3xl font-bold text-sky-300">$26,330</span>
            </div>
            <p className="text-green-500 flex items-center mt-2">
              <TrendingUp className="w-4 h-4 mr-1" />
              15% increase
            </p>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="bg-gray-900 rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-sky-400 mb-4">Financial Performance Over Time</h2>
          {isClient && (
            <div style={{ height: 400 }}>
              <ResponsiveLine
                data={mockData}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                  type: 'linear',
                  min: 'auto',
                  max: 'auto',
                  stacked: false,
                  reverse: false
                }}
                yFormat=" >-$,.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Month',
                  legendOffset: 36,
                  legendPosition: 'middle'
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Amount',
                  legendOffset: -40,
                  legendPosition: 'middle'
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1
                        }
                      }
                    ]
                  }
                ]}
                theme={{
                  axis: {
                    domain: {
                      line: {
                        stroke: '#38bdf8'
                      }
                    },
                    legend: {
                      text: {
                        fill: '#38bdf8'
                      }
                    },
                    ticks: {
                      line: {
                        stroke: '#38bdf8',
                        strokeWidth: 1
                      },
                      text: {
                        fill: '#38bdf8'
                      }
                    }
                  },
                  legends: {
                    text: {
                      fill: '#38bdf8'
                    }
                  },
                  tooltip: {
                    container: {
                      background: '#1f2937',
                      color: '#38bdf8',
                    },
                  },
                }}
              />
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}