import { getRecentActivity } from "@/lib/activity"
import { useState, useEffect } from 'react'
import { Activity } from 'lucide-react'

export function RecentActivity() {
  const [activities, setActivities] = useState<Array<{ id: string, date: string, description: string }>>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchActivities() {
      try {
        const fetchedActivities = await getRecentActivity()
        setActivities(fetchedActivities)
      } catch (err) {
        console.error("Error fetching recent activities:", err)
        setError("Failed to load recent activities")
      }
    }

    fetchActivities()
  }, [])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (activities.length === 0) {
    return <div>Loading recent activities...</div>
  }

  return (
    <ul className="space-y-4">
      {activities.map((activity) => (
        <li key={activity.id} className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {activity.description}
            </p>
            <p className="text-sm text-gray-500">
              {activity.date}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}