import ActionPanel from "@/app/components/ui/ActionPanel";
import PromptDetails from "@/app/components/ui/PromptDetails";
import { themes } from "@/app/data/themes";
import { notFound } from 'next/navigation';

const EscreverRedacaoPage = ({ params }: { params: { id: string } }) => {
    const theme = themes.find(t => t.id.toString() === params.id);

    if (!theme) {
        notFound();
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
                    <div className="lg:col-span-2">
                        <PromptDetails
                            title={theme.title}
                            motivationalText={theme.motivationalText}
                        />
                    </div>
                    <div>
                        <ActionPanel />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EscreverRedacaoPage;