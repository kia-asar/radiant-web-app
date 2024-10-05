import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowBigDown, ArrowBigUp, MessageSquare, Search } from "lucide-react"
import Link from "next/link"

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="#" className="text-red-500 text-2xl font-bold shrink-0">
            reddit
          </Link>
          <div className="flex-grow mx-4 relative">
            <Input
              className="w-full pl-8 rounded-full"
              placeholder="Search Reddit"
              type="search"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button className="shrink-0">Log In</Button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {[1, 2, 3].map((post) => (
              <div 
                key={post} 
                className="bg-white rounded-lg shadow mb-6 p-4 hover:bg-gray-50 transition-colors duration-200 ease-in-out"
              >
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <Button variant="ghost" size="icon">
                      <ArrowBigUp className="h-6 w-6" />
                    </Button>
                    <span className="text-sm font-bold">42</span>
                    <Button variant="ghost" size="icon">
                      <ArrowBigDown className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">
                      This is a sample post title
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>Posted by u/username</span>
                      <span className="mx-2">•</span>
                      <span>5 hours ago</span>
                      <span className="mx-2">•</span>
                      <Link href="#" className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        24 comments
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">About Community</h2>
              <p className="text-sm text-gray-600 mb-4">
                Welcome to r/SampleCommunity, a place to discuss all things
                related to our topic of interest.
              </p>
              <div className="flex justify-between text-sm mb-4">
                <div>
                  <div className="font-bold">123k</div>
                  <div className="text-gray-500">Members</div>
                </div>
                <div>
                  <div className="font-bold">1.2k</div>
                  <div className="text-gray-500">Online</div>
                </div>
              </div>
              <Button className="w-full">Join</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}