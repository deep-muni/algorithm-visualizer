'use client';

import { useState, useCallback } from 'react';
import {
  type LinkedListNodeModel,
  executeListInsertHead,
  executeListInsertTail,
  executeListDelete,
  executeListReverse,
} from '@/lib/data-structures';

const initialSampleNodes: LinkedListNodeModel[] = [
  { id: 'node-1', value: 12 },
  { id: 'node-2', value: 28 },
  { id: 'node-3', value: 64 },
];

export function useLinkedListVisualizer(isDoubly = false) {
  const [nodes, setNodes] = useState<LinkedListNodeModel[]>(initialSampleNodes);
  const [operationLog, setOperationLog] = useState<string>(
    `${isDoubly ? 'Doubly' : 'Singly'} Linked List initialized`
  );
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('55');
  const [deleteValue, setDeleteValue] = useState<string>('28');

  const insertHead = useCallback(
    (value: number) => {
      setError(null);
      const res = executeListInsertHead(nodes, value);
      if (res.error) setError(res.error);
      else setNodes(res.nextNodes);
      setOperationLog(res.action);
    },
    [nodes]
  );

  const insertTail = useCallback(
    (value: number) => {
      setError(null);
      const res = executeListInsertTail(nodes, value);
      if (res.error) setError(res.error);
      else setNodes(res.nextNodes);
      setOperationLog(res.action);
    },
    [nodes]
  );

  const deleteNode = useCallback(
    (value: number) => {
      setError(null);
      const res = executeListDelete(nodes, value);
      if (res.error) setError(res.error);
      else setNodes(res.nextNodes);
      setOperationLog(res.action);
    },
    [nodes]
  );

  const reverseList = useCallback(() => {
    setError(null);
    const res = executeListReverse(nodes);
    setNodes(res.nextNodes);
    setOperationLog(res.action);
  }, [nodes]);

  const clear = useCallback(() => {
    setNodes([]);
    setError(null);
    setOperationLog('Linked list cleared (0 nodes)');
  }, []);

  const handleInsertHeadSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const num = parseInt(inputValue.trim(), 10);
      if (isNaN(num) || num < 1 || num > 999) {
        setError('Enter a number between 1 and 999');
        return;
      }
      insertHead(num);
      setInputValue(String(Math.floor(Math.random() * 90) + 10));
    },
    [inputValue, insertHead]
  );

  const handleInsertTailSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const num = parseInt(inputValue.trim(), 10);
      if (isNaN(num) || num < 1 || num > 999) {
        setError('Enter a number between 1 and 999');
        return;
      }
      insertTail(num);
      setInputValue(String(Math.floor(Math.random() * 90) + 10));
    },
    [inputValue, insertTail]
  );

  const handleDeleteSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const num = parseInt(deleteValue.trim(), 10);
      if (isNaN(num)) {
        setError('Enter a valid node value to delete');
        return;
      }
      deleteNode(num);
    },
    [deleteValue, deleteNode]
  );

  return {
    nodes,
    operationLog,
    error,
    inputValue,
    setInputValue,
    deleteValue,
    setDeleteValue,
    insertHead,
    insertTail,
    deleteNode,
    reverseList,
    clear,
    handleInsertHeadSubmit,
    handleInsertTailSubmit,
    handleDeleteSubmit,
  };
}
