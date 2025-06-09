"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CalendarIcon, Gift, MessageSquarePlus } from "lucide-react"
import { SuggestWishDialog } from "@/components/suggest-wish-dialog"

// =============================================================================
// API INTEGRATION - UNCOMMENT WHEN BACKEND IS READY
// =============================================================================

// async function reserveWish(wishId: string): Promise<void> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/wishes/${wishId}/reserve`, {
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
//     console.error('Error reserving wish:', error);
//     throw error;
//   }
// }

// async function suggestWish(occasionId: string, suggestion: {
//   name: string;
//   description?: string;
//   link?: string;
//   isAnonymous: boolean;
// }): Promise<void> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/occasions/${occasionId}/suggestions`, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(suggestion),
//     });
//
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//   } catch (error) {
//     console.error('Error suggesting wish:', error);
//     throw error;
//   }
// }

// =============================================================================
// TO SWITCH TO REAL API:
// 1. Uncomment the API functions above
// 2. Update reservation handler to call reserveWish API
// 3. Update suggestion handler to call suggestWish API
// 4. Add optimistic updates and error handling
// =============================================================================

// Mock data
const mockWishes = [
  {
    id: "1",
    name: "Nintendo Switch OLED",
    description: "White console with enhanced screen",
    price: "$349.99",
    priority: "high",
    isReserved: false,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Wireless Earbuds",
    description: "Noise cancelling with charging case",
    price: "$129.99",
    priority: "medium",
    isReserved: true,
    image: "/placeholder.svg?height=100&width=100",
  },
]

interface FriendOccasionDetailProps {
  occasion: {
    id: string
    title: string
    date: string | null
    isPublic: boolean
    wishCount: number
  }
  friendName: string
  onBack: () => void
}

export function FriendOccasionDetail({ occasion, friendName, onBack }: FriendOccasionDetailProps) {
  const [isSuggestDialogOpen, setIsSuggestDialogOpen] = useState(false)

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-xl font-bold">{occasion.title}</h2>
          <p className="text-sm text-muted-foreground">{friendName}'s occasion</p>
        </div>
      </div>

      {occasion.date && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <CalendarIcon className="h-4 w-4" />
          {new Date(occasion.date).toLocaleDateString()}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h3 className="font-medium">Wishes ({mockWishes.length})</h3>
        <Button onClick={() => setIsSuggestDialogOpen(true)} size="sm" variant="outline">
          <MessageSquarePlus className="h-4 w-4 mr-1" />
          Suggest a Gift
        </Button>
      </div>

      <div className="grid gap-4">
        {mockWishes.map((wish) => (
          <Card key={wish.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                  <img src={wish.image || "/placeholder.svg"} alt={wish.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium truncate">{wish.name}</h4>
                    <Badge
                      variant={
                        wish.priority === "high" ? "destructive" : wish.priority === "medium" ? "default" : "secondary"
                      }
                      className="ml-2 flex-shrink-0"
                    >
                      {wish.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{wish.description}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm font-medium">{wish.price}</span>
                    {wish.isReserved ? (
                      <Badge variant="outline" className="bg-green-50">
                        Reserved
                      </Badge>
                    ) : (
                      <Button size="sm">
                        <Gift className="h-4 w-4 mr-1" />
                        Reserve
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <SuggestWishDialog
        open={isSuggestDialogOpen}
        onOpenChange={setIsSuggestDialogOpen}
        occasionTitle={occasion.title}
        friendName={friendName}
      />
    </div>
  )
}
