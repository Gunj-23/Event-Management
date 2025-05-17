interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'accent' | 'white';
}

export function LoadingSpinner({ 
  size = 'medium', 
  color = 'primary' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };
  
  const colorClasses = {
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    accent: 'text-accent-500',
    white: 'text-white',
  };
  
  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full border-t-2 ${sizeClasses[size]} ${colorClasses[color]} border-b-2 border-primary-600`}></div>
    </div>
  );
}