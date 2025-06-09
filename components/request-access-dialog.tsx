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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface RequestAccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  occasionTitle: string
  friendName: string
}

export function RequestAccessDialog({ open, onOpenChange, occasionTitle, friendName }: RequestAccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Access</DialogTitle>
          <DialogDescription>
            Request access to view "{occasionTitle}" from {friendName}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="anonymous">Send Anonymously</Label>
              <p className="text-sm text-muted-foreground">{friendName} won't know who requested access</p>
            </div>
            <Switch id="anonymous" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Send Request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
