"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useMoviesByGenre } from "@/hooks/use-movies"
import { Navbar } from "@/components/navbar"
import MovieCard from "@/components/movie-card"
import PaginationButton from "@/components/pagination-button"
import { BeatLoader } from "react-spinners"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GenrePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const genreName = searchParams.get("name") || "Genre"
  const [currentPage, setCurrentPage] = useState(1)
  const genreId = Number.parseInt(params.id, 10)

  const {
    data: movieResults,
    isLoading,
    error,
  } = useMoviesByGenre(genreId, currentPage)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleBackClick = () => {
    router.back()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <BeatLoader color="#e85f4c" size="25px" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <p className="text-white">Error: {error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow pt-20 px-4 md:px-16">
        <div className="flex flex-col mt-8 mb-8">
          <Button
            variant="outline"
            size="icon"
            className="text-white hover:bg-white hover:text-primary rounded-full mb-6"
            onClick={handleBackClick}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {genreName} Movies
          </h1>
        </div>
        {movieResults && movieResults.results.length > 0 ? (
          <>
            <MovieCard title="" items={movieResults.results} />
            <div className="py-8">
              <PaginationButton
                currentPage={currentPage}
                totalPages={movieResults.total_pages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <p className="text-white text-center py-10">
            No movies found for this genre.
          </p>
        )}
      </main>
    </div>
  )
}
