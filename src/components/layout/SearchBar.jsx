
"use client";
import { useState, useEffect } from "react";
import { Search, Mic, X } from "lucide-react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function SearchBar() {
  const { listening, resetTranscript, transcript } = useSpeechRecognition();
  const [searchTerm, setSearchTerm] = useState("");

  // Sync transcript with searchTerm state
  useEffect(() => {
    if (transcript) {
      setSearchTerm(transcript);
    }
  }, [transcript]);

  // Handle manual input changes
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    console.log("Searching for:", searchTerm);
    // API Call logic: router.push(`/search?q=${searchTerm}`)
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="relative w-full flex items-center bg-[var(--surface)] border border-[var(--border)] rounded-full h-12 shadow-sm overflow-hidden focus-within:ring-2 ring-[var(--secondary)]/20 transition-all"
    >
      {/* Search Icon */}
      <div className="pl-5 text-[var(--text-secondary)]">
        <Search size={20} />
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for 1000s of products..."
        className="flex-1 px-3 h-full bg-transparent outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
      />
      
      {/* Voice Toggle Button */}
      <button 
        type="button"
        onClick={() => {
          if (listening) {
            SpeechRecognition.stopListening();
          } else {
            resetTranscript();
            SpeechRecognition.startListening({ continuous: true });
          }
        }}
        className={`px-3 transition-colors ${listening ? 'text-red-500' : 'text-gray-400 hover:text-[var(--secondary)]'}`}
      >
        {listening ? <X size={20} className="animate-pulse" /> : <Mic size={20} />}
      </button>

      {/* Submit Button */}
      <button 
        type="submit"
        className="px-6 h-full bg-[var(--secondary)] text-white font-semibold text-sm hover:opacity-90 transition-opacity active:scale-95"
      >
        Search
      </button>
    </form>
  );
}