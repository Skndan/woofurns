"use client"

import { Label } from '@/components/ui/label'; 
import apiClient from '@/lib/api/api-client';
import { parseJwt } from '@/lib/api/api-utils';
import { saveTokensOnCookies } from '@/lib/utils/save-cookies';
import { Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { startTransition, useEffect } from 'react';
import toast from 'react-hot-toast';

const Callback = () => {

  const router = useRouter();
  const searchParams = useSearchParams()

  // const auth = useAuth();

  const fetchData = async () => {
    try {
 
      startTransition(async () => {
        var request = {
          "redirectUrl": "http://localhost:3000/callback",
          "authorizationCode": searchParams.get('code')
        }
        
        const response = await apiClient.post(`/v1/auth/callback`, request);

        const { access_token, refresh_token } = response.data;

        apiClient.defaults.headers['Authorization'] = `Bearer ${access_token}`;

        const { sub, exp } = parseJwt(access_token);

        saveTokensOnCookies(access_token, refresh_token, exp);

        // await auth.fetchUserProfile(access_token);

        toast.success('Welcome');
        router.push('/dashboard'); // Redirect to dashboard after successful sign-in
      });
    } catch (err) {
      toast.error('Failed to sign in. Please check your credentials.');
      console.error('Sign-in error:', err);
    } finally {
      // setIsLoading(false); // End loading when sign-in completes or fails
    }
  }

  useEffect(() => {
    const init = async () => {
      await fetchData();
    };

    init();
  }, [])

  // useEffect(() => {
  //   if (code) {



  //     // Send the authorization code to your backend (Quarkus)
  //     // fetch('/api/exchange-code', {
  //     //   method: 'POST',
  //     //   headers: {
  //     //     'Content-Type': 'application/json',
  //     //   },
  //     //   body: JSON.stringify({ code }),
  //     // })
  //     //   .then(response => response.json())
  //     //   .then(data => {
  //     //     // Handle the tokens returned from your backend (e.g., store them in localStorage)
  //     //     localStorage.setItem('access_token', data.access_token);
  //     //     localStorage.setItem('refresh_token', data.refresh_token);

  //     //     // Redirect the user to the home page or another page
  //     //     router.push('/');
  //     //   })
  //     //   .catch(err => {
  //     //     console.error('Error exchanging code:', err);
  //     //   });



  //   }

  //   if (error) {
  //     console.error('Error during authentication:', error);
  //   }
  // }, []);

  return <div className="grid h-screen place-items-center">
    <div className='flex flex-col items-center'>
      <Loader className="animate-spin h-5 w-5 mr-3" />
      <Label className='mt-4'>Authenticating...</Label>
    </div>
  </div>
};

export default Callback;
