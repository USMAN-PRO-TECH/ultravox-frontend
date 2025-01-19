import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

interface SearchInputProps {
  placeholder?: string
  onChange: (value: string) => void
}

export function SearchInput({ placeholder = "Search...", onChange }: SearchInputProps) {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onChange(value); // Remove debouncing for now to debug
  };

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        onChange={handleInputChange}
        value={inputValue}
        className="pl-8"
      />
    </div>
  )
}

