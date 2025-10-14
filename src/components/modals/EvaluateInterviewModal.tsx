/**
 * Modal para evaluar entrevistas
 */

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Interview, InterviewEvaluation } from '@/services/interviews';
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface EvaluateInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    evaluations: InterviewEvaluation[], 
    finalScore: number, 
    decision: 'approved' | 'rejected' | 'pending',
    notes?: string
  ) => Promise<void>;
  interview: Interview;
  loading?: boolean;
}

// Criterios de evaluación predeterminados
const defaultCriteria = [
  {
    criteria: 'Experiencia Técnica',
    description: 'Conocimientos técnicos y experiencia en el puesto'
  },
  {
    criteria: 'Habilidades de Comunicación',
    description: 'Capacidad de expresión y comunicación efectiva'
  },
  {
    criteria: 'Adaptabilidad',
    description: 'Flexibilidad y capacidad de adaptación al cambio'
  },
  {
    criteria: 'Trabajo en Equipo',
    description: 'Colaboración y habilidades interpersonales'
  },
  {
    criteria: 'Motivación',
    description: 'Entusiasmo y motivación por el puesto y la empresa'
  },
  {
    criteria: 'Resolución de Problemas',
    description: 'Capacidad analítica y de resolución de problemas'
  }
];

const EvaluateInterviewModal: React.FC<EvaluateInterviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  interview,
  loading = false
}) => {
  const [evaluations, setEvaluations] = useState<InterviewEvaluation[]>(
    interview.evaluations || defaultCriteria.map(criterion => ({
      criteria: criterion.criteria,
      score: 3,
      comments: ''
    }))
  );

  const [decision, setDecision] = useState<'approved' | 'rejected' | 'pending'>('pending');
  const [finalNotes, setFinalNotes] = useState(interview.notes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calcular puntuación final
  const finalScore = evaluations.length > 0 
    ? evaluations.reduce((sum, evaluation) => sum + evaluation.score, 0) / evaluations.length
    : 0;

  const updateEvaluation = (index: number, field: keyof InterviewEvaluation, value: string | number) => {
    setEvaluations(prev => 
      prev.map((evaluation, i) => 
        i === index ? { ...evaluation, [field]: value } : evaluation
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    try {
      await onSubmit(evaluations, finalScore, decision, finalNotes);
      onClose();
    } catch (error) {
      console.error('Error submitting evaluation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreText = (score: number) => {
    if (score >= 4.5) return 'Excelente';
    if (score >= 3.5) return 'Bueno';
    if (score >= 2.5) return 'Regular';
    return 'Necesita Mejora';
  };

  const StarRating = ({ score, onChange }: { score: number; onChange: (score: number) => void }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={cn(
            "p-1 rounded transition-colors",
            star <= score 
              ? "text-yellow-500 hover:text-yellow-600" 
              : "text-gray-300 hover:text-yellow-400"
          )}
        >
          <Star className="h-5 w-5 fill-current" />
        </button>
      ))}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Evaluación de Entrevista</DialogTitle>
          <DialogDescription>
            Evalúa el desempeño del candidato en la entrevista
          </DialogDescription>
        </DialogHeader>

        {/* Información de la entrevista */}
        <div className="bg-muted p-4 rounded-lg space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Candidato:</span>
            <span>{interview.candidateName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Posición:</span>
            <span>{interview.position}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Fecha:</span>
            <span>{format(interview.date, "PPP", { locale: es })}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Entrevistador:</span>
            <span>{interview.interviewerName}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Criterios de evaluación */}
          <div className="space-y-4">
            <h4 className="font-semibold">Criterios de Evaluación</h4>
            
            {defaultCriteria.map((criterion, index) => (
              <div key={criterion.criteria} className="space-y-3 p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium">{criterion.criteria}</h5>
                    <p className="text-sm text-muted-foreground">{criterion.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating 
                      score={evaluations[index]?.score || 3}
                      onChange={(score) => updateEvaluation(index, 'score', score)}
                    />
                    <span className="text-sm font-medium min-w-[3rem]">
                      {evaluations[index]?.score || 3}/5
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`comments-${index}`}>Comentarios</Label>
                  <Textarea
                    id={`comments-${index}`}
                    placeholder="Observaciones sobre este criterio..."
                    value={evaluations[index]?.comments || ''}
                    onChange={(e) => updateEvaluation(index, 'comments', e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Puntuación final */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Puntuación Final:</span>
              <div className="text-right">
                <div className={cn("text-2xl font-bold", getScoreColor(finalScore))}>
                  {finalScore.toFixed(1)}/5.0
                </div>
                <div className={cn("text-sm", getScoreColor(finalScore))}>
                  {getScoreText(finalScore)}
                </div>
              </div>
            </div>
          </div>

          {/* Decisión */}
          <div className="space-y-3">
            <Label>Decisión Final</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={decision === 'approved' ? 'default' : 'outline'}
                onClick={() => setDecision('approved')}
                className={decision === 'approved' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                Aprobar
              </Button>
              <Button
                type="button"
                variant={decision === 'rejected' ? 'destructive' : 'outline'}
                onClick={() => setDecision('rejected')}
              >
                Rechazar
              </Button>
              <Button
                type="button"
                variant={decision === 'pending' ? 'secondary' : 'outline'}
                onClick={() => setDecision('pending')}
              >
                Pendiente
              </Button>
            </div>
          </div>

          {/* Notas finales */}
          <div className="space-y-2">
            <Label htmlFor="finalNotes">Notas Finales</Label>
            <Textarea
              id="finalNotes"
              placeholder="Observaciones generales, recomendaciones, próximos pasos..."
              value={finalNotes}
              onChange={(e) => setFinalNotes(e.target.value)}
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || loading}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Guardar Evaluación
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EvaluateInterviewModal;