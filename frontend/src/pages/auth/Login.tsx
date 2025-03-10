import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import React from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const login = async (credentials: { username: string; password: string }) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            return data;
        } catch (err: any) {
            throw new Error(err.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setError(null);
            await login(formData);
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[1a1a1a]">
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">เข้าสู่ระบบ</h2>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">ชื่อผู้ใช้</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="ชื่อผู้ใช้"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">รหัสผ่าน</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="รหัสผ่าน"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                      <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-900 to-purple-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          เข้าสู่ระบบ
                      </button>
                    </div>

                    <div className="text-sm text-center">
                        <span>ยังไม่มีบัญชี? </span>
                        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                            ลงทะเบียนที่นี่
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;