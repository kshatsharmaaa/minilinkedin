/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, Edit } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PostList from '../posts/PostList';

const Profile = ({ profileData, isOwnProfile, onUpdatePost, onDeletePost }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');

  if (!profileData) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
        <p className="text-gray-500">Profile not found</p>
      </div>
    );
  }

  const { user: profileUser, posts } = profileData;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="flex items-start space-x-6">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-primary-600 font-bold text-3xl">
              {profileUser.name.charAt(0).toUpperCase()}
            </span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">{profileUser.name}</h1>
              {isOwnProfile && (
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Edit size={16} />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
            
            <p className="text-gray-600 mt-1">{profileUser.email}</p>
            
            {profileUser.bio && (
              <p className="text-gray-800 mt-3">{profileUser.bio}</p>
            )}
            
            <div className="flex items-center space-x-1 mt-4 text-gray-500">
              <Calendar size={16} />
              <span className="text-sm">
                Joined {formatDistanceToNow(new Date(profileUser.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">{posts?.length || 0}</p>
            <p className="text-gray-600 text-sm">Posts</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-gray-600 text-sm">Connections</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-gray-600 text-sm">Following</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'posts'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-colors`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'about'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-colors`}
            >
              About
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'posts' && (
            <PostList
              posts={posts}
              loading={false}
              onUpdatePost={onUpdatePost}
              onDeletePost={onDeletePost}
            />
          )}
          
          {activeTab === 'about' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-700">
                  {profileUser.bio || 'No bio available'}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                <p className="text-gray-700">Email: {profileUser.email}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Member Since</h3>
                <p className="text-gray-700">
                  {new Date(profileUser.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
