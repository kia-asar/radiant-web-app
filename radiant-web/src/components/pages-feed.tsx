'use client'

import React from 'react'

// Define the FeedPost component
const FeedPost = ({ userName, userImage, content, images }) => {
  return (
    <div className="bg-white p-4 mb-4 border-b-4 border-gray-300">
      <div className="flex items-center mb-2">
        <img src={userImage} alt={userName} className="w-10 h-10 rounded-full mr-2" />
        <h3 className="font-semibold">{userName}</h3>
      </div>
      <p className="mb-2">{content}</p>
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Post image ${index + 1}`} className="w-24 h-24 object-cover" />
          ))}
        </div>
      )}
    </div>
  )
}

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
  },
  {
    userName: "Jane Smith",
    userImage: "/placeholder.svg?height=40&width=40",
    content: "Check out my new artwork! 🎨",
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
  },
  {
    userName: "Bob Johnson",
    userImage: "/placeholder.svg?height=40&width=40",
    content: "Just finished reading an amazing book. Highly recommend!",
    images: [],
  },
]

export function FeedComponent() {
  return (
    <div className="bg-yuja-gradient min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        {feedData.map((post, index) => (
          <FeedPost 
            key={index} 
            userName={post.userName}
            userImage={post.userImage}
            content={post.content}
            images={post.images}
          />
        ))}
      </div>
    </div>
  )
}