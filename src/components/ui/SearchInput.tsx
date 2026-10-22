import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchInput({ value, onChange, placeholder = 'Search…', ...props }: SearchInputProps) {
  return (
    <div className="search-wrapper" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <span className="search-icon" style={{ position: 'absolute', left: 12, pointerEvents: 'none', display: 'flex', alignItems: 'center', color: 'var(--color-text-secondary)' }}>
        <Search size={16} />
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-input search-input"
        style={{ paddingLeft: 38 }}
        {...props}
      />
    </div>
  );
}
