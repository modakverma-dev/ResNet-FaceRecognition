import { useState } from 'react';
import axios from 'axios';
import './App.css';
import Upload from './components/upload';

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
      const res = await axios.post('http://localhost:8000/recognize', formData);

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
      <Upload
        loading={loading}
        handleUpload={handleUpload}
        image={image}
        setFile={setFile}
        file={file}
      />
    </div>
  );
}

export default App;
