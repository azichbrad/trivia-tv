import { Trophy } from 'lucide-react';

interface Props {
  leaderboard: any[];
  correctAnswer?: string | null;
  isFinal?: boolean;
}

export default function Leaderboard({ leaderboard, correctAnswer, isFinal }: Props) {
  return (
    <div className="max-w-4xl w-full flex flex-col items-center animate-fade-in">
      
      {/* Only show the correct answer if it's between rounds, not the final screen */}
      {!isFinal && correctAnswer && (
        <>
          <h2 className="text-3xl text-zinc-400 font-bold uppercase tracking-widest mb-4">The correct answer was</h2>
          <h3 className="text-6xl font-black text-emerald-400 mb-16 px-12 py-6 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-3xl text-center">
            {correctAnswer}
          </h3>
        </>
      )}

      {isFinal && (
        <h2 className="text-6xl font-black text-amber-400 mb-16 uppercase tracking-widest text-center">
          Final Standings
        </h2>
      )}
      
      <div className="w-full bg-[#0f0f11] border border-zinc-800 p-8 rounded-3xl shadow-2xl">
        <h4 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <Trophy className={`w-8 h-8 ${isFinal ? 'text-amber-400' : 'text-indigo-400'}`} /> 
          {isFinal ? 'Top Winners' : 'Current Standings'}
        </h4>
        <div className="flex flex-col gap-4">
          {leaderboard.slice(0, 5).map((player, idx) => (
            <div key={idx} className="flex justify-between items-center p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800/50">
              <div className="flex items-center gap-6">
                <span className="text-4xl font-black text-zinc-600">#{idx + 1}</span>
                <span className="text-3xl font-bold text-zinc-100">{player.name}</span>
              </div>
              <span className={`text-4xl font-black ${isFinal ? 'text-amber-400' : 'text-indigo-400'}`}>
                {player.score.toLocaleString()}
              </span>
            </div>
          ))}
          {leaderboard.length === 0 && (
            <div className="text-zinc-500 text-center py-8 text-xl font-medium">No scores yet!</div>
          )}
        </div>
      </div>
    </div>
  );
}