import { useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useAudio from '../hooks/useAudio'
import useSoundEffects from '../hooks/useSoundEffects'
import TranscriptSweep from './TranscriptSweep'

const CLOSED_BAR_HEIGHTS = [5.4, 10.8, 7.2, 14.5, 9.0, 5.4]
const OPEN_BAR_GROUPS = [
  [4.37, 8.739, 5.826, 11.651, 7.282, 4.37],
  [8.739, 5.826, 11.651, 7.282, 4.37],
  [8.739, 5.826, 11.651, 7.282, 4.37],
  [8.739, 5.826, 11.651, 7.282, 4.37],
  [8.739, 5.826, 11.651, 7.282, 4.37],
]
const TOTAL_OPEN_BARS = 26

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function ClosedWaveform({ strongColor, mutedColor }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {CLOSED_BAR_HEIGHTS.map((h, i) => (
        <div
          key={i}
          style={{
            width: 1.808,
            height: h,
            borderRadius: 202.28,
            backgroundColor: i < 4 ? strongColor : mutedColor,
            opacity: i < 4 ? 1 : 0.4,
          }}
        />
      ))}
    </div>
  )
}

function OpenWaveform({ strongColor, mutedColor, sweepProgress }) {
  let globalIndex = 0

  return (
    <div className="waveform" style={{ display: 'flex', alignItems: 'center', gap: 1.8 }}>
      {OPEN_BAR_GROUPS.map((group, gi) => {
        const bars = group.map((h, bi) => {
          const idx = globalIndex++
          const lit = (idx / TOTAL_OPEN_BARS) < sweepProgress
          return (
            <div
              key={idx}
              style={{
                width: 1.8,
                height: h,
                borderRadius: 202.28,
                backgroundColor: lit ? strongColor : mutedColor,
                opacity: lit ? 1 : 0.4,
              }}
            />
          )
        })
        return (
          <div key={gi} style={{ display: 'flex', alignItems: 'center', gap: 1.8 }}>
            {bars}
          </div>
        )
      })}
    </div>
  )
}

export default function VoicePlayer({ card, isOpen, onOpen, onClose }) {
  const closeTimerRef = useRef(null)
  const { playPlayTap } = useSoundEffects()

  const handleEnded = useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      onClose()
    }, 600)
  }, [onClose])

  const { isPlaying, currentTime, duration, play, pause, reset } = useAudio(card.audio, handleEnded)
  const progress = duration > 0 ? currentTime / duration : 0

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      reset()
    }
  }, [isOpen, reset])

  const handlePlayTap = (e) => {
    e.stopPropagation()
    playPlayTap()
    if (!isOpen) {
      onOpen()
      play()
    } else if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  return (
    <>
      {/* Closed player — always present, fades in/out */}
      <div style={{ position: 'absolute', top: '10.1%', left: 0, right: 0, display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 10 }}>
        <div
          className="player player-closed"
          onClick={handlePlayTap}
          style={{
            border: `1.113px solid ${card.colors.border}`,
            backgroundColor: card.colors.bg,
            pointerEvents: isOpen ? 'none' : 'auto',
            opacity: isOpen ? 0 : 1,
            transition: 'opacity 250ms ease',
          }}
        >
          <ClosedWaveform
            strongColor={card.colors.strong}
            mutedColor={card.colors.muted}
          />
          <span className="player-time" style={{ color: card.colors.strong }}>
            {card.durationLabel}
          </span>
          <img
            src={card.playIcon}
            alt="Play"
            className="player-btn"
            draggable={false}
          />
        </div>
      </div>

      {/* Click-outside overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            style={{ position: 'fixed', inset: 0, zIndex: 8, background: 'transparent', cursor: 'default' }}
            onClick={() => { pause(); onClose() }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </AnimatePresence>

      {/* Open player — fades in/out */}
      <AnimatePresence>
        {isOpen && (
          <div style={{ position: 'absolute', top: '9.3%', left: '10%', width: '80%', pointerEvents: 'none', zIndex: 20 }}>
            <motion.div
              key="open"
              className="player player-open"
              style={{
                border: `1.238px solid ${card.colors.border}`,
                backgroundColor: card.colors.bg,
                pointerEvents: 'auto',
              }}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="player-row-1" onClick={(e) => e.stopPropagation()}>
                <OpenWaveform
                  strongColor={card.colors.strong}
                  mutedColor={card.colors.muted}
                  sweepProgress={progress}
                />
                <span className="player-time" style={{ color: card.colors.strong }}>
                  {formatTime(currentTime)}/{formatTime(duration || card.duration)}
                </span>
                <motion.img
                  src={isPlaying ? card.pauseIcon : card.playIcon}
                  alt={isPlaying ? 'Pause' : 'Play'}
                  className="player-btn"
                  onClick={handlePlayTap}
                  draggable={false}
                  animate={
                    isPlaying
                      ? { scale: [1, 1.05, 1] }
                      : { scale: 1 }
                  }
                  transition={
                    isPlaying
                      ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 0.2 }
                  }
                />
              </div>

              <div className="player-row-2" onClick={(e) => e.stopPropagation()}>
                <div
                  className="accent-bar"
                  style={{ backgroundColor: card.colors.strong }}
                />
                <TranscriptSweep
                  transcript={card.transcript}
                  progress={progress}
                  strongColor={card.colors.strong}
                  mutedColor={card.colors.muted}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
