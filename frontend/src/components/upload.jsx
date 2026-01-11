import React from 'react';

const Upload = ({ handleUpload, setFile, file, loading, image }) => {
  return (
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
  );
};

export default Upload;
