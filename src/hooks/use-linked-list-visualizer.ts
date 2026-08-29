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
    `${isDoubly ? 'Doubly' : 'Singly'} Linked List ready. Enter a value and select an operation.`
  );
  const [error, setError] = useState<string | null>(null);

  const [insertValue, setInsertValue] = useState<string>('50');
  const [insertAtValue, setInsertAtValue] = useState<string>('35');
  const [insertIndex, setInsertIndex] = useState<string>('1');
  const [deleteValue, setDeleteValue] = useState<string>('28');
  const [searchValue, setSearchValue] = useState<string>('28');

  const [traversingIndex, setTraversingIndex] = useState<number | null>(null);
  const [unlinkingIndex, setUnlinkingIndex] = useState<number | null>(null);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [insertingAtIndex, setInsertingAtIndex] = useState<number | null>(null);
  const [animatingStatus, setAnimatingStatus] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const [isMuted, setIsMuted] = useState(() => soundEngine.isMuted());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nodesRef = useRef(nodes);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);

  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const resetVisualPointers = useCallback(() => {
    setTraversingIndex(null);
    setUnlinkingIndex(null);
    setFoundIndex(null);
    setInsertingAtIndex(null);
    setAnimatingStatus(null);
    setIsAnimating(false);
  }, []);

  const insertHead = useCallback(
    (value: number) => {
      if (isAnimatingRef.current) return;
      clearTimer();
      resetVisualPointers();
      setError(null);
      const res = executeListInsertHead(nodesRef.current, value);
      if (res.error) {
        setError(res.error);
        soundEngine.playError();
      } else {
        setNodes(res.nextNodes);
        soundEngine.playInsert(value);
      }
      setOperationLog(res.action);
    },
    [clearTimer, resetVisualPointers]
  );

  const insertTail = useCallback(
    (value: number) => {
      if (isAnimatingRef.current) return;
      clearTimer();
      resetVisualPointers();
      setError(null);
      const res = executeListInsertTail(nodesRef.current, value);
      if (res.error) {
        setError(res.error);
        soundEngine.playError();
      } else {
        setNodes(res.nextNodes);
        soundEngine.playInsert(value);
      }
      setOperationLog(res.action);
    },
    [clearTimer, resetVisualPointers]
  );

  const insertAt = useCallback(
    (index: number, value: number) => {
      if (isAnimatingRef.current) return;
      clearTimer();
      resetVisualPointers();
      setError(null);

      const currentList = [...nodesRef.current];
      if (index === 0) {
        insertHead(value);
        return;
      }
      if (index >= currentList.length) {
        insertTail(value);
        return;
      }

      setIsAnimating(true);
      setAnimatingStatus('Traversing to index...');
      let step = 0;
      const targetStep = index;

      const runStep = () => {
        if (step < targetStep) {
          setTraversingIndex(step);
          soundEngine.playTone(currentList[step]?.value ?? 50, 100, false);
          setOperationLog(
            `Traversing [Step ${step + 1}/${targetStep}]: pointer at node [${step}] (val: ${currentList[step]?.value}), moving to insert index [${index}]...`
          );
          step++;
          timerRef.current = setTimeout(runStep, 350);
        } else {
          setTraversingIndex(null);
          setInsertingAtIndex(index);
          setAnimatingStatus('Wiring new node pointers...');
          soundEngine.playInsert(value);
          setOperationLog(
            `Rewiring: setting new node (${value}).next = node[${index}] and node[${index - 1}].next = new node...`
          );
          timerRef.current = setTimeout(() => {
            const res = executeListInsertAt(nodesRef.current, index, value);
            setNodes(res.nextNodes);
            resetVisualPointers();
            setOperationLog(res.action);
          }, 500);
        }
      };

      runStep();
    },
    [clearTimer, resetVisualPointers, insertHead, insertTail]
  );

  const deleteNode = useCallback(
    (value: number) => {
      if (isAnimatingRef.current) return;
      clearTimer();
      resetVisualPointers();
      setError(null);

      const currentList = [...nodesRef.current];
      if (currentList.length === 0) {
        setError('List is empty, cannot delete');
        soundEngine.playError();
        return;
      }

      const matchIdx = currentList.findIndex((n) => n.value === value);
      setIsAnimating(true);
      setAnimatingStatus('Auto-traversing to find target...');

      let step = 0;
      const maxTraverse = matchIdx !== -1 ? matchIdx : currentList.length - 1;

      const runStep = () => {
        if (step <= maxTraverse) {
          setTraversingIndex(step);
          soundEngine.playTone(currentList[step]?.value ?? 50, 100, false);
          setOperationLog(
            `Traversing [Step ${step + 1}/${maxTraverse + 1}]: inspecting node [${step}] with value ${currentList[step]?.value}...`
          );
          step++;
          timerRef.current = setTimeout(runStep, 350);
        } else {
          if (matchIdx !== -1) {
            setTraversingIndex(null);
            setUnlinkingIndex(matchIdx);
            setAnimatingStatus('Unlinking pointer bridge...');
            soundEngine.playDelete();
            const prevLabel = matchIdx === 0 ? 'HEAD' : `node[${matchIdx - 1}]`;
            const nextLabel =
              matchIdx === currentList.length - 1
                ? 'NULL'
                : `node[${matchIdx + 1}] (${currentList[matchIdx + 1].value})`;
            setOperationLog(
              `Target ${value} found at [${matchIdx}]! Unlinking: updating ${prevLabel}.next pointer to skip to ${nextLabel}...`
            );

            timerRef.current = setTimeout(() => {
              const res = executeListDelete(nodesRef.current, value);
              setNodes(res.nextNodes);
              resetVisualPointers();
              setOperationLog(
                `Successfully unlinked and deleted node ${value}. Pointer bridge complete.`
              );
            }, 600);
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

      runStep();
    },
    [clearTimer, resetVisualPointers]
  );

  const findValue = useCallback(
    (value: number) => {
      if (isAnimatingRef.current) return;
      clearTimer();
      resetVisualPointers();
      setError(null);

      const currentList = [...nodesRef.current];
      if (currentList.length === 0) {
        setError('List is empty');
        soundEngine.playError();
        return;
      }

      const matchIdx = currentList.findIndex((n) => n.value === value);
      setIsAnimating(true);
      setAnimatingStatus('Searching node by node...');

      let step = 0;
      const maxTraverse = matchIdx !== -1 ? matchIdx : currentList.length - 1;

      const runStep = () => {
        if (step <= maxTraverse) {
          setTraversingIndex(step);
          soundEngine.playTone(currentList[step]?.value ?? 50, 100, false);
          setOperationLog(
            `Searching [Step ${step + 1}/${maxTraverse + 1}]: inspecting node [${step}] (value: ${currentList[step]?.value}) for target ${value}...`
          );
          step++;
          timerRef.current = setTimeout(runStep, 350);
        } else {
          setTraversingIndex(null);
          if (matchIdx !== -1) {
            setFoundIndex(matchIdx);
            setAnimatingStatus('Target node located!');
            soundEngine.playPeek();
            setOperationLog(`✓ FOUND target value ${value} at index [${matchIdx}]!`);
            setIsAnimating(false);
          } else {
            setError(`Value ${value} not found`);
            soundEngine.playError();
            setOperationLog(
              `Traversed to NULL: target value ${value} does not exist in the linked list.`
            );
            resetVisualPointers();
          }
        }
      };

      runStep();
    },
    [clearTimer, resetVisualPointers]
  );

  const reverseList = useCallback(() => {
    if (isAnimatingRef.current) return;
    clearTimer();
    resetVisualPointers();
    setError(null);
    const res = executeListReverse(nodesRef.current);
    setNodes(res.nextNodes);
    soundEngine.playReverse();
    setOperationLog(res.action);
  }, [clearTimer, resetVisualPointers]);

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

  const handleInsertHead = useCallback(() => {
    const num = parseInt(insertValue.trim(), 10);
    if (isNaN(num) || num < 1 || num > 999) {
      setError('Enter a number between 1 and 999');
      soundEngine.playError();
      return;
    }
    insertHead(num);
    setInsertValue(String(Math.floor(Math.random() * 90) + 10));
  }, [insertValue, insertHead]);

  const handleInsertTail = useCallback(() => {
    const num = parseInt(insertValue.trim(), 10);
    if (isNaN(num) || num < 1 || num > 999) {
      setError('Enter a number between 1 and 999');
      soundEngine.playError();
      return;
    }
    insertTail(num);
    setInsertValue(String(Math.floor(Math.random() * 90) + 10));
  }, [insertValue, insertTail]);

  const handleInsertAtSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const num = parseInt(insertAtValue.trim(), 10);
      const idx = parseInt(insertIndex.trim(), 10);
      if (isNaN(num) || num < 1 || num > 999) {
        setError('Enter a valid node value (1-999)');
        soundEngine.playError();
        return;
      }
      if (isNaN(idx) || idx < 0 || idx > nodesRef.current.length) {
        setError(`Enter an index between 0 and ${nodesRef.current.length}`);
        soundEngine.playError();
        return;
      }
      insertAt(idx, num);
      setInsertAtValue(String(Math.floor(Math.random() * 90) + 10));
    },
    [insertAtValue, insertIndex, insertAt]
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

  const keyHandlerRef = useRef({
    insertHead,
    insertTail,
    findValue,
    deleteNode,
    reverseList,
    clear,
    toggleSound,
    isDoubly,
    insertValue,
    searchValue,
    deleteValue,
  });

  useEffect(() => {
    keyHandlerRef.current = {
      insertHead,
      insertTail,
      findValue,
      deleteNode,
      reverseList,
      clear,
      toggleSound,
      isDoubly,
      insertValue,
      searchValue,
      deleteValue,
    };
  });

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

      const h = keyHandlerRef.current;
      if (e.code === 'KeyH') {
        e.preventDefault();
        const val = parseInt(h.insertValue.trim(), 10) || Math.floor(Math.random() * 90) + 10;
        h.insertHead(val);
      } else if (e.code === 'KeyT') {
        e.preventDefault();
        const val = parseInt(h.insertValue.trim(), 10) || Math.floor(Math.random() * 90) + 10;
        h.insertTail(val);
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        const targetVal = parseInt(h.searchValue.trim(), 10) || (nodesRef.current[0]?.value ?? 28);
        h.findValue(targetVal);
      } else if (e.code === 'KeyD') {
        e.preventDefault();
        const targetVal = parseInt(h.deleteValue.trim(), 10) || (nodesRef.current[0]?.value ?? 28);
        h.deleteNode(targetVal);
      } else if (e.code === 'KeyR' && !h.isDoubly) {
        e.preventDefault();
        h.reverseList();
      } else if (e.code === 'KeyC') {
        e.preventDefault();
        h.clear();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        h.toggleSound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return {
    nodes,
    operationLog,
    error,
    insertValue,
    insertAtValue,
    deleteValue,
    searchValue,
    insertIndex,
    traversingIndex,
    unlinkingIndex,
    foundIndex,
    insertingAtIndex,
    animatingStatus,
    isAnimating,
    isMuted,
    setInsertValue,
    setInsertAtValue,
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
    handleInsertHead,
    handleInsertTail,
    handleInsertAtSubmit,
    handleDeleteSubmit,
    handleFindSubmit,
  };
}
