import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { supabase } from './supabaseClient';

// Import our new components
import LoginScreen from './components/LoginScreen';
import TvLobby from './components/TvLobby';
import QuestionView from './components/QuestionView';
import Leaderboard from './components/Leaderboard';

const socket = io('https://trivia-api-z36k.onrender.com'); 

function App() {
  const [session, setSession] = useState<any>(null);
  const [venueData, setVenueData] = useState<any>(null);
  const [screen, setScreen] = useState<'lobby' | 'question' | 'leaderboard' | 'final'>('lobby');
  
  // Game State
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => handleSession(session));
    supabase.auth.onAuthStateChange((_event, session) => handleSession(session));

    // Socket Listeners
    socket.on('NEW_QUESTION', (data) => {
      setCurrentQuestion(data);
      setScreen('question');
    });

    socket.on('SHOW_LEADERBOARD', (data) => {
      setLeaderboard(data.leaderboard);
      setCorrectAnswer(data.correctAnswer);
      setScreen('leaderboard');
    });

    socket.on('GAME_OVER', (data) => {
      setLeaderboard(data.leaderboard);
      setScreen('final');
    });

    return () => {
      socket.off('NEW_QUESTION');
      socket.off('SHOW_LEADERBOARD');
      socket.off('GAME_OVER');
    };
  }, []);

  const handleSession = (session: any) => {
    setSession(session);
    if (session) {
      setVenueData({
        userId: session.user.id,
        barName: session.user.user_metadata?.barName || 'Trivia Night'
      });
      socket.emit('host_connect', { barId: session.user.id });
      setScreen('lobby');
    }
  };

  if (!session) return <LoginScreen />;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans overflow-hidden">
      
      {/* HEADER */}
      <header className="p-8 flex justify-between items-center border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-sm z-10">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight">
          {venueData?.barName}
        </h1>
        <div className="flex items-center gap-3 bg-zinc-900/80 px-4 py-2 rounded-full border border-zinc-800">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-sm font-bold text-zinc-300 tracking-widest uppercase">Live Broadcast</span>
        </div>
      </header>

      {/* DYNAMIC SCREENS ROUTER */}
      <main className="flex-grow flex items-center justify-center p-8 relative">
        {screen === 'lobby' && <TvLobby venueData={venueData} />}
        {screen === 'question' && <QuestionView question={currentQuestion} />}
        {screen === 'leaderboard' && <Leaderboard leaderboard={leaderboard} correctAnswer={correctAnswer} />}
        {screen === 'final' && <Leaderboard leaderboard={leaderboard} isFinal={true} />}
      </main>
      
    </div>
  );
}

export default App;