"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Gift } from "lucide-react"

interface WishDetailProps {
  wish: {
    id: string
    name: string
    description: string
    link: string
    price: string
    priority: string
    isReserved: boolean
    image: string
  }
  onBack: () => void
}

export function WishDetail({ wish, onBack }: WishDetailProps) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-bold">Wish Details</h2>
      </div>

      <div className="space-y-6">
        <div className="aspect-square max-h-[300px] rounded-lg overflow-hidden bg-gray-100">
          <img src={wish.image || "/placeholder.svg"} alt={wish.name} className="w-full h-full object-contain" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold">{wish.name}</h3>
            <Badge
              variant={wish.priority === "high" ? "destructive" : wish.priority === "medium" ? "default" : "secondary"}
            >
              {wish.priority} priority
            </Badge>
          </div>

          <p className="text-muted-foreground">{wish.description}</p>

          <div className="py-2">
            <p className="text-lg font-bold">{wish.price}</p>
          </div>

          {wish.link && (
            <Button variant="outline" className="w-full" asChild>
              <a href={wish.link} target="_blank" rel="noopener noreferrer">
                View Product <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}

          {wish.isReserved ? (
            <Button disabled className="w-full bg-green-100 text-green-800 hover:bg-green-100">
              Already Reserved
            </Button>
          ) : (
            <Button className="w-full">
              <Gift className="mr-2 h-4 w-4" />
              Reserve This Gift
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
