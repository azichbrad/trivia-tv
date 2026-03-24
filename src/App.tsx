import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://trivia-api-z36k.onrender.com');
const NEWPORT_BAR_ID = '11111111-1111-1111-1111-111111111111';

interface PlayerScore {
  name: string;
  score: number;
}

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [screen, setScreen] = useState<'idle' | 'question' | 'leaderboard'>('idle');
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<PlayerScore[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('join_bar', NEWPORT_BAR_ID);
    });

    socket.on('disconnect', () => setIsConnected(false));

    socket.on('NEW_QUESTION', (data) => {
      setCurrentQuestion(data);
      setScreen('question');
    });

    // THE UPGRADE: The TV now unpacks the object to find the leaderboard array
    socket.on('SHOW_LEADERBOARD', (data: { leaderboard: PlayerScore[], correctAnswer: string }) => {
      setLeaderboard(data.leaderboard);
      setScreen('leaderboard');
    });

    socket.on('GAME_OVER', () => {
      setScreen('idle');
      setLeaderboard([]); 
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('NEW_QUESTION');
      socket.off('SHOW_LEADERBOARD');
      socket.off('GAME_OVER');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8 font-sans">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
        <span className="text-sm font-semibold text-gray-400">{isConnected ? 'TV Connected' : 'Offline'}</span>
      </div>

      <div className="w-full max-w-4xl flex-grow flex flex-col items-center justify-center text-center">
        {screen === 'idle' && (
          <div className="animate-fade-in">
            <h1 className="text-6xl font-black tracking-tighter text-blue-500 mb-4">NEWPORT SPORTS TAVERN</h1>
            <p className="text-2xl text-gray-400 font-light">Live Trivia starting soon...</p>
          </div>
        )}

        {screen === 'question' && currentQuestion && (
          <div className="w-full animate-fade-in bg-gray-800 p-12 rounded-3xl shadow-2xl border border-gray-700">
            <h2 className="text-5xl font-bold mb-12 leading-tight">{currentQuestion.questionText}</h2>
            <div className="grid grid-cols-2 gap-6 w-full max-w-3xl mx-auto">
              {currentQuestion.answers.map((answer: string, index: number) => (
                <div key={index} className="bg-blue-600 rounded-xl p-6 text-2xl font-semibold shadow-lg">{answer}</div>
              ))}
            </div>
          </div>
        )}

        {screen === 'leaderboard' && (
          <div className="w-full max-w-2xl animate-fade-in bg-gray-800 p-12 rounded-3xl shadow-2xl border border-blue-500/30">
            <h2 className="text-5xl font-black text-blue-400 mb-8 tracking-wide">TOP 5 PLAYERS</h2>
            {leaderboard.length === 0 ? (
              <p className="text-2xl text-gray-400">Nobody scored points this round!</p>
            ) : (
              <div className="flex flex-col gap-4">
                {leaderboard.map((player, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-900 p-6 rounded-xl border border-gray-700">
                    <div className="flex items-center gap-6">
                      <span className="text-3xl font-black text-gray-500">#{index + 1}</span>
                      <span className="text-3xl font-bold">{player.name}</span>
                    </div>
                    <span className="text-3xl font-black text-green-400">{player.score.toLocaleString()} pts</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;