'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Navbar } from "@/components/navbar"
import { useUser } from "@clerk/nextjs"
import { ActivityChart } from "@/components/ActivityChart"
import GitHubCalendar from 'react-github-contribution-calendar'

interface Contributor {
  id: number
  name: string
  contributions: number
  avatar: string
  rank: number
}

const panelColors = [
  '#f5f3ff', // Level 0 - Lightest purple
  '#ede9fe',
  '#ddd6fe',
  '#c4b5fd',
  '#a78bfa',
  '#8b5cf6',
  '#7c3aed'  // Level 6 - Darkest purple
]

const generateCalendarData = () => {
  const data = []
  const startDate = new Date('2024-01-01').getTime()
  const endDate = new Date('2024-12-31').getTime()
  
  // Generate 100 random contribution dates
  for (let i = 0; i < 100; i++) {
    const randomDate = new Date(startDate + Math.random() * (endDate - startDate))
    const dateStr = randomDate.toISOString().split('T')[0]
    const count = Math.floor(Math.random() * 11) // Random count 0-10
    data.push({ date: dateStr, count })
  }
  
  return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export default function Page() {
  const { user } = useUser()
  const [values, setValues] = useState<{date: string, count: number}[]>([])
  const [contributors] = useState<Contributor[]>([
    {
      id: 1,
      name: "Sarah Chen",
      contributions: 187,
      avatar: "https://i.pravatar.cc/150?u=sarah",
      rank: 1
    },
    {
      id: 2,
      name: "Marcus Rodriguez", 
      contributions: 163,
      avatar: "https://i.pravatar.cc/150?u=marcus",
      rank: 2
    },
    {
      id: 3,
      name: "Priya Patel",
      contributions: 142,
      avatar: "https://i.pravatar.cc/150?u=priya",
      rank: 3
    },
    {
      id: 4,
      name: "Alex Thompson",
      contributions: 128,
      avatar: "https://i.pravatar.cc/150?u=alex",
      rank: 4
    },
    {
      id: 5,
      name: "Emma Larsson",
      contributions: 115,
      avatar: "https://i.pravatar.cc/150?u=emma",
      rank: 5
    },
    {
      id: 6,
      name: "Jamal Williams",
      contributions: 98,
      avatar: "https://i.pravatar.cc/150?u=jamal",
      rank: 6
    },
    {
      id: 7,
      name: "Sofia Garcia",
      contributions: 87,
      avatar: "https://i.pravatar.cc/150?u=sofia",
      rank: 7
    },
    {
      id: 8,
      name: "David Kim",
      contributions: 76,
      avatar: "https://i.pravatar.cc/150?u=david",
      rank: 8
    },
    {
      id: 9,
      name: "Lisa Johnson",
      contributions: 65,
      avatar: "https://i.pravatar.cc/150?u=lisa",
      rank: 9
    },
    {
      id: 10,
      name: "Michael Zhang",
      contributions: 54,
      avatar: "https://i.pravatar.cc/150?u=michael",
      rank: 10
    }
  ])

  useEffect(() => {
    setValues(generateCalendarData())
  }, [])

  const progress = (187 / 200) * 100

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] pt-16 overflow-hidden">
        <div className="flex-1 p-3 md:p-4 lg:p-6 overflow-y-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <Avatar className="h-12 w-12 md:h-16 md:w-16">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>{user?.firstName?.[0]}</AvatarFallback>
            </Avatar>
            <div className="w-full sm:w-auto">
              <h1 className="text-xl md:text-2xl font-bold">Your Analytics</h1>
              <p className="text-sm md:text-base text-gray-500">Next achievement: 200 contributions (13 to go!)</p>
              <div className="relative w-full sm:w-[60%] mt-2">
                <div className="w-full h-1 bg-purple-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#9333ea] transition-all duration-300 ease-in-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="absolute -right-12 top-1/2 -translate-y-1/2 text-xs md:text-sm text-gray-500">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
          
          <div className="grid gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 md:pb-2">
                  <CardTitle className="text-xs md:text-sm font-medium">Total Contributions</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="text-lg md:text-2xl font-bold">187</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 md:pb-2">
                  <CardTitle className="text-xs md:text-sm font-medium">Current Streak</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="text-lg md:text-2xl font-bold">12 days</div>
                </CardContent>
              </Card>
              <Card className="col-span-2 lg:col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 md:pb-2">
                  <CardTitle className="text-xs md:text-sm font-medium">Ranking</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="text-lg md:text-2xl font-bold">#42</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <ActivityChart />

          <Card className="mb-6 md:mb-8 max-w-3xl mx-auto">
            <CardHeader className="p-3 md:p-4">
              <CardTitle className="text-sm md:text-base">Contribution Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-2 md:p-4">
              <ScrollArea className="w-full overflow-x-auto">
                <div className="min-w-[750px] flex justify-center">
                  <GitHubCalendar 
                    values={Object.fromEntries(values.map(v => [v.date, v.count]))}
                    until={new Date().toISOString()}
                    panelColors={panelColors}
                    weekLabelAttributes={{}}
                    monthLabelAttributes={{}}
                    panelAttributes={{}}
                  />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar - Rankings */}
        <div className="w-full lg:w-72 xl:w-80 p-3 md:p-4 lg:p-6">
          <Card>
            <CardHeader className="p-3 md:p-4">
              <CardTitle className="text-sm md:text-base">Top Contributors</CardTitle>
            </CardHeader>
            <CardContent className="p-2 md:p-4">
              <ScrollArea className="h-[300px] lg:h-[calc(100vh-300px)]">
                {contributors.map((contributor) => (
                  <div key={contributor.id} className="flex items-center space-x-2 md:space-x-4 mb-3 p-2 rounded hover:bg-gray-50">
                    <div className="font-bold text-base md:text-lg w-4 md:w-6">{contributor.rank}</div>
                    <Avatar className="h-8 w-8 md:h-10 md:w-10">
                      <AvatarImage src={contributor.avatar} />
                      <AvatarFallback>{contributor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm md:text-base truncate">{contributor.name}</div>
                      <div className="text-xs md:text-sm text-gray-500">{contributor.contributions} contributions</div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
