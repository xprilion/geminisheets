"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Select } from "@/components";

interface FunctionInstallFormProps {
    functionId: string;
    sheets: any;
}

export function FunctionInstallPage({ functionId, sheets }: FunctionInstallFormProps) {
    const [selectedSheet, setSelectedSheet] = useState('');
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSheet) {
      alert('Please select a sheet.');
      return;
    }

    const response = await fetch(`/api/functions/install`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        function_id: functionId,
        sheet_id: selectedSheet,
      }),
    });

    if (response.ok) {
        const data = await response.json();
      router.push(`/functions/${functionId}`);
    } else {
      alert('Failed to associate the function with the selected Google Sheet.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black max-w-lg">
      <label htmlFor="sheetSelect" className="block text-sm font-medium text-gray-700">
        Select Google Sheet
      </label>
      <select
        id="sheetSelect"
        value={selectedSheet}
        onChange={(e) => setSelectedSheet(e.target.value)}
        className="mt-1 block w-full border border-gray-300 p-2 shadow-sm"
        required
      >
        <option value="">Select a sheet</option>
        {sheets.map((sheet: any) => (
          <option key={sheet.id} value={sheet.id}>
            {sheet.name}
          </option>
        ))}
      </select>

      <Button type="submit">
        Install Function
      </Button>
    </form>
  );
};