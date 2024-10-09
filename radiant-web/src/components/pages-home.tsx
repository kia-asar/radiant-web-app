'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { PlusCircle, ArrowUp, ArrowDown, MessageSquare, Share2 } from 'lucide-react'

interface HomePageProps {
  onNewPost: () => void;
}

export function Home({ onNewPost }: HomePageProps) {
  return (
    <div className="bg-yuja-gradient min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="p-4 pb-2">
          <h1 className="text-4xl font-bold text-center mb-4 text-black">Welcome to Yuja</h1>
          
          <div className="mb-2">
            <Button onClick={onNewPost} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </div>
        </div>
        
        <Feed />
      </div>
    </div>
  )
}

const FeedPost = ({ 
  userName, 
  userImage, 
  content, 
  images, 
  voteCount, 
  commentCount,
  onUpvote,
  onDownvote,
  onComment,
  onShare
}) => {
  return (
    <div className="backdrop-blur-md bg-white bg-opacity-80 border border-white border-opacity-30 shadow-lg mb-4">
      <div className="p-4">
        <div className="flex items-center mb-2">
          <img src={userImage} alt={userName} className="w-10 h-10 rounded-full mr-2" />
          <h3 className="font-semibold text-gray-800">{userName}</h3>
        </div>
        <p className="mb-2 text-gray-800">{content}</p>
        {images.length > 0 && (
          <div className="flex flex-wrap -mx-1">
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Post image ${index + 1}`} className="w-24 h-24 object-cover m-1 rounded" />
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-9" onClick={onUpvote}>
              <ArrowUp className="mr-1 h-4 w-4" />
              {voteCount <= 0 ? 'Vote' : voteCount}
            </Button>
            <Button variant="outline" size="sm" className="h-9 w-9 p-0" onClick={onDownvote}>
              <ArrowDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-9" onClick={onComment}>
              <MessageSquare className="mr-1 h-4 w-4" />
              {commentCount}
            </Button>
          </div>
          <Button variant="outline" size="sm" className="h-9" onClick={onShare}>
            <Share2 className="mr-1 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </div>
  )
}

function Feed() {
  const feedData = [
    {
      userName: "John Doe",
      userImage: "/placeholder.svg?height=40&width=40",
      content: "Just had an amazing day at the beach! 🏖️",
      images: [
        "/placeholder.svg?height=200&width=200",
        "/placeholder.svg?height=200&width=200",
        "/placeholder.svg?height=200&width=200",
      ],
      voteCount: 15,
      commentCount: 5,
    },
    {
      userName: "Jane Smith",
      userImage: "/placeholder.svg?height=40&width=40",
      content: "Check out my new artwork! 🎨",
      images: [
        "/placeholder.svg?height=200&width=200",
        "/placeholder.svg?height=200&width=200",
      ],
      voteCount: 0,
      commentCount: 3,
    },
    {
      userName: "Bob Johnson",
      userImage: "/placeholder.svg?height=40&width=40",
      content: "Just finished reading an amazing book. Highly recommend!",
      images: [],
      voteCount: -2,
      commentCount: 7,
    },
  ]

  const handleUpvote = (index) => {
    console.log(`Upvoted post ${index}`)
    // Add your upvote logic here
  }

  const handleDownvote = (index) => {
    console.log(`Downvoted post ${index}`)
    // Add your downvote logic here
  }

  const handleComment = (index) => {
    console.log(`Commented on post ${index}`)
    // Add your comment logic here
  }

  const handleShare = (index) => {
    console.log(`Shared post ${index}`)
    // Add your share logic here
  }

  return (
    <div>
      {feedData.map((post, index) => (
        <FeedPost 
          key={index} 
          userName={post.userName}
          userImage={post.userImage}
          content={post.content}
          images={post.images}
          voteCount={post.voteCount}
          commentCount={post.commentCount}
          onUpvote={() => handleUpvote(index)}
          onDownvote={() => handleDownvote(index)}
          onComment={() => handleComment(index)}
          onShare={() => handleShare(index)}
        />
      ))}
    </div>
  )
}