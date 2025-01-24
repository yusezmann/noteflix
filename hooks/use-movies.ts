import { useQuery } from "@tanstack/react-query"
import {
  fetchTrending,
  fetchNetflixOriginals,
  fetchTopRated,
  fetchMediaDetails,
  fetchMediaVideos,
  searchMedia,
  type MediaItem,
  type MovieDetail,
  type TvShowDetail,
  type MediaVideos,
  type SearchResults,
  CastResponse,
  fetchMediaCast,
  fetchMoviesByGenre,
  CastProfile,
  fetchCastProfile,
} from "@/services/tmdb-service"

export function useTrendingMedia() {
  return useQuery<MediaItem[], Error>({
    queryKey: ["trending"],
    queryFn: fetchTrending,
  })
}

export function useNetflixOriginals() {
  return useQuery<MediaItem[], Error>({
    queryKey: ["netflix-originals"],
    queryFn: fetchNetflixOriginals,
  })
}

export function useTopRatedMovies() {
  return useQuery<MediaItem[], Error>({
    queryKey: ["top-rated"],
    queryFn: fetchTopRated,
  })
}

export function useMediaDetails(id: number, mediaType: "movie" | "tv") {
  return useQuery<MovieDetail | TvShowDetail, Error>({
    queryKey: ["media", id, mediaType],
    queryFn: () => fetchMediaDetails(id, mediaType),
  })
}

export function useMediaVideos(id: number, mediaType: "movie" | "tv") {
  return useQuery<MediaVideos, Error>({
    queryKey: ["media-videos", id, mediaType],
    queryFn: () => fetchMediaVideos(id, mediaType),
  })
}

export function useSearchMedia(query: string, page: number) {
  return useQuery<SearchResults, Error>({
    queryKey: ["search", query, page],
    queryFn: () => searchMedia(query, page),
    enabled: !!query,
  })
}

export function useMediaCast(id: number, mediaType: "movie" | "tv") {
  return useQuery<CastResponse, Error>({
    queryKey: ["media-cast", id, mediaType],
    queryFn: () => fetchMediaCast(id, mediaType),
  })
}

export function useMoviesByGenre(genreId: number, page: number) {
  return useQuery<SearchResults, Error>({
    queryKey: ["movies-by-genre", genreId, page],
    queryFn: () => fetchMoviesByGenre(genreId, page),
  })
}

export function useCastProfile(personId: number) {
  return useQuery<CastProfile, Error>({
    queryKey: ["cast-profile", personId],
    queryFn: () => fetchCastProfile(personId),
  })
}
