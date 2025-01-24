"use client"

import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import MovieCard from "@/components/movie-card"
import { useMyListStore } from "@/store/use-my-list-store"
import type { MediaItem } from "@/services/tmdb-service"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function MyListPage() {
  const { myList } = useMyListStore()
  const router = useRouter()

  const handleBackClick = () => {
    router.back()
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const myListAsMediaItems: MediaItem[] = myList.map((item) => ({
    id: item.id,
    title: item.title,
    overview: "", // We don't have this in MyListItem, so we're using an empty string
    poster_path: item.posterPath,
    backdrop_path: "", // We don't have this in MyListItem, so we're using an empty string
    vote_average: item.rating, // We don't have this in MyListItem, so we're using a default value
    release_date: "", // We don't have this in MyListItem, so we're using an empty string
    media_type: item.mediaType,
  }))

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow pt-20 px-4 md:px-16">
        <Button
          variant="outline"
          size="icon"
          className="text-white hover:bg-white hover:text-primary rounded-full mt-6 mb-6"
          onClick={handleBackClick}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          My Watchlist
        </h1>
        {myListAsMediaItems.length > 0 ? (
          <MovieCard title="" items={myListAsMediaItems} />
        ) : (
          <p className="text-white text-center py-10">
            Your list is empty. Add some movies or TV shows!
          </p>
        )}
      </main>
    </div>
  )
}
