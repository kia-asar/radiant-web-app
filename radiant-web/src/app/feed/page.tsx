'use client'

import { Home } from "@/components/pages-home"
import { useRouter } from 'next/navigation'

export default function FeedPage() {
  const router = useRouter()

  const handleNewPost = () => {
    router.push('/new-post')
  }

  const handleLogout = () => {
    router.push('/login')
  }

  return (
    <div className="bg-gradient-default min-h-screen">
      <Home onNewPost={handleNewPost} onLogout={handleLogout} />
    </div>
  )
}