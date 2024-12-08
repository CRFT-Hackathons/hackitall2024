'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Navbar } from "@/components/navbar"
import { useUser } from "@clerk/nextjs"
import { ActivityChart } from "@/components/ActivityChart"

interface Contributor {
  id: number
  name: string
  contributions: number
  avatar: string
  rank: number
}

function SlimProgress({ value }: { value: number }) {
  return (
    <div className="relative w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div 
        className="absolute top-0 left-0 h-full bg-purple-500 transition-all duration-300 ease-in-out rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

export default function Page() {
  const { user } = useUser()
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [contributionGrid, setContributionGrid] = useState<number[][]>([])

  useEffect(() => {
    // Generate contributors data
    setContributors([
      {
        id: 1,
        name: "John Doe",
        contributions: 187,
        avatar: "https://github.com/shadcn.png",
        rank: 1
      },
      {
        id: 2,
        name: "Jane Smith", 
        contributions: 163,
        avatar: "https://github.com/shadcn.png",
        rank: 2
      },
      {
        id: 3,
        name: "Bob Wilson",
        contributions: 142,
        avatar: "https://github.com/shadcn.png", 
        rank: 3
      }
    ])

    // Generate contribution grid data
    const grid = Array.from({ length: 52 }, () =>
      Array.from({ length: 7 }, () => Math.floor(Math.random() * 3))
    )
    setContributionGrid(grid)
  }, [])

  const progress = (187 / 200) * 100

  return (
    <>
      <Navbar />
      <div className="flex h-screen pt-16">
        <div className="flex-1 p-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>{user?.firstName?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Your Analytics</h1>
              <p className="text-gray-500">Next achievement: 200 contributions (13 to go!)</p>
              <div className="relative w-[60%] mt-2">
                <SlimProgress value={progress} />
                <span className="absolute -right-12 top-1/2 -translate-y-1/2 text-sm text-gray-500">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
          
          <div className="grid gap-4 mb-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Contributions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">187</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12 days</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ranking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">#42</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <ActivityChart />

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Contribution Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-1">
                {contributionGrid.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className={`w-3 h-3 rounded-sm ${
                          day === 0
                            ? 'bg-gray-100'
                            : day === 1
                            ? 'bg-purple-500'
                            : 'bg-purple-300'
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar - Rankings */}
        <div className="w-80 border-l p-6">
          <h2 className="text-xl font-bold mb-4">Top Contributors</h2>
          <ScrollArea className="h-[calc(100vh-140px)]">
            {contributors.map((contributor) => (
              <div key={contributor.id} className="flex items-center space-x-4 mb-4">
                <div className="font-bold text-lg w-6">{contributor.rank}</div>
                <Avatar>
                  <AvatarImage src={contributor.avatar} />
                  <AvatarFallback>{contributor.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold">{contributor.name}</div>
                  <div className="text-sm text-gray-500">{contributor.contributions} contributions</div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </>
  )
}
