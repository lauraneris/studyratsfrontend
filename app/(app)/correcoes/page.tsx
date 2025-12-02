'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import RoleGuard from '@/app/(auth)/RoleGuard';
import { CheckSquare, Edit, Send } from 'lucide-react';

type Submission = {
  id: number;
  studentName: string;
  submissionDate: string;
  themeTitle: string;
  text: string;
};

type CorrectionCriterion = {
  id: number;
  name: string;
  score: number;
  feedback: string;
};

type CorrectionForm = {
  overallScore: number;
  generalComment: string;
  criteria: CorrectionCriterion[];
};

const mockSubmissions: Submission[] = [
  {
    id: 1,
    studentName: 'Ana Carolina Pereira',
    submissionDate: '2025-09-15',
    themeTitle: 'Inteligência Artificial no mercado de trabalho',
    text: 'A ascensão da inteligência artificial (IA) representa uma das transformações mais significativas na sociedade contemporânea. De assistentes virtuais a diagnósticos médicos, a IA está a remodelar indústrias e a redefinir o futuro do trabalho. Contudo, essa evolução tecnológica suscita debates cruciais sobre as suas implicações éticas e o seu impacto socioeconómico. É imperativo analisar tanto as oportunidades quanto os desafios que emergem com a crescente automação de tarefas anteriormente executadas por humanos...'
  },
  {
    id: 2,
    studentName: 'Bruno Alves de Souza',
    submissionDate: '2025-09-14',
    themeTitle: 'A persistência da desigualdade social na sociedade brasileira',
    text: 'O Brasil, apesar de ser uma das maiores economias do mundo, continua a enfrentar um dos seus desafios mais antigos e profundos: a persistência da desigualdade social. Esta problemática, enraizada em fatores históricos e estruturais, manifesta-se no acesso desigual a educação, saúde e oportunidades, perpetuando um ciclo de pobreza que afeta milhões de cidadãos. Analisar as causas e consequências desta realidade é fundamental para a construção de uma nação mais justa e equitativa...'
  }
];

const initialCorrectionState: CorrectionForm = {
  overallScore: 0,
  generalComment: '',
  criteria: [
    { id: 1, name: 'Competência 1: Domínio da norma culta', score: 0, feedback: '' },
    { id: 2, name: 'Competência 2: Compreensão da proposta', score: 0, feedback: '' },
    { id: 3, name: 'Competência 3: Seleção e organização de informações', score: 0, feedback: '' },
    { id: 4, name: 'Competência 4: Conhecimento dos mecanismos linguísticos', score: 0, feedback: '' },
    { id: 5, name: 'Competência 5: Proposta de intervenção', score: 0, feedback: '' }
  ]
};

