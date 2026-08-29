'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  type LinkedListNodeModel,
  executeListInsertHead,
  executeListInsertTail,
  executeListInsertAt,
  executeListDelete,
  executeListDeleteHead,
  executeListReverse,
} from '@/lib/data-structures';
import { soundEngine } from '@/lib/audio-synthesizer';

const initialSampleNodes: LinkedListNodeModel[] = [
  { id: 'node-1', value: 12 },
  { id: 'node-2', value: 28 },
  { id: 'node-3', value: 64 },
];

export type VisualizerSpeed = 0.5 | 1 | 2;
export type VisualizerTab = 'insert' | 'search' | 'delete' | 'utils';

const SPEED_DELAYS: Record<VisualizerSpeed, number> = {
  0.5: 500,
  1: 300,
  2: 140,
};

function getInitialNodes(): LinkedListNodeModel[] {
  if (typeof window === 'undefined') return initialSampleNodes;
  const params = new URLSearchParams(window.location.search);
  const nodesParam = params.get('nodes') || params.get('data');
  if (nodesParam) {
    const parsed = nodesParam
      .split(/[, ]+/)
      .map(Number)
      .filter((n) => !isNaN(n) && n > 0 && n <= 999);
    if (parsed.length > 0 && parsed.length <= 7) {
      return parsed.map((val, i) => ({ id: `node-${Date.now()}-${i}`, value: val }));
    }
  }
  return initialSampleNodes;
}

