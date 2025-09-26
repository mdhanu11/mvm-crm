import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UpdatePasswordService } from '../../services/auth/ForgotPassword';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tokenFromQuery = params.get('token');
        if (tokenFromQuery) {
            setToken(tokenFromQuery);
        } else {
            setError('Invalid or missing token.');
        }
    }, [location.search]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!token) {
            setError('Reset token is missing.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await UpdatePasswordService({ token, new_password: password });

            if (response.code !== 200) {
                setError(response.message);
                return;
            }

            toast.success('Password reset successful. Please login.', { autoClose: 5000 });
            navigate('/login');
        } catch (err: any) {
            console.error(err);
            setError('Something went wrong, please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-12 h-[100vh]">
            {/* Left side - Reset Password Form */}
            <div className="col-span-6 light-background flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        <img src="/images/Logo.png" alt="My Virtual Mate Logo" className="h-12" />
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-sm w-full">
                        <h1 className="text-3xl text-center font-bold text-gray-900 mb-10">Reset Password</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    className="w-full px-3 py-2 border light-background border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirm-password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter new password"
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
                                {isLoading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword;
