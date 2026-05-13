import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useAudio from '../hooks/useAudio'
import TranscriptSweep from './TranscriptSweep'

const CLOSED_BAR_HEIGHTS = [5.4, 10.8, 7.2, 14.5, 9.0, 5.4]
const OPEN_BAR_COUNT = 26
const DARK_BAR_COUNT = 6

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function WaveformBars({ count, heights, strongColor, mutedColor, darkCount, isPlaying, barWidth, gap }) {
  return (
    <div className="waveform" style={{ gap }}>
      {Array.from({ length: count }, (_, i) => {
        const isDark = i < darkCount
        const baseHeight = heights ? heights[i % heights.length] : (6 + Math.sin(i * 0.8) * 6)
        return (
          <motion.div
            key={i}
            className="waveform-bar"
            style={{
              width: barWidth,
              backgroundColor: isDark ? strongColor : mutedColor,
              borderRadius: 202,
            }}
            animate={
              isPlaying
                ? {
                    scaleY: [0.35, 1, 0.35],
                  }
                : { scaleY: 1 }
            }
            transition={
              isPlaying
                ? {
                    duration: 0.6 + Math.random() * 0.4,
                    repeat: Infinity,
                    delay: i * 0.05,
                    ease: 'easeInOut',
                  }
                : { duration: 0.2 }
            }
            initial={false}
          >
            <div style={{ height: baseHeight }} />
          </motion.div>
        )
      })}
    </div>
  )
}

export default function VoicePlayer({ card, isOpen, onOpen, onClose }) {
  const { isPlaying, currentTime, duration, play, pause, reset } = useAudio(card.audio)
  const progress = duration > 0 ? currentTime / duration : 0

  useEffect(() => {
    if (!isOpen) {
      reset()
    }
  }, [isOpen, reset])

  const handlePlayTap = (e) => {
    e.stopPropagation()
    if (!isOpen) {
      onOpen()
      play()
    } else if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const handleClose = (e) => {
    e.stopPropagation()
    pause()
    onClose()
  }

  return (
    <AnimatePresence mode="wait">
      {!isOpen ? (
        <motion.div
          key="closed"
          className="player player-closed"
          onClick={handlePlayTap}
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeIn' }}
        >
          <WaveformBars
            count={6}
            heights={CLOSED_BAR_HEIGHTS}
            strongColor={card.colors.strong}
            mutedColor={card.colors.muted}
            darkCount={4}
            isPlaying={false}
            barWidth={1.808}
            gap={2}
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
        </motion.div>
      ) : (
        <motion.div
          key="open"
          className="player player-open"
          style={{
            border: `1.238px solid ${card.colors.border}`,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={handleClose}
        >
          <div className="player-row-1" onClick={(e) => e.stopPropagation()}>
            <WaveformBars
              count={OPEN_BAR_COUNT}
              heights={null}
              strongColor={card.colors.strong}
              mutedColor={card.colors.muted}
              darkCount={DARK_BAR_COUNT}
              isPlaying={isPlaying}
              barWidth={4.046}
              gap={4.046}
            />
            <span className="player-time" style={{ color: card.colors.strong }}>
              {formatTime(currentTime)}/{formatTime(duration || card.duration)}
            </span>
            <img
              src={isPlaying ? card.pauseIcon : card.playIcon}
              alt={isPlaying ? 'Pause' : 'Play'}
              className="player-btn"
              onClick={handlePlayTap}
              draggable={false}
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
      )}
    </AnimatePresence>
  )
}
