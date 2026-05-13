import { useState } from 'react'
import VoicePlayer from './VoicePlayer'

export default function Card({ card }) {
  const [playerOpen, setPlayerOpen] = useState(false)

  return (
    <div
      className="card"
      style={{
        backgroundColor: card.colors.bg,
        border: `1.5px solid ${card.colors.border}`,
      }}
    >
      <h2 className="card-title" style={{ color: card.colors.strong }}>
        {card.title}
      </h2>

      <VoicePlayer
        card={card}
        isOpen={playerOpen}
        onOpen={() => setPlayerOpen(true)}
        onClose={() => setPlayerOpen(false)}
      />

      <div className="card-illustration">
        <img src={card.illustration} alt={card.title} draggable={false} />
      </div>

      <p className="card-catchphrase" style={{ color: card.colors.strong }}>
        {card.catchphrase}
      </p>
    </div>
  )
}
