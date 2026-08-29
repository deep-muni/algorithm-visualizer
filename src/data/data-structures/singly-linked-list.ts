import type { DataStructureInfo } from '@/types/algorithm';

export const singlyLinkedListData: DataStructureInfo = {
  id: 'singly-linked-list',
  name: 'Singly Linked List',
  category: 'data-structures',
  shortDescription:
    'Unidirectional chain of nodes where each element points to the next in sequence.',
  description:
    'A Singly Linked List is a linear data structure where elements are not stored at contiguous memory locations. Instead, each node contains a value and a reference pointer to the subsequent node. It enables dynamic memory allocation and efficient O(1) insertions or deletions at the head without resizing an array.',
  complexity: {
    access: 'O(n)',
    search: 'O(n)',
    insertion: 'O(1)',
    deletion: 'O(1)',
    space: 'O(n)',
  },
  code: {
    typescript: `class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

class SinglyLinkedList<T> {
  head: ListNode<T> | null = null;
  size = 0;

  insertHead(value: T): void {
    const node = new ListNode(value);
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  insertTail(value: T): void {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  delete(value: T): boolean {
    if (!this.head) return false;
    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--;
      return true;
    }
    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }
    if (current.next) {
      current.next = current.next.next;
      this.size--;
      return true;
    }
    return false;
  }

  reverse(): void {
    let prev: ListNode<T> | null = null;
    let current = this.head;
    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
  }
}`,
    java: `public class SinglyLinkedList<T> {
    public static class Node<T> {
        public T value;
        public Node<T> next;
        public Node(T value) { this.value = value; }
    }

    private Node<T> head;
    private int size;

    public void insertHead(T value) {
        Node<T> node = new Node<>(value);
        node.next = head;
        head = node;
        size++;
    }

    public void insertTail(T value) {
        Node<T> node = new Node<>(value);
        if (head == null) {
            head = node;
        } else {
            Node<T> current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;
        }
        size++;
    }

    public boolean delete(T value) {
        if (head == null) return false;
        if (head.value.equals(value)) {
            head = head.next;
            size--;
            return true;
        }
        Node<T> current = head;
        while (current.next != null && !current.next.value.equals(value)) {
            current = current.next;
        }
        if (current.next != null) {
            current.next = current.next.next;
            size--;
            return true;
        }
        return false;
    }

    public void reverse() {
        Node<T> prev = null;
        Node<T> current = head;
        while (current != null) {
            Node<T> next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        head = prev;
    }
}`,
    python: `class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class SinglyLinkedList:
    def __init__(self):
        self.head = None
        self.size = 0

    def insert_head(self, value):
        node = Node(value)
        node.next = self.head
        self.head = node
        self.size += 1

    def insert_tail(self, value):
        node = Node(value)
        if not self.head:
            self.head = node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = node
        self.size += 1

    def delete(self, value):
        if not self.head:
            return False
        if self.head.value == value:
            self.head = self.head.next
            self.size -= 1
            return True
        current = self.head
        while current.next and current.next.value != value:
            current = current.next
        if current.next:
            current.next = current.next.next
            self.size -= 1
            return True
        return False

    def reverse(self):
        prev = None
        current = self.head
        while current:
            nxt = current.next
            current.next = prev
            prev = current
            current = nxt
        self.head = prev`,
  },
};
