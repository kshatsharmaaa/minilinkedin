/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Header from '../components/common/Header';
import PostForm from '../components/posts/PostForm';
import PostList from '../components/posts/PostList';
import Loader from '../components/common/Loader';
import api from '../utils/api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (pageNum = 1) => {
    try {
      setLoading(pageNum === 1);
      const response = await api.get(`/posts?page=${pageNum}&limit=10`);
      
      if (response.data.success) {
        if (pageNum === 1) {
          setPosts(response.data.posts);
        } else {
          setPosts(prev => [...prev, ...response.data.posts]);
        }
        setHasMore(response.data.pagination.hasNextPage);
        setPage(pageNum);
      }
    } catch (error) {
      toast.error('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts(prev =>
      prev.map(post =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  const handleDeletePost = (postId) => {
    setPosts(prev => prev.filter(post => post._id !== postId));
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchPosts(page + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PostForm onPostCreated={handlePostCreated} />
        
        <PostList
          posts={posts}
          loading={loading && page === 1}
          onUpdatePost={handleUpdatePost}
          onDeletePost={handleDeletePost}
        />

        {/* Load More Button */}
        {hasMore && posts.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? <Loader size="sm" /> : 'Load More Posts'}
            </button>
          </div>
        )}

        {!hasMore && posts.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-500">You've reached the end!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
