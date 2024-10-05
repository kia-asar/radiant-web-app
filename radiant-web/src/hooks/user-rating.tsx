"use client"

import { useState } from "react"

interface UserRatingProps {
  initialRating?: number
  onRatingChange: (rating: number) => void
  editable?: boolean
}

function RoundedStar({ 
  index, 
  rating, 
  hoveredRating, 
  onMouseEnter, 
  onMouseLeave, 
  onClick,
  editable
}: {
  index: number
  rating: number
  hoveredRating: number
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
  editable: boolean
}) {
  const filled = editable ? (hoveredRating ? index <= hoveredRating : index <= rating) : index <= rating

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-6 h-6 ${editable ? "cursor-pointer" : "cursor-default"} transition-colors duration-150 ${
        filled ? "text-yellow-400" : "text-gray-300"
      }`}
      onMouseEnter={editable ? onMouseEnter : undefined}
      onMouseLeave={editable ? onMouseLeave : undefined}
      onClick={editable ? onClick : undefined}
    >
      <path d="M12 2.5l2.84 5.75 6.34.92-4.59 4.47 1.08 6.31L12 17.25l-5.67 2.7 1.08-6.31L2.82 9.17l6.34-.92z" />
    </svg>
  )
}

export default function Component({ initialRating = 0, onRatingChange, editable = true }: UserRatingProps) {
  const [rating, setRating] = useState(initialRating)
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleClick = (selectedRating: number) => {
    if (editable) {
      setRating(selectedRating)
      onRatingChange(selectedRating)
    }
  }

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <RoundedStar
          key={star}
          index={star}
          rating={rating}
          hoveredRating={hoveredRating}
          onMouseEnter={() => setHoveredRating(star)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => handleClick(star)}
          editable={editable}
        />
      ))}
    </div>
  )
}