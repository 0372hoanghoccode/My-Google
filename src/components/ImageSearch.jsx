import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Camera, Search } from 'lucide-react';

const ImageSearch = () => {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSearch = () => {
    // Here you would typically send the image to a reverse image search API
    // For now, we'll just navigate back to home
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Image Search</h1>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <Search className="w-4 h-4" />
            <span>Back to Search</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="image-input"
            />

            {previewImage ? (
              <div className="space-y-4">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded-lg"
                />
                <button
                  onClick={handleSearch}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Search with this image
                </button>
              </div>
            ) : (
              <label
                htmlFor="image-input"
                className="flex flex-col items-center space-y-4 cursor-pointer"
              >
                <Upload className="w-12 h-12 text-gray-400" />
                <div className="space-y-2">
                  <p className="text-xl font-medium text-gray-700">
                    Drop an image here or click to upload
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports JPG, PNG files
                  </p>
                </div>
                <div className="flex gap-4 mt-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
                    <Upload className="w-4 h-4" />
                    <span>Upload file</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
                    <Camera className="w-4 h-4" />
                    <span>Take photo</span>
                  </button>
                </div>
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSearch;