import { Center, Loader, Text } from "@mantine/core"

export default function Loading() {
  return (
    <Center style={{ height: "70vh" }} className="flex flex-col gap-4">
      <Loader size="xl" />
      <Text size="lg" fw={500}>
        Loading...
      </Text>
    </Center>
  )
}
