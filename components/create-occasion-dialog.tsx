"use client"

import { useState } from "react"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarIcon, Lock, Unlock } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface CreateOccasionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateOccasionDialog({ open, onOpenChange }: CreateOccasionDialogProps) {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Occasion</DialogTitle>
          <DialogDescription>Create a new occasion to organize your wishes.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Occasion Title</Label>
            <Input id="title" placeholder="e.g., Birthday 2024, Christmas List" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date">Date (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-2">
            <Label>Privacy Setting</Label>
            <RadioGroup defaultValue="public">
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public" className="flex items-center gap-2 cursor-pointer">
                  <Unlock className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Public</p>
                    <p className="text-sm text-muted-foreground">Visible to all your followers</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="restricted" id="restricted" />
                <Label htmlFor="restricted" className="flex items-center gap-2 cursor-pointer">
                  <Lock className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Restricted</p>
                    <p className="text-sm text-muted-foreground">Followers must request access</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button>Create Occasion</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
