"use client"

import { Button, Text, Title } from "@mantine/core"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <Title order={1} className="text-red-500">
        Something went wrong!
      </Title>
      <Text className="mt-4 max-w-md">
        An unexpected error occurred. We've been notified and are working to fix the issue.
      </Text>
      <Button onClick={reset} className="mt-8">
        Try again
      </Button>
    </div>
  )
}
