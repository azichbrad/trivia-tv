import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Monitor, AlertCircle } from 'lucide-react';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleOAuthLogin = async () => {
    setErrorMessage('');
    
    // Check if we are testing on our computer or live on the internet
    const isLocal = window.location.hostname === 'localhost';
    
    // Hardcode the exact URLs for the TV app to prevent Supabase confusion
    // (Note: Change 5175 to whatever local port Vite is using for your TV app!)
    const redirectUrl = isLocal 
      ? 'http://localhost:5175/' 
      : 'https://trivia-tv.vercel.app/';

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: redirectUrl } 
    });
    
    if (error) setErrorMessage(error.message);
  };

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
        <p className="text-zinc-500 text-center mb-8">Authenticate to link this display to your venue's live broadcast.</p>
        
        {errorMessage && (
          <div className="w-full bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg flex items-start gap-3 mb-6">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{errorMessage}</p>
          </div>
        )}

        {/* GOOGLE LOGIN BUTTON */}
        <button 
          onClick={handleOAuthLogin}
          className="w-full bg-white hover:bg-zinc-200 text-zinc-900 font-bold text-lg py-3 rounded-xl transition-colors flex items-center justify-center gap-3 mb-6"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        <div className="w-full flex items-center gap-4 mb-6">
          <div className="h-px bg-zinc-800 flex-grow"></div>
          <span className="text-zinc-600 text-sm font-bold uppercase tracking-wider">Or</span>
          <div className="h-px bg-zinc-800 flex-grow"></div>
        </div>

        <form onSubmit={handleAuth} className="w-full flex flex-col gap-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 text-white text-lg rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500" placeholder="Manager Email" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 text-white text-lg rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500" placeholder="Password" />
          <button type="submit" className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-lg py-3 rounded-xl transition-colors border border-zinc-700 mt-2">
            Sign In with Email
          </button>
        </form>
      </div>
    </div>
  );
}