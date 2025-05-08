
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import PageLayout from "@/components/common/PageLayout";
import { useIsMobile } from "@/hooks/use-mobile";

const NotFound = () => {
  const location = useLocation();
  const { currentUser } = useApp();
  const isMobile = useIsMobile();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Determine where to redirect the user based on their role
  const getHomeLink = () => {
    if (!currentUser) return "/";
    return currentUser.role === "admin" ? "/admin/dashboard" : "/dashboard";
  };

  return (
    <PageLayout>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-md p-4 sm:p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-5xl sm:text-6xl font-bold text-red-500 mb-4">404</h1>
          <p className="text-lg sm:text-xl text-gray-800 mb-2">Page Not Found</p>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link to={getHomeLink()}>
                Go to Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/">
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
