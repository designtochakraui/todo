import { AddIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface TaskFormProps {
  value: string;
  createTask: () => void;
  changeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const TaskForm = ({ value, createTask, changeInput }: TaskFormProps) => {
  return (
    <Flex w="full" alignItems="center" justifyContent="space-between" gap={2}>
      <Input placeholder="New task" value={value} onChange={changeInput} />
      <IconButton
        aria-label="Create task"
        onClick={createTask}
        colorScheme="blue"
        icon={<AddIcon />}
      />
    </Flex>
  );
};
