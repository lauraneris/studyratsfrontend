// app/(app)/historico/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Clock,
  CheckCircle,
  Loader2,
  XCircle,
  TrendingUp,
  Award,
  Eye,
} from 'lucide-react';

/** Estruturas da API */
interface CorrectionCriterion {
  name: string;
  score: number;
  max_score: number;
  feedback_text: string;
}

interface Correction {
  overall_score: number;
  general_comment: string;
  criteria: CorrectionCriterion[];
}

type SubmissionStatus = 'pending' | 'processing' | 'completed' | 'error';

interface Submission {
  id: number;
  submission_date: string;
  status: SubmissionStatus;
  correction: Correction | null;
}

/** Página de Histórico */
export default function HistoricoPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /** Busca histórico e preserva seleção quando possível. */
  const fetchHistory = async (keepSelectedId?: number) => {
    try {
      setIsLoading(true);
      const response = await api.get<Submission[]>('/history/');
      const list = response.data ?? [];
      setSubmissions(list);

      if (keepSelectedId != null) {
        const keep = list.find((s) => s.id === keepSelectedId) ?? list[0] ?? null;
        setSelectedSubmission(keep ?? null);
      } else if (!selectedSubmission) {
        setSelectedSubmission(list[0] ?? null);
      } else {
        const updated = list.find((s) => s.id === selectedSubmission.id) ?? list[0] ?? null;
        setSelectedSubmission(updated ?? null);
      }
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch inicial
  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Estatísticas
  const stats = useMemo(() => {
    const completed = submissions.filter((s) => s.status === 'completed' && s.correction);
    const scores = completed.map((s) => s.correction!.overall_score);
    const total = submissions.length;
    const media = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const melhorNota = scores.length ? Math.max(...scores) : 0;
    return { total, corrigidas: completed.length, media, melhorNota };
  }, [submissions]);

  // UI helpers
  const getStatusInfo = (status: SubmissionStatus) => {
    const base = {
      pending: {
        icon: <Clock className="w-5 h-5 text-yellow-600" />,
        label: 'PENDENTE',
        color: 'bg-yellow-100 text-yellow-800',
      },
      processing: {
        icon: <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />,
        label: 'PROCESSANDO',
        color: 'bg-blue-100 text-blue-800',
      },
      completed: {
        icon: <CheckCircle className="w-5 h-5 text-green-600" />,
        label: 'CONCLUÍDO',
        color: 'bg-green-100 text-green-800',
      },
      error: {
        icon: <XCircle className="w-5 h-5 text-red-600" />,
        label: 'ERRO',
        color: 'bg-red-100 text-red-800',
      },
    } as const;
    return base[status];
  };

  const getNotaColor = (nota: number) => {
    if (nota >= 800) return 'text-green-600';
    if (nota >= 600) return 'text-yellow-600';
    return 'text-red-600';
  };

  /**
   * Listener em tempo real para a submissão selecionada.
   * Atualiza status e correction quando disponíveis; refaz fetch ao finalizar.
   */
  useEffect(() => {
    if (!selectedSubmission) return;
    if (selectedSubmission.status === 'completed' || selectedSubmission.status === 'error') return;

    const ref = doc(db, 'essay_statuses', String(selectedSubmission.id));
    const unsubscribe = onSnapshot(ref, (snap) => {
      const data = snap.data() as
        | { status?: SubmissionStatus; correction?: Correction | null }
        | undefined;
      if (!data) return;

      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === selectedSubmission.id
            ? {
                ...s,
                ...(data.status ? { status: data.status } : {}),
                ...(data.correction !== undefined ? { correction: data.correction } : {}),
              }
            : s,
        ),
      );

      setSelectedSubmission((prev) =>
        prev
          ? {
              ...prev,
              ...(data.status ? { status: data.status } : {}),
              ...(data.correction !== undefined ? { correction: data.correction } : {}),
            }
          : prev,
      );

      if (data.status === 'completed' || data.status === 'error') {
        // Por quê: garantir que os dados finais (ex.: critérios) estejam sincronizados com a API.
        fetchHistory(selectedSubmission.id).catch(() => void 0);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubmission?.id, selectedSubmission?.status]);

  return (
    <div>
      {/* Cards de Estatísticas */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white neo-card p-6 text-center">
          <div className="text-4xl font-black text-brand-blue mb-2">{stats.total}</div>
          <div className="font-black text-gray-700">ENVIADAS</div>
        </div>
        <div className="bg-white neo-card p-6 text-center">
          <div className="text-4xl font-black text-brand-green mb-2">{stats.corrigidas}</div>
          <div className="font-black text-gray-700">CORRIGIDAS</div>
        </div>
        <div className="bg-white neo-card p-6 text-center">
          <div className="text-4xl font-black text-brand-pink mb-2">{stats.media.toFixed(0)}</div>
          <div className="font-black text-gray-700">NOTA MÉDIA</div>
        </div>
        <div className="bg-white neo-card p-6 text-center">
          <div className="text-4xl font-black text-yellow-500 mb-2">{stats.melhorNota}</div>
          <div className="font-black text-gray-700">MELHOR NOTA</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Lista de Redações */}
        <div className="lg:col-span-1">
          <div className="bg-white neo-card h-full">
            <div className="p-4 border-b-4 border-brand-black">
              <h2 className="text-xl font-black text-brand-black flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-brand-blue" />
                MINHAS REDAÇÕES
              </h2>
            </div>
            {isLoading ? (
              <div className="p-6 text-center">A carregar...</div>
            ) : (
              <div className="max-h-[600px] overflow-y-auto">
                {submissions.length === 0 ? (
                  <div className="p-6 text-center">Nenhuma redação enviada.</div>
                ) : (
                  submissions.map((sub) => {
                    const sInfo = getStatusInfo(sub.status);
                    const isSelected = selectedSubmission?.id === sub.id;
                    return (
                      <div
                        key={sub.id}
                        className={`p-4 cursor-pointer border-b-4 border-brand-black hover:bg-gray-100 ${
                          isSelected ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => setSelectedSubmission(sub)}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            {sInfo.icon}
                            <span
                              className={`px-2 py-1 text-xs font-black rounded ${sInfo.color}`}
                            >
                              {sInfo.label}
                            </span>
                          </div>
                          {sub.status === 'completed' && sub.correction && (
                            <div
                              className={`font-black text-lg ${getNotaColor(
                                sub.correction.overall_score,
                              )}`}
                            >
                              {sub.correction.overall_score}
                            </div>
                          )}
                        </div>
                        <div className="font-sans text-sm text-gray-600">
                          Enviada em{' '}
                          {new Date(sub.submission_date).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>

        {/* Detalhes da Redação */}
        <div className="lg:col-span-2">
          <div className="bg-white neo-card sticky top-28">
            <div className="p-4 border-b-4 border-brand-black">
              <h2 className="text-xl font-black text-brand-black flex items-center gap-2">
                <Eye className="w-6 h-6 text-brand-green" />
                DETALHES DA CORREÇÃO
              </h2>
            </div>
            <div className="p-6 max-h-[600px] overflow-y-auto">
              {!selectedSubmission ? (
                <div className="text-center py-12">
                  <Award className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="font-normal text-gray-600">
                    Selecione uma redação para ver os detalhes.
                  </p>
                </div>
              ) : selectedSubmission.status === 'completed' && selectedSubmission.correction ? (
                <div className="space-y-6">
                  {/* Nota Final */}
                  <div className="text-center">
                    <div
                      className={`text-6xl font-black mb-1 ${getNotaColor(
                        selectedSubmission.correction.overall_score,
                      )}`}
                    >
                      {selectedSubmission.correction.overall_score}
                    </div>
                    <div className="font-black text-gray-600">NOTA FINAL</div>
                  </div>
                  {/* Feedback Geral */}
                  <div>
                    <h3 className="font-black text-lg mb-2 text-brand-green">
                      COMENTÁRIO GERAL
                    </h3>
                    <p className="font-sans bg-gray-50 p-4 border-2 border-brand-black">
                      {selectedSubmission.correction.general_comment}
                    </p>
                  </div>
                  {/* Critérios */}
                  <div>
                    <h3 className="font-black text-lg mb-2 text-brand-blue">
                      CRITÉRIOS DE AVALIAÇÃO
                    </h3>
                    <div className="space-y-3">
                      {selectedSubmission.correction.criteria.map((c, index) => (
                        <div key={index} className="bg-white border-2 border-brand-black p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-black text-sm">{c.name}</span>
                            <span className="font-black text-brand-pink">
                              {c.score}/{c.max_score}
                            </span>
                          </div>
                          <p className="text-sm font-sans text-gray-600">{c.feedback_text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  {getStatusInfo(selectedSubmission.status).icon}
                  <h3 className="font-black text-xl mt-4 mb-2">
                    {getStatusInfo(selectedSubmission.status).label}
                  </h3>
                  <p className="font-normal text-gray-600">
                    Os detalhes aparecerão aqui assim que a correção for concluída.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
