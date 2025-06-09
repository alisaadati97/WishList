"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Gift, Lock, MessageSquare, UserPlus } from "lucide-react"

// =============================================================================
// API INTEGRATION - UNCOMMENT WHEN BACKEND IS READY
// =============================================================================

// interface ApiNotification {
//   id: string;
//   type: 'reservation' | 'access_approved' | 'access_denied' | 'follow' | 'suggestion' | 'points' | 'task_completed';
//   title: string;
//   description: string;
//   read: boolean;
//   createdAt: string;
//   relatedUserId?: string;
//   relatedUserName?: string;
//   relatedUserAvatar?: string;
//   metadata?: {
//     occasionId?: string;
//     occasionTitle?: string;
//     wishId?: string;
//     wishName?: string;
//     points?: number;
//     taskId?: string;
//   };
// }

// async function fetchNotifications(): Promise<ApiNotification[]> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/notifications`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
//         'Content-Type': 'application/json',
//       },
//     });
//
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//
//     const data = await response.json();
//     return data.notifications || [];
//   } catch (error) {
//     console.error('Error fetching notifications:', error);
//     throw error;
//   }
// }

// async function markNotificationAsRead(notificationId: string): Promise<void> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
//         'Content-Type': 'application/json',
//       },
//     });
//
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//   } catch (error) {
//     console.error('Error marking notification as read:', error);
//     throw error;
//   }
// }

// async function markAllNotificationsAsRead(): Promise<void> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/notifications/read-all`, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
//         'Content-Type': 'application/json',
//       },
//     });
//
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//   } catch (error) {
//     console.error('Error marking all notifications as read:', error);
//     throw error;
//   }
// }

// =============================================================================
// TO SWITCH TO REAL API:
// 1. Uncomment the API functions above
// 2. Replace mockNotifications with: const [notifications, setNotifications] = useState<ApiNotification[]>([]);
// 3. Add useEffect to fetch notifications: useEffect(() => { fetchNotifications().then(setNotifications).catch(console.error); }, []);
// 4. Add click handlers to mark notifications as read
// 5. Consider implementing real-time updates with WebSocket or polling
// =============================================================================

// Mock data
const mockNotifications = [
  {
    id: "1",
    type: "reservation",
    title: "Gift Reserved",
    description: "Alex reserved 'Sony Headphones' from your Birthday list",
    time: "10 minutes ago",
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    read: false,
  },
  {
    id: "2",
    type: "access_approved",
    title: "Access Approved",
    description: "Sam approved your request to view their Christmas List",
    time: "2 hours ago",
    user: {
      name: "Sam Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    read: false,
  },
  {
    id: "3",
    type: "follow",
    title: "New Follower",
    description: "Jamie started following you",
    time: "1 day ago",
    user: {
      name: "Jamie Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    read: true,
  },
  {
    id: "4",
    type: "suggestion",
    title: "New Gift Suggestion",
    description: "You received a suggestion for your Birthday list",
    time: "2 days ago",
    user: null, // Anonymous
    read: true,
  },
  {
    id: "5",
    type: "points",
    title: "Points Earned",
    description: "You earned 10 points for completing a task",
    time: "3 days ago",
    user: null,
    read: true,
  },
]

export function Notifications() {
  const unreadCount = mockNotifications.filter((n) => !n.read).length

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Notifications</h2>
        {unreadCount > 0 && <Badge>{unreadCount} unread</Badge>}
      </div>

      <div className="grid gap-3">
        {mockNotifications.map((notification) => (
          <Card
            key={notification.id}
            className={`hover:shadow-sm transition-shadow ${!notification.read ? "border-l-4 border-l-primary" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex gap-3">
                {notification.type === "reservation" && (
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Gift className="h-5 w-5 text-blue-600" />
                  </div>
                )}
                {notification.type === "access_approved" && (
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Lock className="h-5 w-5 text-green-600" />
                  </div>
                )}
                {notification.type === "follow" && (
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <UserPlus className="h-5 w-5 text-purple-600" />
                  </div>
                )}
                {notification.type === "suggestion" && (
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-5 w-5 text-amber-600" />
                  </div>
                )}
                {notification.type === "points" && (
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <Gift className="h-5 w-5 text-yellow-600" />
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{notification.title}</h4>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>

                  {notification.user && (
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={notification.user.avatar || "/placeholder.svg"}
                          alt={notification.user.name}
                        />
                        <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{notification.user.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
