import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface MyListItem {
  id: number
  title: string
  posterPath: string
  rating: number
  mediaType: "movie" | "tv"
}

interface MyListStore {
  myList: MyListItem[]
  addToMyList: (item: MyListItem) => void
  removeFromMyList: (id: number) => void
  isInMyList: (id: number) => boolean
}

export const useMyListStore = create<MyListStore>()(
  persist(
    (set, get) => ({
      myList: [],
      addToMyList: (item) =>
        set((state) => ({
          myList: [...state.myList, item],
        })),
      removeFromMyList: (id) =>
        set((state) => ({
          myList: state.myList.filter((item) => item.id !== id),
        })),
      isInMyList: (id) => get().myList.some((item) => item.id === id),
    }),
    {
      name: "my-list-storage",
    },
  ),
)
