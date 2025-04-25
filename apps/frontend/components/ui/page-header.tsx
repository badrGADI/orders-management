import { Title, Text } from "@mantine/core"

interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div>
      <Title order={1} size="h2">
        {title}
      </Title>
      {description && (
        <Text c="dimmed" mt="xs">
          {description}
        </Text>
      )}
    </div>
  )
}
