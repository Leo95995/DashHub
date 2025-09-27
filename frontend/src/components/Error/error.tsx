import { TriangleAlert } from 'lucide-react'

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage : React.FC<ErrorMessageProps> = ({ message, className = "" }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 p-6 transition-all duration-300 rounded-lg animate-fadeIn ${className}`}
      role="alert"
    >
      <TriangleAlert className="w-12 h-12 text-red-500 dark:text-red-400 animate-bounce" />
      <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">
        Ops! Something gone wrong
      </h3>
      <p className="text-center text-red-600 dark:text-red-200">
        {message}
      </p>
    </div>
  );
}


export default ErrorMessage