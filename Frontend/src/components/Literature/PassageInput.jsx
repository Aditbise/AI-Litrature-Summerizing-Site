import React from 'react';
import { FiTrash2, FiPlus } from 'react-icons/fi';

const PassageInput = ({
  passage,
  setPassage,
  title,
  setTitle,
  author,
  setAuthor,
  userQuestion,
  setUserQuestion,
  onAnalyze,
  onClear,
  loading,
}) => {
  const charCount = passage.length;
  const charLimit = 5000;
  const progress = (charCount / charLimit) * 100;

  return (
    <div className="bg-zinc-400 rounded-xl shadow-lg overflow-hidden border border-zinc-300">
      <div className="bg-gradient-to-r from-lime-600 to-lime-500 p-6 text-white flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-lime-100 to-white bg-clip-text text-transparent drop-shadow-lg">Analyze a Passage</h2>
          <p className="text-lime-100 text-sm mt-1">Paste any literature excerpt to get AI-powered analysis</p>
        </div>
        <button
          type="button"
          onClick={onClear}
          disabled={loading || (!passage && !title)}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          title="Start a new conversation"
        >
          <FiPlus size={18} />
          New
        </button>
      </div>

      <form onSubmit={onAnalyze} className="p-6 space-y-4">
        {/* Auto-Generated Topic Display */}
        {passage.trim() && (
          <div className="p-4 bg-zinc-300 border border-lime-500/30 rounded-lg">
            <p className="text-xs text-zinc-700 mb-1">Auto-Generated Topic:</p>
            <p className="text-lg font-semibold text-lime-600 line-clamp-2">
              {title || passage.substring(0, 60).trim() + (passage.length > 60 ? '...' : '')}
            </p>
            <p className="text-xs text-zinc-600 mt-1">You can edit this in the sidebar history</p>
          </div>
        )}

        {/* Passage Text Area */}
        <div>
          <label className="block text-sm font-semibold text-zinc-700 mb-2">
            Passage Text
          </label>
          <textarea
            value={passage}
            onChange={(e) => setPassage(e.target.value)}
            placeholder="Paste the literature passage here... (max 5000 characters)"
            maxLength={charLimit}
            rows={8}
            className="w-full px-4 py-3 border border-zinc-300 rounded-lg bg-zinc-300 text-zinc-900 focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none resize-none"
          />
          <div className="flex justify-between items-center mt-2">
            <div className="w-full bg-zinc-300 rounded-full h-2 mr-4">
              <div
                className="bg-lime-600 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <span className={`text-sm font-medium ${charCount > charLimit * 0.9 ? 'text-red-600' : 'text-zinc-700'}`}>
              {charCount}/{charLimit}
            </span>
          </div>
        </div>

        {/* User Question */}
        <div>
          <label className="block text-sm font-semibold text-zinc-700 mb-2">
            Your Question (Optional)
          </label>
          <textarea
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            placeholder="Ask a specific question about the passage... (e.g., 'What is the symbolism in this scene?')"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-300 text-gray-900 focus:ring-2 focus:ring-lime-500 focus:border-transparent outline-none resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading || !passage.trim()}
            className="flex-1 bg-gradient-to-r from-lime-600 to-lime-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing...' : 'Analyze Passage'}
          </button>
          <button
            type="button"
            onClick={onClear}
            disabled={loading}
            className="px-6 py-3 bg-zinc-300 text-zinc-700 font-semibold rounded-lg hover:bg-zinc-200 transition disabled:opacity-50\"
            title="Clear all fields"
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PassageInput;
