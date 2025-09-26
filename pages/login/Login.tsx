import { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginService } from '../../services/auth/LoginService';
import { UserType } from './type';
import { useAppDispatch } from '../../store/store';
import { setAuthState, } from '../../store/slices/authSlice';
export const Login = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        remember_me: false,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await LoginService(formData);

            if (response.code !== 200) {
                setError(response.message);
                return;
            }

            const userDetails: UserType = {
                ...response?.userDetails,
                username: response?.userDetails?.Username, // Yes api return Username
            };

            if (userDetails && userDetails?.role) {
                dispatch(setAuthState({
                    username: userDetails?.username,
                    full_name: userDetails?.full_name,
                    role: userDetails?.role,
                    permissions: userDetails?.permissions
                }))
            }

            toast.success('Login successful! Welcome back!', { autoClose: 5000 });

            navigate('/dashboard/home');
        } catch (err: any) {
            console.error(err);
            setError('Something went wrong, please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("access_token"))
            navigate("/dashboard/home")
    }, [])


    return (
        <div className="grid grid-cols-12 h-[100vh]">
            {/* Left side - Login Form */}
            <div className="col-span-6 light-background flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        <img src="/images/Logo.png" alt="My Virtual Mate Logo" className="h-12" />
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-sm w-full">
                        <h1 className="text-3xl text-center font-bold text-gray-900 mb-10">Log In</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Enter username here"
                                    className="w-full px-3 py-2 border light-background border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password here"
                                    className="w-full px-3 py-2 border light-background border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-end mb-6">
                                {/* <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        type="checkbox"
                                        checked={formData.remember_me}
                                        onChange={(e) => setFormData({...formData, remember_me:e.target.checked})}
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                                        Remember me
                                    </label>
                                </div> */}
                                <div>
                                    <Link to={'/forgot-password'} className="text-sm text-gray-600 hover:text-gray-900">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary text-white py-2 px-4 rounded-md transition duration-300"
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
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

export default Login;
