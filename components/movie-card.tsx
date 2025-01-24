import { MediaItem } from "@/services/tmdb-service"
import Image from "next/image"
import Link from "next/link"
import { FaStar } from "react-icons/fa"

interface MovieCardProps {
  title: string
  items: MediaItem[]
}

export default function MovieCard({ title, items }: MovieCardProps) {
  return (
    <div className="space-y-4 py-4">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => {
          const {
            id,
            title: movieTitle,
            poster_path: posterPath,
            vote_average: voteAverage,
          } = item

          const ratingStar = Math.round((item.vote_average / 10) * 5) // Mengubah vote_average menjadi rating 1-5

          // URL placeholder jika poster_path tidak tersedia
          const imageUrl = posterPath
            ? `https://image.tmdb.org/t/p/w500${posterPath}`
            : "/placeholder-image.jpg"

          return (
            <Link key={id} href={`/${item.media_type}/${item.id}`}>
              <div className="relative aspect-[2/3] overflow-hidden rounded-md group">
                <Image
                  src={imageUrl}
                  alt={movieTitle || "No Title"}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="text-white text-center px-2 text-2xl font-medium">
                      {movieTitle || "No Title"}
                    </h3>
                    <div className="flex justify-center items-center gap-1 text-yellow-300 shadow-sm mb-[3px] ml-1 mr-2 mt-2">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={
                            index < ratingStar
                              ? "text-yellow-300"
                              : "text-gray-100"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
