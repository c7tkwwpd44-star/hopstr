import { useState, useEffect } from 'react';
import { Check, ChevronsUpDown, Loader2, Beer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useBeerSuggestions } from '@/hooks/useBeerSuggestions';

interface BeerComboboxProps {
  value: string;
  onChange: (value: string, style?: string) => void;
  breweryFilter?: string;
  placeholder?: string;
}

export function BeerCombobox({
  value,
  onChange,
  breweryFilter,
  placeholder = 'Select or type beer name...',
}: BeerComboboxProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: suggestions, isLoading } = useBeerSuggestions(searchQuery, breweryFilter);

  // Update search query when value changes externally
  useEffect(() => {
    if (value && !searchQuery) {
      setSearchQuery(value);
    }
  }, [value]);

  const handleSelect = (beerName: string, style?: string) => {
    onChange(beerName, style);
    setSearchQuery(beerName);
    setOpen(false);
  };

  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
    onChange(search); // Allow free-form input
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span className="truncate">{value || placeholder}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search beers..."
            value={searchQuery}
            onValueChange={handleSearchChange}
          />
          <CommandList>
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            ) : suggestions && suggestions.length > 0 ? (
              <CommandGroup heading="Previously checked-in beers">
                {suggestions.map((suggestion, index) => (
                  <CommandItem
                    key={`${suggestion.beerName}-${suggestion.breweryName}-${index}`}
                    value={suggestion.beerName}
                    onSelect={() => handleSelect(suggestion.beerName, suggestion.beerStyle)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === suggestion.beerName ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{suggestion.beerName}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {suggestion.breweryName}
                        {suggestion.beerStyle && ` • ${suggestion.beerStyle}`}
                        {suggestion.count > 1 && ` • ${suggestion.count} check-ins`}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : searchQuery.length >= 2 ? (
              <CommandEmpty>
                <div className="py-6 text-center text-sm">
                  <div className="bg-muted/50 rounded-full p-3 w-fit mx-auto mb-3">
                    <Beer className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-1">No beers found</p>
                  <p className="text-xs text-muted-foreground">
                    Press Enter to add "{searchQuery}"
                  </p>
                </div>
              </CommandEmpty>
            ) : (
              <CommandEmpty>
                <div className="py-6 text-center text-sm">
                  <div className="bg-muted/50 rounded-full p-3 w-fit mx-auto mb-3">
                    <Beer className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    Type to search beers...
                  </p>
                </div>
              </CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
