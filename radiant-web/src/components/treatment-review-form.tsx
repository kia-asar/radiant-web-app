"use client"

import { useState } from "react"
import { CalendarIcon, Star, Upload } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export interface TreatmentReviewData {
  treatmentType: string
  description: string
  rating: string
  cost: string
  date: Date | undefined
  doctorName: string
  establishmentName: string
  beforePhoto: File | null
  afterPhoto: File | null
}

interface TreatmentReviewFormProps {
  onSubmit: (data: TreatmentReviewData) => void
}

export function TreatmentReviewFormComponent({ onSubmit }: TreatmentReviewFormProps) {
  const [treatmentType, setTreatmentType] = useState("")
  const [description, setDescription] = useState("")
  const [rating, setRating] = useState("")
  const [cost, setCost] = useState("")
  const [date, setDate] = useState<Date>()
  const [doctorName, setDoctorName] = useState("")
  const [establishmentName, setEstablishmentName] = useState("")
  const [beforePhoto, setBeforePhoto] = useState<File | null>(null)
  const [afterPhoto, setAfterPhoto] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      treatmentType,
      description,
      rating,
      cost,
      date,
      doctorName,
      establishmentName,
      beforePhoto,
      afterPhoto
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setPhoto: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto md:max-w-none md:mx-0">
      <CardHeader>
        <CardTitle>Add Treatment Review</CardTitle>
        <CardDescription>Share your experience with a treatment</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="treatmentType">Treatment Type</Label>
            <Input
              id="treatmentType"
              placeholder="e.g., Massage, Acupuncture, Therapy"
              value={treatmentType}
              onChange={(e) => setTreatmentType(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your experience..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Rating</Label>
            <RadioGroup value={rating} onValueChange={setRating} className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex items-center space-x-1">
                  <RadioGroupItem value={value.toString()} id={`rating-${value}`} />
                  <Label htmlFor={`rating-${value}`}>
                    <Star className={cn("w-4 h-4", value <= parseInt(rating) ? "fill-primary" : "fill-muted stroke-muted-foreground")} />
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cost">Cost</Label>
            <Input
              id="cost"
              type="number"
              placeholder="0.00"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Date of Treatment</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="doctorName">Doctor/Provider's Name</Label>
            <Input
              id="doctorName"
              placeholder="Enter doctor or provider's name"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="establishmentName">Establishment's Name</Label>
            <Input
              id="establishmentName"
              placeholder="Enter establishment's name"
              value={establishmentName}
              onChange={(e) => setEstablishmentName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="beforePhoto">Before Photo</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="beforePhoto"
                type="file"
                onChange={(e) => handleFileChange(e, setBeforePhoto)}
                className="hidden"
                accept="image/*"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('beforePhoto')?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Before Photo
              </Button>
              {beforePhoto && <span className="text-sm text-muted-foreground">{beforePhoto.name}</span>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="afterPhoto">After Photo</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="afterPhoto"
                type="file"
                onChange={(e) => handleFileChange(e, setAfterPhoto)}
                className="hidden"
                accept="image/*"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('afterPhoto')?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload After Photo
              </Button>
              {afterPhoto && <span className="text-sm text-muted-foreground">{afterPhoto.name}</span>}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Submit Review</Button>
        </CardFooter>
      </form>
    </Card>
  )
}