import { describe, it, expect } from 'vitest';
import {
  executeStackPush,
  executeStackPop,
  executeStackPeek,
  executeQueueEnqueue,
  executeQueueDequeue,
  executeQueueFront,
  executeListInsertHead,
  executeListInsertTail,
  executeListInsertAt,
  executeListFind,
  executeListDelete,
  executeListReverse,
  type LinkedListNodeModel,
} from '@/lib/data-structures';

describe('Stack Data Structure Engine', () => {
  it('pushes elements onto the stack in LIFO order', () => {
    const res1 = executeStackPush([], 10);
    expect(res1.nextItems).toEqual([10]);
    expect(res1.error).toBeUndefined();

    const res2 = executeStackPush(res1.nextItems, 20);
    expect(res2.nextItems).toEqual([10, 20]);
  });

  it('prevents push when capacity is exceeded (Stack Overflow)', () => {
    const fullStack = [1, 2, 3, 4, 5, 6, 7, 8];
    const res = executeStackPush(fullStack, 99, 8);
    expect(res.error).toContain('Stack Overflow');
    expect(res.nextItems).toEqual(fullStack);
  });

  it('pops the top element from the stack', () => {
    const res = executeStackPop([10, 20, 30]);
    expect(res.poppedValue).toBe(30);
    expect(res.nextItems).toEqual([10, 20]);
  });

  it('handles pop on empty stack (Stack Underflow)', () => {
    const res = executeStackPop([]);
    expect(res.error).toContain('Stack Underflow');
    expect(res.nextItems).toEqual([]);
  });

  it('peeks top element without mutating stack', () => {
    const res = executeStackPeek([10, 20, 55]);
    expect(res.peekedValue).toBe(55);
    expect(res.nextItems).toEqual([10, 20, 55]);
  });

  it('peeks on empty stack gracefully', () => {
    const res = executeStackPeek([]);
    expect(res.error).toBe('Stack is empty');
  });
});

describe('Queue Data Structure Engine', () => {
  it('enqueues elements at rear in FIFO order', () => {
    const res1 = executeQueueEnqueue([], 10);
    expect(res1.nextItems).toEqual([10]);

    const res2 = executeQueueEnqueue(res1.nextItems, 20);
    expect(res2.nextItems).toEqual([10, 20]);
  });

  it('prevents enqueue when capacity is exceeded (Queue Overflow)', () => {
    const fullQueue = [1, 2, 3, 4, 5, 6, 7, 8];
    const res = executeQueueEnqueue(fullQueue, 99, 8);
    expect(res.error).toContain('Queue Overflow');
    expect(res.nextItems).toEqual(fullQueue);
  });

  it('dequeues from the front of the queue', () => {
    const res = executeQueueDequeue([10, 20, 30]);
    expect(res.dequeuedValue).toBe(10);
    expect(res.nextItems).toEqual([20, 30]);
  });

  it('handles dequeue on empty queue (Queue Underflow)', () => {
    const res = executeQueueDequeue([]);
    expect(res.error).toContain('Queue Underflow');
    expect(res.nextItems).toEqual([]);
  });

  it('peeks front element without mutating queue', () => {
    const res = executeQueueFront([42, 88, 99]);
    expect(res.frontValue).toBe(42);
    expect(res.nextItems).toEqual([42, 88, 99]);
  });
});

describe('Linked List Data Structure Engine', () => {
  const initialNodes: LinkedListNodeModel[] = [
    { id: '1', value: 10 },
    { id: '2', value: 20 },
  ];

  it('inserts node at head', () => {
    const res = executeListInsertHead(initialNodes, 5);
    expect(res.nextNodes.length).toBe(3);
    expect(res.nextNodes[0].value).toBe(5);
    expect(res.nextNodes[1].value).toBe(10);
  });

  it('inserts node at tail', () => {
    const res = executeListInsertTail(initialNodes, 30);
    expect(res.nextNodes.length).toBe(3);
    expect(res.nextNodes[2].value).toBe(30);
  });

  it('inserts node at middle index', () => {
    const res = executeListInsertAt(initialNodes, 1, 15);
    expect(res.nextNodes.length).toBe(3);
    expect(res.nextNodes.map((n) => n.value)).toEqual([10, 15, 20]);
  });

  it('finds node by value', () => {
    const res = executeListFind(initialNodes, 20);
    expect(res.foundIndex).toBe(1);
    expect(res.error).toBeUndefined();
  });

  it('handles find for nonexistent value', () => {
    const res = executeListFind(initialNodes, 999);
    expect(res.foundIndex).toBe(-1);
    expect(res.error).toContain('not found');
  });

  it('deletes existing node by value', () => {
    const res = executeListDelete(initialNodes, 10);
    expect(res.nextNodes.length).toBe(1);
    expect(res.nextNodes[0].value).toBe(20);
  });

  it('handles deleting nonexistent value', () => {
    const res = executeListDelete(initialNodes, 999);
    expect(res.error).toContain('not found');
    expect(res.nextNodes.length).toBe(2);
  });

  it('reverses the linked list order', () => {
    const res = executeListReverse(initialNodes);
    expect(res.nextNodes.map((n) => n.value)).toEqual([20, 10]);
  });
});
