import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "react-native";

export default function Index() {
  return (
    <Box className="flex-1 flex justify-center items-center flex-col gap-6 bg-secondary-0">
      <Card
        size="md"
        variant="elevated"
        className="m-3 shadow-md shadow-zinc-500"
      >
        <Heading size="md" className="mb-1">
          Quick Start
        </Heading>
        <Text className="text-primary-900">
          Start building your next project in minutes
        </Text>
      </Card>
      <Text className="text-primary-900">
        Edit app/index.tsx to edit this screen.
      </Text>
     
    </Box>
  );
}
