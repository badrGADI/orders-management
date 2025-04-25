// Using native HTML elements instead of Mantine Button for static generation
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl mt-4">Page Not Found</h2>
      <p className="mt-2 text-gray-600 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="mt-8">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Return to Dashboard
        </button>
      </Link>
    </div>
  );
}
