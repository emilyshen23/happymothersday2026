# 母亲节快乐 — Happy Mother's Day 2026
## Interactive Card Deck Web App

---

## Project Overview

A mobile-first web app gifted to my mom for Mother's Day 2026.
A deck of 4 illustrated cards, each capturing a different side of her personality.
Each card has a voice note from me that plays when tapped.

**GitHub:** https://github.com/emilyshen23/happymothersday2026
**Live URL (after deploy):** https://emilyshen23.github.io/happymothersday2026
**Figma File:** https://www.figma.com/design/vWET2QmPEFWHBCocYFiFIA/Explorations-%E2%9C%A8

---

## Tech Stack

- **React** (via Vite) — component-based UI
- **Framer Motion** — all animations and transitions
- **Figma MCP** — read design specs directly from Figma
- **Plain CSS** — styling
- **GitHub Pages** — deployment via `gh-pages`

---

## Cards

| # | Title | Accent | Catchphrase | Audio | Duration |
|---|-------|--------|-------------|-------|----------|
| 1 | 暖心妈 | `#917256` | "吃饭了吗?" | voice1.m4a | 0:09 |
| 2 | 家常妈 | `#7A5C3E` | "我在家都可以做" | voice2.m4a | 0:10 |
| 3 | 运动妈 | `#6B7B5E` | "跟我一起走路吗?" | voice3.m4a | 0:07 |
| 4 | 傻妈 | `#B07A6E` | "脸怎么又胖了?!" | voice4.m4a | 0:10 |

---

## Transcript Text Per Card

```
Card 1 (暖心妈):
妈妈, 我最喜欢你关心人的方式, 总是问我们问题, 经常问你吃饭了吗?

Card 2 (家常妈):
哎呀妈妈, 我好想念你做的家常菜和点心, 下次我回家, 我们一起吃cheesecake吧!

Card 3 (运动妈):
加油, 妈妈！等我回去陪你一起去Ashley Falls公园暴走！

Card 4 (傻妈):
妈妈妈妈, 你这个笑容又暖又好看, 脸不胖, 千万别不自信啊！
```

---

## Color Themes Per Card

```js
sweet: {
  bg: "#fbf1e3",
  border: "#d0c1aa",
  strong: "#48290d",
  muted: "rgba(72,41,13,0.4)"
}
chef: {
  bg: "#fdede5",
  border: "rgba(163,83,44,0.4)",
  strong: "#a14a23",
  muted: "rgba(161,74,35,0.4)"
}
exercise: {
  bg: "#fffcf6",
  border: "rgba(121,109,83,0.4)",
  strong: "#796d53",
  muted: "rgba(121,109,83,0.4)"
}
goofy: {
  bg: "#fbf9fa",
  border: "rgba(162,116,123,0.4)",
  strong: "#a9646f",
  muted: "rgba(162,116,123,0.4)"
}
```

---

## App Layout

```
┌─────────────────────────────┐
│  [status bar / nav-bar.png] │
│     母亲节快乐!              │
│     • • • •  (dot nav)      │
│                             │
│   ┌─────────────────────┐   │
│   │  [card illustration]│   │
│   │  title (e.g. 暖心妈) │   │
│   │  [voice player]     │   │
│   │  [illustration img] │   │
│   │  "catchphrase"      │   │
│   └─────────────────────┘   │
│                             │
│        <      >             │
└─────────────────────────────┘
```

- **Viewport:** 393×852px, fully responsive on mobile
- **App background:** `#F5F0EB` cream
- **Card background:** per card theme (e.g. `#fbf1e3` for sweet)
- **Font:** YRDZST Medium (all text including numbers)
- **Max width:** 390px centered

---

## Figma Assets

### Full Mobile Frames (closed + open state per card)
```
Sweet mom - closed:    node-id=78-1180
Sweet mom - open:      node-id=78-1274
Chef mom - closed:     node-id=78-1659
Chef mom - open:       node-id=78-1712
Exercise mom - closed: node-id=78-1872
Exercise mom - open:   node-id=78-1925
Goofy mom - closed:    node-id=78-2085
Goofy mom - open:      node-id=78-2138
```

