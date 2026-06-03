import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import LeftPanel from "../components/LeftPanel";
import { useEffect } from "react";
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
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen md:flex bg-[#f3eef7]">
      <div className="hidden md:block">
        <LeftPanel />
      </div>

      <div className="w-full md:w-[58%] flex justify-center items-center p-5 md:p-0">
        <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-lg p-8 md:shadow-none md:p-0 md:bg-transparent">
          <div className="w-full max-w-[420px]">
            {/* Logo Mobile */}
            <div className="md:hidden flex flex-col items-center mb-8">
              <img
                src={logo}
                alt="SIPAKEM"
                className="w-24 h-24 mb-3"
              />
          
              <h1 className="text-2xl font-bold text-[#5e3e76]">
                SIPAKEM
              </h1>
          
              <p className="text-sm text-gray-500 mt-1 text-center">
                Sistem Pakar Kesehatan Mental
              </p>
            </div>
          
            <form onSubmit={handleSubmit} className="mt-2">
              <h1 className="text-3xl font-bold text-[#5e3e76] mb-3">
                Masuk
              </h1>
    
              <p className="text-sm text-gray-500 mb-8">
                Masuk dengan data yang Anda masukkan saat pendaftaran.
              </p>
    
              {/* EMAIL */}
              <div className="mb-5">
                {errorMessage && (
                  <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
                    {errorMessage}
                  </div>
                )}
    
                <label className="block text-sm mb-1">Email</label>
    
                <input
                  type="email"
                  name="email"
                  placeholder="Masukkan email anda"
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-lg px-4 py-3 outline-none focus:border-[#5e3e76]"
                />
              </div>
    
              {/* PASSWORD */}
              <div className="mb-8">
                <label className="block text-sm mb-1">Password</label>
    
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Buat password anda"
                    onChange={handleChange}
                    className="w-full border border-gray-400 rounded-lg px-4 py-3 outline-none focus:border-[#5e3e76]"
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
                className="w-full bg-[#5e3e76] hover:bg-[#4c315f] text-white py-3 rounded-xl transition duration-300 font-medium"
              >
                Masuk
              </button>
    
              <p className="text-center mt-7 text-sm">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  className="text-red-400 font-medium hover:underline"
                >
                  Daftar
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
