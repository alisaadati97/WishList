"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CalendarIcon, Lock, Plus, Sparkles, Unlock } from "lucide-react"
import { CreateWishDialog } from "@/components/create-wish-dialog"
import { WishDetail } from "@/components/wish-detail"

// =============================================================================
// API INTEGRATION - UNCOMMENT WHEN BACKEND IS READY
// =============================================================================

// interface ApiWish {
//   id: string;
//   name: string;
//   description: string;
//   link?: string;
//   price: string;
//   priority: 'high' | 'medium' | 'low';
//   isReserved: boolean;
//   reservedBy?: string;
//   image?: string;
//   occasionId: string;
//   createdAt: string;
//   updatedAt: string;
// }

// async function fetchOccasionWishes(occasionId: string): Promise<ApiWish[]> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/occasions/${occasionId}/wishes`, {
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
//     return data.wishes || [];
//   } catch (error) {
//     console.error('Error fetching wishes:', error);
//     throw error;
//   }
// }

// async function createWish(occasionId: string, wishData: {
//   name: string;
//   description?: string;
//   link?: string;
//   price: string;
//   priority: 'high' | 'medium' | 'low';
//   image?: string;
// }): Promise<ApiWish> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/occasions/${occasionId}/wishes`, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(wishData),
//     });
//
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//
//     const data = await response.json();
//     return data.wish;
//   } catch (error) {
//     console.error('Error creating wish:', error);
//     throw error;
//   }
// }

// =============================================================================
// TO SWITCH TO REAL API:
// 1. Uncomment the API functions above
// 2. Replace mockWishes with: const [wishes, setWishes] = useState<ApiWish[]>([]);
// 3. Add useEffect to fetch wishes: useEffect(() => { fetchOccasionWishes(occasion.id).then(setWishes).catch(console.error); }, [occasion.id]);
// 4. Update create wish handler to call createWish API and refresh wishes list
// =============================================================================

// Mock data
const mockWishes = [
  {
    id: "1",
    name: "Sony WH-1000XM5 Headphones",
    description: "Noise cancelling wireless headphones in black",
    link: "https://example.com/headphones",
    price: "$349.99",
    priority: "high",
    isReserved: false,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Kindle Paperwhite",
    description: "E-reader with adjustable warm light",
    link: "https://example.com/kindle",
    price: "$139.99",
    priority: "medium",
    isReserved: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Lego Star Wars Set",
    description: "The Millennium Falcon collector's edition",
    link: "https://example.com/lego",
    price: "$169.99",
    priority: "low",
    isReserved: false,
    image: "/placeholder.svg?height=100&width=100",
  },
]

interface OccasionDetailProps {
  occasion: {
    id: string
    title: string
    date: string | null
    isPublic: boolean
    wishCount: number
  }
  onBack: () => void
}

export function OccasionDetail({ occasion, onBack }: OccasionDetailProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedWish, setSelectedWish] = useState<string | null>(null)

  if (selectedWish) {
    const wish = mockWishes.find((w) => w.id === selectedWish)
    if (wish) {
      return <WishDetail wish={wish} onBack={() => setSelectedWish(null)} />
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-xl font-bold">{occasion.title}</h2>
          {occasion.date && (
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              {new Date(occasion.date).toLocaleDateString()}
            </p>
          )}
        </div>
        {occasion.isPublic ? (
          <Badge variant="outline" className="ml-auto flex items-center gap-1">
            <Unlock className="h-3 w-3" />
            <span className="text-xs">Public</span>
          </Badge>
        ) : (
          <Badge variant="outline" className="ml-auto flex items-center gap-1">
            <Lock className="h-3 w-3" />
            <span className="text-xs">Restricted</span>
          </Badge>
        )}
      </div>

      <div className="flex justify-between items-center">
        <h3 className="font-medium">Wishes ({mockWishes.length})</h3>
        <Button onClick={() => setIsCreateDialogOpen(true)} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Wish <Sparkles className="h-3 w-3 ml-1 text-yellow-500" />
        </Button>
      </div>

      <div className="grid gap-4">
        {mockWishes.map((wish) => (
          <Card
            key={wish.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedWish(wish.id)}
          >
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
                    {wish.isReserved && (
                      <Badge variant="outline" className="bg-green-50">
                        Reserved
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateWishDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} occasionTitle={occasion.title} />
    </div>
  )
}
