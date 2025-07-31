'use client';

import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearUser } from '@/store/slices/userSlice';
import { logoutUser } from '@/services/api';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  showAuthButtons?: boolean;
  showUserInfo?: boolean;
}

export default function Navbar({ showAuthButtons = false, showUserInfo = false }: NavbarProps) {
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(clearUser());
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear local state even if API call fails
      dispatch(clearUser());
      router.push('/login');
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Auth App
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {showAuthButtons && (
              <>
                <Link
                  href="/login"
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Register
                </Link>
              </>
            )}

            {showUserInfo && isAuthenticated && user && (
              <>
                <Link
                  href="/home"
                  className="hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Home
                </Link>
                {user.is_admin === 1 && (
                  <Link
                    href="/users"
                    className="hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                  >
                    Users
                  </Link>
                )}
                <div className="text-sm">
                  <div className="font-medium">
                    {user.is_admin === 1 ? 'Admin' : 'User'}: {user.name}
                  </div>
                  <div className="text-xs text-blue-200 font-mono">
                    ID: #{String(user.user_id).padStart(6, '0')}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}