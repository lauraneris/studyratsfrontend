'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import RoleGuard from '@/app/(auth)/RoleGuard';
import { api } from '@/lib/api';
import { FileEdit, PlusCircle, Loader2 } from 'lucide-react';
import Alert from '@/app/components/ui/Alert';

const themeCategories = [
    'Social', 'Política', 'Economia', 'Meio Ambiente',
    'Tecnologia', 'Educação', 'Cultura', 'Saúde'
];

export default function CriarConteudoPage() {
    const [title, setTitle] = useState('');
    const [motivationalText, setMotivationalText] = useState('');
    const [category, setCategory] = useState('Social');
    const [imageUrl, setImageUrl] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        if (!title || !motivationalText || !category) {
            setError('Título, Texto Motivador e Categoria são campos obrigatórios.');
            setIsLoading(false);
            return;
        }

        try {
            await api.post('/themes/', {
                title: title,
                motivational_text: motivationalText,
                category: category,
                image_url: imageUrl,
            });
            setSuccess('Novo tema de redação criado com sucesso!');
            // Limpa o formulário
            setTitle('');
            setMotivationalText('');
            setCategory('Social');
            setImageUrl('');
            // Opcional: redirecionar para o dashboard após um tempo
            setTimeout(() => router.push('/dashboard-professor'), 2000);
        } catch (err) {
            console.error(err);
            setError('Ocorreu um erro ao criar o tema. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <RoleGuard allowedRoles={['teacher']}>
            <div className="space-y-8">
                {/* Cabeçalho */}
                <div className="flex items-center gap-4">
                    <FileEdit className="w-10 h-10 text-brand-green" />
                    <h1 className="text-3xl font-black text-brand-black">Criar Novo Tema de Redação</h1>
                </div>

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="bg-white neo-card p-8 space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-xl font-black mb-2 text-brand-black">Título do Tema</label>
                        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)}
                            className="w-full border-3 border-brand-black h-12 px-4 font-sans text-lg" />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-xl font-black mb-2 text-brand-black">Categoria</label>
                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}
                            className="w-full border-3 border-brand-black h-12 px-3 font-sans text-lg bg-white">
                            {themeCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="motivationalText" className="block text-xl font-black mb-2 text-brand-black">Texto Motivador</label>
                        <textarea id="motivationalText" value={motivationalText} onChange={(e) => setMotivationalText(e.target.value)}
                            rows={8}
                            className="w-full border-3 border-brand-black p-4 font-sans text-lg resize-y" />
                    </div>

                    <div>
                        <label htmlFor="imageUrl" className="block text-xl font-black mb-2 text-brand-black">URL da Imagem (Opcional)</label>
                        <input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://exemplo.com/imagem.png"
                            className="w-full border-3 border-brand-black h-12 px-4 font-sans text-lg" />
                    </div>

                    {error && <Alert message={error} />}
                    {success && <div className="p-4 bg-green-100 border-4 border-green-600 font-black text-green-800">{success}</div>}

                    <button type="submit" disabled={isLoading} className="w-full bg-brand-green text-white neo-button font-black text-xl py-4 hover:bg-brand-blue disabled:opacity-50 flex items-center justify-center gap-3">
                        {isLoading ? <><Loader2 className="w-6 h-6 animate-spin" /> A SALVAR...</> : <><PlusCircle className="w-6 h-6" /> CRIAR TEMA</>}
                    </button>
                </form>
            </div>
        </RoleGuard>
    );
}