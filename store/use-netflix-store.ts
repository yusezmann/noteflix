import { create } from "zustand"
import { persist } from "zustand/middleware"

interface WatchlistItem {
  id: number
  title: string
  posterPath: string
  mediaType: "movie" | "tv"
}

interface NetflixStore {
  watchlist: WatchlistItem[]
  addToWatchlist: (item: WatchlistItem) => void
  removeFromWatchlist: (id: number) => void
  isInWatchlist: (id: number) => boolean
}

export const useNetflixStore = create<NetflixStore>()(
  persist(
    (set, get) => ({
      watchlist: [],
      addToWatchlist: (item) =>
        set((state) => ({
          watchlist: [...state.watchlist, item],
        })),
      removeFromWatchlist: (id) =>
        set((state) => ({
          watchlist: state.watchlist.filter((item) => item.id !== id),
        })),
      isInWatchlist: (id) => get().watchlist.some((item) => item.id === id),
    }),
    {
      name: "netflix-storage",
    },
  ),
)

