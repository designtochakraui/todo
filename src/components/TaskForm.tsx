import { Button, Flex, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface TaskFormProps {
  value: string;
  createTask: () => void;
  changeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const TaskForm = ({ value, changeInput, createTask }: TaskFormProps) => {
  return (
    <Flex w="full" alignItems="center" justifyContent="space-between" gap={2}>
      <Input placeholder="New task..." value={value} onChange={changeInput} />
      <Button
        onClick={createTask}
        colorScheme="blue"
        isDisabled={value.length === 0}
      >
        Add Task
      </Button>
    </Flex>
  );
};
