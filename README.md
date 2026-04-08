# 🗓️ Interactive Wall Calendar Component

A premium, interactive wall calendar component built with **React** and **Next.js**. This project was developed as a solution for a Frontend Engineering Challenge, focusing on high visual fidelity, seamless interactivity, and robust responsive design.

![Calendar Preview](C:/Users/prakh/.gemini/antigravity/brain/04f1b2c6-7edc-41fe-b365-e259b9ab9b3d/desktop_calendar_view_1775624840543.png)

## ✨ Features

### 🖼️ Wall Calendar Aesthetic
- **Authentic Styling**: Includes a realistic spiral binder, a wall-hanging hook, and a professional hero section with seasonal imagery.
- **Dynamic Wave Dividers**: Dual-layer SVG wave transitions for a modern, fluid look between the imagery and the calendar grid.

### 📅 Day Range Selector
- **Intuitive UI**: Select a start and end date with a single click flow.
- **Range Highlights**: Clear visual states for the start date, the end date, and the intermediate days in the range.
- **Weekend Awareness**: Saturday and Sunday are color-coded to match the seasonal theme for easy scanning.

### 📝 Integrated Notes Section
- **Handwritten Look**: A "ruled paper" memo area designed to look like a physical notebook.
- **Persistence**: Notes are automatically saved to `localStorage` per month, ensuring your data remains across sessions and navigation.

### 📱 Responsive Design
- **Desktop**: A sophisticated side-by-side layout (Notes on left, Calendar on right).
- **Mobile/Tablet**: Gracefully collapses into a vertically stacked layout at smaller viewports, maintaining full usability.

### 🚀 Creative Stands-Outs
- **Seasonal Theming Engine**: The UI color palette and hero image automatically switch based on the current month (e.g., Snowy Mountains for Jan, Forest for Feb, Meadows for Mar).
- **3D Page-Flip Animation**: A realistic 3D transition plays when navigating between months.
- **Holiday Indicators**: Integrated markers (using a star icon) for global and seasonal holidays like New Year's Day and Valentine's Day.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS Modules (Scoped, high-performance styling)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📦 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd tuf-assg
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Verify**: Open [http://localhost:3000](http://localhost:3000) in your browser to see the component.

---

## 📂 Project Structure

The component follows a modular `component-per-folder` pattern for ease of maintenance:

```text
src/components/Calendar/
├── CalendarGrid/      # Logic for date generation and range highlighting
├── HeroSection/       # Imagery, date overlay, and wave dividers
├── NotesSection/      # Rule-paper style memo area with persistence
├── SpiralBinder/      # Decorative top binder/hook components
└── CalendarWrapper/   # Main orchestration, theme engine, and animations
```

---

## 🎨 Creative Choices

- **Theme Engine**: I implemented a `themeConfig` that maps months to specific HSL/Hex color values to ensure high contrast and accessibility.
- **3D Transitions**: Used `CSS transitions` with `transform: rotateX` to achieve a tactile "flip" feel without the overhead of heavy animation libraries.
- **Responsive Breakpoints**: Optimized specifically for ultra-small screens (320px) to ensure the 7-column grid remains usable on mini devices.
