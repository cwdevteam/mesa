'use client'

import { FilePlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useTimeline } from "@/context/TimelineContext";

import React, { useCallback } from 'react';

export default function FileButton() {
  const { dispatch } = useTimeline();

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = function () {
        if (typeof reader.result === 'string') {
          const base64data = reader.result;
          dispatch({type: "add", event: { type: 'file', content: { name: file.name, data: base64data, type: file.type }}});
        } else {
          // Handle the case when reader.result is not a string
          console.error('File could not be read as a data URL.');
        }
      }
      reader.readAsDataURL(file);
    }
  }, [dispatch]);

  return (
    <div>
      <Button size="icon" className="rounded-full" onClick={
        () => document.getElementById('fileInput')?.click()
      }>
        <FilePlusIcon className="h-4 w-4" />
      </Button>
      <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
    </div>

  )
}