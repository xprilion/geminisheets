"use client"

import { Card, CardBody, CardFooter, Button, Typography } from "@/components";

interface FunctionCardProps {
  title: string;
  content: any;
  buttonText: string;
  buttonLink: string;
}

export function FunctionCard({ title, content, buttonText, buttonLink }: FunctionCardProps) {
  return (
    <Card placeholder={"placeholder"} className="mt-6 w-96">
      <CardBody placeholder={"placeholder"}>
        <Typography placeholder={"placeholder"} variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        {content}
      </CardBody>
      <CardFooter placeholder={"placeholder"} className="pt-0">
          <Button color="black" variant="filled" href={buttonLink}>{buttonText}</Button>
      </CardFooter>
    </Card>
  );
}
