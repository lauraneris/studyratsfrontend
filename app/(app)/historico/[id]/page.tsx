// app/(app)/historico/[id]/page.tsx
import EssayContent from '@/app/components/ui/EssayContent';
import CorrectionHeader from '@/app/components/ui/CorrectionHeader';
import OverallScore from '@/app/components/ui/OverallScore';
import GeneralFeedback from '@/app/components/ui/GeneralFeedback';
import CriteriaCard from '@/app/components/ui/CriteriaCard';

const mockCorrection = {
    id: 1,
    submissionDate: '31/07/24',
    wordCount: 830,
    theme: 'A necessidade de discussão a cerca do autismo no Brasil',
    essayText: `Na série "Euforia", a personagem Rue usa os entorpecentes como forma de fuga de seus problemas familiares e pessoais, porém, esse uso se torna um vício. De maneira análoga, essa realidade se faz presente no contexto brasileiro, visto que diversos jovens e adultos utilizam essas substâncias a fim de adquirir prazer e felicidade. Nesse sentido, é notório a negligência estatal e a lacuna educacional como principais agravantes do empecilho.\n\nSob esse viés, é válido ressaltar que há uma ausência de políticas públicas por parte do governo para mitigar a problemática. Desse modo, o artigo 196 da Constituição Federal de 1988 promulga que é dever do Estado garantir a saúde da população. Entretanto, ao não promover as políticas públicas, o dever do Estado de garantir o bem estar da sociedade não é exercido, motivo o qual leva a uma contribuição para o aumento da taxa de usuários de alucinógenos. Logo, é essencial maior fiscalização dessas substâncias ilícitas.`,
    overallScore: 920,
    generalComment:
        'Olá! ✨ Sua redação está muito boa e demonstra um bom domínio da escrita! Aqui estão algumas dicas para deixá-la ainda mais incrível:',
    positivePoints: [
        'Você utilizou operadores argumentativos e elementos coesivos para conectar suas ideias de forma lógica e fluida. 👏',
        'Sua proposta de intervenção é pertinente e mostra um bom entendimento do problema abordado.🎯',
    ],
    criteria: [
        {
            number: 1,
            score: 200,
            maxScore: 200,
            content:
                'Você utilizou operadores argumentativos e elementos coesivos para conectar suas ideias de forma lógica e fluida. Sua proposta de intervenção é pertinente e mostra um bom entendimento do problema abordado.',
            isPerfect: true,
        },
        {
            number: 2,
            score: 180,
            maxScore: 200,
            content:
                'O critério 2 poderia ser melhorado com mais exemplos práticos para sustentar sua tese principal.',
            isPerfect: false,
        },
        {
            number: 3,
            score: 200,
            maxScore: 200,
            content:
                'Seu texto apresenta excelente organização e progressão textual. As partes do texto se articulam com clareza e fluidez.',
            isPerfect: true,
        },
        {
            number: 4,
            score: 180,
            maxScore: 200,
            content:
                'Apesar do uso predominante da norma padrão da língua portuguesa, foram identificados alguns desvios gramaticais leves, como concordância e pontuação.',
            isPerfect: false,
        },
        {
            number: 5,
            score: 160,
            maxScore: 200,
            content:
                'Sua proposta de intervenção é válida e detalha agente e ação, mas não aborda completamente todos os elementos exigidos, como os meios de execução e o detalhamento dos efeitos sociais.',
            isPerfect: false,
        },
    ],
};

type RouteParams = { id: string };

const CorrectionPage = async ({
    params,
}: {
    params: Promise<RouteParams>;
}) => {
    // Por que: Next 15 entrega params como Promise; precisamos do await para acessar o id.
    const { id } = await params;

    const correction = mockCorrection; // você pode usar o id aqui para buscar dados reais

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
                    <div className="lg:col-span-2">
                        <EssayContent theme={correction.theme} text={correction.essayText} />
                    </div>

                    <div className="flex flex-col gap-4">
                        <CorrectionHeader
                            submissionDate={correction.submissionDate}
                            wordCount={correction.wordCount}
                        />
                        <OverallScore score={correction.overallScore} />
                        <GeneralFeedback
                            comment={correction.generalComment}
                            positivePoints={correction.positivePoints}
                        />
                        {correction.criteria.map((c) => (
                            <CriteriaCard
                                key={c.number}
                                criteriaNumber={c.number}
                                score={c.score}
                                maxScore={c.maxScore}
                                content={c.content}
                                isPerfect={c.isPerfect}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CorrectionPage;