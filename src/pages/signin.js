// src/pages/auth/signin.js

import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { data: session } = useSession();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false, // Prevent automatic redirect
        });

        if (result.error) {
            setError(result.error);
        } else {
            // Redirect to dashboard or desired page after successful sign-in
            router.push('/dashboard');
        }
    };

    // Redirect to dashboard if the user is already signed in
    if (session) {
        router.push('/club-lead/dashboard');
        return null; // Prevent rendering of the sign-in page
    }

    return (
        <div>
            <h1>Sign In</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignInPage;
