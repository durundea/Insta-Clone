import { Link } from "react-router-dom";
import { MainLayout } from "../components/templates/MainLayout";
import { Button } from "../components/atoms/Button";

function NotFound() {
  return (
    <MainLayout>
      <div className="mx-auto w-full max-w-2xl text-center py-12">
        <h1 className="text-6xl font-bold text-ink mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Page not found.</p>
        <p className="text-gray-500 mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </MainLayout>
  );
}

export default NotFound;
