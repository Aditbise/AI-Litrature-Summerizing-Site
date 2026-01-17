import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserContext } from '../../context/userContext';
import Navbar from '../../components/layouts/Navbar';
import HistoryCard from '../../components/Literature/HistoryCard';
import SkeletonLoader from '../../components/Loader/SkeletonLoader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const HistoryPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!user) {
    navigate('/');
    return null;
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.ANALYSIS.GET_HISTORY);
      setAnalyses(response.data.analyses);
    } catch (error) {
      console.error('History fetch error:', error);
      toast.error('Failed to load analysis history');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this analysis?')) {
      try {
        await axiosInstance.delete(API_PATHS.ANALYSIS.DELETE(id));
        setAnalyses(analyses.filter((a) => a._id !== id));
        toast.success('Analysis deleted successfully');
      } catch (error) {
        console.error('Delete error:', error);
        toast.error('Failed to delete analysis');
      }
    }
  };

  const handleView = (id) => {
    navigate(`/analysis/${id}`);
  };

  return (
    <div className="min-h-screen bg-zinc-500 text-zinc-900 p-6">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-zinc-900 mb-2">Analysis History</h1>
          <p className="text-zinc-700">View and manage your previous literary analyses</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i}>
                <SkeletonLoader />
              </div>
            ))}
          </div>
        ) : analyses.length === 0 ? (
          <div className="bg-zinc-400 rounded-xl shadow-lg p-16 text-center border border-zinc-300">
            <p className="text-zinc-700 text-xl mb-4">No analyses yet</p>
            <button
              onClick={() => navigate('/analyze')}
              className="bg-lime-600 text-white px-6 py-3 rounded-lg hover:bg-lime-700 transition"
            >
              Create Your First Analysis
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analyses.map((analysis) => (
              <HistoryCard
                key={analysis._id}
                analysis={analysis}
                onView={() => handleView(analysis._id)}
                onDelete={() => handleDelete(analysis._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
