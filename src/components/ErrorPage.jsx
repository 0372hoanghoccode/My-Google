import { useNavigate } from 'react-router-dom';
import { Home, RefreshCcw } from 'lucide-react';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <p className="mt-4 text-xl text-gray-600">Page not found</p>
        <p className="mt-2 text-gray-400">The page you're looking for doesn't exist or has been moved.</p>
        
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;