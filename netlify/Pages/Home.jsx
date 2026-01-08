
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "@/entities/User";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Send, Mic, Sparkles, Loader2, CheckCircle } from "lucide-react";
import { askWithContext } from "@/Components/ai/operaAI.js";
import StructuredResponse from "@/Components/ai/StructuredResponse";
import CinematicSidebar from "@/Components/layout/CinematicSidebar";

const ParticleAnimation = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 2
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) =>
      <motion.div
        key={particle.id}
        className="absolute rounded-full bg-purple-500/20"
        style={{
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.8, 0.2],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 4 + particle.delay,
          repeat: Infinity,
          ease: "easeInOut",
          delay: particle.delay
        }} />

      )}
      
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />

      <motion.div
        className="absolute bottom-1/3 right-1/3 w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/15 to-purple-500/15 blur-lg"
        animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} />

    </div>);

};

const InfoPod = ({ text, delay, floatDuration }) =>
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay, duration: 0.5, ease: "easeOut" }}
  className="relative">

    <motion.div
    animate={{ y: [0, -5, 0] }}
    transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
    className="bg-black/20 backdrop-blur-lg border border-purple-500/30 rounded-xl px-6 py-3 text-sm text-center text-purple-200/90 shadow-2xl shadow-purple-900/20 max-w-md">

      "{text}"
    </motion.div>
  </motion.div>;


export default function HomePage() {
  const [isChatActive, setIsChatActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatContainerRef = useRef(null);

  const infoPodsData = [
  { text: "If I had this when I opened my second location, we would’ve scaled 6 months faster.", floatDuration: 5 },
  { text: "Showed it to our finance guy. Jaw dropped.", floatDuration: 6 },
  { text: "My mornings would be 10x easier with Opera; it gives me insights we didn't even know we needed!", floatDuration: 4.5 }];


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleActivateChat = async () => {
    try {
      await User.me();
      setIsChatActive(true);
    } catch (error) {
      await User.loginWithRedirect(window.location.href);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { role: 'user', content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      const answer = await askWithContext(currentInput);
      const assistantMessage = { role: 'assistant', response: { type: 'simple', message: answer } };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const assistantMessage = { role: 'assistant', response: { type: 'error', message: err?.message || 'Failed to get answer.' } };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setIsListening(true);
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
        setTimeout(() => document.getElementById('ask-opera-submit-button')?.click(), 300);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {isChatActive && <CinematicSidebar />}
      
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/10 to-purple-900/5"></div>
      <ParticleAnimation />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {!isChatActive ?
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center space-y-16 w-full h-full">

              <div className="flex-1 flex flex-col items-center justify-center space-y-12">
                <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="text-[10rem] font-medium tracking-tight leading-none"
                
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(160,32,240,0.8) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 60px rgba(160, 32, 240, 0.3))'
                }}>Opera AI


              </motion.h1>

                <div className="flex flex-col items-center gap-6 max-w-2xl">
                  {infoPodsData.map((pod, index) =>
                <InfoPod key={pod.text} text={pod.text} delay={0.8 + index * 0.15} floatDuration={pod.floatDuration} />
                )}
                </div>
              </div>

              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="relative">

                <motion.button
                onClick={handleActivateChat}
                className="relative w-16 h-16 rounded-full overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>

                  <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-blue-600/20 rounded-full blur-sm"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />

                  <motion.div
                  className="absolute inset-1.5 bg-gradient-to-br from-purple-500/40 to-blue-500/30 rounded-full backdrop-blur-lg border border-purple-400/20"
                  animate={{
                    background: [
                    'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(59, 130, 246, 0.3) 100%)',
                    'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.3) 100%)',
                    'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(59, 130, 246, 0.3) 100%)']

                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />

                  <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }} />

                  <div className="absolute inset-3 rounded-full bg-white/10 backdrop-blur-sm opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                </motion.button>
                <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-56 h-2 bg-purple-500/10 blur-xl"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />

              </motion.div>
            </motion.div> :

          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-5xl h-[85vh] flex flex-col">

              <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-6">

                <h1
                className="text-4xl font-medium mb-1.5"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(160,32,240,0.8) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>

                  Ask Opera
                </h1>
                <p className="text-gray-400 font-light text-xs">Your Digital COO</p>
              </motion.div>

              <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-gray-900/30 to-black/30 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4">
                  <AnimatePresence>
                    {messages.length === 0 &&
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-2 gap-4 max-w-2xl mx-auto pt-20">

                        {[
                    "How many new patients this month?",
                    "What's our collection rate?",
                    "Show provider productivity",
                    "Today's schedule?"].
                    map((suggestion, index) =>
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      onClick={() => setInputValue(suggestion)}
                      className="p-4 bg-white/5 hover:bg-purple-600/20 rounded-2xl text-sm text-gray-300 transition-all duration-300 border border-white/10 hover:border-purple-500/30">

                            {suggestion}
                          </motion.button>
                    )}
                      </motion.div>
                  }

                    {messages.map((message, index) =>
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>

                        <div className="max-w-3xl">
                          {message.role === 'user' ?
                      <div className="bg-gray-800/80 backdrop-blur-sm p-4 rounded-2xl rounded-br-lg">
                              <p className="text-white font-light text-sm">{message.content}</p>
                            </div> :

                      <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 backdrop-blur-sm p-5 rounded-2xl rounded-bl-lg border border-purple-500/20">
                              <StructuredResponse response={message.response} />
                            </div>
                      }
                        </div>
                      </motion.div>
                  )}

                    {isLoading &&
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start">

                        <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 backdrop-blur-sm p-5 rounded-2xl rounded-bl-lg border border-purple-500/20">
                          <div className="flex items-center space-x-3">
                            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                            <span className="text-white font-light text-sm">Opera is analyzing...</span>
                          </div>
                        </div>
                      </motion.div>
                  }
                  </AnimatePresence>
                </div>

                <div className="p-6 border-t border-white/10">
                  <form onSubmit={handleSubmit} className="relative">
                    <div className="relative bg-black/30 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-3 focus-within:border-purple-500/50 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all duration-300">
                      <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask Opera anything about your practice..."
                      className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-white placeholder:text-gray-500 pr-20 text-sm" />

                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                        <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={startVoiceRecognition}
                        disabled={isListening}
                        className="rounded-full hover:bg-purple-600/20 w-9 h-9">

                          <Mic className={`w-4 h-4 transition-colors ${isListening ? 'text-red-400 animate-pulse' : 'text-gray-400'}`} />
                        </Button>
                        <Button
                        id="ask-opera-submit-button"
                        type="submit"
                        disabled={isLoading || !inputValue.trim()}
                        className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-opacity w-9 h-9 p-0">

                          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>);

}
