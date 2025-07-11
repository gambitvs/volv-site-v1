"use client"

import { useEffect, useState } from "react"

// Define the Wistia Player API types for TypeScript to avoid errors
declare global {
  interface Window {
    _wq: any[]
    Wistia: any
  }
}

interface WistiaEmbedProps {
  mediaId: string
  aspectRatio: string
}

export function WistiaEmbed({ mediaId, aspectRatio }: WistiaEmbedProps) {
  const [player, setPlayer] = useState<any>(null)

  useEffect(() => {
    // The main script is now loaded in layout.tsx.
    // We just need to push the config for this specific video.
    window._wq = window._wq || []
    window._wq.push({
      id: mediaId,
      onReady: (video: any) => {
        setPlayer(video)
      },
    })

    // Cleanup function to remove the player instance when the component unmounts
    return () => {
      if (player) {
        player.remove()
      }
    }
  }, [mediaId, player])

  // Calculate the padding needed to maintain the correct aspect ratio.
  const padding = (1 / Number.parseFloat(aspectRatio)) * 100

  return (
    <div
      className="wistia_responsive_padding w-full h-full"
      style={{ padding: `${padding}% 0 0 0`, position: "relative" }}
    >
      <div className="wistia_responsive_wrapper w-full h-full" style={{ left: 0, position: "absolute", top: 0 }}>
        {/* This div is the target for the Wistia player */}
        <div className={`wistia_embed wistia_async_${mediaId} w-full h-full`} style={{ videoFoam: "true" }}>
          &nbsp;
        </div>
      </div>
    </div>
  )
}
