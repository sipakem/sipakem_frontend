import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye, FaChevronDown } from "react-icons/fa";
import LeftPanel from "../components/LeftPanel";
import logo from "../assets/logo_sipakem.png"; 

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    nama: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    no_hp: "",
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
      await axios.post("https://sipakembackend-production.up.railway.app/register", form);
      navigate("/");
    } catch (error) {
      if (!error.response) {
        setErrorMessage("Backend belum dijalankan");
      } else {
        setErrorMessage(error.response.data.message);
      }
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
            <h1 className="text-2xl md:text-3xl font-bold text-[#5e3e76] mb-1 text-center md:text-left">
              Daftar
            </h1>

            <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
              Sudah punya akun SIPAKEM?{" "}
              <Link to="/login" className="text-red-500 font-semibold hover:underline">
                Masuk
              </Link>
            </p>

            {/* ERROR MESSAGE */}
            {errorMessage && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-sm">
                {errorMessage}
              </div>
            )}

            {/* NAMA */}
            <div className="mb-4">
              <label className="block text-sm mb-1 font-medium text-gray-700">Nama Pengguna</label>
              <input
                type="text"
                name="nama"
                placeholder="Masukkan nama pengguna anda"
                onChange={handleChange}
                required
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#5e3e76] focus:ring-1 focus:ring-[#5e3e76]"
              />
            </div>

            {/* TANGGAL */}
            <div className="mb-4">
              <label className="block text-sm mb-1 font-medium text-gray-700">Tanggal Lahir</label>
              <input
                type="date"
                name="tanggal_lahir"
                onChange={handleChange}
                required
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#5e3e76] focus:ring-1 focus:ring-[#5e3e76]"
              />
            </div>

            {/* GENDER */}
            <div className="mb-4">
              <label className="block text-sm mb-1 font-medium text-gray-700">Jenis Kelamin</label>
              <div className="relative">
                <select
                  name="jenis_kelamin"
                  onChange={handleChange}
                  defaultValue=""
                  required
                  className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 pr-12 outline-none focus:border-[#5e3e76] focus:ring-1 focus:ring-[#5e3e76] bg-white text-gray-700"
                >
                  <option value="" disabled>
                    Pilih Jenis Kelamin
                  </option>
                  <option value="Laki-Laki">Laki - Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* NO HP */}
            <div className="mb-4">
              <label className="block text-sm mb-1 font-medium text-gray-700">No Hp</label>
              <input
                type="text"
                name="no_hp"
                placeholder="Masukkan no hp"
                onChange={handleChange}
                required
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#5e3e76] focus:ring-1 focus:ring-[#5e3e76]"
              />
            </div>

            {/* EMAIL */}
            <div className="mb-4">
              <label className="block text-sm mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Masukkan email anda"
                onChange={handleChange}
                required
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#5e3e76] focus:ring-1 focus:ring-[#5e3e76]"
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-6">
              <label className="block text-sm mb-1 font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Buat password anda"
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-12 outline-none focus:border-[#5e3e76] focus:ring-1 focus:ring-[#5e3e76]"
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
              className="w-full bg-[#5e3e76] hover:bg-[#4d325f] text-white py-3 rounded-lg font-medium transition duration-300 shadow-md"
            >
              Daftar
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Register;
