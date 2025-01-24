// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Search } from "lucide-react"

// export default function SearchForm() {
//   const [query, setQuery] = useState("")
//   const [isSearchVisible, setSearchVisible] = useState(false)
//   const router = useRouter()

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (query.trim()) {
//       router.push(`/search?q=${encodeURIComponent(query)}`)
//     }
//     toggleSearch()
//     setQuery("")
//   }

//   const toggleSearch = () => {
//     setSearchVisible(!isSearchVisible)
//   }

//   return (
//     <div className="relative right-[260px]">
//       {/* Tombol atau Form Search */}
//       {!isSearchVisible ? (
//         <button
//           onClick={toggleSearch}
//           className="relative left-[260px] top-0 p-2 bg-accent text-white rounded-full hover:bg-slate-100 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
//           aria-label="Toggle Search"
//         >
//           <Search className="h-5 w-5" />
//         </button>
//       ) : (
//         <form
//           onSubmit={handleSubmit}
//           className="absolute top-[-18px] left-10 rounded-md flex items-center w-72 bg-transparent"
//         >
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search for movies..."
//             className="px-3 py-2 rounded-3xl border border-accent bg-transparent text-white/80 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-accent"
//           />
//           <button
//             type="submit"
//             className="relative right-[46px] top-[0.25px] ml-2 p-2 bg-accent text-white rounded-full hover:bg-slate-100 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
//           >
//             <Search className="h-5 w-5" />
//           </button>
//         </form>
//       )}
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

export default function SearchForm() {
  const [query, setQuery] = useState("")
  const [isSearchVisible, setSearchVisible] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}&page=1`)
    }
    toggleSearch()
    setQuery("")
  }

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible)
  }

  return (
    <div className="relative right-[260px]">
      {!isSearchVisible ? (
        <button
          onClick={toggleSearch}
          className="relative left-[260px] top-0 p-2 bg-accent text-white rounded-full hover:bg-slate-100 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Toggle Search"
        >
          <Search className="h-5 w-5" />
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="absolute top-[-18px] left-12 xl:left-10 rounded-md flex items-center w-72 bg-transparent"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="px-3 py-2 rounded-3xl border border-accent bg-transparent text-white/80 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            className="relative right-[46px] top-[0.25px] ml-2 p-2 bg-accent text-white rounded-full hover:bg-slate-100 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>
      )}
    </div>
  )
}
