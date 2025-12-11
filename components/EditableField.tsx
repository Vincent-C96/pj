import React, { useEffect, useState } from 'react';

interface EditableFieldProps {
  value: string | undefined;
  onSave: (value: string) => void;
  isEditing: boolean;
  className?: string;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
}

export const EditableField: React.FC<EditableFieldProps> = ({ 
  value = "", 
  onSave, 
  isEditing, 
  className = "", 
  multiline = false,
  rows = 3,
  placeholder = "Click to edit..."
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  if (isEditing) {
    const inputClass = `w-full bg-blue-50/50 border border-blue-300 rounded focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all p-2 text-slate-800 placeholder:text-slate-400 ${className}`;

    if (multiline) {
      return (
        <textarea
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={() => onSave(localValue)}
          className={inputClass}
          rows={rows}
          placeholder={placeholder}
        />
      );
    }
    return (
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={() => onSave(localValue)}
        className={inputClass}
        placeholder={placeholder}
      />
    );
  }

  if (!value) return null;

  return (
    <div className={`${multiline ? 'whitespace-pre-line' : ''} ${className}`}>
      {value}
    </div>
  );
};