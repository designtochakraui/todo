import { DeleteIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Checkbox,
  IconButton,
  ScaleFade,
  Text,
} from "@chakra-ui/react";

interface TaskCardProps {
  id: string;
  status: boolean;
  label: string;
  taskChangeStatus: () => void;
  removeTask: () => void;
}

export const TaskCard = ({
  id,
  status,
  taskChangeStatus,
  removeTask,
  label,
}: TaskCardProps) => {
  return (
    <ScaleFade initialScale={0.9} in>
      <Card w="full" bg={status ? "blackAlpha.300" : ""}>
        <CardBody
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Checkbox
            w="full"
            id={id}
            onChange={taskChangeStatus}
            isChecked={status}
          >
            <Text as={status ? "del" : "b"}>{label}</Text>
          </Checkbox>
          <IconButton
            aria-label="delete task"
            variant="ghost"
            colorScheme="red"
            icon={<DeleteIcon />}
            onClick={removeTask}
          />
        </CardBody>
      </Card>
    </ScaleFade>
  );
};
