'use client';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

import { useLocalAuth } from '../providers/LocalAuthProvider';
import { useEffect, useState } from 'react';

export default function DebugAuthInfo({ authType = 'local' }: { authType?: 'local' | 'simple' }) {
  // This is a safe way to handle both auth systems
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Check localStorage directly rather than using hooks to avoid dependency issues
    try {
      // Check simple auth first
      const simpleUser = localStorage.getItem('simple_user');
      if (simpleUser) {
        setAuthState({
          user: JSON.parse(simpleUser),
          isAuthenticated: true,
          isLoading: false
        });
        return;
      }
      
      // Then check local auth
      const localUser = localStorage.getItem('currentUser');
      if (localUser) {
        setAuthState({
          user: JSON.parse(localUser),
          isAuthenticated: true,
          isLoading: false
        });
        return;
      }
      
      // No user found
      setAuthState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      console.error('Error in DebugAuthInfo:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);
  
  if (!isMounted) {
    return null; // Don't render anything during SSR
  }
  
  const { user, isAuthenticated, isLoading } = authState;
  
  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50 max-w-sm text-xs border border-gray-200">
      <h4 className="font-bold mb-2 text-sm">Auth Debug Info</h4>
      <p>Is Authenticated: <span className={isAuthenticated ? "text-green-600" : "text-red-600"}>
        {isAuthenticated ? "Yes" : "No"}
      </span></p>
      <p>Is Loading: {isLoading ? "Yes" : "No"}</p>
      <p className="mt-2">User Info:</p>
      <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-32">
        {JSON.stringify(user, null, 2)}
      </pre>
      <div className="mt-2 text-right">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition-colors"
        >
          Clear Storage
        </button>
      </div>
    </div>
  );
}
