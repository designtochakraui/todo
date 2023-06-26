import { Flex, IconButton, Input } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

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
      <IconButton
        icon={<AddIcon />}
        onClick={createTask}
        colorScheme="blue"
        isDisabled={value.length === 0}
        aria-label="create task"
      >
        Add Task
      </IconButton>
    </Flex>
  );
};
