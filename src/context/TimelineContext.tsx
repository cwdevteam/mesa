"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

export type TimelineFile = { name: string; data: string; type: string };
export type TimelineFileEvent = { type: "file"; content: TimelineFile };
export type TimelineTextEvent = { type: "text"; content: string };
export type TimelineEvent = TimelineFileEvent | TimelineTextEvent;
export type TimelineAction = { type: "add"; event: TimelineEvent };

function timelineReducer(state: TimelineEvent[], action: TimelineAction) {
  switch (action.type) {
    case "add":
      return [...state, action.event];
    default:
      return state;
  }
}

const TimelineContext = createContext<{
  state: TimelineEvent[];
  dispatch: React.Dispatch<TimelineAction>;
}>({ state: [], dispatch: () => undefined });

export function TimelineProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(timelineReducer, []);

  return (
    <TimelineContext.Provider value={{ state, dispatch }}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  const context = useContext(TimelineContext);
  if (typeof context === "undefined") {
    throw new Error("useTimeline must be used within a TimelineProvider");
  }
  return context;
}
