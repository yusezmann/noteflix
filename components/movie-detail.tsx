"use client"

import Image from "next/image"
import {
  useMediaDetails,
  useMediaVideos,
  useMediaCast,
} from "@/hooks/use-movies"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Plus, ThumbsUp } from "lucide-react"
import { VideoPlayer } from "@/components/video-player"
import Link from "next/link"
import { IoArrowBackCircleOutline } from "react-icons/io5"
import { FaStar } from "react-icons/fa"
import { useRouter } from "next/navigation"
import { MyListItem, useMyListStore } from "@/store/use-my-list-store"

interface MovieDetailProps {
  id: number
  mediaType: "movie" | "tv"
}

export function MovieDetail({ id, mediaType }: MovieDetailProps) {
  const router = useRouter()

  const {
    data: media,
    isLoading: isLoadingMedia,
    error: mediaError,
  } = useMediaDetails(id, mediaType)
  const {
    data: videos,
    isLoading: isLoadingVideos,
    error: videosError,
  } = useMediaVideos(id, mediaType)
  const {
    data: castData,
    isLoading: isLoadingCast,
    error: castError,
  } = useMediaCast(id, mediaType)

  const { addToMyList, removeFromMyList, isInMyList } = useMyListStore()

  const ratingStar =
    media?.vote_average !== undefined
      ? Math.round((media.vote_average / 10) * 5)
      : 0

  const handleBackClick = () => {
    router.back()
  }

  const handleMyListClick = () => {
    if (media) {
      const item: MyListItem = {
        id: media.id,
        title: media.title,
        posterPath: media.poster_path,
        rating: media.vote_average,
        mediaType: mediaType,
      }

      if (isInMyList(media.id)) {
        removeFromMyList(media.id)
      } else {
        addToMyList(item)
      }
    }
  }

  // Early return for loading/error states
  if (isLoadingMedia || isLoadingVideos || isLoadingCast)
    return <div className="text-white">Loading...</div>
  if (mediaError || videosError || castError)
    return <div className="text-white">Error loading media details</div>
  if (!media) return <div className="text-white">Media not found</div>

  const trailer = videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  )

  return (
    <div className="relative min-h-[150vh] xl:min-h-screen">
      <Image
        src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`}
        alt={media.title || ""}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 flex flex-col xl:flex-row items-center">
        <div className="p-4 pt-[80px] mt-8 md:p-8 lg:p-16 space-y-4 md:space-y-6 max-w-3xl">
          <Button
            variant="outline"
            size="icon"
            className="text-white hover:bg-white hover:text-primary rounded-full"
            onClick={handleBackClick}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white">
            {media.title}
          </h1>
          <p className="text-lg text-white">{media.tagline}</p>
          <div className="flex flex-wrap gap-4">
            {trailer?.key && <VideoPlayer videoKey={trailer.key} />}
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/20 hover:text-white"
              onClick={handleMyListClick}
            >
              {isInMyList(media.id) ? (
                <>
                  <Check className="w-5 h-5 mr-2" /> In My watchlist
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" /> My watchlist
                </>
              )}
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="text-white border-white hover:bg-white/20 hover:text-white"
            >
              <ThumbsUp className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-white text-sm md:text-base lg:text-lg">
            {media.overview}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <p>Release Date: {media.release_date}</p>
            {mediaType === "movie" && "runtime" in media && (
              <p>Runtime: {media.runtime} minutes</p>
            )}
            {mediaType === "tv" && "number_of_seasons" in media && (
              <p>Seasons: {media.number_of_seasons}</p>
            )}
            <div className="flex">
              <span>Rating:</span>
              <div className="flex justify-center items-center gap-1 text-yellow-300 mb-[3px] ml-1 mr-2">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={
                      index < ratingStar ? "text-yellow-300" : "text-gray-500"
                    }
                  />
                ))}
              </div>
              {media.vote_average.toFixed(1)}/10
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {media.genres.map((genre) => (
              <Link
                key={genre.id}
                href={`/genre/${genre.id}?name=${encodeURIComponent(
                  genre.name,
                )}`}
              >
                <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs md:text-sm cursor-pointer hover:bg-gray-700 transition-colors">
                  {genre.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="p-4 md:p-8 lg:p-16 space-y-4 md:space-y-6 max-w-3xl max-h-[120vh]">
          {castData && castData.cast.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-4">Cast</h2>
              <div className="grid grid-cols-3 xl:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {castData.cast.map((member) => (
                  <Link key={member.id} href={`/person/${member.id}`}>
                    <div className="flex flex-col items-center text-center group cursor-pointer">
                      <Image
                        src={
                          member.profile_path
                            ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                            : "/placeholder.svg"
                        }
                        alt={member.name}
                        width={100}
                        height={100}
                        className="rounded-full object-cover w-20 h-20 mb-2 group-hover:opacity-80 transition-opacity"
                      />
                      <p className="text-white font-semibold text-sm group-hover:text-blue-400 transition-colors">
                        {member.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {member.character}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
