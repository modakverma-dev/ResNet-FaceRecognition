import { useState } from 'react';
import axios from 'axios';
import './train.css';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function Train() {
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
  };

  const handleTrain = async () => {
    if (!studentName || !studentId || !file) {
      alert('Please fill all fields and select an image');
      return;
    }

    setLoading(true);
    setStatus('');

    try {
      const formData = new FormData();
      formData.append('student_name', studentName);
      formData.append('student_id', studentId);
      formData.append('file', file);

      await axios.post(`${API}/train`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setStatus('✅ Image trained successfully');
      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus('❌ Training failed. Check backend logs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <button
        onClick={() => {
          navigate('/');
        }}
        className="train-student-btn"
      >
        Recognize Student
      </button>
      <div className="card">
        <h2>Train Student Face</h2>

        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <input type="file" accept="image/*" onChange={handleFileChange} />

        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            style={{ width: 200, marginTop: 10 }}
          />
        )}

        <button onClick={handleTrain} disabled={loading}>
          {loading ? 'Training...' : 'Train Model'}
        </button>

        {status && <p>{status}</p>}
      </div>
    </div>
  );
}
