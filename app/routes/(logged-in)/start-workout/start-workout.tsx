'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { StartFromPlan } from '~/components/views/(logged-in)/start-workout/start-from-plan'
import { StartFromScratch } from '~/components/views/(logged-in)/start-workout/start-from-scratch'

export default function StartWorkoutPage() {
  const searchParams = useParams()
  const planId = searchParams.planId
  const [activeTab, setActiveTab] = useState(planId ? 'plan' : 'scratch')

  useEffect(() => {
    if (planId) {
      setActiveTab('plan')
    }
  }, [planId])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Start Workout</h1>
        <p className="text-muted-foreground">Begin a new workout session</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Workout</CardTitle>
          <CardDescription>
            Choose how you want to start your workout
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="plan">From Plan</TabsTrigger>
              <TabsTrigger value="scratch">From Scratch</TabsTrigger>
            </TabsList>
            <TabsContent value="plan" className="space-y-4">
              <StartFromPlan initialPlanId={planId} />
            </TabsContent>
            <TabsContent value="scratch" className="space-y-4">
              <StartFromScratch />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
