import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { api } from '@/services/api';
import { Upload, Link as LinkIcon, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageInputProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  className?: string;
  previewClassName?: string;
}

export function ImageInput({ label = 'Imagem', value, onChange, className, previewClassName = 'h-32 w-full object-cover rounded-lg' }: ImageInputProps) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await api.uploadImage(file);
      onChange(url);
    } catch {
      // toast handled upstream
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && <Label>{label}</Label>}

      {/* URL input */}
      <div className="flex items-stretch gap-2">
        <div className="flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground shrink-0">
          <LinkIcon className="w-4 h-4" />
        </div>
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://exemplo.com/imagem.jpg"
          className="rounded-l-none flex-1"
        />
      </div>

      {/* Upload button */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? 'Enviando...' : 'Fazer upload'}
        </Button>
        <span className="text-xs text-muted-foreground">ou cole uma URL acima</span>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Preview */}
      {value && (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Preview"
            className={previewClassName}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
            onLoad={(e) => {
              (e.target as HTMLImageElement).style.display = 'block';
            }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
