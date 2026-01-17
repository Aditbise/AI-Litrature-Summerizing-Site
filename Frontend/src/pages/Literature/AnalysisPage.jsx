import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LuChevronLeft, LuHistory, LuSend, LuPlus, LuBook } from 'react-icons/lu';
import { FiRefreshCw, FiHome } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { UserContext } from '../../context/userContext';
import Navbar from '../../components/layouts/Navbar';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const AnalysisPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const chatEndRef = useRef(null);
  const [passage, setPassage] = useState('');
  const [userQuestion, setUserQuestion] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [analysisId, setAnalysisId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [histories, setHistories] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.ANALYSIS.GET_HISTORY);
      setHistories(response.data.analyses || []);
    } catch (error) {
      console.error('History fetch error:', error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleDeleteHistory = async (id) => {
    if (window.confirm('Delete this analysis?')) {
      try {
        await axiosInstance.delete(API_PATHS.ANALYSIS.DELETE(id));
        setHistories(histories.filter((h) => h._id !== id));
        toast.success('Deleted');
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  if (!user) {
    navigate('/');
    return null;
  }

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!passage.trim()) {
      toast.error('Please paste a passage to analyze');
      return;
    }

    if (passage.length > 5000) {
      toast.error('Passage is too long (max 5000 characters)');
      return;
    }

    const userMsg = {
      id: Date.now(),
      type: 'user',
      content: passage,
      title: title || passage.substring(0, 60),
    };
    setChatHistory([...chatHistory, userMsg]);
    setPassage('');

    setLoading(true);
    try {
      const generatedTitle = title || passage.substring(0, 60).trim() + (passage.length > 60 ? '...' : '');
      
      const response = await axiosInstance.post(API_PATHS.ANALYSIS.ANALYZE, {
        analysisId: analysisId,
        passage: passage.trim(),
        userQuestion: null,
        title: generatedTitle,
        author: 'Unknown',
      });

      setAnalysis(response.data.analysis);
      setAnalysisId(response.data.analysisId);
      
      const aiMsg = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.data.analysis,
        messageId: response.data.analysisId,
      };
      setChatHistory((prev) => [...prev, aiMsg]);
      
      await fetchHistory();
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error(error.response?.data?.message || 'Failed to analyze passage');
      setChatHistory((prev) => prev.filter((m) => m.id !== userMsg.id));
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToHistory = () => {
    if (analysisId) {
      toast.success('Analysis saved to history!');
      navigate('/history');
    }
  };

  const handleRegenerate = async () => {
    if (!passage.trim() && !analysis) {
      toast.error('No passage to regenerate');
      return;
    }

    const lastAiMsg = [...chatHistory].reverse().find((m) => m.type === 'ai');
    if (!lastAiMsg) return;

    setLoading(true);
    try {
      const generatedTitle = title || passage.substring(0, 60).trim() + (passage.length > 60 ? '...' : '');
      
      const response = await axiosInstance.post(API_PATHS.ANALYSIS.ANALYZE, {
        analysisId: analysisId,
        passage: passage.trim(),
        userQuestion: null,
        title: generatedTitle,
        author: 'Unknown',
      });

      setAnalysis(response.data.analysis);
      setAnalysisId(response.data.analysisId);
      
      setChatHistory((prev) =>
        prev.map((m) =>
          m.id === lastAiMsg.id ? { ...m, content: response.data.analysis } : m
        )
      );
      
      toast.success('Analysis regenerated!');
      await fetchHistory();
    } catch (error) {
      console.error('Regenerate error:', error);
      toast.error(error.response?.data?.message || 'Failed to regenerate analysis');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, loading]);

  const handleClear = () => {
    setPassage('');
    setTitle('');
    setAnalysis(null);
    setAnalysisId(null);
    setChatHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-lime-50 text-zinc-900 flex flex-col">
      <Navbar />

      <AnimatePresence>
        {showHistory && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistory(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />

            <motion.div
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed left-0 top-0 h-screen w-72 sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto border-r border-lime-200"
            >
              <div className="sticky top-0 bg-gradient-to-r from-lime-600 to-lime-500 p-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <LuHistory size={24} />
                  History
                </h2>
                <button
                  onClick={() => setShowHistory(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition"
                >
                  <LuChevronLeft size={20} className="text-white" />
                </button>
              </div>

              <div className="p-4 space-y-3">
                {historyLoading ? (
                  <p className="text-zinc-500 text-center py-8">Loading...</p>
                ) : histories.length === 0 ? (
                  <p className="text-zinc-500 text-center py-8">No analyses yet</p>
                ) : (
                  histories.map((item) => (
                    <motion.div
                      key={item._id}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 border border-lime-200 rounded-lg hover:border-lime-400 hover:bg-lime-50 transition cursor-pointer group"
                      onClick={() => {
                        setPassage(item.passage);
                        setTitle(item.title);
                        setAnalysis(item.aiAnalysis);
                        setAnalysisId(item._id);
                        setChatHistory([
                          { id: 1, type: 'user', content: item.passage, title: item.title },
                          { id: 2, type: 'ai', content: item.aiAnalysis, messageId: item._id },
                        ]);
                        setShowHistory(false);
                      }}
                    >
                      <h3 className="font-semibold text-zinc-900 truncate text-sm">{item.title}</h3>
                      <p className="text-xs text-zinc-600 mb-2">by {item.author}</p>
                      <p className="text-xs text-zinc-700 line-clamp-2">{item.passage}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteHistory(item._id);
                        }}
                        className="mt-2 text-xs text-red-400 hover:text-red-300 font-medium opacity-0 group-hover:opacity-100 transition"
                      >
                        Delete
                      </button>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setShowHistory(!showHistory)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="hidden sm:flex fixed bottom-8 left-24 z-30 bg-lime-500 text-white p-2 rounded-full shadow-lg hover:bg-lime-600 transition items-center gap-1"
      >
        <LuHistory size={20} />
        {histories.length > 0 && (
          <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            {histories.length}
          </span>
        )}
      </motion.button>

      <motion.button
        onClick={handleClear}
        whileHover={{ scale: 1.05, rotate: 90 }}
        whileTap={{ scale: 0.95, rotate: 90 }}
        className="hidden sm:flex fixed bottom-8 left-8 z-30 bg-lime-500 text-white p-2 rounded-full shadow-lg hover:bg-lime-600 transition"
        title="New conversation"
      >
        <LuPlus size={20} />
      </motion.button>

      <motion.button
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.05, rotate: 360 }}
        whileTap={{ scale: 0.95, rotate: 360 }}
        className="hidden sm:flex fixed top-18 left-8 z-30 bg-lime-500 text-white p-2 rounded-full shadow-lg hover:bg-lime-600 transition"
        title="Go to home"
      >
        <FiHome size={20} />
      </motion.button>

      <div className="flex-1 overflow-y-auto p-3 sm:p-6 max-w-4xl mx-auto w-full bg-gradient-to-b from-white via-lime-25 to-lime-50 pb-48 sm:pb-6">
        <AnimatePresence>
          {chatHistory.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full flex flex-col items-center justify-center text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-4"
              >
                <LuBook size={48} className="sm:size-64 text-lime-600" />
              </motion.div>
              <h1 className="text-xl sm:text-4xl font-bold text-lime-900 mb-2 sm:mb-3">Literary Analysis</h1>
              <p className="text-zinc-600 text-xs sm:text-lg max-w-md px-2">
                Paste a literary passage below to analyze its meanings, devices, themes, symbolism, historical context, and more.
              </p>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-6 text-sm text-lime-600 font-medium"
              >
                Ready to analyze...
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {chatHistory.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`mb-6 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-2xl ${
                message.type === 'user'
                  ? 'bg-gradient-to-br from-lime-500 to-lime-600 text-white rounded-3xl rounded-tr-lg shadow-lg'
                  : 'bg-white text-zinc-900 rounded-3xl rounded-tl-lg border border-lime-200 shadow-md'
              } px-3 sm:px-6 py-2 sm:py-4`}
            >
              {message.type === 'user' ? (
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-lime-100 mb-1 sm:mb-2">{message.title}</p>
                  <p className="text-xs sm:text-base text-zinc-50 whitespace-pre-wrap">{message.content}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {message.content && (
                    <div className="space-y-3">
                      {message.content.meanings && (
                        <div className="pb-2 sm:pb-3 border-b border-lime-200">
                          <h3 className="font-bold text-lime-700 mb-2 sm:mb-3 text-xs sm:text-base">Meanings & Vocabulary</h3>
                          <p className="text-xs sm:text-sm whitespace-pre-wrap">{message.content.meanings}</p>
                        </div>
                      )}
                      {message.content.literaryDevices && (
                        <div className="pb-2 sm:pb-3 border-b border-lime-200">
                          <h3 className="font-bold text-lime-700 mb-2 sm:mb-3 text-xs sm:text-base">Literary Devices</h3>
                          <p className="text-xs sm:text-sm whitespace-pre-wrap">{message.content.literaryDevices}</p>
                        </div>
                      )}
                      {message.content.themes && (
                        <div className="pb-2 sm:pb-3 border-b border-lime-200">
                          <h3 className="font-bold text-lime-700 mb-2 sm:mb-3 text-xs sm:text-base">Themes</h3>
                          <p className="text-xs sm:text-sm whitespace-pre-wrap">{message.content.themes}</p>
                        </div>
                      )}
                      {message.content.symbolism && (
                        <div className="pb-2 sm:pb-3 border-b border-lime-200">
                          <h3 className="font-bold text-lime-700 mb-2 sm:mb-3 text-xs sm:text-base">Symbolism</h3>
                          <p className="text-xs sm:text-sm whitespace-pre-wrap">{message.content.symbolism}</p>
                        </div>
                      )}
                      {message.content.historicalContext && (
                        <div className="pb-2 sm:pb-3 border-b border-lime-200">
                          <h3 className="font-bold text-lime-700 mb-2 sm:mb-3 text-xs sm:text-base">Historical Context</h3>
                          <p className="text-xs sm:text-sm whitespace-pre-wrap">{message.content.historicalContext}</p>
                        </div>
                      )}
                      {message.content.summary && (
                        <div>
                          <h3 className="font-bold text-lime-700 mb-2 sm:mb-3 text-xs sm:text-base">Summary</h3>
                          <p className="text-xs sm:text-sm whitespace-pre-wrap">{message.content.summary}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {index === chatHistory.length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleRegenerate}
                      disabled={loading}
                      className="mt-2 sm:mt-4 inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:bg-zinc-400 text-white rounded-lg text-xs sm:text-sm font-semibold transition shadow-md"
                    >
                      <FiRefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                      Regenerate
                    </motion.button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex justify-start"
          >
            <div className="bg-white rounded-3xl rounded-tl-lg border border-lime-200 px-6 py-4">
              <SpinnerLoader />
            </div>
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="fixed sm:relative bottom-0 left-0 right-0 sm:border-t border-t sm:border-lime-200 sm:bg-gradient-to-t sm:from-lime-50 sm:to-white p-3 sm:p-6 bg-white border-t border-lime-200 z-20">
        <form onSubmit={handleAnalyze} className="max-w-4xl mx-auto px-2 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden sm:block space-y-2 sm:space-y-4 bg-white rounded-lg sm:rounded-2xl p-2 sm:p-6 shadow-lg border border-lime-100"
          >
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <motion.div
                className="flex-1"
                whileFocus={{ scale: 1.02 }}
              >
                <textarea
                  value={passage}
                  onChange={(e) => setPassage(e.target.value)}
                  placeholder="Paste passage..."
                  maxLength={5000}
                  className="w-full h-16 sm:h-24 bg-white border-2 border-lime-200 rounded-lg sm:rounded-xl px-2 sm:px-4 py-1 sm:py-3 text-xs sm:text-base text-zinc-900 placeholder-zinc-400 focus:border-lime-500 focus:ring-2 focus:ring-lime-200 focus:outline-none resize-none shadow-sm transition-all duration-300 hover:border-lime-300"
                />
              </motion.div>
              <motion.button
                type="submit"
                disabled={loading || !passage.trim()}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto h-14 sm:h-20 px-3 sm:px-6 bg-gradient-to-br from-lime-500 via-lime-550 to-lime-600 hover:from-lime-600 hover:via-lime-600 hover:to-lime-700 disabled:bg-zinc-300 text-white text-xs sm:text-base rounded-lg sm:rounded-xl font-bold transition shadow-lg flex items-center justify-center group mt-2 sm:mt-0"
              >
                <motion.div
                  animate={loading ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.6, repeat: loading ? Infinity : 0 }}
                >
                  <LuSend size={24} className="group-hover:scale-110 transition" />
                </motion.div>
              </motion.button>
            </div>
            <div className="hidden sm:flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <motion.div
                className="flex-1 w-full"
                whileFocus={{ scale: 1.02 }}
              >
                <label className="block text-xs sm:text-sm font-semibold text-lime-700 mb-1 sm:mb-2">Passage Title (Optional)</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Excerpt from Romeo and Juliet"
                  className="w-full bg-white border-2 border-lime-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:border-lime-500 focus:ring-2 focus:ring-lime-200 focus:outline-none shadow-sm transition-all duration-300 hover:border-lime-300"
                />
              </motion.div>
              <div className="hidden sm:flex flex-col items-center justify-center mt-2 sm:mt-0">
                <motion.div
                  animate={{ scale: passage.length > 4500 ? 1.1 : 1 }}
                  className={`text-xs sm:text-sm font-bold ${
                    passage.length > 4500
                      ? 'text-red-500'
                      : passage.length > 3500
                      ? 'text-amber-500'
                      : 'text-lime-600'
                  }`}
                >
                  {passage.length}
                </motion.div>
                <span className="text-xs text-zinc-400 font-medium">/ 5000</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sm:hidden flex flex-col gap-2 bg-gradient-to-r from-lime-500 to-lime-600 rounded-2xl px-3 py-2 shadow-lg border border-lime-500"
          >
            <textarea
              value={passage}
              onChange={(e) => setPassage(e.target.value)}
              placeholder="Ask anything..."
              maxLength={5000}
              className="w-full min-h-12 max-h-32 bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/70 text-sm resize-none outline-none focus:border-white/60 transition backdrop-blur-sm"
            />
            <div className="flex items-center gap-2">
              <motion.button
                type="button"
                onClick={handleClear}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-white/80 hover:text-white p-2 transition flex-shrink-0"
                title="New"
              >
                <LuPlus size={18} />
              </motion.button>

              <motion.button
                type="submit"
                disabled={loading || !passage.trim()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="ml-auto bg-white text-lime-600 rounded-full p-2 hover:bg-lime-100 disabled:bg-zinc-400 transition flex items-center justify-center flex-shrink-0"
              >
                <motion.div
                  animate={loading ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.6, repeat: loading ? Infinity : 0 }}
                >
                  <LuSend size={18} />
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default AnalysisPage;
