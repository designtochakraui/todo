import { ChangeEvent, useState } from "react";
import {
  Divider,
  Text,
  Alert,
  AlertIcon,
  HStack,
  Flex,
  AlertTitle,
  AlertDescription,
  Box,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { TaskCard } from "./components/TaskCard";
import { TaskForm } from "./components/TaskForm";

interface TodoListProps {
  id: string;
  label: string;
  status: boolean;
}
function App() {
  const [tasks, setTasks] = useState<TodoListProps[]>([]);
  const [taskInput, setTaskInput] = useState("");

  const openTasks = tasks.filter((task) => task.status === false);
  const completedTasks = tasks.filter((task) => task.status);

  const handleFinishTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: true } : task))
    );
  };

  const handleReopenTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: false } : task))
    );
  };

  const handleChangeInputTask = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.currentTarget.value);
  };

  const handleCreateTask = () => {
    const newTask = { id: uuidv4(), label: taskInput, status: false };
    setTasks((prev) => [...prev, newTask]);
    setTaskInput("");
  };

  const handleRemoveTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  return (
    <HStack
      w="full"
      h="100vh"
      alignItems="center"
      flexDirection="column"
      p={10}
    >
      <Flex w="full" maxW={400} flexDirection="column" gap={4}>
        <Text as="h1" fontSize={30} fontWeight="bold">
          TODO
        </Text>

        <TaskForm
          value={taskInput}
          createTask={handleCreateTask}
          changeInput={handleChangeInputTask}
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
              taskChangeStatus={() => handleFinishTask(task.id)}
              removeTask={() => handleRemoveTask(task.id)}
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
              taskChangeStatus={() => handleReopenTask(task.id)}
              status={task.status}
              removeTask={() => handleRemoveTask(task.id)}
            />
          ))
        ) : (
          <Alert status="info" borderRadius={6}>
            <AlertIcon />
            No completed task
          </Alert>
        )}
      </Flex>
    </HStack>
  );
}

export default App;