### Card Illustrations (no voice player)
```
Sweet mom:    node-id=48-894
Chef mom:     node-id=48-923
Exercise mom: node-id=48-965
Goofy mom:    node-id=48-993
```

### Voice Player Components
```
Sweet mom - player closed:    node-id=49-1076
Sweet mom - player open:      node-id=49-1077
Chef mom - player closed:     node-id=49-1078
Chef mom - player open:       node-id=49-1079
Exercise mom - player closed: node-id=49-1080
Exercise mom - player open:   node-id=49-1081
Goofy mom - player closed:    node-id=49-1082
Goofy mom - player open:      node-id=49-1083
```

### Button Assets (play + pause per card)
```
Sweet pause:    node-id=78-4125
Sweet play:     node-id=78-4068
Chef pause:     node-id=78-4138
Chef play:      node-id=78-4027
Exercise pause: node-id=78-4151
Exercise play:  node-id=78-4109
Goofy pause:    node-id=78-4164
Goofy play:     node-id=78-3986
```

### Background / Nav Bar
```
App background + nav bar: node-id=78-3631
```

All nodes are in Figma file: `vWET2QmPEFWHBCocYFiFIA`

---

## Assets Folder Structure

```
src/assets/
  images/
    sweet-mom.png         — card illustration
    chef-mom.png
    exercise-mom.png
    goofy-mom.png
    play-sweet.png        — play button per card color
    play-chef.png
    play-exercise.png
    play-goofy.png
    pause-sweet.png       — pause button per card color
    pause-chef.png
    pause-exercise.png
    pause-goofy.png
    nav-bar.png           — top status bar + 母亲节快乐! header
  audio/
    voice1.m4a            — 暖心妈 (0:09)
    voice2.m4a            — 家常妈 (0:10)
    voice3.m4a            — 运动妈 (0:07)
    voice4.m4a            — 傻妈   (0:10)
  fonts/
    YRDZST-Medium.ttf
```

---

## Component Structure

```
src/
  components/
    CardCarousel.jsx      — deck, navigation, swipe logic
    Card.jsx              — single card: illustration + player + catchphrase
    VoicePlayer.jsx       — closed and open player states
    TranscriptSweep.jsx   — word highlight sweep animation
    NavDots.jsx           — 4 dot indicators, color changes per card
    NavArrows.jsx         — < > circular buttons
  hooks/
    useAudio.js           — audio playback, pause, resume, ended
    useCardDrag.js        — drag and spring snap back
  data/
    cards.js              — all card data (title, colors, transcript, audio, durations)
  assets/                 — see above
  App.jsx
  main.jsx
  index.css
```

---

## Voice Player — Closed State

- **Position inside card:** `top: 10.1%, left: 36.8%, width: 26%`
- **Dimensions:** `100.52 × 34.04px`
- **Border radius:** 0 (sharp rectangle)
- **Padding:** `3.71px` vertical, `5.97px` horizontal
- **Layout:** single row → waveform | timestamp | play button
- **Waveform:** 6 static bars (4 dark, 2 muted), center aligned, no animation
- **Bar sizes:** `w: 1.808px`, heights: `5.4, 10.8, 7.2, 14.5, 9.0, 5.4px`
- **Timestamp:** total duration only e.g. `0:09`, YRDZST Medium, `12.24px`
- **Play button:** `play-[card].png`, `23.924px`
- **Gap between waveform group and play button:** `8.902px`

## Voice Player — Open State

- **Position:** `top: 9.3%, left: 15.2%, width: 70.3%`
- **Padding:** `12.377px` all sides
- **Gap between rows:** `7.526px`
- **Border:** `1.238px solid` card border color, radius: 0

