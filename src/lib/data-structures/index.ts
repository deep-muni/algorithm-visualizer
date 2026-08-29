export interface StackOperationResult {
  nextItems: number[];
  poppedValue?: number;
  peekedValue?: number;
  action: string;
  error?: string;
}

export function executeStackPush(
  items: number[],
  value: number,
  maxCapacity = 8
): StackOperationResult {
  if (items.length >= maxCapacity) {
    return {
      nextItems: items,
      action: `Stack Overflow: maximum capacity of ${maxCapacity} reached`,
      error: `Stack Overflow (Max ${maxCapacity} items)`,
    };
  }
  const nextItems = [...items, value];
  return {
    nextItems,
    action: `Pushed ${value} onto the top of the stack (size: ${nextItems.length})`,
  };
}

export function executeStackPop(items: number[]): StackOperationResult {
  if (items.length === 0) {
    return {
      nextItems: items,
      action: 'Stack Underflow: cannot pop from an empty stack',
      error: 'Stack Underflow (Stack is empty)',
    };
  }
  const poppedValue = items[items.length - 1];
  const nextItems = items.slice(0, items.length - 1);
  return {
    nextItems,
    poppedValue,
    action: `Popped ${poppedValue} from the top of the stack (remaining: ${nextItems.length})`,
  };
}

export function executeStackPeek(items: number[]): StackOperationResult {
  if (items.length === 0) {
    return {
      nextItems: items,
      action: 'Stack is empty, nothing to peek',
      error: 'Stack is empty',
    };
  }
  const peekedValue = items[items.length - 1];
  return {
    nextItems: items,
    peekedValue,
    action: `Top element is ${peekedValue}`,
  };
}

export interface QueueOperationResult {
  nextItems: number[];
  dequeuedValue?: number;
  frontValue?: number;
  action: string;
  error?: string;
}

export function executeQueueEnqueue(
  items: number[],
  value: number,
  maxCapacity = 8
): QueueOperationResult {
  if (items.length >= maxCapacity) {
    return {
      nextItems: items,
      action: `Queue Overflow: maximum capacity of ${maxCapacity} reached`,
      error: `Queue Overflow (Max ${maxCapacity} items)`,
    };
  }
  const nextItems = [...items, value];
  return {
    nextItems,
    action: `Enqueued ${value} at the rear (size: ${nextItems.length})`,
  };
}

export function executeQueueDequeue(items: number[]): QueueOperationResult {
  if (items.length === 0) {
    return {
      nextItems: items,
      action: 'Queue Underflow: cannot dequeue from an empty queue',
      error: 'Queue Underflow (Queue is empty)',
    };
  }
  const dequeuedValue = items[0];
  const nextItems = items.slice(1);
  return {
    nextItems,
    dequeuedValue,
    action: `Dequeued ${dequeuedValue} from the front (remaining: ${nextItems.length})`,
  };
}

export function executeQueueFront(items: number[]): QueueOperationResult {
  if (items.length === 0) {
    return {
      nextItems: items,
      action: 'Queue is empty, no front element',
      error: 'Queue is empty',
    };
  }
  const frontValue = items[0];
  return {
    nextItems: items,
    frontValue,
    action: `Front element is ${frontValue}`,
  };
}

export interface LinkedListNodeModel {
  id: string;
  value: number;
}

export interface LinkedListOperationResult {
  nextNodes: LinkedListNodeModel[];
  action: string;
  error?: string;
}

export function executeListInsertHead(
  nodes: LinkedListNodeModel[],
  value: number,
  maxCapacity = 7
): LinkedListOperationResult {
  if (nodes.length >= maxCapacity) {
    return {
      nextNodes: nodes,
      action: `List limit reached (${maxCapacity} nodes max for visualization)`,
      error: `Max limit (${maxCapacity}) reached`,
    };
  }
  const newNode: LinkedListNodeModel = {
    id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    value,
  };
  const nextNodes = [newNode, ...nodes];
  return {
    nextNodes,
    action: `Inserted node with value ${value} at the HEAD`,
  };
}

export function executeListInsertTail(
  nodes: LinkedListNodeModel[],
  value: number,
  maxCapacity = 7
): LinkedListOperationResult {
  if (nodes.length >= maxCapacity) {
    return {
      nextNodes: nodes,
      action: `List limit reached (${maxCapacity} nodes max for visualization)`,
      error: `Max limit (${maxCapacity}) reached`,
    };
  }
  const newNode: LinkedListNodeModel = {
    id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    value,
  };
  const nextNodes = [...nodes, newNode];
  return {
    nextNodes,
    action: `Appended node with value ${value} at the TAIL`,
  };
}

export function executeListDelete(
  nodes: LinkedListNodeModel[],
  value: number
): LinkedListOperationResult {
  const index = nodes.findIndex((n) => n.value === value);
  if (index === -1) {
    return {
      nextNodes: nodes,
      action: `Node with value ${value} not found in the list`,
      error: `Value ${value} not found`,
    };
  }
  const nextNodes = nodes.filter((_, i) => i !== index);
  return {
    nextNodes,
    action: `Deleted first occurrence of node with value ${value}`,
  };
}

export function executeListReverse(nodes: LinkedListNodeModel[]): LinkedListOperationResult {
  if (nodes.length <= 1) {
    return {
      nextNodes: nodes,
      action: 'List has 1 or fewer elements, reverse has no effect',
    };
  }
  const nextNodes = [...nodes].reverse();
  return {
    nextNodes,
    action: 'Reversed pointer directions of all linked nodes',
  };
}
