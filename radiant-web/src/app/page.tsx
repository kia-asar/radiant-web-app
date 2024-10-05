import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-yuja-gradient">
      <h1 className="text-4xl font-bold mb-8 text-white">Welcome to Yuja</h1>
      <p className="text-xl mb-8 text-white">Your ultimate review platform</p>
      <Link href="/login">
        <Button size="lg">
          Login / Sign Up
        </Button>
      </Link>
    </main>
  )
}
