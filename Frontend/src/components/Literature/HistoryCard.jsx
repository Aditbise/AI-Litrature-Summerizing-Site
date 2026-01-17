import React from 'react';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import moment from 'moment';

const HistoryCard = ({ analysis, onView, onDelete }) => {
  const truncateText = (text, maxLength = 100) => {
    if (!text) return 'No passage';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="bg-zinc-400 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-zinc-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-lime-600 to-lime-500 p-4 border-b border-zinc-300">
        <h3 className="font-bold text-white text-lg truncate bg-gradient-to-r from-white via-lime-100 to-white bg-clip-text text-transparent drop-shadow-sm">{analysis.title || 'Untitled'}</h3>
        <p className="text-sm text-lime-100">by {analysis.author || 'Unknown'}</p>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Passage Preview */}
        <div className="mb-4">
          <p className="text-xs text-zinc-700 font-semibold mb-1">PASSAGE</p>
          <p className="text-sm text-zinc-700 line-clamp-2">
            {truncateText(analysis.passage, 150)}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-zinc-700 mb-4">
          <span>{moment(analysis.createdAt).fromNow()}</span>
          <span className="text-lime-600 font-semibold">
            {analysis.passage.length} chars
          </span>
        </div>

        {/* Question if exists */}
        {analysis.userQuestion && (
          <div className="mb-4 p-3 bg-zinc-300 rounded-lg border border-lime-500/30">
            <p className="text-xs text-zinc-700 font-semibold mb-1">QUESTION</p>
            <p className="text-sm text-lime-600">{truncateText(analysis.userQuestion, 80)}</p>
          </div>
        )}

        {/* Notes if exists */}
        {analysis.notes && (
          <div className="mb-4 p-3 bg-zinc-300 rounded-lg border border-yellow-500/30">
            <p className="text-xs text-zinc-700 font-semibold mb-1">NOTES</p>
            <p className="text-sm text-yellow-600">{truncateText(analysis.notes, 80)}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-zinc-300 p-4 flex gap-2">
        <button
          onClick={onView}
          className="flex-1 flex items-center justify-center gap-2 bg-lime-600 text-white font-semibold py-2 rounded-lg hover:bg-lime-700 transition text-sm"
        >
          <FiEye size={16} />
          View
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-600/20 text-red-600 font-semibold rounded-lg hover:bg-red-600/30 transition border border-red-500/30"
          title="Delete analysis"
        >
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default HistoryCard;
