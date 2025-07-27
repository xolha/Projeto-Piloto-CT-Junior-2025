"use client"
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Remove the props interface - Next.js pages don't receive props
export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", login);
    console.log("Senha:", senha);

    // Set authentication cookie
    document.cookie = 'auth-token=your-token; path=/';
    
    // Navigate to feed
    router.push('/feed');
  };

  // Rest of your component remains the same, but change:
  // <Link to="/cadastro"> to <Link href="/cadastro">
}