import type { DataStructureInfo } from '@/types/algorithm';

export const queueData: DataStructureInfo = {
  id: 'queue',
  name: 'Queue',
  category: 'data-structures',
  shortDescription:
    'FIFO (First-In, First-Out) collection supporting O(1) enqueue and dequeue operations.',
  description:
    'A Queue is a linear data structure that follows the First In, First Out (FIFO) order. Items are inserted at the rear (enqueue) and removed from the front (dequeue). Queues are widely used in breadth-first search (BFS), job scheduling buffers, printer spoolers, and message queues.',
  complexity: {
    access: 'O(n)',
    search: 'O(n)',
    insertion: 'O(1)',
    deletion: 'O(1)',
    space: 'O(n)',
  },
  code: {
    typescript: `class Queue<T> {
  private items: T[] = [];

  enqueue(element: T): void {
    this.items.push(element);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  front(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }
}`,
    java: `import java.util.LinkedList;
import java.util.NoSuchElementException;

public class Queue<T> {
    private LinkedList<T> items = new LinkedList<>();

    public void enqueue(T element) {
        items.addLast(element);
    }

    public T dequeue() {
        if (isEmpty()) throw new NoSuchElementException();
        return items.removeFirst();
    }

    public T front() {
        if (isEmpty()) throw new NoSuchElementException();
        return items.getFirst();
    }

    public boolean isEmpty() {
        return items.isEmpty();
    }

    public int size() {
        return items.size();
    }

    public void clear() {
        items.clear();
    }
}`,
    python: `from collections import deque

class Queue:
    def __init__(self):
        self._items = deque()

    def enqueue(self, element):
        self._items.append(element)

    def dequeue(self):
        if self.is_empty():
            raise IndexError("dequeue from empty queue")
        return self._items.popleft()

    def front(self):
        if self.is_empty():
            raise IndexError("front from empty queue")
        return self._items[0]

    def is_empty(self):
        return len(self._items) == 0

    def size(self):
        return len(self._items)

    def clear(self):
        self._items.clear()`,
  },
};
