import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Monitor, AlertCircle } from 'lucide-react';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setErrorMessage(error.message);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-[#0f0f11] border border-zinc-800 p-10 rounded-2xl shadow-2xl flex flex-col items-center">
        <Monitor className="w-16 h-16 text-indigo-500 mb-6" />
        <h1 className="text-3xl font-black text-white mb-2 tracking-tight">TV Display Auth</h1>
        <p className="text-zinc-500 text-center mb-8">Enter your manager credentials to link this display to your venue.</p>
        
        {errorMessage && (
          <div className="w-full bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg flex items-start gap-3 mb-6">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleAuth} className="w-full flex flex-col gap-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 text-white text-lg rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500" placeholder="Manager Email" required/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 text-white text-lg rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500" placeholder="Password" required/>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg py-3 rounded-xl transition-colors mt-2">
            Link Display
          </button>
        </form>
      </div>
    </div>
  );
}