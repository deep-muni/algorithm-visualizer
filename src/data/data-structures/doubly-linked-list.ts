import type { DataStructureInfo } from '@/types/algorithm';

export const doublyLinkedListData: DataStructureInfo = {
  id: 'doubly-linked-list',
  name: 'Doubly Linked List',
  category: 'data-structures',
  shortDescription:
    'Bidirectional chain of nodes containing pointers to both next and previous elements.',
  description:
    'A Doubly Linked List is a linear data structure composed of sequentially linked nodes. Unlike a singly linked list, each node contains two pointers: one referencing the previous node and another referencing the next node. This allows full bidirectional traversal and O(1) removals when a pointer to a node is already available.',
  complexity: {
    access: 'O(n)',
    search: 'O(n)',
    insertion: 'O(1)',
    deletion: 'O(1)',
    space: 'O(n)',
  },
  code: {
    typescript: `class DoubleNode<T> {
  value: T;
  next: DoubleNode<T> | null = null;
  prev: DoubleNode<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

class DoublyLinkedList<T> {
  head: DoubleNode<T> | null = null;
  tail: DoubleNode<T> | null = null;
  size = 0;

  insertHead(value: T): void {
    const node = new DoubleNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.size++;
  }

  insertTail(value: T): void {
    const node = new DoubleNode(value);
    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.size++;
  }

  delete(value: T): boolean {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        if (current.prev) {
          current.prev.next = current.next;
        } else {
          this.head = current.next;
        }
        if (current.next) {
          current.next.prev = current.prev;
        } else {
          this.tail = current.prev;
        }
        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }
}`,
    java: `public class DoublyLinkedList<T> {
    public static class Node<T> {
        public T value;
        public Node<T> prev;
        public Node<T> next;
        public Node(T value) { this.value = value; }
    }

    private Node<T> head;
    private Node<T> tail;
    private int size;

    public void insertHead(T value) {
        Node<T> node = new Node<>(value);
        if (head == null) {
            head = node;
            tail = node;
        } else {
            node.next = head;
            head.prev = node;
            head = node;
        }
        size++;
    }

    public void insertTail(T value) {
        Node<T> node = new Node<>(value);
        if (tail == null) {
            head = node;
            tail = node;
        } else {
            tail.next = node;
            node.prev = tail;
            tail = node;
        }
        size++;
    }

    public boolean delete(T value) {
        Node<T> current = head;
        while (current != null) {
            if (current.value.equals(value)) {
                if (current.prev != null) {
                    current.prev.next = current.next;
                } else {
                    head = current.next;
                }
                if (current.next != null) {
                    current.next.prev = current.prev;
                } else {
                    tail = current.prev;
                }
                size--;
                return true;
            }
            current = current.next;
        }
        return false;
    }
}`,
    python: `class DoubleNode:
    def __init__(self, value):
        self.value = value
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0

    def insert_head(self, value):
        node = DoubleNode(value)
        if not self.head:
            self.head = node
            self.tail = node
        else:
            node.next = self.head
            self.head.prev = node
            self.head = node
        self.size += 1

    def insert_tail(self, value):
        node = DoubleNode(value)
        if not self.tail:
            self.head = node
            self.tail = node
        else:
            self.tail.next = node
            node.prev = self.tail
            self.tail = node
        self.size += 1

    def delete(self, value):
        current = self.head
        while current:
            if current.value == value:
                if current.prev:
                    current.prev.next = current.next
                else:
                    self.head = current.next
                if current.next:
                    current.next.prev = current.prev
                else:
                    self.tail = current.prev
                self.size -= 1
                return True
            current = current.next
        return False`,
  },
};
