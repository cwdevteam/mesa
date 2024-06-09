"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  TimelineEvent,
  TimelineFile,
  TimelineFileEvent,
  TimelineTextEvent,
  useTimeline,
} from "@/context/TimelineContext";
import FileButton from "./FileButton";
import FilePreview from "./FilePreview";

function renderEventContent(event: TimelineEvent) {
  if (event.type === "file") {
    const fileEvent = event as TimelineFileEvent;
    return <FilePreview file={fileEvent.content} />;
  }

  if (event.type === "text") {
    const textEvent = event as TimelineTextEvent;
    return <p>{textEvent.content}</p>;
  }

  return null;
}
export default function ProjectTimeline() {
  // Get data from the useTimeline hook
  const { state: events, dispatch } = useTimeline();

  return (
    <div className="relative grid grid-rows-[1fr_auto] gap-6 bg-muted rounded-lg w-full h-full overflow-auto max-w-2xl">
      {/* Timeline events */}
      <div className="grid content-start gap-4 p-6">
        {events.map((event, index) => (
          <Card
            key={index}
            className="rounded-2xl !rounded-br max-w-fit place-self-end"
          >
            <CardHeader>
              <CardTitle>{event.type}</CardTitle>
            </CardHeader>
            <CardContent>{renderEventContent(event)}</CardContent>
          </Card>
        ))}
      </div>

      {/* Timeline inputs */}
      <div className="sticky bottom-0 flex items-center gap-4 p-6 rounded-lg bg-muted">
        <FileButton />
        <Textarea
          placeholder="Add a note..."
          className="flex-1 bg-background text-foreground rounded-2xl resize-none p-4"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey === false) {
              e.preventDefault();
              dispatch({
                type: "add",
                event: { type: "text", content: e.currentTarget.value },
              });
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
    </div>
  );
}
