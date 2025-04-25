import { Button } from "@mantine/core"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl mt-4">Page Not Found</h2>
      <p className="mt-2 text-gray-600 max-w-md">The page you are looking for doesn't exist or has been moved.</p>
      <Link href="/" className="mt-8">
        <Button>Return to Dashboard</Button>
      </Link>
    </div>
  )
}
