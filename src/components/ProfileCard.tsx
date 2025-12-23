import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ProfileCardProps {
  avatarUrl: string;
}

const ProfileCard = ({ avatarUrl }: ProfileCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className="relative"
    >
      {/* Glow effect behind avatar */}
      <div className="absolute inset-0 blur-3xl opacity-50">
        <div className="w-full h-full bg-gradient-to-br from-primary via-secondary to-accent rounded-full" />
      </div>
      
      {/* Avatar container */}
      <div className="relative float-animation">
        <div className="w-40 h-40 md:w-52 md:h-52 rounded-full p-1 bg-gradient-to-br from-primary via-secondary to-accent">
          <div className="w-full h-full rounded-full overflow-hidden bg-background p-1">
            <img
              src={avatarUrl}
              alt="Wilwither"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
        
        {/* Online indicator */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-background shadow-lg shadow-green-500/50"
        />
      </div>

      {/* Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mt-6"
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold neon-text text-foreground">
          Wilwither
        </h1>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Sparkles className="w-4 h-4 text-secondary" />
          <p className="text-muted-foreground font-body text-lg">
            também conhecido como <span className="text-primary">Will</span>
          </p>
          <Sparkles className="w-4 h-4 text-secondary" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileCard;
