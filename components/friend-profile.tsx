"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, CalendarIcon, Gift, Lock, Share2, Unlock } from "lucide-react"
import { FriendOccasionDetail } from "@/components/friend-occasion-detail"
import { RequestAccessDialog } from "@/components/request-access-dialog"

// =============================================================================
// API INTEGRATION - UNCOMMENT WHEN BACKEND IS READY
// =============================================================================

// async function requestOccasionAccess(userId: string, occasionId: string, isAnonymous: boolean): Promise<void> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/users/${userId}/occasions/${occasionId}/request-access`, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ isAnonymous }),
//     });
//
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//   } catch (error) {
//     console.error('Error requesting occasion access:', error);
//     throw error;
//   }
// }

// =============================================================================
// TO SWITCH TO REAL API:
// 1. Uncomment the API function above
// 2. Update handleRequestAccess to call requestOccasionAccess API
// 3. Add success/error handling and user feedback
// =============================================================================

interface FriendProfileProps {
  friend: {
    id: string
    name: string
    username: string
    avatar: string
    occasions: Array<{
      id: string
      title: string
      date: string | null
      isPublic: boolean
      wishCount: number
    }>
  }
  onBack: () => void
}

export function FriendProfile({ friend, onBack }: FriendProfileProps) {
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null)
  const [requestAccessDialogOpen, setRequestAccessDialogOpen] = useState(false)
  const [requestingOccasion, setRequestingOccasion] = useState<{ id: string; title: string } | null>(null)

  if (selectedOccasion) {
    const occasion = friend.occasions.find((o) => o.id === selectedOccasion)
    if (occasion && occasion.isPublic) {
      return (
        <FriendOccasionDetail occasion={occasion} friendName={friend.name} onBack={() => setSelectedOccasion(null)} />
      )
    }
  }

  const handleRequestAccess = (occasionId: string, title: string) => {
    setRequestingOccasion({ id: occasionId, title })
    setRequestAccessDialogOpen(true)
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-bold">Friend's Profile</h2>
      </div>

      <div className="flex items-center gap-3 py-2">
        <Avatar className="h-16 w-16">
          <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-bold">{friend.name}</h3>
          <p className="text-muted-foreground">{friend.username}</p>
        </div>
        <Button variant="outline" size="sm" className="ml-auto">
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Occasions</h3>
        <div className="grid gap-3">
          {friend.occasions.map((occasion) => (
            <Card key={occasion.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{occasion.title}</CardTitle>
                  {occasion.isPublic ? (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Unlock className="h-3 w-3" />
                      <span className="text-xs">Public</span>
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      <span className="text-xs">Restricted</span>
                    </Badge>
                  )}
                </div>
                {occasion.date && (
                  <CardDescription className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    {new Date(occasion.date).toLocaleDateString()}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="pt-0 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Gift className="h-4 w-4" />
                    {occasion.wishCount} {occasion.wishCount === 1 ? "wish" : "wishes"}
                  </div>
                  {occasion.isPublic ? (
                    <Button size="sm" onClick={() => setSelectedOccasion(occasion.id)}>
                      View Wishes
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRequestAccess(occasion.id, occasion.title)}
                    >
                      Request Access
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {requestingOccasion && (
        <RequestAccessDialog
          open={requestAccessDialogOpen}
          onOpenChange={setRequestAccessDialogOpen}
          occasionTitle={requestingOccasion.title}
          friendName={friend.name}
        />
      )}
    </div>
  )
}
