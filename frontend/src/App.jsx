import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('threshold', 0.55);

    try {
      const res = await axios.post('http://127.0.0.1:8000/recognize', formData);

      if (res.data && res.data.processed_image) {
        setImage(`data:image/jpeg;base64,${res.data.processed_image}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Attendance System</h1>

        <label className="file-label">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="file-input"
          />
          <span className="file-text">
            {file ? file.name : 'Choose a photo...'}
          </span>
        </label>

        <div className="actions">
          <button
            onClick={handleUpload}
            className="btn-primary"
            disabled={!file || loading}
          >
            {loading ? 'Processing…' : 'Run'}
          </button>
        </div>

        {image && (
          <div className="preview">
            <h2 className="preview-title">Processed Image</h2>
            <div className="image-wrap">
              <img src={image} alt="result" className="result-image" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