export function useLinkedListVisualizer(isDoubly = false) {
  const [nodes, setNodes] = useState<LinkedListNodeModel[]>(getInitialNodes);
  const [operationLog, setOperationLog] = useState<string>(
    `${isDoubly ? 'Doubly' : 'Singly'} Linked List ready. Select an operation tab below.`
  );
  const [activeTab, setActiveTab] = useState<VisualizerTab>('insert');
  const [speed, setSpeed] = useState<VisualizerSpeed>(1);
  const [currentComplexity, setCurrentComplexity] = useState<string>('O(1)');
  const [error, setError] = useState<string | null>(null);

  const [insertValue, setInsertValue] = useState<string>('50');
  const [insertAtValue, setInsertAtValue] = useState<string>('35');
  const [insertIndex, setInsertIndex] = useState<string>('1');
  const [deleteValue, setDeleteValue] = useState<string>('28');
  const [deleteIndex, setDeleteIndex] = useState<string>('1');
  const [searchValue, setSearchValue] = useState<string>('28');
  const [searchIndex, setSearchIndex] = useState<string>('1');

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
  const speedRef = useRef(speed);

  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);

  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

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
      setCurrentComplexity('O(1)');
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
      setCurrentComplexity(isDoubly ? 'O(1)' : 'O(n)');
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
    [clearTimer, resetVisualPointers, isDoubly]
  );

  const insertRandom = useCallback(() => {
    if (isAnimatingRef.current) return;
    const randomVal = Math.floor(Math.random() * 90) + 10;
    insertTail(randomVal);
  }, [insertTail]);

  const insertAt = useCallback(
    (index: number, value: number) => {
      if (isAnimatingRef.current) return;
      clearTimer();
      resetVisualPointers();
      setError(null);
      setCurrentComplexity('O(n)');

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
      const stepDelay = SPEED_DELAYS[speedRef.current];

      const runStep = () => {
        if (step < targetStep) {
          setTraversingIndex(step);
          soundEngine.playTone(currentList[step]?.value ?? 50, 100, false);
          setOperationLog(
            `Traversing [Step ${step + 1}/${targetStep}]: pointer at node [${step}] (val: ${currentList[step]?.value}), moving to insert index [${index}]...`
          );
          step++;
          timerRef.current = setTimeout(runStep, stepDelay);
        } else {
          setTraversingIndex(null);
          setInsertingAtIndex(index);
          setAnimatingStatus('Wiring new node pointers...');
          soundEngine.playInsert(value);
          setOperationLog(
            `Rewiring: setting new node (${value}).next = node[${index}] and node[${index - 1}].next = new node...`
          );
          timerRef.current = setTimeout(
            () => {
              const res = executeListInsertAt(nodesRef.current, index, value);
              setNodes(res.nextNodes);
              resetVisualPointers();
              setOperationLog(res.action);
            },
            Math.floor(stepDelay * 1.4)
          );
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
      setCurrentComplexity('O(n)');

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
      const stepDelay = SPEED_DELAYS[speedRef.current];

      const runStep = () => {
        if (step <= maxTraverse) {
          setTraversingIndex(step);
          soundEngine.playTone(currentList[step]?.value ?? 50, 100, false);
          setOperationLog(
            `Traversing [Step ${step + 1}/${maxTraverse + 1}]: inspecting node [${step}] with value ${currentList[step]?.value}...`
          );
          step++;
          timerRef.current = setTimeout(runStep, stepDelay);
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

            timerRef.current = setTimeout(
              () => {
                const res = executeListDelete(nodesRef.current, value);
                setNodes(res.nextNodes);
                resetVisualPointers();
                setOperationLog(
                  `Successfully unlinked and deleted node ${value}. Pointer bridge complete.`
                );
              },
              Math.floor(stepDelay * 1.6)
            );
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

  const deleteHead = useCallback(() => {
    if (isAnimatingRef.current) return;
    clearTimer();
    resetVisualPointers();
    setError(null);
    setCurrentComplexity('O(1)');
    const res = executeListDeleteHead(nodesRef.current);
    if (res.error) {
      setError(res.error);
      soundEngine.playError();
    } else {
      setNodes(res.nextNodes);
      soundEngine.playDelete();
    }
    setOperationLog(res.action);
  }, [clearTimer, resetVisualPointers]);

  const deleteTail = useCallback(() => {
    if (isAnimatingRef.current) return;
    clearTimer();
    resetVisualPointers();
    setError(null);
    setCurrentComplexity(isDoubly ? 'O(1)' : 'O(n)');

    const currentList = [...nodesRef.current];
    if (currentList.length === 0) {
      setError('List is empty');
      soundEngine.playError();
      return;
    }

    const lastIdx = currentList.length - 1;
    const targetVal = currentList[lastIdx].value;
    deleteNode(targetVal);
  }, [clearTimer, resetVisualPointers, isDoubly, deleteNode]);

  const deleteAt = useCallback(
    (index: number) => {
      if (isAnimatingRef.current) return;
      clearTimer();
      resetVisualPointers();
      setError(null);
      setCurrentComplexity('O(n)');

      const currentList = [...nodesRef.current];
      if (index < 0 || index >= currentList.length) {
        setError(`Index [${index}] out of bounds`);
        soundEngine.playError();
        return;
      }
      const targetVal = currentList[index].value;
      deleteNode(targetVal);
    },
    [clearTimer, resetVisualPointers, deleteNode]
  );

  const findValue = useCallback(
    (value: number) => {
      if (isAnimatingRef.current) return;
      clearTimer();
      resetVisualPointers();
      setError(null);
      setCurrentComplexity('O(n)');

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
      const stepDelay = SPEED_DELAYS[speedRef.current];

      const runStep = () => {
        if (step <= maxTraverse) {
          setTraversingIndex(step);
          soundEngine.playTone(currentList[step]?.value ?? 50, 100, false);
          setOperationLog(
            `Searching [Step ${step + 1}/${maxTraverse + 1}]: inspecting node [${step}] (value: ${currentList[step]?.value}) for target ${value}...`
          );
          step++;
          timerRef.current = setTimeout(runStep, stepDelay);
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

  const getAt = useCallback(
    (index: number) => {
      if (isAnimatingRef.current) return;
      clearTimer();
      resetVisualPointers();
      setError(null);
      setCurrentComplexity('O(n)');

      const currentList = [...nodesRef.current];
      if (index < 0 || index >= currentList.length) {
        setError(`Index [${index}] out of bounds (0 to ${currentList.length - 1})`);
        soundEngine.playError();
        return;
      }

      setIsAnimating(true);
      setAnimatingStatus('Traversing to index...');
      let step = 0;
      const targetStep = index;
      const stepDelay = SPEED_DELAYS[speedRef.current];

      const runStep = () => {
        if (step <= targetStep) {
          setTraversingIndex(step);
          soundEngine.playTone(currentList[step]?.value ?? 50, 100, false);
          setOperationLog(
            `Traversing [Step ${step + 1}/${targetStep + 1}]: inspecting node [${step}]...`
          );
          step++;
          timerRef.current = setTimeout(runStep, stepDelay);
        } else {
          setTraversingIndex(null);
          setFoundIndex(index);
          setAnimatingStatus('Node located!');
          soundEngine.playPeek();
          setOperationLog(`✓ Node at index [${index}] contains value ${currentList[index].value}`);
          setIsAnimating(false);
        }
      };

      runStep();
    },
    [clearTimer, resetVisualPointers]
  );

  const peekHead = useCallback(() => {
    if (nodesRef.current.length === 0) {
      setError('List is empty');
      soundEngine.playError();
      return;
    }
    resetVisualPointers();
    setFoundIndex(0);
    setCurrentComplexity('O(1)');
    soundEngine.playPeek();
    setOperationLog(`HEAD node is [0] with value ${nodesRef.current[0].value}`);
  }, [resetVisualPointers]);

  const peekTail = useCallback(() => {
    if (nodesRef.current.length === 0) {
      setError('List is empty');
      soundEngine.playError();
      return;
    }
    resetVisualPointers();
    const lastIdx = nodesRef.current.length - 1;
    setFoundIndex(lastIdx);
    setCurrentComplexity(isDoubly ? 'O(1)' : 'O(n)');
    soundEngine.playPeek();
    setOperationLog(`TAIL node is [${lastIdx}] with value ${nodesRef.current[lastIdx].value}`);
  }, [resetVisualPointers, isDoubly]);

  const fillRandomSample = useCallback(() => {
    if (isAnimatingRef.current) return;
    clearTimer();
    resetVisualPointers();
    setError(null);
    const samples: LinkedListNodeModel[] = [
      { id: `node-${Date.now()}-1`, value: Math.floor(Math.random() * 80) + 10 },
      { id: `node-${Date.now()}-2`, value: Math.floor(Math.random() * 80) + 10 },
      { id: `node-${Date.now()}-3`, value: Math.floor(Math.random() * 80) + 10 },
      { id: `node-${Date.now()}-4`, value: Math.floor(Math.random() * 80) + 10 },
    ];
    setNodes(samples);
    soundEngine.playInsert(samples[0].value);
    setOperationLog('Generated 4 fresh random sample nodes');
  }, [clearTimer, resetVisualPointers]);

  const reverseList = useCallback(() => {
    if (isAnimatingRef.current) return;
    clearTimer();
    resetVisualPointers();
    setError(null);
    setCurrentComplexity('O(n)');
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

  const handleDeleteAtSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const idx = parseInt(deleteIndex.trim(), 10);
      if (isNaN(idx)) {
        setError('Enter a valid index to delete');
        soundEngine.playError();
        return;
      }
      deleteAt(idx);
    },
    [deleteIndex, deleteAt]
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

  const handleGetAtSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const idx = parseInt(searchIndex.trim(), 10);
      if (isNaN(idx)) {
        setError('Enter a valid index');
        soundEngine.playError();
        return;
      }
      getAt(idx);
    },
    [searchIndex, getAt]
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
    activeTab,
    speed,
    currentComplexity,
    error,
    insertValue,
    insertAtValue,
    deleteValue,
    deleteIndex,
    searchValue,
    searchIndex,
    insertIndex,
    traversingIndex,
    unlinkingIndex,
    foundIndex,
    insertingAtIndex,
    animatingStatus,
    isAnimating,
    isMuted,
    setActiveTab,
    setSpeed,
    setInsertValue,
    setInsertAtValue,
    setDeleteValue,
    setDeleteIndex,
    setSearchValue,
    setSearchIndex,
    setInsertIndex,
    insertHead,
    insertTail,
    insertAt,
    insertRandom,
    deleteNode,
    deleteHead,
    deleteTail,
    deleteAt,
    findValue,
    getAt,
    peekHead,
    peekTail,
    fillRandomSample,
    reverseList,
    clear,
    toggleSound,
    handleInsertHead,
    handleInsertTail,
    handleInsertAtSubmit,
    handleDeleteSubmit,
    handleDeleteAtSubmit,
    handleFindSubmit,
    handleGetAtSubmit,
  };
}
