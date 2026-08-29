# Sort & Search Visualizer

An interactive web application for visualizing classic sorting and searching algorithms, with complexity analysis and copyable reference implementations in **TypeScript**, **Java**, and **Python**.

---

## ✨ Features

- **Interactive Visualizations**: Step through algorithm execution frame-by-frame with play, pause, step forward/backward, reset, and adjustable playback speeds.
- **Color-Coded Step Indicators**: Visually distinguish comparisons, swaps/moves, and sorted/found elements.
- **Dynamic Array Configurations**:
  - Presets: Random, Reversed, Nearly Sorted, Duplicates / Few Unique
  - Custom array size selector (8, 12, 16, 20 elements)
  - Custom number input (comma-separated values)
- **Multi-Language Code Export**: Toggle between clean, production-ready code snippets in TypeScript, Java, and Python with a 1-click copy button.
- **Time & Space Complexity Breakdown**: Best case, average case, worst case, space complexity, stability, and in-place sorting badges.
- **Algorithms Supported**:
  - **Sorting**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort
  - **Searching**: Linear Search, Binary Search

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI & Styling**: [Chakra UI v3](https://chakra-ui.com/) + Emotion SSR cache
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Linting & Formatting**: ESLint (Flat Config) + Prettier

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 20.0.0`
- pnpm `>= 9.0.0`

### Installation

```bash
# Clone the repository
git clone git@github.com:deep-muni/sort-and-search-visualizer.git

# Navigate into project directory
cd sort-and-search-visualizer

# Install dependencies
pnpm install
```

### Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Scripts

- `pnpm dev` - Start local development server
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint checks
- `pnpm lint:fix` - Fix auto-fixable ESLint issues
- `pnpm typecheck` - Run TypeScript compiler checks (`tsc --noEmit`)
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check formatting with Prettier

---

## 📄 License

MIT
