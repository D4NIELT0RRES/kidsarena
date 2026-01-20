import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import MinistryCard from './MinistryCard';
import MinistryForm from './MinistryForm';
import MonthSelector from './MonthSelector';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Ministry {
  id: string;
  date: string;
  day_of_week: string;
  bible_book: string | null;
  theme: string | null;
  verse: string | null;
  objective: string | null;
  activities: string[] | null;
  user_id: string;
  profiles?: {
    name: string;
  } | null;
}

const MinistryList = () => {
  const { user } = useAuth();
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMinistry, setEditingMinistry] = useState<Ministry | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const currentMonth = new Date().toLocaleString('pt-BR', { month: 'long' });
  const formattedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
  const [selectedMonth, setSelectedMonth] = useState(formattedMonth);

  const monthMap: Record<string, number> = {
    'Janeiro': 0, 'Fevereiro': 1, 'Março': 2, 'Abril': 3,
    'Maio': 4, 'Junho': 5, 'Julho': 6, 'Agosto': 7,
    'Setembro': 8, 'Outubro': 9, 'Novembro': 10, 'Dezembro': 11
  };

  const fetchMinistries = async () => {
    setLoading(true);
    
    const monthIndex = monthMap[selectedMonth];
    const year = new Date().getFullYear();
    const startDate = new Date(year, monthIndex, 1).toISOString().split('T')[0];
    const endDate = new Date(year, monthIndex + 1, 0).toISOString().split('T')[0];

    const { data: ministriesData, error } = await supabase
      .from('ministries')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true });

    if (!error && ministriesData) {
      // Fetch profiles separately for each ministry
      const userIds = [...new Set(ministriesData.map(m => m.user_id))];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, name')
        .in('user_id', userIds);

      const profilesMap = new Map(profilesData?.map(p => [p.user_id, p]) || []);
      
      const ministriesWithProfiles = ministriesData.map(ministry => ({
        ...ministry,
        profiles: profilesMap.get(ministry.user_id) || null
      }));
      
      setMinistries(ministriesWithProfiles);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMinistries();
  }, [selectedMonth]);

  const handleEdit = (ministry: Ministry) => {
    setEditingMinistry(ministry);
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    await supabase
      .from('ministries')
      .delete()
      .eq('id', deleteId);

    setDeleteId(null);
    fetchMinistries();
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingMinistry(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <MonthSelector
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Ministração
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : ministries.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {ministries.map((ministry) => (
            <MinistryCard
              key={ministry.id}
              ministry={ministry}
              currentUserId={user?.id}
              onEdit={handleEdit}
              onDelete={setDeleteId}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card rounded-2xl border-2 border-dashed border-muted">
          <p className="text-muted-foreground text-lg mb-4">
            Nenhuma ministração cadastrada para {selectedMonth}.
          </p>
          <Button onClick={() => setShowForm(true)} variant="outline" className="gap-2">
            <Plus className="w-4 h-4" />
            Adicionar primeira ministração
          </Button>
        </div>
      )}

      <MinistryForm
        open={showForm}
        onClose={handleFormClose}
        onSuccess={fetchMinistries}
        editingMinistry={editingMinistry}
      />

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir ministração?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A ministração será removida permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MinistryList;
