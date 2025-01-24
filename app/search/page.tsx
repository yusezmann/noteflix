"use client"

import { Suspense } from "react"
import { BeatLoader } from "react-spinners"
import SearchContent from "@/components/search-content"

// Komponen ini hanya menangani tampilan jika loading atau ada kesalahan
export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[50vh]">
          <BeatLoader color="#e85f4c" size="25px" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  )
}
