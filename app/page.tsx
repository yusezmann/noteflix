"use client"

import {
  useNetflixOriginals,
  useTopRatedMovies,
  useTrendingMedia,
} from "@/hooks/use-movies"
import { Navbar } from "@/components/navbar"
import { HeroBanner } from "@/components/hero-banner"
import { MovieRow } from "@/components/movie-row"

export default function Home() {
  const { data: trending = [] } = useTrendingMedia()
  const { data: netflixOriginals = [] } = useNetflixOriginals()
  const { data: topRated = [] } = useTopRatedMovies()

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900/80 to-[#010511] ">
      <Navbar />
      {trending[0] && <HeroBanner media={trending[0]} />}
      <div className="relative pb-24 space-y-8">
        <MovieRow title="Trending Now" items={trending} />
        <MovieRow title="Netflix Originals" items={netflixOriginals} />
        <MovieRow title="Top Rated" items={topRated} />
      </div>
    </div>
  )
}
