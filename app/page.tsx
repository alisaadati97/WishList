import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MyOccasions } from "@/components/my-occasions"
import { FriendsLists } from "@/components/friends-lists"
import { Interactions } from "@/components/interactions"
import { Profile } from "@/components/profile"
import { Notifications } from "@/components/notifications"
import { PointsDisplay } from "@/components/points-display"

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-[#F5F5F5]">
      <header className="flex justify-between items-center p-4 bg-white border-b">
        <h1 className="text-xl font-bold">WishApp</h1>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
        <PointsDisplay points={25} />
      </header>

      <Tabs defaultValue="my-occasions" className="flex flex-col flex-1">
        <main className="flex-1 overflow-auto pb-16">
          <TabsContent value="my-occasions" className="mt-0 h-full">
            <MyOccasions />
          </TabsContent>
          <TabsContent value="friends" className="mt-0 h-full">
            <FriendsLists />
          </TabsContent>
          <TabsContent value="interactions" className="mt-0 h-full">
            <Interactions />
          </TabsContent>
          <TabsContent value="profile" className="mt-0 h-full">
            <Profile />
          </TabsContent>
          <TabsContent value="notifications" className="mt-0 h-full">
            <Notifications />
          </TabsContent>
        </main>

        <nav className="fixed bottom-0 w-full bg-white border-t">
          <TabsList className="w-full h-16 grid grid-cols-5 bg-transparent">
            <TabsTrigger
              value="my-occasions"
              className="flex flex-col items-center justify-center data-[state=active]:bg-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-gift"
              >
                <polyline points="20 12 20 22 4 22 4 12"></polyline>
                <rect x="2" y="7" width="20" height="5"></rect>
                <line x1="12" y1="22" x2="12" y2="7"></line>
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
              </svg>
              <span className="text-xs mt-1">My Lists</span>
            </TabsTrigger>
            <TabsTrigger
              value="friends"
              className="flex flex-col items-center justify-center data-[state=active]:bg-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span className="text-xs mt-1">Friends</span>
            </TabsTrigger>
            <TabsTrigger
              value="interactions"
              className="flex flex-col items-center justify-center data-[state=active]:bg-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-message-square"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span className="text-xs mt-1">Interactions</span>
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="flex flex-col items-center justify-center data-[state=active]:bg-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="text-xs mt-1">Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex flex-col items-center justify-center data-[state=active]:bg-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-bell"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
              <span className="text-xs mt-1">Alerts</span>
            </TabsTrigger>
          </TabsList>
        </nav>
      </Tabs>
    </div>
  )
}
