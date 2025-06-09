"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Check, Gift, Lock, MessageSquare, X } from "lucide-react"

// =============================================================================
// API INTEGRATION - UNCOMMENT WHEN BACKEND IS READY
// =============================================================================

// interface ApiAccessRequest {
//   id: string;
//   requesterId: string;
//   requesterName?: string;
//   requesterUsername?: string;
//   requesterAvatar?: string;
//   occasionId: string;
//   occasionTitle: string;
//   isAnonymous: boolean;
//   status: 'pending' | 'approved' | 'denied';
//   createdAt: string;
// }

// interface ApiSuggestion {
//   id: string;
//   suggesterId: string;
//   suggesterName?: string;
//   suggesterUsername?: string;
//   suggesterAvatar?: string;
//   occasionId: string;
//   occasionTitle: string;
//   itemName: string;
//   itemDescription?: string;
//   itemLink?: string;
//   isAnonymous: boolean;
//   status: 'pending' | 'added' | 'dismissed';
//   createdAt: string;
// }

// async function fetchAccessRequests(): Promise<ApiAccessRequest[]> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/access-requests`, {
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
//     return data.accessRequests || [];
//   } catch (error) {
//     console.error('Error fetching access requests:', error);
//     throw error;
//   }
// }

// async function fetchSuggestions(): Promise<ApiSuggestion[]> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/suggestions`, {
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
//     return data.suggestions || [];
//   } catch (error) {
//     console.error('Error fetching suggestions:', error);
//     throw error;
//   }
// }

// async function respondToAccessRequest(requestId: string, action: 'approve' | 'deny'): Promise<void> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/access-requests/${requestId}/${action}`, {
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
//     console.error(`Error ${action}ing access request:`, error);
//     throw error;
//   }
// }

// async function respondToSuggestion(suggestionId: string, action: 'add' | 'dismiss'): Promise<void> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/suggestions/${suggestionId}/${action}`, {
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
//     console.error(`Error ${action}ing suggestion:`, error);
//     throw error;
//   }
// }

// =============================================================================
// TO SWITCH TO REAL API:
// 1. Uncomment the API functions above
// 2. Replace mockAccessRequests with: const [accessRequests, setAccessRequests] = useState<ApiAccessRequest[]>([]);
// 3. Replace mockSuggestions with: const [suggestions, setSuggestions] = useState<ApiSuggestion[]>([]);
// 4. Add useEffect to fetch data:
//    useEffect(() => {
//      fetchAccessRequests().then(setAccessRequests).catch(console.error);
//      fetchSuggestions().then(setSuggestions).catch(console.error);
//    }, []);
// 5. Update approve/deny handlers to call respondToAccessRequest API
// 6. Update add/dismiss handlers to call respondToSuggestion API
// =============================================================================

// Mock data
const mockAccessRequests = [
  {
    id: "1",
    user: {
      name: "Taylor Wilson",
      username: "@taylorw",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    occasion: "Birthday 2024",
    date: "2 hours ago",
    isAnonymous: false,
  },
  {
    id: "2",
    user: null,
    occasion: "Christmas List",
    date: "1 day ago",
    isAnonymous: true,
  },
]

const mockSuggestions = [
  {
    id: "1",
    user: {
      name: "Jordan Lee",
      username: "@jordanl",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    occasion: "Birthday 2024",
    item: "Wireless Charging Pad",
    description: "For iPhone and Android devices",
    date: "3 hours ago",
    isAnonymous: false,
  },
  {
    id: "2",
    user: null,
    occasion: "Graduation Gift Ideas",
    item: "Professional Portfolio Case",
    description: "Leather-bound with personalization",
    date: "2 days ago",
    isAnonymous: true,
  },
]

export function Interactions() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Interactions</h2>

      <Tabs defaultValue="access-requests" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="access-requests" className="flex items-center gap-1">
            <Lock className="h-4 w-4" />
            Access Requests
            {mockAccessRequests.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {mockAccessRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            Suggestions
            {mockSuggestions.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {mockSuggestions.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="access-requests" className="mt-4 space-y-4">
          {mockAccessRequests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No access requests at the moment</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {mockAccessRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Access Request for "{request.occasion}"</CardTitle>
                        <CardDescription>{request.date}</CardDescription>
                      </div>
                      {request.isAnonymous ? <Badge variant="outline">Anonymous</Badge> : null}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {request.isAnonymous ? (
                          <Avatar>
                            <AvatarFallback>?</AvatarFallback>
                          </Avatar>
                        ) : (
                          <Avatar>
                            <AvatarImage src={request.user?.avatar || "/placeholder.svg"} alt={request.user?.name} />
                            <AvatarFallback>{request.user?.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          {request.isAnonymous ? (
                            <p className="font-medium">Anonymous User</p>
                          ) : (
                            <>
                              <p className="font-medium">{request.user?.name}</p>
                              <p className="text-sm text-muted-foreground">{request.user?.username}</p>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-red-500">
                          <X className="h-4 w-4 mr-1" />
                          Deny
                        </Button>
                        <Button size="sm" className="text-green-50">
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="suggestions" className="mt-4 space-y-4">
          {mockSuggestions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No gift suggestions at the moment</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {mockSuggestions.map((suggestion) => (
                <Card key={suggestion.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{suggestion.item}</CardTitle>
                        <CardDescription>
                          For "{suggestion.occasion}" • {suggestion.date}
                        </CardDescription>
                      </div>
                      {suggestion.isAnonymous ? <Badge variant="outline">Anonymous</Badge> : null}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">{suggestion.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {suggestion.isAnonymous ? (
                          <Avatar>
                            <AvatarFallback>?</AvatarFallback>
                          </Avatar>
                        ) : (
                          <Avatar>
                            <AvatarImage
                              src={suggestion.user?.avatar || "/placeholder.svg"}
                              alt={suggestion.user?.name}
                            />
                            <AvatarFallback>{suggestion.user?.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          {suggestion.isAnonymous ? (
                            <p className="font-medium">Anonymous User</p>
                          ) : (
                            <>
                              <p className="font-medium">{suggestion.user?.name}</p>
                              <p className="text-sm text-muted-foreground">{suggestion.user?.username}</p>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <X className="h-4 w-4 mr-1" />
                          Dismiss
                        </Button>
                        <Button size="sm">
                          <Gift className="h-4 w-4 mr-1" />
                          Add as Wish
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
