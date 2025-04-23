
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard with a slight delay to avoid potential race conditions
    const redirectTimeout = setTimeout(() => {
      navigate('/dashboard', { replace: true });
    }, 100);
    
    return () => clearTimeout(redirectTimeout);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30">
      <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Loading Campus Smart Suite</h1>
        <p className="text-muted-foreground">Please wait while we prepare your dashboard...</p>
      </div>
    </div>
  );
};

export default Index;
