'use client';
import { redirect } from 'next/navigation';

export default function AppPage() {
  // Redireciona permanentemente da raiz do app ('/') para a página de temas ('/temas')
  redirect('/temas');
}