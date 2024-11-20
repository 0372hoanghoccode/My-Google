import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, X } from 'lucide-react';

const VoiceSearch = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let recognition = null;

    if ('webkitSpeechRecognition' in window) {
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setTranscript(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }

    return () => {
      if (recognition) recognition.stop();
    };
  }, []);

  const handleSearch = () => {
    if (transcript) {
      navigate(`/${transcript}/1`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Voice Search</h2>
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <div className={`p-8 rounded-full ${isListening ? 'bg-red-50 animate-pulse' : 'bg-gray-50'}`}>
            <Mic className={`w-12 h-12 ${isListening ? 'text-red-500' : 'text-gray-400'}`} />
          </div>

          <p className="text-center text-gray-600">
            {isListening ? 'Listening...' : 'Click the microphone to start speaking'}
          </p>

          {transcript && (
            <div className="w-full">
              <p className="text-lg text-center font-medium text-gray-800 mb-4">
                "{transcript}"
              </p>
              <button
                onClick={handleSearch}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceSearch;