'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar showUserInfo={true} />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome, {user.name}! 🎉 We're glad to see you. Let's get started!
              </h1>
              
              <div className="max-w-md mx-auto bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full">
                  {user.is_admin === 1 ? (
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {user.is_admin === 1 ? 'Administrator Account' : 'User Account'}
                </h3>
                
                <dl className="text-sm text-gray-600">
                  <div className="mb-2">
                    <dt className="font-medium">Unique User ID:</dt>
                    <dd className="font-mono text-lg font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded border">
                      #{String(user.user_id).padStart(6, '0')}
                    </dd>
                  </div>
                  <div className="mb-2">
                    <dt className="font-medium">Email:</dt>
                    <dd>{user.email}</dd>
                  </div>
                  <div className="mb-2">
                    <dt className="font-medium">Role:</dt>
                    <dd className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.is_admin === 1 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.is_admin === 1 ? 'Administrator' : 'User'}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Registration Date:</dt>
                    <dd>{new Date().toLocaleDateString()}</dd>
                  </div>
                </dl>
              </div>

              {user.is_admin === 1 && (
                <div className="mt-8">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Administrator Access
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>
                            As an administrator, you have access to the Users management page where you can view, edit, and delete user accounts.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}