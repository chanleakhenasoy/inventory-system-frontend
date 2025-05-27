"use client"

import { useEffect, useRef } from "react"

export default function PieChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 200
    canvas.height = 200

    const data = [
      { value: 25, color: "#3B82F6" }, 
      { value: 10, color: "#10B981" }, 
      { value: 25, color: "#F97316" }, 
      { value: 40, color: "#06B6D4" },
    ]

    const total = data.reduce((sum, item) => sum + item.value, 0)

    let startAngle = 0
    data.forEach((item) => {
      const sliceAngle = (2 * Math.PI * item.value) / total

      ctx.beginPath()
      ctx.moveTo(100, 100)
      ctx.arc(100, 100, 80, startAngle, startAngle + sliceAngle)
      ctx.closePath()

      ctx.fillStyle = item.color
      ctx.fill()

      const middleAngle = startAngle + sliceAngle / 2
      const textX = 100 + Math.cos(middleAngle) * 50
      const textY = 100 + Math.sin(middleAngle) * 50

      ctx.fillStyle = "#FFFFFF"
      ctx.font = "bold 14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(`${item.value}%`, textX, textY)

      startAngle += sliceAngle
    })
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
