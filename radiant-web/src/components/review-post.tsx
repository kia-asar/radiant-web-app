'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"

interface ReviewPostProps {
  userName?: string
  userAvatar?: string
  timePosted?: string
  postContent?: string
  imageUrl?: string
}

export function ReviewPostComponent({
  userName = "Anonymous",
  userAvatar = "/placeholder-user.jpg",
  timePosted = "Just now",
  postContent = "",
  imageUrl = "/placeholder.svg?height=300&width=500"
}: ReviewPostProps) {
  const initials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <Card className="max-w-[500px] w-full bg-white dark:bg-gray-800">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={userAvatar} alt={`${userName}'s profile picture`} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">{userName}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{timePosted}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        {postContent && (
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {postContent}
          </p>
        )}
        <Image
          src={imageUrl}
          alt="Post image"
          width={500}
          height={300}
          className="rounded-md object-cover w-full"
        />
      </CardContent>
    </Card>
  )
}