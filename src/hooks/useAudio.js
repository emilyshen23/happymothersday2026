import { useState, useEffect, useRef, useCallback } from 'react'

export default function useAudio(src) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(src)
    audioRef.current = audio

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration)
    })

    audio.addEventListener('ended', () => {
      setIsPlaying(false)
      setCurrentTime(0)
      cancelAnimationFrame(rafRef.current)
    })

    return () => {
      audio.pause()
      audio.src = ''
      cancelAnimationFrame(rafRef.current)
    }
  }, [src])

  const tick = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
      rafRef.current = requestAnimationFrame(tick)
    }
  }, [tick])

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const reset = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
      setCurrentTime(0)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return { isPlaying, currentTime, duration, play, pause, reset }
}
