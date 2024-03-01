"use client"

import { HttpMethod } from '@/types/http';
import React, { useState } from 'react';
import { Button } from "@/components";
import { useRouter } from 'next/router';

interface InputField {
  name: string;
  type: string;
}

const inputTypes = [
  { label: 'String', value: 'string' },
  { label: 'Number', value: 'number' },
  { label: 'Boolean', value: 'boolean' },
];

export const FunctionAddForm: React.FC = () => {
  const [functionName, setFunctionName] = useState('');
  const [description, setDescription] = useState('');
  const [inputs, setInputs] = useState<InputField[]>([{ name: '', type: inputTypes[0].value }]);
  const [logic, setLogic] = useState('');

  const router = useRouter();

  const handleAddInput = () => {
    setInputs([...inputs, { name: '', type: inputTypes[0].value }]);
  };

  const handleInputChange = (index: number, field: keyof InputField, value: string) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const handleRemoveInput = (index: number) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/functions/add`, {
        method: HttpMethod.POST,
        body: JSON.stringify({
            name: functionName,
            description: description,
            inputs: inputs,
            prompt: logic
        }),
    });

    if (response.ok) {
      const data = await response.json();
      router.push(`/sheets/${data.id}`);
    } else {
      console.error('Failed to add the function');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black max-w-lg">
      <div>
        <label htmlFor="functionName" className="block text-sm font-medium text-gray-700">
          Function Name
        </label>
        <input
          type="text"
          id="functionName"
          value={functionName}
          onChange={(e) => setFunctionName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 p-2 shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          One Line Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border border-gray-300 p-2 shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Inputs</label>
        {inputs.map((input, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <select
              value={input.type}
              onChange={(e) => handleInputChange(index, 'type', e.target.value)}
              className="w-1/3 block border border-gray-300 p-2 shadow-sm"
              required
            >
              {inputTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={input.name}
              onChange={(e) => handleInputChange(index, 'name', e.target.value)}
              placeholder="Input Name"
              className="flex-1 block border border-gray-300 p-2 shadow-sm"
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveInput(index)}
              className="text-red-500 bg-transparent p-1 rounded hover:bg-red-100"
            >
              &#x2715; {/* This is a Unicode multiplication sign (X) used as a delete icon */}
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddInput} className="mt-2 text-blue-500">
          + Add Input
        </button>
      </div>

      <div>
        <label htmlFor="logic" className="block text-sm font-medium text-gray-700">
          Function Logic in Natural Language
        </label>
        <textarea
          id="logic"
          value={logic}
          onChange={(e) => setLogic(e.target.value)}
          className="mt-1 block w-full border border-gray-300 p-2 shadow-sm"
          rows={4}
          required
        />
      </div>
      
      <Button type="submit" color="blue" variant="filled">
        Submit
      </Button>
    </form>
  );
};
