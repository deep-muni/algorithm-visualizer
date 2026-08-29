'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  type LinkedListNodeModel,
  executeListInsertHead,
  executeListInsertTail,
  executeListInsertAt,
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
  const [searchValue, setSearchValue] = useState<string>('28');
  const [insertIndex, setInsertIndex] = useState<string>('1');

  const [traversingIndex, setTraversingIndex] = useState<number | null>(null);
  const [unlinkingIndex, setUnlinkingIndex] = useState<number | null>(null);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [insertingAtIndex, setInsertingAtIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const [isMuted, setIsMuted] = useState(() => soundEngine.isMuted());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetVisualPointers = useCallback(() => {
    setTraversingIndex(null);
    setUnlinkingIndex(null);
    setFoundIndex(null);
    setInsertingAtIndex(null);
    setIsAnimating(false);
  }, []);

  const insertHead = useCallback(
    (value: number) => {
      if (isAnimating) return;
      resetVisualPointers();
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
    [nodes, isAnimating, resetVisualPointers]
  );

  const insertTail = useCallback(
    (value: number) => {
      if (isAnimating) return;
      resetVisualPointers();
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
    [nodes, isAnimating, resetVisualPointers]
  );

  const insertAt = useCallback(
    (index: number, value: number) => {
      if (isAnimating) return;
      resetVisualPointers();
      setError(null);

      if (index === 0) {
        insertHead(value);
        return;
      }
      if (index >= nodes.length) {
        insertTail(value);
        return;
      }

      setIsAnimating(true);
      let step = 0;
      const targetStep = index;

      const traverseStep = () => {
        if (step < targetStep) {
          setTraversingIndex(step);
          soundEngine.playTone(nodes[step].value, 100, false);
          setOperationLog(
            `Traversing: pointer at node [${step}] (val: ${nodes[step].value}), moving to insert index [${index}]...`
          );
          step++;
          timerRef.current = setTimeout(traverseStep, 450);
        } else {
          setTraversingIndex(null);
          setInsertingAtIndex(index);
          soundEngine.playInsert(value);
          setOperationLog(
            `Rewiring: setting new node(${value}).next = node[${index}] and node[${index - 1}].next = new node...`
          );
          timerRef.current = setTimeout(() => {
            const res = executeListInsertAt(nodes, index, value);
            setNodes(res.nextNodes);
            resetVisualPointers();
            setOperationLog(res.action);
          }, 600);
        }
      };

      traverseStep();
    },
    [nodes, isAnimating, insertHead, insertTail, resetVisualPointers]
  );

  const deleteNode = useCallback(
    (value: number) => {
      if (isAnimating) return;
      resetVisualPointers();
      setError(null);

      if (nodes.length === 0) {
        setError('List is empty, cannot delete');
        soundEngine.playError();
        return;
      }

      const matchIdx = nodes.findIndex((n) => n.value === value);
      setIsAnimating(true);

      let step = 0;
      const maxTraverse = matchIdx !== -1 ? matchIdx : nodes.length - 1;

      const traverseStep = () => {
        if (step <= maxTraverse) {
          setTraversingIndex(step);
          soundEngine.playTone(nodes[step].value, 100, false);
          setOperationLog(
            `Traversing: inspecting node [${step}] with value ${nodes[step].value} (looking for ${value})...`
          );
          step++;
          timerRef.current = setTimeout(traverseStep, 450);
        } else {
          if (matchIdx !== -1) {
            setTraversingIndex(null);
            setUnlinkingIndex(matchIdx);
            soundEngine.playDelete();
            const prevLabel = matchIdx === 0 ? 'HEAD' : `node[${matchIdx - 1}]`;
            const nextLabel =
              matchIdx === nodes.length - 1
                ? 'NULL'
                : `node[${matchIdx + 1}] (${nodes[matchIdx + 1].value})`;
            setOperationLog(
              `Target matched! Unlinking: updating ${prevLabel}.next pointer to point directly to ${nextLabel}...`
            );

            timerRef.current = setTimeout(() => {
              const res = executeListDelete(nodes, value);
              setNodes(res.nextNodes);
              resetVisualPointers();
              setOperationLog(
                `Successfully deleted node with value ${value}. Pointer bridge complete.`
              );
            }, 750);
          } else {
            resetVisualPointers();
            setError(`Value ${value} not found in the list`);
            soundEngine.playError();
            setOperationLog(
              `Traversed full list to NULL: value ${value} does not exist in this linked list.`
            );
          }
        }
      };

      traverseStep();
    },
    [nodes, isAnimating, resetVisualPointers]
  );

  const findValue = useCallback(
    (value: number) => {
      if (isAnimating) return;
      resetVisualPointers();
      setError(null);

      if (nodes.length === 0) {
        setError('List is empty');
        soundEngine.playError();
        return;
      }

      const matchIdx = nodes.findIndex((n) => n.value === value);
      setIsAnimating(true);

      let step = 0;
      const maxTraverse = matchIdx !== -1 ? matchIdx : nodes.length - 1;

      const traverseStep = () => {
        if (step <= maxTraverse) {
          setTraversingIndex(step);
          soundEngine.playTone(nodes[step].value, 100, false);
          setOperationLog(
            `Searching: inspecting node [${step}] (val: ${nodes[step].value}) for target ${value}...`
          );
          step++;
          timerRef.current = setTimeout(traverseStep, 450);
        } else {
          setTraversingIndex(null);
          if (matchIdx !== -1) {
            setFoundIndex(matchIdx);
            soundEngine.playPeek();
            setOperationLog(`FOUND target value ${value} at index [${matchIdx}]!`);
            setIsAnimating(false);
          } else {
            setError(`Value ${value} not found`);
            soundEngine.playError();
            setOperationLog(
              `Traversed to NULL: target value ${value} does not exist in the linked list.`
            );
            setIsAnimating(false);
          }
        }
      };

      traverseStep();
    },
    [nodes, isAnimating, resetVisualPointers]
  );

  const reverseList = useCallback(() => {
    if (isAnimating) return;
    resetVisualPointers();
    setError(null);
    const res = executeListReverse(nodes);
    setNodes(res.nextNodes);
    soundEngine.playReverse();
    setOperationLog(res.action);
  }, [nodes, isAnimating, resetVisualPointers]);

  const clear = useCallback(() => {
    clearTimer();
    resetVisualPointers();
    setNodes([]);
    setError(null);
    soundEngine.playDelete();
    setOperationLog('Linked list cleared (0 nodes)');
  }, [clearTimer, resetVisualPointers]);

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

  const handleInsertAtSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const num = parseInt(inputValue.trim(), 10);
      const idx = parseInt(insertIndex.trim(), 10);
      if (isNaN(num) || num < 1 || num > 999) {
        setError('Enter a number between 1 and 999');
        soundEngine.playError();
        return;
      }
      if (isNaN(idx) || idx < 0 || idx > nodes.length) {
        setError(`Enter an index between 0 and ${nodes.length}`);
        soundEngine.playError();
        return;
      }
      insertAt(idx, num);
      setInputValue(String(Math.floor(Math.random() * 90) + 10));
    },
    [inputValue, insertIndex, nodes.length, insertAt]
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

  const handleFindSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const num = parseInt(searchValue.trim(), 10);
      if (isNaN(num)) {
        setError('Enter a valid node value to find');
        soundEngine.playError();
        return;
      }
      findValue(num);
    },
    [searchValue, findValue]
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
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        const targetVal = parseInt(searchValue.trim(), 10) || (nodes[0]?.value ?? 28);
        findValue(targetVal);
      } else if (e.code === 'KeyD') {
        e.preventDefault();
        const targetVal = parseInt(deleteValue.trim(), 10) || (nodes[0]?.value ?? 28);
        deleteNode(targetVal);
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
      clearTimer();
    };
  }, [
    insertHead,
    insertTail,
    findValue,
    deleteNode,
    reverseList,
    isDoubly,
    clear,
    toggleSound,
    clearTimer,
    searchValue,
    deleteValue,
    nodes,
  ]);

  return {
    nodes,
    operationLog,
    error,
    inputValue,
    isMuted,
    deleteValue,
    searchValue,
    insertIndex,
    traversingIndex,
    unlinkingIndex,
    foundIndex,
    insertingAtIndex,
    isAnimating,
    setInputValue,
    setDeleteValue,
    setSearchValue,
    setInsertIndex,
    insertHead,
    insertTail,
    insertAt,
    deleteNode,
    findValue,
    reverseList,
    clear,
    toggleSound,
    handleInsertHeadSubmit,
    handleInsertTailSubmit,
    handleInsertAtSubmit,
    handleDeleteSubmit,
    handleFindSubmit,
  };
}
