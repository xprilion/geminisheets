import { Card, CardBody, CardFooter, Button, Typography } from "@/components";

interface FunctionCardProps {
  title: string;
  content: string;
  buttonText: string;
}

export function FunctionCard({ title, content, buttonText }: FunctionCardProps) {
  return (
    <Card placeholder={"placeholder"} className="mt-6 w-96">
      <CardBody placeholder={"placeholder"}>
        <Typography placeholder={"placeholder"} variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography placeholder={"placeholder"}>
          {content}
        </Typography>
      </CardBody>
      <CardFooter placeholder={"placeholder"} className="pt-0">
        <Button placeholder={"placeholder"}>{buttonText}</Button>
      </CardFooter>
    </Card>
  );
}
