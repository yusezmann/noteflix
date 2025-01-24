"use client"

import Image from "next/image"
import Link from "next/link"
import type { MediaItem } from "@/services/tmdb-service"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface MovieRowProps {
  title: string
  items: MediaItem[]
}

export function MovieRow({ title, items }: MovieRowProps) {
  return (
    <div className="space-y-4 py-4">
      <h2 className="text-2xl font-semibold text-white pl-4 md:pl-16">
        {title}
      </h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <Link href={`/${item.media_type}/${item.id}`}>
                <div className="relative aspect-[2/3] overflow-hidden rounded-md">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title || ""}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex left-4 bg-black/50 text-white hover:bg-white hover:text-black/50" />
        <CarouselNext className="hidden md:flex right-4 bg-black/50 text-white hover:bg-white hover:text-black/50" />
      </Carousel>
    </div>
  )
}
