import { useMemo } from 'react'

export default function TranscriptSweep({ transcript, progress, strongColor, mutedColor }) {
  const words = useMemo(() => transcript.split(''), [transcript])

  const sweepIndex = Math.floor(progress * words.length)

  return (
    <span className="transcript-text">
      {words.map((char, i) => (
        <span
          key={i}
          style={{
            color: i < sweepIndex ? strongColor : mutedColor,
            transition: 'color 0.05s linear',
          }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}
