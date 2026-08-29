# Algorithm Visualizer

> **An interactive learning playground that brings computer science algorithms to life through step-by-step visual animations, intuitive narratives, and multi-language reference implementations.**

[![License: MIT](https://img.shields.io/badge/License-MIT-indigo.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org/)

---

## 💡 Why Algorithm Visualizer?

Algorithms are the fundamental building blocks of software engineering, yet they are almost always taught through dry mathematical formulas or static code blocks. For many learners and engineers, developing a true intuition for how pointers move, how recursion branches, or how elements partition in memory is difficult without seeing it happen live.

**Algorithm Visualizer** transforms abstract algorithms into tangible, interactive experiences. Instead of wondering what happens during a Quick Sort partition or a Binary Search interval reduction, you can watch every comparison, swap, and decision unfold one frame at a time.

---

## ✨ What You Can Do

### 🎯 1. Interactive Frame-by-Frame Playback

- **Full Player Controls**: Play, pause, step forward, step backward, or jump directly to the sorted result.
- **Speed Customization**: Slow down the playback (0.5x) to study tricky edge cases, or speed it up (4x) to observe large-scale sorting patterns.
- **Live Narrative Explanations**: Read concise, human-friendly descriptions at each step explaining exactly _why_ two elements are being compared or swapped.

### 🎨 2. Color-Coded Visual States

- **Unsorted Elements**: Clearly rendered baseline bars with values on top and array indices below.
- **Active Comparisons**: Amber highlights that indicate the current elements being evaluated.
- **Swaps & Partitioning**: Coral red highlights when values are actively exchanging places.
- **Sorted & Target Found**: Mint green highlights confirming settled elements or search targets.

### 🧪 3. Dynamic Test Data & Custom Inputs

- **Preset Configurations**: Test algorithms against common edge cases:
  - _Random_: General average-case evaluation.
  - _Reversed_: Worst-case scenario testing.
  - _Nearly Sorted_: Great for evaluating adaptive algorithms like Insertion Sort.
  - _Duplicates / Few Unique_: Observe how algorithms handle repeated values and stability.
- **Custom Array Input**: Type your own numbers (e.g. `42, 17, 89, 5, 23`) to experiment with specific data.
- **Array Size Adjustment**: Easily toggle between small (8 items) and large (20 items) arrays.

### 💻 4. Multi-Language Code References

- Clean, idiomatic reference implementations in **TypeScript**, **Java**, and **Python**.
- **1-Click Copy**: Grab the implementation directly to your clipboard for interview prep, assignments, or project use.
- **Line Numbers & Smooth Scrolling**: Formatted code view that handles long and complex algorithms cleanly.

### 📊 5. Complexity & Algorithmic Properties

- Instant breakdown of **Best Case**, **Average Case**, and **Worst Case** time complexities.
- **Auxiliary Space Complexity** insights.
- Clear badges indicating whether the algorithm is **Stable** (preserves equal keys order) and **In-Place** (operates within O(1) extra memory).

---

## 📚 Supported Algorithms

### Sorting Algorithms

| Algorithm          | Best Time    | Average Time | Worst Time   | Space      | Stable | In-Place |
| :----------------- | :----------- | :----------- | :----------- | :--------- | :----- | :------- |
| **Bubble Sort**    | `O(n)`       | `O(n²)`      | `O(n²)`      | `O(1)`     | Yes    | Yes      |
| **Selection Sort** | `O(n²)`      | `O(n²)`      | `O(n²)`      | `O(1)`     | No     | Yes      |
| **Insertion Sort** | `O(n)`       | `O(n²)`      | `O(n²)`      | `O(1)`     | Yes    | Yes      |
| **Merge Sort**     | `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(n)`     | Yes    | No       |
| **Quick Sort**     | `O(n log n)` | `O(n log n)` | `O(n²)`      | `O(log n)` | No     | Yes      |
| **Heap Sort**      | `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(1)`     | No     | Yes      |

### Searching Algorithms

| Algorithm         | Best Time | Average Time | Worst Time | Space  | Requirement       |
| :---------------- | :-------- | :----------- | :--------- | :----- | :---------------- |
| **Linear Search** | `O(1)`    | `O(n)`       | `O(n)`     | `O(1)` | Any collection    |
| **Binary Search** | `O(1)`    | `O(log n)`   | `O(log n)` | `O(1)` | Sorted collection |

---

## 🌗 Theme Support

Toggle between **Dark Mode** and **Light Mode** at any time using the top-right theme switch. All colors, text contrast, and visualization glows adapt automatically for a comfortable reading experience in any environment.

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone git@github.com:deep-muni/algorithm-visualizer.git

# Enter project directory
cd algorithm-visualizer

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.
