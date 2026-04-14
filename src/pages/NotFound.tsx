import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-[60vh] items-center justify-center bg-off-white dark:bg-background px-6 py-20">
      <p className="font-serif text-8xl text-gold font-light mb-4">404</p>
      <h1 className="font-serif text-2xl md:text-3xl text-foreground mb-3 text-center">
        Page Not Found
      </h1>
      <p className="font-sans text-muted-foreground text-base mb-10 text-center max-w-md">
        This page seems to have drifted offshore. Let's get you back on course.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          to="/"
          className="cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm px-8 py-3.5 transition-all duration-300"
        >
          Return Home
        </Link>
        <Link
          to="/properties"
          className="border border-sand dark:border-gold/30 text-foreground hover:border-gold font-sans font-medium small-caps tracking-widest text-sm px-8 py-3.5 transition-all duration-300"
        >
          Browse Properties
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
