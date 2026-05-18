import type { SelectRootChangeEventDetails } from '@base-ui/react/select';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface Item<T extends string> {
  value: T;
  label: string;
}

interface Props<T extends string> {
  items: readonly Item<T>[];
  groupLabel?: string;
  value?: T | null;
  placeholder?: string;
  onValueChange?: (value: T | null, event?: SelectRootChangeEventDetails) => void;
}

export const SelectField = <T extends string>({
  items,
  groupLabel,
  value,
  placeholder,
  onValueChange,
}: Props<T>) => {
  return (
    <Select value={value} onValueChange={onValueChange as any}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
