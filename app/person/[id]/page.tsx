"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useCastProfile } from "@/hooks/use-movies"
import MovieCard from "@/components/movie-card"
import { BeatLoader } from "react-spinners"
import { MovieRow } from "@/components/movie-row"

export default function CastProfilePage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const personId = Number.parseInt(params.id, 10)
  const [showFullBio, setShowFullBio] = useState(false)

  const { data: castProfile, isLoading, error } = useCastProfile(personId)

  const handleBackClick = () => {
    router.back()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <BeatLoader color="#e85f4c" size={25} />
        </div>
      </div>
    )
  }

  if (error || !castProfile) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <p className="text-white">Error loading cast profile</p>
        </div>
      </div>
    )
  }

  const {
    name,
    profile_path,
    biography = "Biography not available.",
    birthday,
    place_of_birth,
    known_for_department,
    credits = [],
  } = castProfile

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-grow pt-20 px-4 md:px-16">
        <div className="flex items-center justify-between mb-8 mt-6">
          <Button
            variant="outline"
            size="icon"
            className="text-white hover:bg-white hover:text-primary rounded-full"
            onClick={handleBackClick}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </div>
        {/* Image and Biography */}
        <div className="flex flex-col xl:grid xl:grid-cols-2 gap-8  mb-12">
          <div className="block xl:hidden">
            <h1 className=" text-white text-3xl md:text-4xl font-bold">
              {name}
            </h1>
          </div>
          <Image
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w300${profile_path}`
                : "/placeholder.svg"
            }
            alt={name}
            width={300}
            height={450}
            className="rounded-lg w-[490px] h-[560px]  object-cover mb-4 xl:mb-0 xl:mr-8"
          />
          <div className="text-white space-y-8">
            <div className="hidden xl:block">
              <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Biography</h2>
              <p>
                {showFullBio ? biography : `${biography.slice(0, 300)}...`}
                {biography.length > 300 && (
                  <Button
                    variant="link"
                    onClick={() => setShowFullBio(!showFullBio)}
                    className="text-blue-400 hover:text-blue-300 ml-2"
                  >
                    {showFullBio ? "Show Less" : "Read More"}
                  </Button>
                )}
              </p>
            </div>
            {/* Filmography */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Filmography
              </h2>
              <MovieRow title="" items={credits} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