**Row 1:** waveform | timestamp | pause/play button
- Waveform: 26 bars total (6 dark + 20 muted), `align-items: center`, `gap: 4.046px`
- Bar: `w: 4.046px`, `border-radius: 202.28px`
- Timestamp: `0:03/0:09` format, YRDZST Medium, `12.24px`
- Button: `pause-[card].png` when playing, `play-[card].png` when paused, `23.924px`

**Row 2:** vertical accent bar | transcript text
- Accent bar: `w: 1.734px`, full height, `border-radius: 999px`
- Gap between bar and text: `9.958px`
- Transcript: YRDZST Medium, muted color by default

---

## Transcript Sweep Behavior

- All words visible immediately in **muted color** when player opens
- As audio plays: **clean hard-edge left-to-right sweep**
  - Words left of sweep = card strong color (spoken)
  - Words right of sweep = muted color (unspoken)
  - Hard edge only — no blur, no gradient
- Timing: proportional to `audio.currentTime / audio.duration`
- Text pages in **2-line sections**: when sweep completes line 2, next 2 lines load instantly, sweep resets to left
- Opening `"` and closing `"` always stay muted
- On pause: sweep freezes
- On resume: sweep continues from frozen position

---

## Animations (Framer Motion)

| Trigger | Animation |
|---------|-----------|
| Card swipe → | Current card: `x: +24%, scale: 0.95`, drops behind next |
| Card swipe ← | Current card: `x: -24%, scale: 0.95`, drops behind next |
| Card hover | `y: -2px` subtle float |
| Card drag | Free movement, spring snap back on release |
| Player open | Expand position + size, `duration: 0.3s, ease: easeOut` |
| Player close | Collapse, `duration: 0.25s, ease: easeIn` |
| Waveform playing | Bars animate scaleY 0.35→1→0.35, staggered delays |
| Dot change | Scale + color transition `260ms` |

---

## Navigation

- **Dots:** 4 dots at top, active = card accent color, inactive = `#D4C5B5`
- **Arrows:** `< >` circular buttons, `61.6×61.6px`, `border: 1.68px solid #B8A290`
- **Loop:** after card 4 → back to card 1
- **On navigate:** collapse any open player, reset audio

---

## Sound Design (Web Audio API — no extra files)

| Event | Sound |
|-------|-------|
| Card swipe | Soft paper rustle (filtered noise, 80ms) |
| Play tap | Soft chime (sine 440hz, 150ms) |
| Card snap back | Soft thud (low sine 82hz, 60ms) |

---

## Build Roadmap

- [ ] **Phase 1: Setup**
  - Vite + React + Framer Motion installed
  - File structure created
  - All assets in `src/assets/`
  - `cards.js` data file created

- [ ] **Phase 2: Layout**
  - App shell at 390px max width
  - Nav bar image at top
  - 母亲节快乐! header text
  - 4 dot indicators
  - Card renders with illustration
  - Catchphrase text at bottom
  - Arrow buttons

- [ ] **Phase 3: Card Carousel**
  - All 4 cards in deck
  - Navigation works
  - Dots update per card
  - Framer Motion swipe animation

- [ ] **Phase 4: Voice Player Closed**
  - Correct position and dimensions
  - Colors per card
  - Waveform bars render
  - Timestamp shows total duration
  - Play button renders

- [ ] **Phase 5: Voice Player Open**
  - Tap expands to open state
  - Audio plays
  - Pause/play button swaps
  - Tap outside collapses

- [ ] **Phase 6: Transcript Sweep**
  - Words in muted color
  - Sweep syncs to audio
  - 2-line paging works
  - Pause freezes sweep

- [ ] **Phase 7: Polish**
  - Card drag + spring snap
  - Sound design
  - Hover states
  - Mobile responsive

- [ ] **Phase 8: Deploy**
  - `npm run build`
  - `npm run deploy`
  - Live on GitHub Pages

---

## Commit Convention

```bash
git add .
git commit -m "phase 2: card layout renders correctly"
git push origin main
```

Commit after every working phase.
