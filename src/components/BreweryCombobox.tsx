import { useState, useEffect } from 'react';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
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
import { useBrewerySearch } from '@/hooks/useBrewerySearch';

interface BreweryComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function BreweryCombobox({
  value,
  onChange,
  placeholder = 'Select or type brewery...',
}: BreweryComboboxProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: breweries, isLoading } = useBrewerySearch(searchQuery);

  // Update search query when value changes externally
  useEffect(() => {
    if (value && !searchQuery) {
      setSearchQuery(value);
    }
  }, [value]);

  const handleSelect = (breweryName: string) => {
    onChange(breweryName);
    setSearchQuery(breweryName);
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
            placeholder="Search breweries..."
            value={searchQuery}
            onValueChange={handleSearchChange}
          />
          <CommandList>
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            ) : breweries && breweries.length > 0 ? (
              <CommandGroup>
                {breweries.map((brewery) => (
                  <CommandItem
                    key={brewery.id}
                    value={brewery.name}
                    onSelect={() => handleSelect(brewery.name)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === brewery.name ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{brewery.name}</div>
                      {(brewery.city || brewery.state) && (
                        <div className="text-xs text-muted-foreground truncate">
                          {[brewery.city, brewery.state].filter(Boolean).join(', ')}
                        </div>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : searchQuery.length >= 2 ? (
              <CommandEmpty>
                <div className="py-6 text-center text-sm">
                  <p className="text-muted-foreground mb-2">No breweries found</p>
                  <p className="text-xs text-muted-foreground">
                    Press Enter to use "{searchQuery}"
                  </p>
                </div>
              </CommandEmpty>
            ) : (
              <CommandEmpty>
                <p className="py-6 text-center text-sm text-muted-foreground">
                  Type to search breweries...
                </p>
              </CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
