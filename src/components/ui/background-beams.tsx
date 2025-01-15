'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  fadeSpeed: number
}

export default function BackgroundStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const stars: Star[] = []

    const createStar = () => {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const star: Star = {
        x,
        y,
        size: Math.random() * 2 + 1, // Size between 1 and 3
        opacity: Math.random(),
        fadeSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1), // Fade in or out
      }
      stars.push(star)
    }

    const animateStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = gradient
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        star.opacity += star.fadeSpeed

        if (star.opacity > 1 || star.opacity < 0) {
          star.fadeSpeed = -star.fadeSpeed // Reverse fade direction
        }
      })

      if (stars.length < 100 && Math.random() < 0.1) createStar() // Maintain about 100 stars

      animationFrameId = requestAnimationFrame(animateStars)
    }

    const handleResize = () => {
      setCanvasSize()
      stars.length = 0 // Clear existing stars
      for (let i = 0; i < 50; i++) {
        createStar()
      }
    }

    setCanvasSize()
    window.addEventListener('resize', handleResize)

    // Create initial set of stars
    for (let i = 0; i < 50; i++) {
      createStar()
    }

    animateStars()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 background">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        aria-hidden="true"
      />
    </div>
  )
}

