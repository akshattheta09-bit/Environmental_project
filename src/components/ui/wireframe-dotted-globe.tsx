"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
}

export default function RotatingEarth({ width = 800, height = 600, className = "" }: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    // Set up responsive dimensions
    const containerWidth = Math.min(width, window.innerWidth - 40)
    const containerHeight = Math.min(height, window.innerHeight - 100)
    const radius = Math.min(containerWidth, containerHeight) / 2.5

    const dpr = window.devicePixelRatio || 1
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.scale(dpr, dpr)

    // Create projection and path generator for Canvas
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }

      return inside
    }

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry

      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates
        // Check if point is in outer ring
        if (!pointInPolygon(point, coordinates[0])) {
          return false
        }
        // Check if point is in any hole (inner rings)
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) {
            return false // Point is in a hole
          }
        }
        return true
      } else if (geometry.type === "MultiPolygon") {
        // Check each polygon in the MultiPolygon
        for (const polygon of geometry.coordinates) {
          // Check if point is in outer ring
          if (pointInPolygon(point, polygon[0])) {
            // Check if point is in any hole
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true
                break
              }
            }
            if (!inHole) {
              return true
            }
          }
        }
        return false
      }

      return false
    }

    const generateDotsInPolygon = (feature: any, dotSpacing = 16) => {
      const dots: [number, number][] = []
      const bounds = d3.geoBounds(feature)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds

      const stepSize = dotSpacing * 0.08
      let pointsGenerated = 0

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat]
          if (pointInFeature(point, feature)) {
            dots.push(point)
            pointsGenerated++
          }
        }
      }

      return dots
    }

    interface DotData {
      lng: number
      lat: number
      visible: boolean
    }

    const allDots: DotData[] = []
    const aiNodes: {lng: number, lat: number, size: number, hasRipple: boolean, offset: number}[] = []
    const aiLinks: {source: [number, number], target: [number, number], duration: number, offset: number}[] = []
    let landFeatures: any

    const render = () => {
      // Clear canvas
      context.clearRect(0, 0, containerWidth, containerHeight)

      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      // Draw Atmosphere Glow
      const atmoGradient = context.createRadialGradient(
        containerWidth / 2, containerHeight / 2, currentScale * 0.95,
        containerWidth / 2, containerHeight / 2, currentScale * 1.2
      )
      atmoGradient.addColorStop(0, "rgba(45, 212, 191, 0.4)") // inner bright cyan-teal
      atmoGradient.addColorStop(0.4, "rgba(45, 212, 191, 0.1)")
      atmoGradient.addColorStop(1, "rgba(45, 212, 191, 0)")

      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale * 1.2, 0, 2 * Math.PI)
      context.fillStyle = atmoGradient
      context.fill()

      // Draw ocean (globe background)
      const oceanGradient = context.createRadialGradient(
        containerWidth / 2, containerHeight / 2 - currentScale * 0.4, 0,
        containerWidth / 2, containerHeight / 2, currentScale
      )
      oceanGradient.addColorStop(0, "#083344") // cyan-950
      oceanGradient.addColorStop(1, "#020617") // slate-950
      
      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      context.fillStyle = oceanGradient
      context.fill()
      context.strokeStyle = "rgba(45, 212, 191, 0.6)" 
      context.lineWidth = 1.5 * scaleFactor
      context.stroke()

      const now = Date.now();
      const ringCount = 20; // Reduced from 50

      // Outer Tilted Orbit
      context.beginPath();
      for (let i = 0; i < ringCount; i++) {
          const t = ((now + i * (20000 / ringCount)) % 20000) / 20000;
          const angle = t * Math.PI * 2;
          const orbitScaleX = currentScale * 1.5;
          const orbitScaleY = currentScale * 0.4;
          // Apply tilt matrix manually
          const tilt = Math.PI / 8; // 22.5 deg tilt
          const cx = Math.cos(angle) * orbitScaleX;
          const cy = Math.sin(angle) * orbitScaleY;
          const rx = cx * Math.cos(tilt) - cy * Math.sin(tilt);
          const ry = cx * Math.sin(tilt) + cy * Math.cos(tilt);
          
          context.moveTo(containerWidth / 2 + rx, containerHeight / 2 + ry);
          context.arc(containerWidth / 2 + rx, containerHeight / 2 + ry, 1 * scaleFactor, 0, 2*Math.PI);
      }
      context.fillStyle = "rgba(45, 212, 191, 0.7)";
      context.fill();
      
      // Removed Inner Orbit for performance

      if (landFeatures) {
        // Draw graticule
        const graticule = d3.geoGraticule()
        context.beginPath()
        path(graticule())
        context.strokeStyle = "rgba(45, 212, 191, 0.15)"
        context.lineWidth = 0.5 * scaleFactor
        context.stroke()

        // Draw land outlines
        context.beginPath()
        landFeatures.features.forEach((feature: any) => {
          path(feature)
        })
        context.strokeStyle = "rgba(20, 184, 166, 0.8)" // Teal-500
        context.lineWidth = 1 * scaleFactor
        context.stroke()

        // Use D3 point generation for perfect orthographic clipping
        context.beginPath()
        path.pointRadius(1.2 * scaleFactor)
        allDots.forEach((dot) => {
          path({ type: "Point", coordinates: [dot.lng, dot.lat] })
        })
        context.fillStyle = "#2dd4bf" // Teal-400
        context.fill()

        // Draw network links (AI connection arcs)
        context.beginPath()
        aiLinks.forEach(link => {
            path({type: "LineString", coordinates: [link.source, link.target]})
        })
        context.strokeStyle = "rgba(45, 212, 191, 0.25)" // Faint Teal-400
        context.lineWidth = 1 * scaleFactor
        context.stroke()

        // Draw animated data packets along the links
        context.beginPath()
        aiLinks.forEach(link => {
            const t = ((now + link.offset) % link.duration) / link.duration;
            const interpolator = d3.geoInterpolate(link.source, link.target);
            const pos = interpolator(t);
            path({type: "Point", coordinates: pos as [number, number]})
        })
        context.fillStyle = "#ffffff" // Glowing data packets
        path.pointRadius(1.5 * scaleFactor)
        context.fill()

        // Draw node ripples
        aiNodes.forEach(node => {
            if (node.hasRipple) {
                const t = ((now + node.offset) % 2500) / 2500;
                const rippleSize = t * 15; 
                context.beginPath();
                path.pointRadius((node.size + rippleSize) * scaleFactor);
                path({type: "Point", coordinates: [node.lng, node.lat]});
                context.strokeStyle = `rgba(45, 212, 191, ${(1 - t) * 0.8})`;
                context.lineWidth = 1 * scaleFactor;
                context.stroke();
            }
        })

        // Draw network nodes (Glowing endpoints)
        context.beginPath()
        aiNodes.forEach(node => {
            path.pointRadius(node.size * scaleFactor)
            path({type: "Point", coordinates: [node.lng, node.lat]})
        })
        context.fillStyle = "#ccfbf1" // Teal-50
        context.fill()
        
        // Restore standard radius
        path.pointRadius(1.2 * scaleFactor)
      }
    }

    const loadWorldData = async () => {
      try {
        setIsLoading(true)

        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
        )
        if (!response.ok) throw new Error("Failed to load land data")

        landFeatures = await response.json()

        // Generate dots for all land features
        let totalDots = 0
        landFeatures.features.forEach((feature: any) => {
          // Changed spacing to 24 for high performance
          const dots = generateDotsInPolygon(feature, 24)
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat, visible: true })
            totalDots++
          })
        })

        // Generate AI Network nodes and links (Reduced for perf)
        const nodeCount = 40;
        const linkCount = 20;
        for (let i = 0; i < nodeCount; i++) {
            if (allDots.length > 0) {
               const node = allDots[Math.floor(Math.random() * allDots.length)];
               aiNodes.push({
                   lng: node.lng, 
                   lat: node.lat,
                   size: 1 + Math.random() * 2.5,
                   hasRipple: Math.random() > 0.7,
                   offset: Math.random() * 10000
               });
            }
        }
        for (let i = 0; i < linkCount; i++) {
            if (aiNodes.length > 1) {
                const s = aiNodes[Math.floor(Math.random() * aiNodes.length)];
                const t = aiNodes[Math.floor(Math.random() * aiNodes.length)];
                // Avoid linking to self excessively
                if (s.lng !== t.lng) {
                  aiLinks.push({
                      source: [s.lng, s.lat], 
                      target: [t.lng, t.lat],
                      duration: 1000 + Math.random() * 3000,
                      offset: Math.random() * 10000
                  });
                }
            }
        }

        render()
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load land map data")
        setIsLoading(false)
      }
    }

    const rotation: [number, number, number] = [0, 0, 0]
    let autoRotate = true
    const rotationSpeed = 0.5
    let isVisible = true

    const rotate = () => {
      if (!isVisible) return
      
      if (autoRotate) {
        rotation[0] += rotationSpeed
        projection.rotate(rotation)
      }
      render()
    }

    // Auto-rotation timer
    const rotationTimer = d3.timer(rotate)

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting
      })
    }, { threshold: 0 })

    if (canvas) {
      observer.observe(canvas)
    }

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false
      const startX = event.clientX
      const startY = event.clientY
      const startRotation = [...rotation]

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.5
        const dx = moveEvent.clientX - startX
        const dy = moveEvent.clientY - startY

        rotation[0] = startRotation[0] + dx * sensitivity
        rotation[1] = startRotation[1] - dy * sensitivity
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]))

        projection.rotate(rotation)
        if (isVisible) render()
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)

        setTimeout(() => {
          autoRotate = true
        }, 10)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1
      const newRadius = Math.max(radius * 0.5, Math.min(radius * 3, projection.scale() * scaleFactor))
      projection.scale(newRadius)
      if (isVisible) render()
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("wheel", handleWheel)

    // Load the world data
    loadWorldData()

    // Cleanup
    return () => {
      rotationTimer.stop()
      observer.disconnect()
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("wheel", handleWheel)
    }
  }, [width, height])

  if (error) {
    return (
      <div className={`dark flex items-center justify-center bg-card rounded-2xl p-8 ${className}`}>
        <div className="text-center">
          <p className="dark text-destructive font-semibold mb-2">Error loading Earth visualization</p>
          <p className="dark text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-3xl cursor-grab active:cursor-grabbing border border-teal-800/20 shadow-xl bg-transparent"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <div className="absolute top-4 left-4 text-xs font-mono text-teal-200/50 bg-teal-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-teal-800/30">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  )
}
