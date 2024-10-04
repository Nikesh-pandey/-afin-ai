'use client'

import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveLine } from '@nivo/line'
import Link from "next/link"
import { Menu, X } from "lucide-react"

const portfolioData = [
  {
    id: "Portfolio Value",
    color: "hsl(217, 91%, 60%)",
    data: [
      { x: 'Jan', y: 1000 },
      { x: 'Feb', y: 1200 },
      { x: 'Mar', y: 1100 },
      { x: 'Apr', y: 1400 },
      { x: 'May', y: 1300 },
      { x: 'Jun', y: 1600 },
    ]
  }
]

const investments = [
  { name: 'Stocks', value: 45000, percentage: 60 },
  { name: 'Bonds', value: 15000, percentage: 20 },
  { name: 'Real Estate', value: 7500, percentage: 10 },
  { name: 'Cryptocurrencies', value: 7500, percentage: 10 },
]

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setIsMenuOpen(window.innerWidth >= 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen bg-black text-blue-400">
      <nav className="bg-gray-900 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-300 transition-colors duration-200 hover:text-blue-400">FinPortfolio</Link>
          {isMobile && (
            <button 
              onClick={toggleMenu} 
              className="text-blue-300 hover:text-blue-400 transition-colors duration-200 md:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          )}
          <ul className={`md:flex space-y-2 md:space-y-0 md:space-x-4 ${isMenuOpen || !isMobile ? 'block' : 'hidden'} absolute md:relative top-full left-0 right-0 bg-gray-900 md:bg-transparent p-4 md:p-0 transition-all duration-300 ease-in-out`}>
            <li><Link href="/" className="block py-2 md:py-0 text-blue-300 hover:text-blue-400 transition-colors duration-200">Home</Link></li>
            <li><Link href="/investments" className="block py-2 md:py-0 text-blue-300 hover:text-blue-400 transition-colors duration-200">Investments</Link></li>
            <li><Link href="/analytics" className="block py-2 md:py-0 text-blue-300 hover:text-blue-400 transition-colors duration-200">Analytics</Link></li>
            <li><Link href="/settings" className="block py-2 md:py-0 text-blue-300 hover:text-blue-400 transition-colors duration-200">Settings</Link></li>
          </ul>
        </div>
      </nav>

      <main className="container mx-auto p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center mb-8">
            <Avatar className="h-20 w-20 mb-4 md:mb-0 md:mr-4">
              <AvatarImage src="/deba.jpeg?height=80&width=80" alt="User" />
              <AvatarFallback>DB</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-blue-300">Debayudh Basu</h1>
              <p className="text-blue-500">Financial Portfolio</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gray-900 border-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-700/20">
              <CardHeader>
                <CardTitle className="text-blue-300">Total Portfolio Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-blue-400">$75,000</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-700/20">
              <CardHeader>
                <CardTitle className="text-blue-300">Monthly Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-green-400">+5.2%</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-900 border-blue-700 mb-8 transition-all duration-300 hover:shadow-lg hover:shadow-blue-700/20">
            <CardHeader>
              <CardTitle className="text-blue-300">Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveLine
                  data={portfolioData}
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                  xScale={{ type: 'point' }}
                  yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false
                  }}
                  yFormat=" >-$"
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
                    legend: 'Value',
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
                          stroke: '#60A5FA'
                        }
                      },
                      legend: {
                        text: {
                          fill: '#60A5FA'
                        }
                      },
                      ticks: {
                        line: {
                          stroke: '#60A5FA',
                          strokeWidth: 1
                        },
                        text: {
                          fill: '#60A5FA'
                        }
                      }
                    },
                    legends: {
                      text: {
                        fill: '#60A5FA'
                      }
                    },
                    tooltip: {
                      container: {
                        background: '#1F2937',
                        color: '#60A5FA'
                      }
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-700/20">
            <CardHeader>
              <CardTitle className="text-blue-300">Investments</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {investments.map((investment, index) => (
                  <li key={index} className="flex justify-between items-center transition-all duration-300 hover:bg-gray-800 p-2 rounded">
                    <span className="text-blue-400">{investment.name}</span>
                    <div className="text-right">
                      <span className="text-blue-300">${investment.value.toLocaleString()}</span>
                      <div className="text-sm text-blue-500">{investment.percentage}%</div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}