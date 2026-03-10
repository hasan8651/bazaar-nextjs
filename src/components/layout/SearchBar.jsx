"use client";
import { useState, useEffect } from "react";
import { Search, Mic, X } from "lucide-react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useRouter } from "next/navigation";

export default function SearchBar({ onClose }) {
  const [isMounted, setIsMounted] = useState(false); 
  const { listening, resetTranscript, transcript } = useSpeechRecognition();
  const [searchTerm, setSearchTerm] = useState("");
 const router = useRouter()

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (transcript) setSearchTerm(transcript);
  }, [transcript]);

  useEffect(() => {
    if (searchTerm === "") resetTranscript();
  }, [searchTerm, resetTranscript]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

  // সার্চ টার্মটিকে ইউআরএলের মাধ্যমে সার্চ পেজে পাঠাচ্ছি
router.push(`/search_page?q=${searchTerm}`);

  // সার্চবার পরিষ্কার করা
  setSearchTerm("");
  if (onClose) onClose();
  };

  // 
  if (!isMounted) return <div className="h-11 w-full bg-transparent" />; 

  return (
    <div className="flex items-center gap-2 w-full">
      <form 
        onSubmit={handleSearch}
        className="flex-1 flex items-center bg-[var(--surface)] border border-[var(--border)] rounded-full h-11 shadow-sm overflow-hidden focus-within:ring-2 ring-[var(--secondary)]/20 transition-all"
      >
        <div className="pl-4 text-[var(--text-secondary)] shrink-0">
          <Search size={18} />
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="flex-1 px-3 h-full bg-transparent outline-none text-sm text-[var(--text-primary)] min-w-0"
        />
        
        {/* Mic & X Group */}
        <div className="flex items-center">
          {searchTerm && !listening && (
            <button type="button" onClick={() => {setSearchTerm(""); resetTranscript();}} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
              <X size={18} />
            </button>
          )}

          <button 
            type="button"
            onClick={() => {
              if (listening) { SpeechRecognition.stopListening(); } 
              else { resetTranscript(); setSearchTerm(""); SpeechRecognition.startListening({ continuous: true }); }
            }}
            className={`px-3 transition-colors ${listening ? 'text-red-500' : 'text-gray-400'}`}
          >
            {listening ? <X size={18} className="animate-pulse" /> : <Mic size={18} />}
          </button>
        </div>

        {/* Search Button */}
        <button 
          type="submit"
          className="hidden md:flex items-center justify-center h-full px-8 bg-[var(--secondary)] text-white font-semibold text-sm hover:bg-[var(--secondary)]/90 active:scale-[0.98] transition-all duration-300"
        >
          Search
        </button>
      </form>

      {/* Mobile close btn */}
      {onClose && (
        <button 
          type="button"
          onClick={() => { onClose(); }}
          className="p-2 text-[var(--text-primary)] md:hidden"
        >
          <X size={24} />
        </button>
      )}
    </div>
  );
}