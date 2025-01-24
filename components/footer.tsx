"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#010511] text-gray-600 py-8 border-t border-gray-600 px-4">
      <div className="flex items-center justify-between text-center px-4 xl:px-12">
        <p className="text-sm flex flex-col xl:flex-row items-center justify-center">
          <Link href="/" className="text-red-600 text-2xl font-bold mr-2">
            NOTEFLIX
          </Link>
          <p className="flex flex-row">
            <span>©</span>&nbsp;<span>{new Date().getFullYear()}</span>
            <span className="ml-2">All rights reserved.</span>
          </p>
        </p>
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Facebook size={24} />
            <span className="sr-only">Facebook</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Twitter size={24} />
            <span className="sr-only">Twitter</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Instagram size={24} />
            <span className="sr-only">Instagram</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Linkedin size={24} />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
