'use client';

import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import LoginModal from '@/components/LoginModal';
import { useCurrentRole } from './layout';
import { useRouter } from 'next/navigation';

// Mock User object to simulate login
const mockUser = {
  uid: 'mock-user-uid',
  email: 'consultor@test.com',
  displayName: 'Mock User',
  photoURL: null,
  phoneNumber: null,
  providerId: 'password',
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  refreshToken: '',
  tenantId: null,
  delete: async () => {},
  getIdToken: async () => '',
  getIdTokenResult: async () => ({
    token: '',
    authTime: '',
    issuedAtTime: '',
    signInProvider: null,
    signInSecondFactor: null,
    expirationTime: '',
    claims: {},
  }),
  reload: async () => {},
  toJSON: () => ({}),
};


export default function LandingPage() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { setUser } = useCurrentRole();
    const router = useRouter();

    const handleLoginSuccess = () => {
      setUser(mockUser);
      router.push('/dashboard');
    }

    return (
        <div className="font-sans h-full gradient-bg text-white">
            <HeroSection onShowLogin={() => setIsLoginOpen(true)} />
            <LoginModal 
                isOpen={isLoginOpen} 
                onClose={() => setIsLoginOpen(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        </div>
    );
}
