import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, RotateCw, Paperclip, Mic, ChevronDown } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface FojoChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FojoChatPanel({ isOpen, onClose }: FojoChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Reset messages when panel closes
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setInputValue('');
    }
  }, [isOpen]);

  // Generate AI response (mock for now)
  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple keyword-based responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('привіт')) {
      return "Hello! I'm Fojo, your AI assistant. How can I help you today?";
    }
    
    if (lowerMessage.includes('invoice') || lowerMessage.includes('інвойс')) {
      return "I can help you find and manage invoices. Would you like me to search for specific invoices or create a collection?";
    }
    
    if (lowerMessage.includes('collection') || lowerMessage.includes('колекція')) {
      return "I can help you create and manage collections. What would you like to do?";
    }
    
    return "I understand you're asking about that. Let me help you with that. Could you provide more details?";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputValue.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        role: 'assistant',
        content: generateAIResponse(userMessage.content)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  const suggestedPrompts = [
    "What documents expire in next 30 days?",
    "Verify all required signatures are complete",
    "Browse Insurance collection for all policies"
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-30"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Chat Panel - positioned at bottom right, above the button */}
      <div 
        style={{
          position: 'fixed',
          right: '24px',
          bottom: '88px', // 48px button height + 24px bottom + 16px gap
          width: '400px',
          height: '600px',
          zIndex: 45
        }}
        className="bg-white rounded-[12px] shadow-xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
      >
        {/* Header - Dark grey */}
        <div className="bg-[#24272B] px-[24px] py-[16px] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-[12px]">
            {/* Hexagonal logo placeholder */}
            <div className="size-[32px] rounded-[6px] bg-white/10 flex items-center justify-center">
              <Sparkles className="size-[18px] text-white" />
            </div>
            <h2 className="text-[14px] font-semibold text-white">Fojo Assistant</h2>
          </div>
          <div className="flex items-center gap-[8px]">
            <button
              className="size-[32px] flex items-center justify-center rounded-[6px] hover:bg-white/10 transition-colors"
              aria-label="Refresh"
            >
              <RotateCw className="size-[16px] text-white" />
            </button>
            <button
              onClick={onClose}
              className="size-[32px] flex items-center justify-center rounded-[6px] hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <X className="size-[16px] text-white" />
            </button>
          </div>
        </div>

      {/* Messages Area - White background */}
      <div className="flex-1 overflow-y-auto bg-white px-[24px] py-[24px]">
        {messages.length === 0 ? (
          <div className="space-y-[20px]">
            {/* Greeting Message */}
            <div className="space-y-[4px] mb-[24px]">
              <p className="text-[14px] text-[#1c2024] leading-[1.6]">
                👋 Hi there! I'm here to help you with your work and answer any questions you have about your tasks, decisions, or projects for Athena.
              </p>
            </div>
            
            {/* Suggested Prompts */}
            <div className="space-y-[12px]">
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputValue(prompt);
                    inputRef.current?.focus();
                  }}
                  className="w-full text-left px-[16px] py-[10px] rounded-[8px] bg-[#f9fafb] border border-[#e8e8ec] text-[13px] text-[#1c2024] hover:bg-[#f0f0f3] transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div key={index} className={`flex gap-[12px] mb-[16px] ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'assistant' && (
                  <div className="bg-[#ebf3ff] size-[24px] rounded-full flex items-center justify-center flex-shrink-0 mt-[2px]">
                    <Sparkles className="size-[12px] text-[#005be2]" />
                  </div>
                )}
                <div className={`max-w-[75%] ${message.role === 'user' ? 'order-2' : ''}`}>
                  <div className={`rounded-[8px] px-[16px] py-[10px] ${
                    message.role === 'user' 
                      ? 'bg-[#005be2] text-white' 
                      : 'bg-[#f9fafb] text-[#1c2024]'
                  }`}>
                    <p className="text-[13px] leading-[1.5] whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
                {message.role === 'user' && (
                  <div className="bg-[#f0f0f3] size-[24px] rounded-full flex items-center justify-center flex-shrink-0 mt-[2px] order-3">
                    <svg className="size-[12px]" fill="none" viewBox="0 0 16 16">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 10a5 5 0 0 0-5 5h10a5 5 0 0 0-5-5Z" fill="#60646C"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-[12px] justify-start mb-[16px]">
                <div className="bg-[#ebf3ff] size-[24px] rounded-full flex items-center justify-center flex-shrink-0 mt-[2px]">
                  <Sparkles className="size-[12px] text-[#005be2]" />
                </div>
                <div className="bg-[#f9fafb] rounded-[8px] px-[16px] py-[10px]">
                  <div className="flex gap-[4px]">
                    <div className="w-[6px] h-[6px] rounded-full bg-[#8b8d98] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-[6px] h-[6px] rounded-full bg-[#8b8d98] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-[6px] h-[6px] rounded-full bg-[#8b8d98] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area - Light grey background */}
      <div className="bg-[#f9fafb] px-[24px] py-[16px] flex-shrink-0 border-t border-[#e8e8ec]">
        {/* Context selectors */}
        <div className="flex items-center gap-[10px] mb-[14px]">
          <button className="h-[28px] px-[12px] flex items-center gap-[6px] rounded-[6px] border border-[#e0e1e6] bg-white text-[12px] text-[#1c2024] hover:bg-[#f9fafb] transition-colors">
            <span>A Athena</span>
            <ChevronDown className="size-[14px] text-[#60646c]" />
          </button>
          <button className="h-[28px] px-[12px] flex items-center gap-[6px] rounded-[6px] border border-[#e0e1e6] bg-white text-[12px] text-[#1c2024] hover:bg-[#f9fafb] transition-colors">
            <span className="text-[#005be2]">@</span>
            <span>Add context</span>
          </button>
        </div>
        
        {/* Input field */}
        <div className="relative">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            rows={1}
            className="w-full px-[16px] py-[12px] pr-[110px] rounded-[8px] border border-[#e0e1e6] bg-white text-[13px] text-[#1c2024] placeholder:text-[#8b8d98] resize-none focus:outline-none focus:ring-2 focus:ring-[#005be2] focus:border-transparent max-h-[120px] overflow-y-auto"
            style={{ minHeight: '44px', height: 'auto' }}
          />
          
          {/* Input controls */}
          <div className="absolute right-[14px] bottom-[12px] flex items-center gap-[10px]">
            <button
              className="size-[24px] flex items-center justify-center rounded-[6px] hover:bg-[#f0f0f3] transition-colors"
              aria-label="Attach file"
            >
              <Paperclip className="size-[14px] text-[#60646c]" />
            </button>
            <button
              className="size-[24px] flex items-center justify-center rounded-[6px] hover:bg-[#f0f0f3] transition-colors"
              aria-label="Voice input"
            >
              <Mic className="size-[14px] text-[#60646c]" />
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="size-[24px] flex items-center justify-center rounded-full bg-[#f0f0f3] hover:bg-[#e0e1e6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="size-[14px] text-[#60646c]" />
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
