import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import LeftPanel from "../components/LeftPanel";
import logo from "../assets/logo_sipakem.png"; 

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/beranda");
      }
    }
  }, []);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://sipakembackend-production.up.railway.app/login", form);
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/beranda");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Terjadi kesalahan saat login");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 md:bg-[#f5f5f5]">
      <LeftPanel />
      <div className="w-full md:w-[58%] bg-transparent md:bg-white rounded-none md:rounded-l-[30px] md:shadow-[-5px_0_20px_rgba(0,0,0,0.1)] flex flex-col justify-center items-center px-6 py-10 md:px-8">
    
        <div className="block md:hidden mb-6 flex justify-center w-full">
          <img src={logo} alt="logo sipakem" className="w-40 object-contain" />
        </div>

       <div className="w-full max-w-[420px] bg-white/80 backdrop-blur-sm md:bg-transparent p-6 md:p-0 rounded-2xl shadow-lg md:shadow-none border border-white/40 md:border-none">
          
          <form onSubmit={handleSubmit} className="w-full">
            <h1 className="text-2xl md:text-3xl font-bold text-[#5e3e76] mb-2 text-center md:text-left">
              Masuk
            </h1>

            <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
              Masuk dengan data yang Anda masukkan saat pendaftaran.
            </p>

            {/* ERROR MESSAGE */}
            {errorMessage && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-sm">
                {errorMessage}
              </div>
            )}

            {/* EMAIL */}
            <div className="mb-4">
              <label className="block text-sm mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Masukkan email anda"
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#5e3e76] focus:ring-1 focus:ring-[#5e3e76]"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-6">
              <label className="block text-sm mb-1 font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Masukkan password anda"
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#5e3e76] focus:ring-1 focus:ring-[#5e3e76]"
                  required
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-[#5e3e76] transition"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#5e3e76] hover:bg-[#4c315f] text-white py-3 rounded-lg font-medium transition duration-300 shadow-md"
            >
              Masuk
            </button>

            <p className="text-center mt-6 text-sm text-gray-600">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="text-red-500 font-semibold hover:underline"
              >
                Daftar
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;
