'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { PlusCircle, ArrowUp, ArrowDown, MessageSquare, Share2, LogOut } from 'lucide-react'

interface HomePageProps {
  onNewPost: () => void;
  onLogout: () => void; // Add this line
}

export function Home({ onNewPost, onLogout }: HomePageProps) { // Update this line
  return (
    <div className="bg-yuja-gradient min-h-screen">
      <div className="max-w-3xl mx-auto relative">
        <div className="p-4 pb-2">
          <div className="flex justify-end mb-2"> {/* New row for logout button */}
            <Button
              variant="default"
              size="icon"
              onClick={onLogout}
              className="bg-black hover:bg-gray-800"
            >
              <LogOut className="h-5 w-5 text-white" />
            </Button>
          </div>
          <div className="text-center mb-4"> {/* Centered title */}
            <h1 className="text-4xl font-bold text-black">Welcome to Yuja</h1>
          </div>
          
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

// Update the FeedPost component props to match the API response
interface FeedPostProps {
  id: number;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  userName: string;
  userImage: string;
  images: string[];
  voteCount: number;
  commentCount: number;
  onUpvote: () => void;
  onDownvote: () => void;
  onComment: () => void;
  onShare: () => void;
}

const FeedPost: React.FC<FeedPostProps> = ({ 
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

// Update the Feed component
function Feed() {
  const [posts, setPosts] = useState<FeedPostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost/api/v1/posts/all', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (!data.posts || !Array.isArray(data.posts)) {
        throw new Error('API response does not contain an array of posts');
      }

      // Map the API response to our FeedPostProps format
      const mappedPosts: FeedPostProps[] = data.posts.map((post: any) => ({
        id: post.id,
        userId: post.user_id,
        title: post.title,
        content: post.content,
        createdAt: post.created_at,
        userName: post.user_id ? `User ${post.user_id.slice(-4)}` : 'Anonymous', // We don't have this in the API response
        userImage: '/placeholder.svg?height=40&width=40', // We don't have this in the API response
        images: [], // We don't have this in the API response
        voteCount: 0, // We don't have this in the API response
        commentCount: 0, // We don't have this in the API response
        onUpvote: () => handleUpvote(post.id),
        onDownvote: () => handleDownvote(post.id),
        onComment: () => handleComment(post.id),
        onShare: () => handleShare(post.id),
      }));
      setPosts(mappedPosts);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to fetch posts. Please try again later.');
      setLoading(false);
    }
  };

  const handleUpvote = (id: number) => {
    console.log(`Upvoted post ${id}`);
    // Add your upvote logic here
  }

  const handleDownvote = (id: number) => {
    console.log(`Downvoted post ${id}`);
    // Add your downvote logic here
  }

  const handleComment = (id: number) => {
    console.log(`Commented on post ${id}`);
    // Add your comment logic here
  }

  const handleShare = (id: number) => {
    console.log(`Shared post ${id}`);
    // Add your share logic here
  }

  if (loading) {
    return <div className="text-center py-4">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <FeedPost 
          key={post.id}
          {...post}
        />
      ))}
    </div>
  )
}