'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  type LinkedListNodeModel,
  executeListInsertHead,
  executeListInsertTail,
  executeListDelete,
  executeListReverse,
} from '@/lib/data-structures';
import { soundEngine } from '@/lib/audio-synthesizer';

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
  const [isMuted, setIsMuted] = useState(() => soundEngine.isMuted());

  const insertHead = useCallback(
    (value: number) => {
      setError(null);
      const res = executeListInsertHead(nodes, value);
      if (res.error) {
        setError(res.error);
        soundEngine.playError();
      } else {
        setNodes(res.nextNodes);
        soundEngine.playInsert(value);
      }
      setOperationLog(res.action);
    },
    [nodes]
  );

  const insertTail = useCallback(
    (value: number) => {
      setError(null);
      const res = executeListInsertTail(nodes, value);
      if (res.error) {
        setError(res.error);
        soundEngine.playError();
      } else {
        setNodes(res.nextNodes);
        soundEngine.playInsert(value);
      }
      setOperationLog(res.action);
    },
    [nodes]
  );

  const deleteNode = useCallback(
    (value: number) => {
      setError(null);
      const res = executeListDelete(nodes, value);
      if (res.error) {
        setError(res.error);
        soundEngine.playError();
      } else {
        setNodes(res.nextNodes);
        soundEngine.playDelete();
      }
      setOperationLog(res.action);
    },
    [nodes]
  );

  const reverseList = useCallback(() => {
    setError(null);
    const res = executeListReverse(nodes);
    setNodes(res.nextNodes);
    soundEngine.playReverse();
    setOperationLog(res.action);
  }, [nodes]);

  const clear = useCallback(() => {
    setNodes([]);
    setError(null);
    soundEngine.playDelete();
    setOperationLog('Linked list cleared (0 nodes)');
  }, []);

  const toggleSound = useCallback(() => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  }, []);

  const handleInsertHeadSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const num = parseInt(inputValue.trim(), 10);
      if (isNaN(num) || num < 1 || num > 999) {
        setError('Enter a number between 1 and 999');
        soundEngine.playError();
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
        soundEngine.playError();
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
        soundEngine.playError();
        return;
      }
      deleteNode(num);
    },
    [deleteValue, deleteNode]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        return;
      }

      if (e.code === 'KeyH') {
        e.preventDefault();
        const randomVal = Math.floor(Math.random() * 90) + 10;
        insertHead(randomVal);
      } else if (e.code === 'KeyT') {
        e.preventDefault();
        const randomVal = Math.floor(Math.random() * 90) + 10;
        insertTail(randomVal);
      } else if (e.code === 'KeyR' && !isDoubly) {
        e.preventDefault();
        reverseList();
      } else if (e.code === 'KeyC') {
        e.preventDefault();
        clear();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        toggleSound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [insertHead, insertTail, reverseList, isDoubly, clear, toggleSound]);

  return {
    nodes,
    operationLog,
    error,
    inputValue,
    isMuted,
    setInputValue,
    deleteValue,
    setDeleteValue,
    insertHead,
    insertTail,
    deleteNode,
    reverseList,
    clear,
    toggleSound,
    handleInsertHeadSubmit,
    handleInsertTailSubmit,
    handleDeleteSubmit,
  };
}
