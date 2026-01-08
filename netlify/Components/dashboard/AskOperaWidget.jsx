import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getStructuredAIResponse, askWithContext } from "../ai/operaAI.js";
import StructuredResponse from "../ai/StructuredResponse";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Sparkles, Send, Mic, X, Loader2, Upload, Image } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function AskOperaWidget() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    setIsLoading(true);
    setResponse(null);
    setIsExpanded(true);

    try {
      const answer = await askWithContext(inputValue.trim(), uploadedFiles, uploadedImages);
      // Render as a simple message by default; future: parse for structured
      setResponse({ type: 'simple', message: answer });
    } catch (err) {
      setResponse({ type: 'error', message: err?.message || 'Failed to get answer.' });
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
        // Auto-submit after voice input
        setTimeout(() => document.getElementById('ask-opera-widget-submit-button')?.click(), 500);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      alert('Only PDF files are supported');
      return;
    }
    
    if (file.size > 20 * 1024 * 1024) { // 20MB limit
      alert('File too large (max 20MB)');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        setUploadedFiles(prev => [...prev, result]);
        console.log('File uploaded:', result);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file');
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      alert('Only image files are supported');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit for images
      alert('Image too large (max 10MB)');
      return;
    }
    
    // Convert to base64 for Claude
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result.split(',')[1]; // Remove data:image/jpeg;base64, prefix
      setUploadedImages(prev => [...prev, {
        name: file.name,
        size: file.size,
        base64: base64,
        mimeType: file.type
      }]);
      console.log('Image uploaded:', file.name);
    };
    reader.readAsDataURL(file);
  };

  const clearState = () => {
    setInputValue("");
    setResponse(null);
    setIsLoading(false);
    setIsExpanded(false);
    setUploadedFiles([]);
    setUploadedImages([]);
  };

  return (
    <motion.div 
      className="fluid-surface rounded-[2rem] p-6 relative overflow-hidden"
      animate={{ height: isExpanded ? 'auto' : 'auto' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-600/30 to-blue-600/30">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-xl font-light text-white">Ask Opera</h3>
            <p className="text-sm text-gray-400">Your AI assistant for instant insights</p>
          </div>
        </div>
        <Link to={createPageUrl("AskOpera")} className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
          Full Chat &rarr;
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center space-x-3 mb-6">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about patients, revenue, schedule..."
          className="bg-black/20 border-gray-700/50 rounded-2xl h-12 text-gray-200 placeholder:text-gray-500"
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => document.getElementById('pdf-upload-input')?.click()}
          className="rounded-2xl hover:bg-blue-600/20 h-12 w-12"
        >
          <Upload className="w-5 h-5 text-gray-400" />
        </Button>
        <input
          id="pdf-upload-input"
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          className="hidden"
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => document.getElementById('image-upload-input')?.click()}
          className="rounded-2xl hover:bg-green-600/20 h-12 w-12"
        >
          <Image className="w-5 h-5 text-gray-400" />
        </Button>
        <input
          id="image-upload-input"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={startVoiceRecognition}
          disabled={isListening}
          className="rounded-2xl hover:bg-purple-600/20 h-12 w-12"
        >
          <Mic className={`w-5 h-5 ${isListening ? 'text-red-400 animate-pulse' : 'text-gray-400'}`} />
        </Button>
        <Button
          id="ask-opera-widget-submit-button"
          type="submit"
          size="icon"
          disabled={isLoading || !inputValue.trim()}
          className="rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 h-12 w-12"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin"/>
          ) : (
            <Send className="w-5 h-5" />
          )}
        </Button>
      </form>
      
      {(uploadedFiles.length > 0 || uploadedImages.length > 0) && (
        <div className="mb-4 p-3 bg-blue-900/20 border border-blue-700/30 rounded-xl">
          <p className="text-sm text-blue-300 mb-2">📎 Uploaded Files:</p>
          {uploadedFiles.map((file, index) => (
            <div key={`pdf-${index}`} className="text-xs text-blue-200">
              • 📄 {file.name} ({Math.round(file.size / 1024)}KB)
            </div>
          ))}
          {uploadedImages.map((image, index) => (
            <div key={`img-${index}`} className="text-xs text-green-200">
              • 🖼️ {image.name} ({Math.round(image.size / 1024)}KB)
            </div>
          ))}
        </div>
      )}
      
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-slate-950/50 border border-gray-700/30 p-6 rounded-2xl"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-600/30 to-blue-600/30">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
              <span className="text-gray-400">Opera is analyzing your data...</span>
            </div>
          </motion.div>
        )}

        {response && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="border-t border-white/10 pt-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-600/30 to-blue-600/30">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Opera Analysis</h4>
                  <p className="text-sm text-gray-400">AI-powered insights</p>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={clearState}
                className="rounded-full w-8 h-8"
              >
                <X className="w-4 h-4 text-gray-500 hover:text-white"/>
              </Button>
            </div>

            {response.type === 'structured' ? (
              <StructuredResponse response={response} />
            ) : response.type === 'help' ? (
              <div className="space-y-4">
                <p className="text-gray-300">I can help you with these types of queries:</p>
                <div className="grid gap-3">
                  {response.commands?.map((cmd, cmdIndex) => (
                    <button
                      key={cmdIndex}
                      onClick={() => setInputValue(cmd.query)}
                      className="text-left p-3 rounded-xl bg-black/20 border border-gray-700/30 hover:bg-purple-600/10 transition-all duration-300 group"
                    >
                      <p className="text-sm font-medium text-purple-300 group-hover:text-purple-200">{cmd.query}</p>
                      <p className="text-xs text-gray-400 mt-1">{cmd.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                {response.analysisHtml && (
                  <div 
                    className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                    dangerouslySetInnerHTML={{ __html: response.analysisHtml }}
                  />
                )}
                {response.answerHtml ? (
                  <div 
                    className="text-gray-200"
                    dangerouslySetInnerHTML={{ __html: response.answerHtml }}
                  />
                ) : (
                  <p className="text-gray-200 whitespace-pre-wrap">{response.message}</p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}