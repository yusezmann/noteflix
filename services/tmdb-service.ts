const API_KEY = "2863df70ca1fb0f7293bd661c05dbbd0" // Replace with your TMDB API key
const BASE_URL = "https://api.themoviedb.org/3"

export interface MediaItem {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  release_date: string
  media_type: "movie" | "tv"
}

export interface MovieDetail extends MediaItem {
  genres: { id: number; name: string }[]
  runtime: number
  tagline: string
  status: string
}

export interface TvShowDetail extends MediaItem {
  genres: { id: number; name: string }[]
  number_of_seasons: number
  tagline: string
  status: string
}

export interface MediaVideos {
  id: number
  results: {
    id: string
    key: string
    name: string
    site: string
    type: string
  }[]
}

export interface SearchResults {
  results: MediaItem[]
  page: number
  total_pages: number
  total_results: number
}

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
}

export interface CastResponse {
  id: number
  cast: CastMember[]
}

export interface CastProfile {
  id: number
  name: string
  profile_path: string | null
  biography: string
  birthday: string | null
  place_of_birth: string | null
  known_for_department: string
  credits: MediaItem[]
}

export async function fetchTrending(): Promise<MediaItem[]> {
  const response = await fetch(
    `${BASE_URL}/trending/all/week?api_key=${API_KEY}`,
  )
  const data = await response.json()
  return data.results.map((item: any) => ({
    ...item,
    title: item.title || item.name,
    release_date: item.release_date || item.first_air_date,
  }))
}

export async function fetchNetflixOriginals(): Promise<MediaItem[]> {
  const response = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
  )
  const data = await response.json()
  return data.results.map((item: any) => ({
    ...item,
    title: item.name,
    release_date: item.first_air_date,
    media_type: "tv",
  }))
}

export async function fetchTopRated(): Promise<MediaItem[]> {
  const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
  const data = await response.json()
  return data.results.map((item: any) => ({ ...item, media_type: "movie" }))
}

export async function fetchPopularTVShows(): Promise<MediaItem[]> {
  const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`)
  const data = await response.json()
  return data.results.map((item: any) => ({
    ...item,
    title: item.name,
    release_date: item.first_air_date,
    media_type: "tv",
  }))
}

export async function fetchTopRatedTVShows(): Promise<MediaItem[]> {
  const response = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`)
  const data = await response.json()
  return data.results.map((item: any) => ({
    ...item,
    title: item.name,
    release_date: item.first_air_date,
    media_type: "tv",
  }))
}

export async function fetchTrendingTVShows(): Promise<MediaItem[]> {
  const response = await fetch(
    `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`,
  )
  const data = await response.json()
  return data.results.map((item: any) => ({
    ...item,
    title: item.name,
    release_date: item.first_air_date,
    media_type: "tv",
  }))
}

export async function fetchMediaDetails(
  id: number,
  mediaType: "movie" | "tv",
): Promise<MovieDetail | TvShowDetail> {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`,
  )
  const data = await response.json()
  return {
    ...data,
    title: data.title || data.name,
    release_date: data.release_date || data.first_air_date,
    media_type: mediaType,
  }
}

export async function fetchMediaVideos(
  id: number,
  mediaType: "movie" | "tv",
): Promise<MediaVideos> {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/${id}/videos?api_key=${API_KEY}`,
  )
  const data = await response.json()
  return data
}

export async function searchMedia(
  query: string,
  page = 1,
): Promise<SearchResults> {
  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
        query,
      )}&page=${page}`,
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    // console.log("Raw search data:", data)

    if (!data.results || !Array.isArray(data.results)) {
      console.error("Unexpected data structure:", data)
      return { results: [], page: 1, total_pages: 0, total_results: 0 }
    }

    const results = data.results
      .filter(
        (item: any) =>
          (item.media_type === "movie" || item.media_type === "tv") &&
          (item.poster_path || item.backdrop_path),
      )
      .map((item: any) => ({
        id: item.id,
        title: item.title || item.name,
        overview: item.overview,
        poster_path: item.poster_path || item.backdrop_path,
        backdrop_path: item.backdrop_path || item.poster_path,
        vote_average: item.vote_average,
        release_date: item.release_date || item.first_air_date,
        media_type: item.media_type,
      }))

    return {
      results,
      page: data.page,
      total_pages: data.total_pages,
      total_results: data.total_results,
    }
  } catch (error) {
    console.error("Error in searchMedia:", error)
    throw error
  }
}

export async function fetchMediaCast(
  id: number,
  mediaType: "movie" | "tv",
): Promise<CastResponse> {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/${id}/credits?api_key=${API_KEY}`,
  )
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()
  return {
    id: data.id,
    cast: data.cast.slice(0, 10).map((member: any) => ({
      id: member.id,
      name: member.name,
      character: member.character,
      profile_path: member.profile_path,
    })),
  }
}

export async function fetchMoviesByGenre(
  genreId: number,
  page = 1,
): Promise<SearchResults> {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`,
  )
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()

  const results = data.results.map((item: any) => ({
    id: item.id,
    title: item.title,
    overview: item.overview,
    poster_path: item.poster_path,
    backdrop_path: item.backdrop_path,
    vote_average: item.vote_average,
    release_date: item.release_date,
    media_type: "movie",
  }))

  return {
    results,
    page: data.page,
    total_pages: data.total_pages,
    total_results: data.total_results,
  }
}

export async function fetchCastProfile(personId: number): Promise<CastProfile> {
  const [profileResponse, creditsResponse] = await Promise.all([
    fetch(`${BASE_URL}/person/${personId}?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/person/${personId}/combined_credits?api_key=${API_KEY}`),
  ])

  if (!profileResponse.ok || !creditsResponse.ok) {
    throw new Error(
      `HTTP error! status: ${profileResponse.status} ${creditsResponse.status}`,
    )
  }

  const profileData = await profileResponse.json()
  const creditsData = await creditsResponse.json()

  const credits = creditsData.cast
    .filter((item: any) => item.poster_path)
    .map((item: any) => ({
      id: item.id,
      title: item.title || item.name,
      overview: item.overview,
      poster_path: item.poster_path,
      backdrop_path: item.backdrop_path,
      vote_average: item.vote_average,
      release_date: item.release_date || item.first_air_date,
      media_type: item.media_type,
    }))
    .sort(
      (a: MediaItem, b: MediaItem) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime(),
    )
    .slice(0, 20) // Limit to top 20 credits

  return {
    id: profileData.id,
    name: profileData.name,
    profile_path: profileData.profile_path,
    biography: profileData.biography,
    birthday: profileData.birthday,
    place_of_birth: profileData.place_of_birth,
    known_for_department: profileData.known_for_department,
    credits,
  }
}
