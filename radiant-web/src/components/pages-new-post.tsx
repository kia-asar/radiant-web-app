'use client'

import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Link, ImagePlus, FileVideo, List, X } from 'lucide-react'

interface NewPostPageProps {
  onPost: (content: string, url: string, photos: File[]) => void;
  onClose: () => void;
  onLinkClick: () => void;
  onImageUpload: (file: File) => void;
  onVideoUpload: (file: File) => void;
  onPollClick: () => void;
}

export function NewPost({
  onPost,
  onClose,
  onLinkClick,
  onImageUpload,
  onVideoUpload,
  onPollClick
}: NewPostPageProps) {
  const [content, setContent] = useState('')
  const [url, setUrl] = useState('')
  const [showUrlField, setShowUrlField] = useState(false)
  const [photos, setPhotos] = useState<File[]>([])
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  const handlePost = () => {
    onPost(content, url, photos)
    setContent('')
    setUrl('')
    setShowUrlField(false)
    setPhotos([])
  }

  const handleLinkClick = () => {
    setShowUrlField(!showUrlField)
    onLinkClick()
  }

  const handleImageClick = () => {
    imageInputRef.current?.click()
  }

  const handleVideoClick = () => {
    videoInputRef.current?.click()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newPhotos = Array.from(files)
      setPhotos(prev => [...prev, ...newPhotos])
      onImageUpload(files[0])
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onVideoUpload(file)
    }
  }

  return (
    <div className="bg-yuja-gradient min-h-screen flex flex-col p-4">
      <div className="flex justify-between mb-4">
        <Button onClick={onClose} variant="ghost" size="icon" className="h-10 w-10">
          <X className="h-4 w-4" />
        </Button>
        <Button onClick={handlePost} className="bg-black hover:bg-gray-800 text-white">
          Post
        </Button>
      </div>
      <div className="flex-grow flex flex-col">
        {showUrlField && (
          <Input
            type="url"
            placeholder="Enter URL"
            value={url}
            onChange={handleUrlChange}
            className="mb-2"
          />
        )}
        <Textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={handleContentChange}
          className="w-full flex-grow resize-none bg-transparent focus:outline-none"
        />
      </div>
      <div className="mt-4 flex justify-start space-x-2">
        <Button variant="ghost" size="icon" onClick={handleLinkClick}>
          <Link className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleImageClick}>
          <ImagePlus className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleVideoClick}>
          <FileVideo className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onPollClick}>
          <List className="h-4 w-4" />
        </Button>
      </div>
      <input
        type="file"
        ref={imageInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        multiple
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={videoInputRef}
        onChange={handleVideoUpload}
        accept="video/*"
        style={{ display: 'none' }}
      />
    </div>
  )
}