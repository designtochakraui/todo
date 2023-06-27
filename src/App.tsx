import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Divider,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";
import { TaskForm } from "./components/TaskForm";
import { ChangeEvent, useState } from "react";
import { TaskCard } from "./components/TaskCard";

import { v4 as uuidv4 } from "uuid";

interface TaskProps {
  id: string;
  label: string;
  status: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [taskInput, setTaskInput] = useState("");

  const openTasks = tasks.filter((task) => task.status === false);
  const completedTasks = tasks.filter((task) => task.status === true);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.currentTarget.value);
  };

  const handleCreateTask = () => {
    const newTask = { id: uuidv4(), label: taskInput, status: false };
    setTasks((prev) => [...prev, newTask]);
    setTaskInput("");
  };

  const handleRemoveTask = (id: string) => {
    const newTasksAfterExclude = tasks.filter((task) => task.id !== id);
    setTasks(newTasksAfterExclude);
  };

  const handleCompleteTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: true } : task))
    );
  };

  const handleReopenTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: false } : task))
    );
  };

  return (
    <HStack
      w="full"
      h="100vh"
      alignItems="center"
      flexDirection="column"
      p={10}
    >
      <Flex w="full" maxWidth={400} flexDirection="column" gap={4}>
        <Text as="h1" fontSize={30} fontWeight="bold">
          TODO
        </Text>

        <TaskForm
          changeInput={handleChangeInput}
          value={taskInput}
          createTask={handleCreateTask}
        />

        <Text fontWeight="bold" textAlign="left" w="full">
          Open
        </Text>

        {openTasks.length !== 0 ? (
          openTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              label={task.label}
              status={task.status}
              removeTask={() => handleRemoveTask(task.id)}
              taskChangeStatus={() => handleCompleteTask(task.id)}
            />
          ))
        ) : (
          <Alert status="success" borderRadius={6}>
            <AlertIcon />
            <Box>
              <AlertTitle>Congratulations!</AlertTitle>
              <AlertDescription>You have completed all tasks.</AlertDescription>
            </Box>
          </Alert>
        )}

        <Divider />

        <Text fontWeight="bold" textAlign="left" w="full">
          Completed
        </Text>

        {completedTasks.length !== 0 ? (
          completedTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              label={task.label}
              status={task.status}
              removeTask={() => handleRemoveTask(task.id)}
              taskChangeStatus={() => handleReopenTask(task.id)}
            />
          ))
        ) : (
          <Alert status="info" borderRadius={6}>
            <AlertIcon />
            <Box>
              <AlertTitle>No completed tasks!</AlertTitle>
            </Box>
          </Alert>
        )}
      </Flex>
    </HStack>
  );
}

export default App;
