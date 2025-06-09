"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Gift, Lock, Plus, Unlock } from "lucide-react"
import { CreateOccasionDialog } from "@/components/create-occasion-dialog"
import { OccasionDetail } from "@/components/occasion-detail"

// =============================================================================
// API INTEGRATION - UNCOMMENT WHEN BACKEND IS READY
// =============================================================================

// API endpoint for fetching user's occasions
// const API_BASE_URL = 'https://api.wishapp.com/v1';

// interface ApiOccasion {
//   id: string;
//   title: string;
//   date: string | null;
//   isPublic: boolean;
//   wishCount: number;
//   userId: string;
//   createdAt: string;
//   updatedAt: string;
// }

// async function fetchUserOccasions(): Promise<ApiOccasion[]> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/occasions`, {
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
//     return data.occasions || [];
//   } catch (error) {
//     console.error('Error fetching occasions:', error);
//     throw error;
//   }
// }

// async function createOccasion(occasionData: {
//   title: string;
//   date?: string;
//   isPublic: boolean;
// }): Promise<ApiOccasion> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/occasions`, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(occasionData),
//     });
//
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//
//     const data = await response.json();
//     return data.occasion;
//   } catch (error) {
//     console.error('Error creating occasion:', error);
//     throw error;
//   }
// }

// =============================================================================
// TO SWITCH TO REAL API:
// 1. Uncomment the API functions above
// 2. Replace mockOccasions with: const [occasions, setOccasions] = useState<ApiOccasion[]>([]);
// 3. Add useEffect to fetch data: useEffect(() => { fetchUserOccasions().then(setOccasions).catch(console.error); }, []);
// 4. Update create occasion handler to call createOccasion API
// =============================================================================

// Mock data
const mockOccasions = [
  {
    id: "1",
    title: "My Birthday 2024",
    date: "2024-06-15",
    isPublic: true,
    wishCount: 5,
  },
  {
    id: "2",
    title: "Christmas List",
    date: "2024-12-25",
    isPublic: false,
    wishCount: 8,
  },
  {
    id: "3",
    title: "Graduation Gift Ideas",
    date: null,
    isPublic: true,
    wishCount: 3,
  },
]

export function MyOccasions() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null)

  if (selectedOccasion) {
    const occasion = mockOccasions.find((o) => o.id === selectedOccasion)
    if (occasion) {
      return <OccasionDetail occasion={occasion} onBack={() => setSelectedOccasion(null)} />
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">My Occasions</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          New Occasion
        </Button>
      </div>

      <div className="grid gap-4">
        {mockOccasions.map((occasion) => (
          <Card
            key={occasion.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedOccasion(occasion.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{occasion.title}</CardTitle>
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
            <CardFooter className="pt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Gift className="h-4 w-4" />
                {occasion.wishCount} {occasion.wishCount === 1 ? "wish" : "wishes"}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <CreateOccasionDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
    </div>
  )
}
