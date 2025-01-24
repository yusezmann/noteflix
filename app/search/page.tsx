"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useSearchMedia } from "@/hooks/use-movies"
import { Navbar } from "@/components/navbar"
import MovieCard from "@/components/movie-card"
import PaginationButton from "@/components/pagination-button"
import { BeatLoader } from "react-spinners"
import Link from "next/link"
import { IoArrowBackCircleOutline } from "react-icons/io5"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  const pageParam = searchParams.get("page")
  const [currentPage, setCurrentPage] = useState(
    pageParam ? Number.parseInt(pageParam) : 1,
  )

  const {
    data: searchResults,
    isLoading,
    refetch,
  } = useSearchMedia(query, currentPage)

  useEffect(() => {
    if (query) {
      refetch()
    }
  }, [query, currentPage, refetch])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    router.push(`/search?q=${encodeURIComponent(query)}&page=${newPage}`)
  }

  const handleBackClick = () => {
    router.back()
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <div className="flex-grow pt-20 px-4 md:px-16">
        <div className="pt-2">
          <h1 className="text-2xl md:text-3xl text-white mb-4">
            Search Results for "{query}"
          </h1>
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="icon"
              className="text-white hover:bg-white hover:text-primary rounded-full"
              onClick={handleBackClick}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div className="flex text-white text-sm italic">
              <p className="ml-2">Page</p>
              <p className="ml-2">{currentPage}</p>
              <p className="ml-2">of</p>
              <p className="ml-2">{searchResults?.total_pages} </p>
              <p className="ml-2">results</p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <BeatLoader color="#e85f4c" size="25px" />
          </div>
        ) : searchResults && searchResults.results.length > 0 ? (
          <>
            <MovieCard title="" items={searchResults.results} />
            <div className="py-4 pb-4">
              <PaginationButton
                currentPage={currentPage}
                totalPages={searchResults.total_pages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <p className="text-white text-center py-10">
            No results found for "{query}"
          </p>
        )}
      </div>
    </div>
  )
}
