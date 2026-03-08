import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

function unformatPhone(formatted: string): string {
  return formatted.replace(/\D/g, '').slice(0, 11);
}

export function PhoneInput({ value, onChange, className, placeholder = '(51) 99999-9999' }: PhoneInputProps) {
  // value stored as raw digits (without DDI), e.g. "51999999999"
  const displayValue = value ? formatPhone(value) : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = unformatPhone(e.target.value);
    onChange(raw);
  };

  return (
    <div className={cn('flex items-stretch', className)}>
      <div className="flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm font-medium shrink-0">
        +55
      </div>
      <Input
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="rounded-l-none"
      />
    </div>
  );
}

/** Convert stored whatsapp value (with DDI "55...") to local digits for PhoneInput */
export function fromWhatsapp(whatsapp: string): string {
  const digits = whatsapp.replace(/\D/g, '');
  return digits.startsWith('55') ? digits.slice(2) : digits;
}

/** Convert local digits back to whatsapp format with DDI */
export function toWhatsapp(local: string): string {
  const digits = local.replace(/\D/g, '');
  return digits ? `55${digits}` : '';
}
