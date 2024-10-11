'use client'

import { NewPost } from "@/components/pages-new-post"
import { useRouter } from 'next/navigation'

export default function NewPostPage() {
  const router = useRouter()

  const createPost = async (content: string, url: string, photos: File[]) => {
    try {
      const response = await fetch("http://localhost/api/v1/posts/new", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: "New Post",
          content: content,
          // TODO: url: url,
          // TODO: Handle photo uploads
        }),
      });
      const data = await response.json();
      console.log("New post created:", data);

      // After posting, navigate back to the feed
      router.push('/feed')

      return data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };

  const handlePost = async (content: string, url: string, photos: File[]) => {
    console.log('New post:', { content, url, photos });

    try {
      await createPost(content, url, photos);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const handleClose = () => {
    router.push('/feed')
  }

  // Placeholder functions for other actions
  const handleLinkClick = () => {
    console.log('Link clicked')
  }

  const handleImageUpload = (file: File) => {
    console.log('Image uploaded:', file)
  }

  const handleVideoUpload = (file: File) => {
    console.log('Video uploaded:', file)
  }

  const handlePollClick = () => {
    console.log('Poll clicked')
  }

  return (
    <NewPost
      onPost={handlePost}
      onClose={handleClose}
      onLinkClick={handleLinkClick}
      onImageUpload={handleImageUpload}
      onVideoUpload={handleVideoUpload}
      onPollClick={handlePollClick}
    />
  )
}