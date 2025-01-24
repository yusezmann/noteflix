"use client"

import { useState } from "react"
import YouTube from "react-youtube"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface VideoPlayerProps {
  videoKey: string
}

export function VideoPlayer({ videoKey }: VideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
    },
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-white text-black hover:bg-gray-200">
          <Play className="w-5 h-5 mr-2" /> Play
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0 bg-black border-gray-800 overflow-hidden">
        <div className="relative w-full pt-[56.25%]">
          <YouTube
            videoId={videoKey}
            opts={opts}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
