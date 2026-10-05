import { useCallback, useEffect, useState } from 'react';
import { api } from '@/services/api';
import { ContactMessage } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, Trash2 } from 'lucide-react';

export default function AdminMessages() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setMessages(await api.getContactMessages());
    } catch {
      toast({ title: 'Erro ao carregar mensagens', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (item: ContactMessage) => {
    if (!confirm(`Remover a mensagem de "${item.name}"?`)) return;
    try {
      await api.deleteContactMessage(item.id);
      setMessages(m => m.filter(x => x.id !== item.id));
      toast({ title: 'Mensagem removida' });
    } catch {
      toast({ title: 'Erro ao remover', variant: 'destructive' });
    }
  };

  // created_at vem do SQLite em UTC, sem fuso ("YYYY-MM-DD HH:MM:SS")
  const formatDate = (value: string) => new Date(value.replace(' ', 'T') + 'Z').toLocaleString('pt-BR');

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Mensagens de contato</h1>

      {loading ? (
        <p className="text-muted-foreground">Carregando...</p>
      ) : messages.length === 0 ? (
        <p className="text-muted-foreground">Nenhuma mensagem recebida ainda.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map(item => (
            <Card key={item.id} className="border-0 shadow-sm">
              <CardContent className="p-4 flex gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <span className="text-xs text-muted-foreground">{formatDate(item.createdAt)}</span>
                  </div>
                  {item.subject && <p className="text-sm font-medium text-foreground mb-1">{item.subject}</p>}
                  <p className="text-sm text-muted-foreground whitespace-pre-line mb-3">{item.message}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <a href={`mailto:${item.email}`} className="inline-flex items-center gap-1.5 text-primary hover:underline">
                      <Mail className="w-4 h-4" />{item.email}
                    </a>
                    {item.phone && (
                      <a href={`tel:${item.phone}`} className="inline-flex items-center gap-1.5 text-primary hover:underline">
                        <Phone className="w-4 h-4" />{item.phone}
                      </a>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0" onClick={() => handleDelete(item)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
