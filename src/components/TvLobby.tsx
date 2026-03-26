import { QRCodeSVG } from 'qrcode.react';
import { Users } from 'lucide-react';

interface Props {
  venueData: any;
}

export default function TvLobby({ venueData }: Props) {
  // Generate the unique link for this specific bar
  const mobileJoinLink = `https://trivia-mobile.vercel.app/?room=${venueData?.userId}`;

  return (
    <div className="flex gap-16 items-center max-w-6xl w-full animate-fade-in">
      <div className="flex-1">
        <h2 className="text-7xl font-black text-white leading-tight mb-6">
          Scan to play <br/> <span className="text-indigo-400">Live Trivia.</span>
        </h2>
        <p className="text-2xl text-zinc-400 mb-8 max-w-lg">
          Point your phone camera at the screen to join the lobby. Fast fingers get more points!
        </p>
        <div className="flex items-center gap-4 text-zinc-500">
          <Users className="w-8 h-8" />
          <span className="text-xl font-medium tracking-wide">Waiting for host to start...</span>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-3xl shadow-2xl shadow-indigo-500/20 transform hover:scale-105 transition-transform">
        <QRCodeSVG value={mobileJoinLink} size={400} level="H" includeMargin={true} />
      </div>
    </div>
  );
}