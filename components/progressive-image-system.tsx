"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface ProgressiveImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
  quality?: number
}

export function ProgressiveImage({ src, alt, className = "", placeholder, quality = 75 }: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const observerRef = useRef<IntersectionObserver>()

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observerRef.current?.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current)
    }

    return () => observerRef.current?.disconnect()
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      <motion.div
        className="absolute inset-0 bg-gray-200 flex items-center justify-center"
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {placeholder && <span className="text-gray-400 text-sm">{placeholder}</span>}
      </motion.div>

      {/* Actual Image */}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  )
}

export function ImageGallery({ images }: { images: Array<{ src: string; alt: string }> }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(index)}
            className="cursor-pointer"
          >
            <ProgressiveImage
              src={image.src}
              alt={image.alt}
              className="aspect-square rounded-lg"
              placeholder="Loading..."
            />
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="max-w-4xl max-h-4xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedImage].src || "/placeholder.svg"}
              alt={images[selectedImage].alt}
              className="w-full h-full object-contain rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
