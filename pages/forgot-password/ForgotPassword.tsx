import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ResetPasswordLinkService } from '../../services/auth/ForgotPassword';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await ResetPasswordLinkService({ username });

            if (response.code !== 200) {
                setError(response.message);
                return;
            }

            toast.success('Password reset instructions sent to your email.', { autoClose: 5000 });
            navigate('/login');
        } catch (err: any) {
            console.error(err);
            setError('Something went wrong, please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-12 h-[100vh]">
            {/* Left side - Forgot Password Form */}
            <div className="col-span-6 light-background flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        <img src="/images/Logo.png" alt="My Virtual Mate Logo" className="h-12" />
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-sm w-full">
                        <h1 className="text-3xl text-center font-bold text-gray-900 mb-10">Forgot Password</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                    Enter your username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                    className="w-full px-3 py-2 border light-background border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary text-white py-2 px-4 rounded-md transition duration-300"
                            >
                                {isLoading ? 'Sending...' : 'Send Reset Link'}
                            </button>

                            <div className="mt-4 text-center">
                                <a
                                    href="/login"
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Back to Login
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Right side - Image */}
            <div className="col-span-6">
                <img
                    src="/images/login.png"
                    className="w-full h-screen object-cover"
                    alt="Business meeting scene"
                />
            </div>
        </div>
    );
};

export default ForgotPassword;
