import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import { Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const schema = yup.object({
  content: yup
    .string()
    .required('Post content is required')
    .min(1, 'Post cannot be empty')
    .max(1000, 'Post cannot exceed 1000 characters')
});

const PostForm = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const contentValue = watch('content', '');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await api.post('/posts', data);
      if (response.data.success) {
        onPostCreated(response.data.post);
        reset();
        toast.success('Post created successfully!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-4">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-primary-600 font-semibold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <textarea
              {...register('content')}
              placeholder="What's on your mind?"
              className={`w-full p-4 border ${
                errors.content ? 'border-red-300' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none`}
              rows={4}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
            )}
            
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-gray-500">
                {contentValue.length}/1000 characters
              </span>
              <button
                type="submit"
                disabled={isSubmitting || !contentValue.trim()}
                className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
                <span>{isSubmitting ? 'Posting...' : 'Post'}</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
