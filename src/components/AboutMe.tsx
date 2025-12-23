import { motion } from 'framer-motion';
import { User, Gamepad2, Code, Music } from 'lucide-react';

const AboutMe = () => {
  const traits = [
    { icon: <Gamepad2 className="w-5 h-5" />, text: 'Gamer' },
    { icon: <Code className="w-5 h-5" />, text: 'Tech Enthusiast' },
    { icon: <Music className="w-5 h-5" />, text: 'Music Lover' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="glass-card rounded-2xl p-6 neon-border hover-glow"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/20">
          <User className="w-5 h-5 text-primary" />
        </div>
        <h2 className="font-display text-xl text-primary">Sobre Mim</h2>
      </div>
      
      <p className="text-muted-foreground leading-relaxed mb-4 font-body text-lg">
        E aí! Sou o <span className="text-primary font-semibold">Wilwither</span>, 
        mas pode me chamar de <span className="text-secondary font-semibold">Will</span>. 
        Sou apaixonado por games, tecnologia e música. Adoro passar o tempo jogando 
        com amigos e explorando novos mundos virtuais. Se quiser trocar uma ideia 
        ou jogar junto, é só me chamar!
      </p>

      <div className="flex flex-wrap gap-3">
        {traits.map((trait, index) => (
          <motion.div
            key={trait.text}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-primary/20 text-sm"
          >
            <span className="text-primary">{trait.icon}</span>
            <span className="text-foreground/80">{trait.text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AboutMe;
