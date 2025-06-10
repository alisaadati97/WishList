"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Check, Share2, Sparkles } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { getTelegramUser, getTelegramInitData, isTelegramMiniApp, initializeTelegramApp } from "@/lib/telegram"

// =============================================================================
// API INTEGRATION - UNCOMMENT WHEN BACKEND IS READY
// =============================================================================

// interface ApiUser {
//   id: string;
//   username: string;
//   name?: string;
//   avatar?: string;
//   dateOfBirth?: string;
//   interests?: string;
//   referralCode: string;
//   points: number;
//   createdAt: string;
//   updatedAt: string;
// }

// interface ApiTask {
//   id: string;
//   title: string;
//   description: string;
//   points: number;
//   completed: boolean;
//   completedAt?: string;
//   category: 'profile' | 'social' | 'content' | 'engagement';
// }

// async function fetchUserProfile(): Promise<ApiUser> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/users/me`, {
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
//     return data.user;
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     throw error;
//   }
// }

// async function updateUserProfile(profileData: {
//   name?: string;
//   dateOfBirth?: string;
//   interests?: string;
//   avatar?: string;
// }): Promise<ApiUser> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/users/me`, {
//       method: 'PATCH',
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(profileData),
//     });
//
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//
//     const data = await response.json();
//     return data.user;
//   } catch (error) {
//     console.error('Error updating user profile:', error);
//     throw error;
//   }
// }

// async function fetchUserTasks(): Promise<ApiTask[]> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/users/me/tasks`, {
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
//     return data.tasks || [];
//   } catch (error) {
//     console.error('Error fetching user tasks:', error);
//     throw error;
//   }
// }

// async function completeTask(taskId: string): Promise<void> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/users/me/tasks/${taskId}/complete`, {
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
//     console.error('Error completing task:', error);
//     throw error;
//   }
// }

// =============================================================================
// TO SWITCH TO REAL API:
// 1. Uncomment the API functions above
// 2. Replace mockTasks with: const [tasks, setTasks] = useState<ApiTask[]>([]);
// 3. Add user state: const [user, setUser] = useState<ApiUser | null>(null);
// 4. Add useEffect to fetch data:
//    useEffect(() => {
//      fetchUserProfile().then(setUser).catch(console.error);
//      fetchUserTasks().then(setTasks).catch(console.error);
//    }, []);
// 5. Update profile save handler to call updateUserProfile API
// 6. Update task completion to call completeTask API
// =============================================================================

// Mock data
const mockTasks = [
  {
    id: "1",
    title: "Complete your profile",
    description: "Add your photo and interests",
    points: 5,
    completed: true,
  },
  {
    id: "2",
    title: "Create your first occasion",
    description: "Start organizing your wishes",
    points: 10,
    completed: true,
  },
  {
    id: "3",
    title: "Add your first wish",
    description: "Add something you'd like to receive",
    points: 5,
    completed: false,
  },
  {
    id: "4",
    title: "Follow a friend",
    description: "Connect with someone you know",
    points: 10,
    completed: false,
  },
  {
    id: "5",
    title: "Share your referral link",
    description: "Invite friends to join",
    points: 15,
    completed: false,
  },
]

export function Profile() {
  const [telegramUser, setTelegramUser] = useState<any>(null)
  const [telegramInitData, setTelegramInitData] = useState<any>(null)
  const [isTelegramApp, setIsTelegramApp] = useState(false)

  useEffect(() => {
    // Initialize Telegram Mini App
    initializeTelegramApp()

    // Check if running in Telegram
    const isInTelegram = isTelegramMiniApp()
    setIsTelegramApp(isInTelegram)

    if (isInTelegram) {
      // Get Telegram user data
      const user = getTelegramUser()
      const initData = getTelegramInitData()

      setTelegramUser(user)
      setTelegramInitData(initData)

      console.log("Telegram User:", user)
      console.log("Telegram Init Data:", initData)
    }
  }, [])

  const completedTasks = mockTasks.filter((task) => task.completed).length
  const totalTasks = mockTasks.length
  const progressPercentage = (completedTasks / totalTasks) * 100

  // Use Telegram data if available, otherwise use mock data
  const displayName = telegramUser
    ? `${telegramUser.first_name}${telegramUser.last_name ? " " + telegramUser.last_name : ""}`
    : "John Doe"

  const displayUsername = telegramUser?.username ? `@${telegramUser.username}` : "@johndoe"

  const displayAvatar = telegramUser?.photo_url || "/placeholder.svg?height=80&width=80"

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Profile</h2>
        {isTelegramApp && (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Telegram Mini App
          </Badge>
        )}
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile Info</TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center gap-1">
            Tasks
            <Badge variant="secondary" className="ml-1">
              {completedTasks}/{totalTasks}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4 space-y-4">
          {/* Telegram Info Card - Only show if in Telegram */}
          {isTelegramApp && telegramUser && (
            <Card className="border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="text-blue-800">Telegram Account</CardTitle>
                <CardDescription>Information from your Telegram account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-blue-700">Telegram ID</Label>
                    <p className="font-mono">{telegramUser.id}</p>
                  </div>
                  <div>
                    <Label className="text-blue-700">Language</Label>
                    <p>{telegramUser.language_code?.toUpperCase() || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-blue-700">Premium</Label>
                    <p>{telegramUser.is_premium ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <Label className="text-blue-700">Auth Date</Label>
                    <p>{new Date(telegramInitData?.auth_date * 1000).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                {isTelegramApp ? "Your profile information from Telegram" : "Manage your personal information"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={displayAvatar || "/placeholder.svg"} alt="Profile" />
                  <AvatarFallback>
                    {displayName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {!isTelegramApp && <Button size="sm">Change Photo</Button>}
                {isTelegramApp && <div className="text-sm text-muted-foreground">Photo synced from Telegram</div>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={displayName} disabled={isTelegramApp} placeholder="Enter your full name" />
                {isTelegramApp && <p className="text-xs text-muted-foreground">Name is from your Telegram account</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={displayUsername} disabled />
                <p className="text-xs text-muted-foreground">
                  {isTelegramApp ? "Username is from your Telegram account" : "Username is from your Telegram account"}
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="dob" type="date" className="pl-8" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="interests">Interests</Label>
                <Textarea id="interests" placeholder="Share your interests to help friends find perfect gifts" />
              </div>

              <div className="grid gap-2">
                <Label>Referral Link</Label>
                <div className="flex gap-2">
                  <Input value={`https://wishapp.tg/ref/${telegramUser?.username || "johndoe"}`} readOnly />
                  <Button size="sm" variant="outline">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Earn 15 points for each friend who joins</p>
              </div>

              <Button className="w-full">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding Tasks</CardTitle>
              <CardDescription>Complete tasks to earn points</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {completedTasks}/{totalTasks} completed
                  </span>
                </div>

                <Progress value={progressPercentage} className="h-2" />
              </div>

              <div className="space-y-3">
                {mockTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg border">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${task.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
                    >
                      {task.completed && <Check className="h-3 w-3" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                          {task.title}
                        </h4>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Sparkles className="h-3 w-3 text-yellow-500" />
                          <span>{task.points}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
