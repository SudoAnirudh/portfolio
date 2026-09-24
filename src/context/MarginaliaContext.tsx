"use client";

import React, { createContext, useContext, useState } from "react";

export interface Note {
  id: string;
  number: number;
  title?: string;
  text: string;
  tradeoff?: string;
}

interface MarginaliaContextType {
  activeNote: Note | null;
  setActiveNote: (note: Note | null) => void;
  notes: Record<string, Note>;
  registerNote: (note: Note) => void;
}

const MarginaliaContext = createContext<MarginaliaContextType | undefined>(undefined);

export function MarginaliaProvider({ children }: { children: React.ReactNode }) {
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Record<string, Note>>({});

  const registerNote = (note: Note) => {
    setNotes((prev) => ({ ...prev, [note.id]: note }));
  };

  return (
    <MarginaliaContext.Provider value={{ activeNote, setActiveNote, notes, registerNote }}>
      {children}
    </MarginaliaContext.Provider>
  );
}

export function useMarginalia() {
  const context = useContext(MarginaliaContext);
  if (!context) {
    throw new Error("useMarginalia must be used within a MarginaliaProvider");
  }
  return context;
}
