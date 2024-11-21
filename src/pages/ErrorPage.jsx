import { useNavigate } from 'react-router-dom';
import { Home, RefreshCcw } from 'lucide-react';
import { useContext } from 'react';
import { Context } from '../utils/ContextApi';

const ErrorPage = () => {
   const navigate = useNavigate();
   const { theme, language } = useContext(Context);

   const getText = (key) => {
     const texts = {
       'en': {
         'not_found': 'Page not found',
         'description': "The page you're looking for doesn't exist or has been moved.",
         'go_home': 'Go Home',
         'refresh': 'Refresh'
       },
       'vi': {
         'not_found': 'Trang không tồn tại',
         'description': "Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.",
         'go_home': 'Về Trang Chủ',
         'refresh': 'Làm Mới'
       }
     };

     return texts[language][key];
   };

   return (
     <div className={`
       min-h-screen flex items-center justify-center 
       ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}
       transition-colors duration-200
     `}>
       <div className="text-center">
         <h1 className={`
           text-9xl font-bold 
           ${theme === 'dark' ? 'text-gray-700' : 'text-gray-200'}
           transition-colors duration-200
         `}>
           404
         </h1>
         <p className={`
           mt-4 text-xl 
           ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
           transition-colors duration-200
         `}>
           {getText('not_found')}
         </p>
         <p className={`
           mt-2 
           ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}
           transition-colors duration-200
         `}>
           {getText('description')}
         </p>

         <div className="mt-8 flex justify-center gap-4">
           <button
             onClick={() => navigate('/')}
             className={`
               flex items-center gap-2 px-6 py-2 rounded-md 
               transition-colors duration-200
               ${theme === 'dark'
                 ? 'bg-blue-700 text-white hover:bg-blue-600'
                 : 'bg-blue-500 text-white hover:bg-blue-600'
               }
             `}
           >
             <Home className="w-4 h-4" />
             <span>{getText('go_home')}</span>
           </button>

           <button
             onClick={() => window.location.reload()}
             className={`
               flex items-center gap-2 px-6 py-2 rounded-md 
               transition-colors duration-200
               ${theme === 'dark'
                 ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
               }
             `}
           >
             <RefreshCcw className="w-4 h-4" />
             <span>{getText('refresh')}</span>
           </button>
         </div>
       </div>
     </div>
   );
};

export default ErrorPage;