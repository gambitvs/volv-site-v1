"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
}

export function MagneticButton({
  children,
  className,
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return

    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const baseClasses =
    "relative overflow-hidden transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"

  const variantClasses = {
    primary: "bg-surface-dark text-surface-light hover:bg-olive-light shadow-lg hover:shadow-xl",
    secondary:
      "bg-transparent text-surface-dark border-2 border-surface-dark hover:bg-surface-dark hover:text-surface-light",
    ghost: "bg-transparent text-surface-dark hover:bg-surface-dark/10",
  }

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
  }

  return (
    <motion.button
      ref={ref}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      disabled={disabled}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-brand-accent/20 to-brand-accent-light/20 opacity-0"
        whileHover={{ opacity: disabled ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  )
}
