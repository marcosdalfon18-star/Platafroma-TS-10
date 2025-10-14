/**
 * Modal para crear/editar entrevistas
 */

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2, Plus } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Interview, Candidate, InterviewType } from '@/services/interviews';

interface CreateInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (interviewData: Omit<Interview, 'id' | 'createdAt' | 'updatedAt' | 'companyId'>) => Promise<void>;
  candidates: Candidate[];
  interview?: Interview; // Para editar
  loading?: boolean;
}

const CreateInterviewModal: React.FC<CreateInterviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  candidates,
  interview,
  loading = false
}) => {
  const [formData, setFormData] = useState({
    candidateId: '',
    candidateName: '',
    candidateEmail: '',
    position: '',
    date: new Date(),
    time: '',
    duration: 60,
    location: '',
    interviewerName: '',
    interviewerEmail: '',
    type: 'hr' as InterviewType,
    notes: ''
  });

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Llenar formulario si es edición
  useEffect(() => {
    if (interview) {
      setFormData({
        candidateId: interview.candidateId,
        candidateName: interview.candidateName,
        candidateEmail: interview.candidateEmail,
        position: interview.position,
        date: interview.date,
        time: interview.time,
        duration: interview.duration,
        location: interview.location,
        interviewerName: interview.interviewerName,
        interviewerEmail: interview.interviewerEmail,
        type: interview.type,
        notes: interview.notes || ''
      });

      const candidate = candidates.find(c => c.id === interview.candidateId);
      setSelectedCandidate(candidate || null);
    }
  }, [interview, candidates]);

  const handleCandidateChange = (candidateId: string) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      setSelectedCandidate(candidate);
      setFormData(prev => ({
        ...prev,
        candidateId: candidate.id || '',
        candidateName: candidate.name,
        candidateEmail: candidate.email,
        position: candidate.position
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.candidateId || !formData.time || !formData.interviewerName) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        status: interview ? interview.status : 'scheduled'
      });
      onClose();
      // Reset form
      setFormData({
        candidateId: '',
        candidateName: '',
        candidateEmail: '',
        position: '',
        date: new Date(),
        time: '',
        duration: 60,
        location: '',
        interviewerName: '',
        interviewerEmail: '',
        type: 'hr',
        notes: ''
      });
      setSelectedCandidate(null);
    } catch (error) {
      console.error('Error submitting interview:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const interviewTypes = [
    { value: 'hr', label: 'Recursos Humanos' },
    { value: 'technical', label: 'Técnica' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'final', label: 'Final' }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {interview ? 'Editar Entrevista' : 'Programar Nueva Entrevista'}
          </DialogTitle>
          <DialogDescription>
            {interview 
              ? 'Modifica los detalles de la entrevista'
              : 'Completa los datos para programar una nueva entrevista'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selección de Candidato */}
          <div className="space-y-2">
            <Label htmlFor="candidate">Candidato *</Label>
            <Select 
              value={formData.candidateId} 
              onValueChange={handleCandidateChange}
              disabled={!!interview} // No cambiar candidato al editar
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un candidato" />
              </SelectTrigger>
              <SelectContent>
                {candidates.map(candidate => (
                  <SelectItem key={candidate.id} value={candidate.id || ''}>
                    <div className="flex flex-col">
                      <span className="font-medium">{candidate.name}</span>
                      <span className="text-sm text-muted-foreground">{candidate.position}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Detalles del candidato */}
          {selectedCandidate && (
            <div className="p-3 bg-muted rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Email:</span>
                <span className="text-sm">{selectedCandidate.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Teléfono:</span>
                <span className="text-sm">{selectedCandidate.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Posición:</span>
                <span className="text-sm">{selectedCandidate.position}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fecha */}
            <div className="space-y-2">
              <Label>Fecha *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? (
                      format(formData.date, "PPP", { locale: es })
                    ) : (
                      "Selecciona una fecha"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => date && setFormData(prev => ({ ...prev, date }))}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Hora */}
            <div className="space-y-2">
              <Label htmlFor="time">Hora *</Label>
              <Select 
                value={formData.time} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona hora" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(time => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Duración */}
            <div className="space-y-2">
              <Label htmlFor="duration">Duración (minutos)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 60 }))}
                min="15"
                max="240"
              />
            </div>

            {/* Tipo de entrevista */}
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Entrevista</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value: InterviewType) => setFormData(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {interviewTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Ubicación */}
          <div className="space-y-2">
            <Label htmlFor="location">Ubicación</Label>
            <Input
              id="location"
              placeholder="Ej: Sala de conferencias A, Videollamada, etc."
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Entrevistador */}
            <div className="space-y-2">
              <Label htmlFor="interviewerName">Entrevistador *</Label>
              <Input
                id="interviewerName"
                placeholder="Nombre del entrevistador"
                value={formData.interviewerName}
                onChange={(e) => setFormData(prev => ({ ...prev, interviewerName: e.target.value }))}
                required
              />
            </div>

            {/* Email entrevistador */}
            <div className="space-y-2">
              <Label htmlFor="interviewerEmail">Email Entrevistador</Label>
              <Input
                id="interviewerEmail"
                type="email"
                placeholder="email@empresa.com"
                value={formData.interviewerEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, interviewerEmail: e.target.value }))}
              />
            </div>
          </div>

          {/* Notas */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas Adicionales</Label>
            <Textarea
              id="notes"
              placeholder="Cualquier información adicional sobre la entrevista..."
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || loading || !formData.candidateId || !formData.time || !formData.interviewerName}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {interview ? 'Actualizar' : 'Programar'} Entrevista
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInterviewModal;
