"use client"

import React, { useState } from 'react';
import { Button } from "@/components";

interface GeminiKeyFormProps {
    geminiKey?: string | undefined | null;
}

export function GeminiKeyForm({ geminiKey }: GeminiKeyFormProps) {
    const [editing, setEditing] = useState(false);
    const [newGeminiKey, setNewGeminiKey] = useState(geminiKey);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`/api/account/geminikey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gemini_key: newGeminiKey,
      }),
    });

    if (response.ok) {
        setEditing(false);
    } else {
        alert('Failed to update Gemini key');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black max-w-lg">
        <input
            type="text"
            id="sheetId"
            value={newGeminiKey || ""}
            onChange={(e) => setNewGeminiKey(e.target.value)}
            className="mt-1 block w-full border border-gray-300 p-2 shadow-sm"
            placeholder="e.g., 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
            required
            disabled={!editing}
        />
        {
            editing ? (
                <Button type="submit" color="blue" variant="filled">
                    Save
                </Button>
            ) : (
                <Button type="button" onClick={(e: { preventDefault: () => void; }) => {e.preventDefault(); setEditing(true)}} color="gray">
                    Edit
                </Button>
            )
        }
        
    </form>
  );
};