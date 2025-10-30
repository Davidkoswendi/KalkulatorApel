import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaLock,
  FaSignInAlt,
  FaAppleAlt,
  FaUserPlus,
  FaEnvelope,
} from 'react-icons/fa';
import '../styles/login.css';

const Login = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('mathUsers')) || {};

    if (isRegistering) {
      // Validasi form register
      if (!registerUsername || !email || !password || !confirmPassword) {
        setError('Semua field harus diisi');
        return;
      }

      if (password.length < 4) {
        setError('Password minimal 4 karakter');
        return;
      }

      if (password !== confirmPassword) {
        setError('Konfirmasi password tidak cocok');
        return;
      }

      if (storedUsers[registerUsername]) {
        setError('Username sudah digunakan');
        return;
      }

      const emailExists = Object.values(storedUsers).some(
        (user) => user.email === email
      );
      if (emailExists) {
        setError('Email sudah digunakan');
        return;
      }

      // Simpan ke localStorage
      storedUsers[registerUsername] = {
        email,
        password,
        highScore: 0,
      };
      localStorage.setItem('mathUsers', JSON.stringify(storedUsers));
      alert('Registrasi berhasil! Silakan login.');
      setIsRegistering(false);
      setRegisterUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
    } else {
      // Proses login
      if (!usernameOrEmail || !password) {
        setError('Masukkan username/email dan password');
        return;
      }

      let foundUser = null;
      let foundUsername = null;

      for (const [uname, data] of Object.entries(storedUsers)) {
        if (uname === usernameOrEmail || data.email === usernameOrEmail) {
          foundUser = data;
          foundUsername = uname;
          break;
        }
      }

      if (!foundUser) {
        setError('Akun tidak ditemukan');
        return;
      }

      if (foundUser.password !== password) {
        setError('Password salah');
        return;
      }

      // Login berhasil
      onLogin(foundUsername);
      localStorage.setItem('mathAppUser', JSON.stringify({ username: foundUsername }));
      navigate('/math-adventure');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>
            <FaAppleAlt /> {isRegistering ? 'Daftar Akun' : 'Login'}
          </h2>
          <p>
            {isRegistering
              ? 'Buat akun untuk mulai bermain'
              : 'Masuk ke petualangan matematika'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isRegistering ? (
            <>
              <div className="input-group">
                <label>
                  <FaUser /> Username atau Email
                </label>
                <input
                  type="text"
                  value={usernameOrEmail}
                  onChange={(e) => {
                    setUsernameOrEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="Masukkan username atau email"
                />
              </div>
            </>
          ) : (
            <>
              <div className="input-group">
                <label>
                  <FaUser /> Username
                </label>
                <input
                  type="text"
                  value={registerUsername}
                  onChange={(e) => {
                    setRegisterUsername(e.target.value);
                    setError('');
                  }}
                  placeholder="Username unik"
                />
              </div>

              <div className="input-group">
                <label>
                  <FaEnvelope /> Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="Email aktif"
                />
              </div>
            </>
          )}

          <div className="input-group">
            <label>
              <FaLock /> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Password"
            />
          </div>

          {isRegistering && (
            <div className="input-group">
              <label>
                <FaLock /> Konfirmasi Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError('');
                }}
                placeholder="Ulangi password"
              />
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            {isRegistering ? <FaUserPlus /> : <FaSignInAlt />}
            {isRegistering ? ' Daftar' : ' Masuk'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isRegistering ? 'Sudah punya akun?' : 'Belum punya akun?'}{' '}
            <button
              className="toggle-button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }}
            >
              {isRegistering ? 'Login di sini' : 'Daftar di sini'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
