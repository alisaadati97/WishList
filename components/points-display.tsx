import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// =============================================================================
// API INTEGRATION - UNCOMMENT WHEN BACKEND IS READY
// =============================================================================

// async function fetchUserPoints(): Promise<number> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/users/me/points`, {
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
//     return data.points || 0;
//   } catch (error) {
//     console.error('Error fetching user points:', error);
//     throw error;
//   }
// }

// =============================================================================
// TO SWITCH TO REAL API:
// 1. Uncomment the API function above
// 2. Convert to a stateful component that fetches points from API
// 3. Add useEffect to fetch points on component mount
// 4. Consider implementing real-time points updates
// =============================================================================

interface PointsDisplayProps {
  points: number
}

export function PointsDisplay({ points }: PointsDisplayProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="px-3 py-1 flex items-center gap-1 cursor-help">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span className="font-semibold">{points}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Your points balance</p>
          <p className="text-xs text-muted-foreground">Used to add wishes</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
