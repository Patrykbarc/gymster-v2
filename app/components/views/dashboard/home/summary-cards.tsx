import { ClipboardList, Dumbbell, History, Play } from 'lucide-react'
import { useLoaderData } from 'react-router'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '~/components/ui/card'

const iconMap = {
  History,
  ClipboardList,
  Dumbbell,
  Play
}

type SummaryCard = {
  title: string
  icon: keyof typeof iconMap
  value: string
  description: string
}

export function SummaryCards() {
  const { summaryCards } = useLoaderData<{ summaryCards: SummaryCard[] }>()

  if (!summaryCards) {
    return <div>No summary cards</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {summaryCards.map((card) => {
        const Icon = iconMap[card.icon]
        return (
          <Card className="gap-3" key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <Icon className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
            <CardFooter>
              <p className="text-muted-foreground text-xs">
                {card.description}
              </p>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
