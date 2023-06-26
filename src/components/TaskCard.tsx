import { Card, CardBody, Checkbox, Text, ScaleFade } from "@chakra-ui/react";

interface TaskCardProps {
  id: string;
  status: boolean;
  onChange: (id: string) => void;
  label: string;
}
export const TaskCard = ({ id, status, onChange, label }: TaskCardProps) => {
  return (
    <ScaleFade initialScale={0.9} in>
      <Card w="full" bg={status ? "blackAlpha.300" : ""}>
        <CardBody>
          <Checkbox
            w="full"
            id={id}
            onChange={() => onChange(id)}
            isChecked={status}
          >
            <Text as={status ? "del" : "b"}>{label}</Text>
          </Checkbox>
        </CardBody>
      </Card>
    </ScaleFade>
  );
};
