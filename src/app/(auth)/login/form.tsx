'use client';
import Link from 'next/link';
import Google from '@/components/shared/icons/google';
import Button from '@/components/ui/form-button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateEmail, validatePassword } from '@/lib/utils';
import { api } from '@/lib/api';

// Custom hook for form state management
const useFormState = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    return { email, password, setEmail, setPassword, error, setError };
};

const useLoginForm = () => {
    const router = useRouter();

    const handleGoogleLogin = () => {
        const apiUrl =
            process.env.NODE_ENV === 'production'
                ? process.env.NEXT_PUBLIC_PROD_API_URL
                : process.env.NEXT_PUBLIC_DEV_API_URL;
        const redirectUrl = `${apiUrl}/auth/google`;
        window.location.href = redirectUrl;
    };

    const handleEmailLogin = async (
        email: string,
        password: string,
        error: string,
        setError: (error: string) => void
    ) => {
        if (!validateEmail(email)) {
            setError('Please enter a valid email');
            return;
        }

        if (!validatePassword(password)) {
            setError(
                'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
            );
            return;
        }

        try {
            const res = await api.post('/auth/local', {
                email,
                password,
            });

            if (res.status === 200) {
                const user = (await res.data()) as User;

                // redirect to the dashboard
                router.push('/dashboard');
            } else {
                setError('Failed to log in, please try again');
                throw new Error('Failed to log in');
            }
        } catch (error) {
            setError('Failed to log in, please try again');
            console.error(error);
        }
    };

    return { handleGoogleLogin, handleEmailLogin };
};

export default function LoginForm() {
    const { email, password, setEmail, setPassword, error, setError } =
        useFormState();
    const { handleGoogleLogin, handleEmailLogin } = useLoginForm();

    const handleSubmit = () => {
        handleEmailLogin(email, password, error, setError);
    };

    return (
        <div className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 sm:px-16">
            <Button
                text="Continue with Google"
                icon={<Google className="h-4 w-4" />}
                onClick={handleGoogleLogin}
            />
            <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
                <div>
                    <div className="mb-4 mt-1 border-t border-gray-300" />
                    <input
                        id="email"
                        name="email"
                        autoFocus
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                    />
                </div>
                <div>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                    />
                </div>
                <Button
                    text="Continue with Email"
                    variant="secondary"
                    onClick={handleSubmit}
                />
            </form>
            <p className="text-center text-sm text-gray-500">
                Don&apos;t have an account?{' '}
                <Link
                    href="/register"
                    className="font-semibold text-gray-500 transition-colors hover:text-black"
                >
                    Sign Up
                </Link>
                .
            </p>
        </div>
    );
}
