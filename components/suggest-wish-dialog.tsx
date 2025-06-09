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
import { Switch } from "@/components/ui/switch"

interface SuggestWishDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  occasionTitle: string
  friendName: string
}

export function SuggestWishDialog({ open, onOpenChange, occasionTitle, friendName }: SuggestWishDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Suggest a Gift</DialogTitle>
          <DialogDescription>
            Suggest a gift idea for {friendName}'s "{occasionTitle}"
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Item Name</Label>
            <Input id="name" placeholder="e.g., Bluetooth Speaker, Coffee Maker" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea id="description" placeholder="Add details about the item" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="link">Product Link (Optional)</Label>
            <Input id="link" placeholder="https://..." />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="anonymous">Send Anonymously</Label>
              <p className="text-sm text-muted-foreground">{friendName} won't know who suggested this</p>
            </div>
            <Switch id="anonymous" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Send Suggestion</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
