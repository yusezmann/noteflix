"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bell, Search, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SearchForm from "./search-form"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <div className="px-4 md:px-16 py-6 flex items-center justify-between">
        <div className="flex flex-col xl:flex-row items-center space-x-8">
          <Link href="/" className="text-red-600 text-2xl font-bold">
            NOTEFLIX
          </Link>
          <div className="mr-12 space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white">
                  Browse <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-black/90 border-gray-800">
                <DropdownMenuItem>
                  <Link
                    href="/"
                    className="text-white hover:text-[#e85f4c] w-full"
                  >
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/shows"
                    className="text-white hover:text-[#e85f4c] w-full"
                  >
                    TV Shows
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/movies"
                    className="text-white hover:text-[#e85f4c] w-full"
                  >
                    Movies
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/new"
                    className="text-white hover:text-[#e85f4c] w-full"
                  >
                    New & Popular
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/my-watchlist"
                    className="text-white hover:text-[#e85f4c] w-full"
                  >
                    My Watchlist
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex items-center space-x-2 xl:space-x-4">
          <SearchForm />
          <Button
            variant="ghost"
            size="icon"
            className="hidden xl:flex text-white  rounded-full hover:bg-slate-50 hover:text-accent-foreground"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden xl:flex text-white  rounded-full hover:bg-slate-50 hover:text-accent-foreground"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
