"use client"

import { Navbar } from "@/components/navbar"
import { MovieDetail } from "@/components/movie-detail"

export default function MediaDetailPage({
  params,
}: {
  params: { id: string; mediaType: string }
}) {
  const mediaId = Number.parseInt(params.id, 10)
  const mediaType = params.mediaType as "movie" | "tv"

  return (
    <div className="relative min-h-screen bg-black">
      <Navbar />
      <MovieDetail id={mediaId} mediaType={mediaType} />
    </div>
  )
}
