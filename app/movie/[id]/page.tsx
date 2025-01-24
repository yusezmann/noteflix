"use client"

import { Navbar } from "@/components/navbar"
import { MovieDetail } from "@/components/movie-detail"

export default function MovieDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const movieId = Number.parseInt(params.id, 10)

  return (
    <div className="relative min-h-screen bg-black">
      <Navbar />
      <MovieDetail id={movieId} mediaType="movie" />
    </div>
  )
}
