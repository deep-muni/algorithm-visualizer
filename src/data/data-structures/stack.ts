import type { DataStructureInfo } from '@/types/algorithm';

export const stackData: DataStructureInfo = {
  id: 'stack',
  name: 'Stack',
  category: 'data-structures',
  shortDescription:
    'LIFO (Last-In, First-Out) collection supporting O(1) push, pop, and peek operations.',
  description:
    'A Stack is a linear data structure that follows the Last In, First Out (LIFO) principle. Elements can only be added or removed from the top of the stack. Stacks are fundamental in computer science, powering execution call stacks, undo/redo mechanisms, syntax parsing, and expression evaluation.',
  complexity: {
    access: 'O(n)',
    search: 'O(n)',
    insertion: 'O(1)',
    deletion: 'O(1)',
    space: 'O(n)',
  },
  code: {
    typescript: `class Stack<T> {
  private items: T[] = [];

  push(element: T): void {
    this.items.push(element);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
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
    java: `import java.util.ArrayList;
import java.util.EmptyStackException;

public class Stack<T> {
    private ArrayList<T> items = new ArrayList<>();

    public void push(T element) {
        items.add(element);
    }

    public T pop() {
        if (isEmpty()) throw new EmptyStackException();
        return items.remove(items.size() - 1);
    }

    public T peek() {
        if (isEmpty()) throw new EmptyStackException();
        return items.get(items.size() - 1);
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
    python: `class Stack:
    def __init__(self):
        self._items = []

    def push(self, element):
        self._items.append(element)

    def pop(self):
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self._items.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("peek from empty stack")
        return self._items[-1]

    def is_empty(self):
        return len(self._items) == 0

    def size(self):
        return len(self._items)

    def clear(self):
        self._items.clear()`,
  },
};
