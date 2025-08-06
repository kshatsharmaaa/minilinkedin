/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Header from '../components/common/Header';
import Profile from '../components/profile/Profile';
import { PageLoader } from '../components/common/Loader';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const ProfilePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = user?.id === id;

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/users/profile/${id}`);
      
      if (response.data.success) {
        setProfileData(response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePost = (updatedPost) => {
    setProfileData(prev => ({
      ...prev,
      posts: prev.posts.map(post =>
        post._id === updatedPost._id ? updatedPost : post
      )
    }));
  };

  const handleDeletePost = (postId) => {
    setProfileData(prev => ({
      ...prev,
      posts: prev.posts.filter(post => post._id !== postId)
    }));
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Profile
          profileData={profileData}
          isOwnProfile={isOwnProfile}
          onUpdatePost={handleUpdatePost}
          onDeletePost={handleDeletePost}
        />
      </main>
    </div>
  );
};

export default ProfilePage;
