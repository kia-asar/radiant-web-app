'use client'

import { NewPost } from "@/components/pages-new-post"
import { useRouter } from 'next/navigation'

export default function NewPostPage() {
  const router = useRouter()

  const createPost = async (content: string, url: string, photos: File[]) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/v1/posts/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjU0MzIxL2F1dGgvdjEiLCJzdWIiOiI5OTllNzY1OC0xMjUyLTRhN2QtODRiOC0zYWI3OGMzYTViNzYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzI4NDM0MTQwLCJpYXQiOjE3Mjg0MzA1NDAsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6Ijk5OWU3NjU4LTEyNTItNGE3ZC04NGI4LTNhYjc4YzNhNWI3NiJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzI4MzcxOTY2fV0sInNlc3Npb25faWQiOiI3NGUwZDAzZC01NzA3LTQ4NTQtODVkNi04OWI2NDY2NDQ2MGEiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.o4d1P2JXf4JSycLjU0dYPUrRMGGVpmwqlLKRlQhx5Cs`,
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