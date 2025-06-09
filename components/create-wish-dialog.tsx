"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sparkles } from "lucide-react"

interface CreateWishDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  occasionTitle: string
}

export function CreateWishDialog({ open, onOpenChange, occasionTitle }: CreateWishDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Wish</DialogTitle>
          <DialogDescription>
            Add a new wish to "{occasionTitle}"{" "}
            <span className="inline-flex items-center text-yellow-600">
              <Sparkles className="h-3 w-3 mr-1" /> Costs 1 point
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Item Name</Label>
            <Input id="name" placeholder="e.g., Sony Headphones, Lego Set" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea id="description" placeholder="Add details about color, size, etc." />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="link">Product Link (Optional)</Label>
            <Input id="link" placeholder="https://..." />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Price Range</Label>
            <Input id="price" placeholder="e.g., $50-$100 or $149.99" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Image URL (Optional)</Label>
            <Input id="image" placeholder="https://..." />
          </div>

          <div className="grid gap-2">
            <Label>Priority Level</Label>
            <RadioGroup defaultValue="medium">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high">High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low">Low</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="private-notes" className="rounded border-gray-300" />
            <Label htmlFor="private-notes" className="text-sm">
              Add private notes (only visible to you)
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button>
            <Sparkles className="h-4 w-4 mr-1 text-yellow-100" />
            Add Wish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
