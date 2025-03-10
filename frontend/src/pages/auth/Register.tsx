import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import React from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState<string | null>(null); // เพิ่ม error state
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // ตรวจสอบรหัสผ่านตรงกันหรือไม่
        if (name === 'confirmPassword' || name === 'password') {
            if (name === 'password' && formData.confirmPassword && value !== formData.confirmPassword) {
                setPasswordError('รหัสผ่านไม่ตรงกัน');
            } else if (name === 'confirmPassword' && value !== formData.password) {
                setPasswordError('รหัสผ่านไม่ตรงกัน');
            } else {
                setPasswordError('');
            }
        }
    };

    const register = async (registerData: { username: string; email: string; password: string }) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', { // แทนที่ URL ด้วย API endpoint ของคุณ
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'เกิดข้อผิดพลาดในการลงทะเบียน');
            }

            const data = await response.json();
            return data;
        } catch (err: any) {
            throw new Error(err.message || 'เกิดข้อผิดพลาดในการลงทะเบียน');
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setPasswordError('รหัสผ่านไม่ตรงกัน');
            return;
        }

        try {
            setError(null); // ล้าง error ก่อนเรียก register
            const { confirmPassword, ...registerData } = formData;
            await register(registerData);
            navigate('/login'); // เปลี่ยนเส้นทางไปหน้า login หลังจากลงทะเบียนสำเร็จ
        } catch (err: any) {
            setError(err.message || 'เกิดข้อผิดพลาดในการลงทะเบียน');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">ลงทะเบียน</h2>
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
                            <label htmlFor="email" className="sr-only">อีเมล</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="อีเมล"
                                value={formData.email}
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
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="รหัสผ่าน"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">ยืนยันรหัสผ่าน</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="ยืนยันรหัสผ่าน"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {passwordError && (
                        <div className="text-red-500 text-sm">
                            {passwordError}
                        </div>
                    )}

                    <div>
                      <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-900 to-purple-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          ลงทะเบียน
                      </button>
                    </div>

                    <div className="text-sm text-center">
                        <span>มีบัญชีอยู่แล้ว? </span>
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            เข้าสู่ระบบที่นี่
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;