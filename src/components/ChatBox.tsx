import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const botResponses = [
  "Eae! Que bom ter você aqui! 🎮",
  "Bora jogar junto algum dia?",
  "Valeu por passar no meu perfil!",
  "Se inscreve no Discord, a comunidade é top!",
  "Tô sempre online, é só chamar!",
  "Que game você tá jogando atualmente?",
];

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "E aí! Bem-vindo ao meu perfil! Manda uma mensagem aí 👋", isUser: false, timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Bot response after delay
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-primary-foreground shadow-lg pulse-glow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 glass-card rounded-2xl neon-border overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-4 border-b border-primary/20">
              <h3 className="font-display text-lg text-primary flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Chat com Will
              </h3>
              <p className="text-xs text-muted-foreground mt-1">Online agora</p>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: message.isUser ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-muted text-foreground rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-primary/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-muted/50 border border-primary/20 rounded-xl px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
                <motion.button
                  onClick={handleSend}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBox;
