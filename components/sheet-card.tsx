"use client"

import { Card, CardBody, CardFooter, Button, Typography } from "@/components";

interface SheetCardProps {
  title: string;
  content: any;
  viewLink: string;
  viewExternalLink: string;
}

export function SheetCard({ title, content, viewLink, viewExternalLink }: SheetCardProps) {
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
          <Button target="_blank" color="green" variant="outlined" className="ml-2" href={viewExternalLink}>View on Google Sheets</Button>
      </CardFooter>
    </Card>
  );
}
