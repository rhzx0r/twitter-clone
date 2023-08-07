// import { Inter } from 'next/font/google'
import Form from '@/components/Form'
import Header from '@/components/Header'
import PostFeed from '@/components/posts/PostFeed'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  )
}
