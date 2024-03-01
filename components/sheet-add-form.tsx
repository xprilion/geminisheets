"use client"

import React, { useState } from 'react';
import { Button } from "@/components";
import { useRouter } from 'next/navigation'

export const SheetAddForm: React.FC = () => {
  const [googleSheetId, setGoogleSheetId] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`/api/sheets/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        google_sheet_id: googleSheetId,
        name: name,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      router.push(`/sheets/${data.id}`);
    } else {
      console.error('Failed to add the Google Sheet');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black max-w-lg">
      <div>
        <label htmlFor="sheetId" className="block text-sm font-medium text-gray-700">
          Google Sheet ID
        </label>
        <input
          type="text"
          id="sheetId"
          value={googleSheetId}
          onChange={(e) => setGoogleSheetId(e.target.value)}
          className="mt-1 block w-full border border-gray-300 p-2 shadow-sm"
          placeholder="e.g., 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
          required
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Sheet Name (Optional)
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 p-2 shadow-sm"
          placeholder="Friendly name for identification"
        />
      </div>

      <Button type="submit" color="blue" variant="filled">
        Add Google Sheet
      </Button>
    </form>
  );
};
