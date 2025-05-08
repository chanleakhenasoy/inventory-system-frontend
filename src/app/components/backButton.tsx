"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      aria-label="Go back"
      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
    >
      <ArrowLeft className="h-5 w-5 text-[#2D579A] cursor-pointer"strokeWidth={3}/>

    </button>
  )
}