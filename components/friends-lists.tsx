"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Lock, Search, Unlock, UserPlus } from "lucide-react"
import { FriendProfile } from "@/components/friend-profile"

// =============================================================================
// API INTEGRATION - UNCOMMENT WHEN BACKEND IS READY
// =============================================================================

// interface ApiFriend {
//   id: string;
//   name: string;
//   username: string;
//   avatar?: string;
//   occasions: Array<{
//     id: string;
//     title: string;
//     date: string | null;
//     isPublic: boolean;
//     wishCount: number;
//   }>;
//   followedAt: string;
// }

// async function fetchFollowingUsers(): Promise<ApiFriend[]> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/users/following`, {
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
//     return data.following || [];
//   } catch (error) {
//     console.error('Error fetching following users:', error);
//     throw error;
//   }
// }

// async function searchUsers(query: string): Promise<ApiFriend[]> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/users/search?q=${encodeURIComponent(query)}`, {
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
//     return data.users || [];
//   } catch (error) {
//     console.error('Error searching users:', error);
//     throw error;
//   }
// }

// async function followUser(userId: string): Promise<void> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/users/${userId}/follow`, {
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
//     console.error('Error following user:', error);
//     throw error;
//   }
// }

// =============================================================================
// TO SWITCH TO REAL API:
// 1. Uncomment the API functions above
// 2. Replace mockFriends with: const [friends, setFriends] = useState<ApiFriend[]>([]);
// 3. Add useEffect to fetch following: useEffect(() => { fetchFollowingUsers().then(setFriends).catch(console.error); }, []);
// 4. Implement search functionality with searchUsers API
// 5. Update follow functionality to call followUser API
// =============================================================================

// Mock data
const mockFriends = [
  {
    id: "1",
    name: "Alex Johnson",
    username: "@alexj",
    avatar: "/placeholder.svg?height=40&width=40",
    occasions: [
      { id: "1", title: "Birthday 2024", date: "2024-08-10", isPublic: true, wishCount: 7 },
      { id: "2", title: "Christmas List", date: "2024-12-25", isPublic: false, wishCount: 4 },
    ],
  },
  {
    id: "2",
    name: "Sam Taylor",
    username: "@samtaylor",
    avatar: "/placeholder.svg?height=40&width=40",
    occasions: [
      { id: "3", title: "Wedding Registry", date: "2024-09-15", isPublic: true, wishCount: 12 },
      { id: "4", title: "Home Decor Ideas", date: null, isPublic: false, wishCount: 5 },
    ],
  },
  {
    id: "3",
    name: "Jamie Smith",
    username: "@jamiesmith",
    avatar: "/placeholder.svg?height=40&width=40",
    occasions: [{ id: "5", title: "Graduation Gifts", date: "2024-05-20", isPublic: true, wishCount: 3 }],
  },
]

export function FriendsLists() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null)

  if (selectedFriend) {
    const friend = mockFriends.find((f) => f.id === selectedFriend)
    if (friend) {
      return <FriendProfile friend={friend} onBack={() => setSelectedFriend(null)} />
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Following</h2>
        <Button size="sm" variant="outline">
          <UserPlus className="h-4 w-4 mr-1" />
          Find Friends
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search friends..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {mockFriends.map((friend) => (
          <Card
            key={friend.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedFriend(friend.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                  <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{friend.name}</CardTitle>
                  <CardDescription>{friend.username}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-2">Occasions:</p>
              <div className="flex flex-wrap gap-2">
                {friend.occasions.map((occasion) => (
                  <Badge key={occasion.id} variant="outline" className="flex items-center gap-1">
                    {occasion.isPublic ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                    <span>{occasion.title}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