export default function CorrecoesPage() {
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(
    mockSubmissions[0] ?? null
  );
  const [correctionForm, setCorrectionForm] = useState<CorrectionForm>(initialCorrectionState);

  const handleSelectSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    setCorrectionForm(initialCorrectionState);
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCorrectionForm(prev => ({
      ...prev,
      [name]: name === 'overallScore' ? Number(value) || 0 : value
    }));
  };

  const handleCriteriaChange = (
    index: number,
    field: 'score' | 'feedback',
    value: number | string
  ) => {
    setCorrectionForm(prev => ({
      ...prev,
      criteria: prev.criteria.map((c, i) =>
        i === index ? { ...c, [field]: value } : c
      )
    }));
  };

  const handleSubmitCorrection = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedSubmission) return;

    console.log('Enviando correção:', {
      submissionId: selectedSubmission.id,
      ...correctionForm
    });

    alert('Correção enviada com sucesso! (Verificar a consola)');

    // Lógica para remover da lista e resetar
    setSubmissions(prev =>
      prev.filter(s => s.id !== selectedSubmission.id)
    );
    setSelectedSubmission(null);
    setCorrectionForm(initialCorrectionState);
  };

  return (
    <RoleGuard allowedRoles={['teacher']}>
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Coluna da Fila de Correções */}
        <div className="lg:col-span-1">
          <div className="bg-white neo-card h-full">
            <div className="p-4 border-b-4 border-brand-black">
              <h2 className="text-xl font-black text-brand-black flex items-center gap-2">
                <CheckSquare className="w-6 h-6 text-brand-pink" />
                Fila de Correções
              </h2>
            </div>
            <div className="max-h-[80vh] overflow-y-auto">
              {submissions.map(sub => (
                <div
                  key={sub.id}
                  onClick={() => handleSelectSubmission(sub)}
                  className={`p-4 cursor-pointer border-b-2 border-gray-200 hover:bg-gray-100 ${
                    selectedSubmission?.id === sub.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <p className="font-black text-brand-black">
                    {sub.studentName}
                  </p>
                  <p className="text-sm font-sans text-gray-600 truncate">
                    {sub.themeTitle}
                  </p>
                  <p className="text-xs font-sans text-gray-500">
                    {new Date(sub.submissionDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              ))}
              {submissions.length === 0 && (
                <p className="p-4 text-center font-sans">
                  Nenhuma redação pendente!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Coluna da Correção */}
        <div className="lg:col-span-2">
          {selectedSubmission ? (
            <div className="bg-white neo-card">
              <div className="p-4 border-b-4 border-brand-black">
                <h2 className="text-xl font-black text-brand-black">
                  A Corrigir: {selectedSubmission.studentName}
                </h2>
                <p className="font-sans text-sm text-gray-600">
                  {selectedSubmission.themeTitle}
                </p>
              </div>
              <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
                {/* Texto do Aluno */}
                <div>
                  <h3 className="font-black text-lg mb-2">Texto Enviado</h3>
                  <div className="border-2 border-brand-black p-4 bg-gray-50 font-sans whitespace-pre-wrap">
                    {selectedSubmission.text}
                  </div>
                </div>

                {/* Formulário de Correção */}
                <form onSubmit={handleSubmitCorrection} className="space-y-4">
                  <div>
                    <label className="font-black text-lg">
                      Nota Geral (0-1000)
                    </label>
                    <input
                      type="number"
                      name="overallScore"
                      value={correctionForm.overallScore}
                      onChange={handleFormChange}
                      className="w-full border-3 border-brand-black h-12 px-4 font-sans text-lg mt-2"
                    />
                  </div>

                  <div>
                    <label className="font-black text-lg">
                      Comentário Geral
                    </label>
                    <textarea
                      name="generalComment"
                      value={correctionForm.generalComment}
                      onChange={handleFormChange}
                      rows={5}
                      className="w-full border-3 border-brand-black p-4 font-sans text-lg mt-2 resize-y"
                    />
                  </div>

                  <div className="space-y-3">
                    {correctionForm.criteria.map((c, index) => (
                      <details
                        key={c.id}
                        className="border-2 border-brand-black"
                      >
                        <summary className="p-3 font-black cursor-pointer">
                          {c.name}
                        </summary>
                        <div className="p-4 border-t-2 border-brand-black space-y-2">
                          <label className="font-black text-sm">
                            Nota (0-200)
                          </label>
                          <input
                            type="number"
                            value={c.score}
                            onChange={e =>
                              handleCriteriaChange(
                                index,
                                'score',
                                Number(e.target.value) || 0
                              )
                            }
                            className="w-full border-2 border-brand-black h-10 px-3 font-sans"
                          />
                          <label className="font-black text-sm">
                            Feedback
                          </label>
                          <textarea
                            value={c.feedback}
                            onChange={e =>
                              handleCriteriaChange(
                                index,
                                'feedback',
                                e.target.value
                              )
                            }
                            rows={3}
                            className="w-full border-2 border-brand-black p-3 font-sans resize-y"
                          />
                        </div>
                      </details>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-green text-white neo-button font-black text-xl py-4 hover:bg-brand-blue flex items-center justify-center gap-3"
                  >
                    <Send className="w-6 h-6" /> ENVIAR CORREÇÃO
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="bg-white neo-card p-12 text-center">
              <Edit className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-black">Selecione uma redação</h2>
              <p className="font-sans text-gray-600">
                Escolha uma redação na fila à esquerda para começar a correção.
              </p>
            </div>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}
