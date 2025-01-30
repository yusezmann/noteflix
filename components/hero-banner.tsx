"use client"

import Image from "next/image"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { MediaItem } from "@/services/tmdb-service"
import Link from "next/link"
import { VideoPlayer } from "@/components/video-player"
import { useMediaVideos } from "@/hooks/use-movies"
import { useState } from "react"

interface HeroBannerProps {
  media: MediaItem
}

export function HeroBanner({ media }: HeroBannerProps) {
  const { data: videos } = useMediaVideos(media.id, media.media_type)
  const trailer = videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  )
  const [showFullOverview, setShowFullOverview] = useState(false)

  return (
    <div className="relative h-[85vh] w-full">
      <Image
        src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`}
        alt={media.title || ""}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
      <div className="absolute bottom-0 left-0 p-4 md:p-8 lg:p-16 space-y-4 md:space-y-6 w-full md:w-2/3">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white">
          {media.title}
        </h1>
        <p className="text-white text-sm md:text-base lg:text-lg">
          {showFullOverview
            ? media.overview
            : `${media.overview.slice(0, 100)}...`}
          {media.overview.length > 100 && (
            <Button
              variant="link"
              onClick={() => setShowFullOverview(!showFullOverview)}
              className="text-blue-400 hover:text-blue-300 ml-2"
            >
              {showFullOverview ? "Show Less" : "Read More"}
            </Button>
          )}
        </p>
        <div className="flex flex-wrap gap-4">
          {trailer && <VideoPlayer videoKey={trailer.key} />}
          <Link href={`/${media.media_type}/${media.id}`}>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/20"
            >
              <Info className="w-5 h-5 mr-2" /> More Info
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
