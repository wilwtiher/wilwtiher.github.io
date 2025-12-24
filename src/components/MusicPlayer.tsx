import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, Music, SkipForward } from 'lucide-react';

// Playlist of songs in public/music folder
const playlist = [
  { name: 'Antigamente', path: '/music/Antigamente.mp3' },
  { name: 'Desculpa Amor', path: '/music/Desculpa_Amor.mp3' },
  { name: 'Fibonacci', path: '/music/Fibonacci.mp3' },
  { name: 'Filosofia de busão', path: '/music/Filosofia_de_busao.mp3' },
  { name: 'Maria Madalena', path: '/music/Maria_Madalena.mp3' },
  { name: 'POTARA', path: '/music/POTARA.mp3' },
  { name: 'Rivais', path: '/music/Rivais.mp3' },
  { name: 'Túmulos', path: '/music/Tumulos.mp3' },
  { name: 'Vendetta', path: '/music/Vendetta.mp3' },
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledPlaylist, setShuffledPlaylist] = useState(() => shuffleArray(playlist));
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = shuffledPlaylist[currentIndex].path;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentIndex, shuffledPlaylist]);

  const handleEnded = () => {
    // Go to next song, shuffle again when reaching end
    if (currentIndex < shuffledPlaylist.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const newShuffled = shuffleArray(playlist);
      setShuffledPlaylist(newShuffled);
      setCurrentIndex(0);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const skipToNext = () => {
    if (currentIndex < shuffledPlaylist.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const newShuffled = shuffleArray(playlist);
      setShuffledPlaylist(newShuffled);
      setCurrentIndex(0);
    }
  };

  const currentSong = shuffledPlaylist[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="fixed bottom-6 left-6 z-40"
    >
      <audio 
        ref={audioRef} 
        src={currentSong.path}
        onEnded={handleEnded}
      />
      
      <div className="glass-card rounded-2xl p-3 neon-border flex items-center gap-3">
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </motion.button>

        <div className="flex items-center gap-2 min-w-0">
          <Music className="w-4 h-4 text-primary flex-shrink-0 animate-pulse" />
          <span className="text-xs text-muted-foreground font-body truncate max-w-[100px]">
            {isPlaying ? currentSong.name : 'Pausado'}
          </span>
        </div>

        <motion.button
          onClick={skipToNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:text-primary transition-colors"
        >
          <SkipForward className="w-4 h-4" />
        </motion.button>

        <motion.button
          onClick={toggleMute}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:text-primary transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </motion.button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-16 h-1 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
        />
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
