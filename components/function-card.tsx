"use client"

import { Card, CardBody, CardFooter, Button, Typography } from "@/components";

interface FunctionCardProps {
  title: string;
  content: any;
  viewLink: string;
  projectLink?: string;
}

export function FunctionCard({ title, content, viewLink, projectLink }: FunctionCardProps) {
  return (
    <Card placeholder={"placeholder"} className="mt-6 w-96">
      <CardBody placeholder={"placeholder"}>
        <Typography placeholder={"placeholder"} variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        {content}
      </CardBody>
      <CardFooter placeholder={"placeholder"} className="pt-0">
          <Button color="black" variant="filled" href={viewLink}>View</Button>
          {projectLink && <Button target="_blank" color="green" className="ml-2" variant="outlined" href={projectLink}>View Apps Script Project</Button> }
      </CardFooter>
    </Card>
  );
}
