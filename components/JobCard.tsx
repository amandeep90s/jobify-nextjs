import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { JobType } from "@/utils/types";
import Link from "next/link";
import DeleteJobButton from "./DeleteJobButton";

const JobCard = ({ job }: { job: JobType }) => {
  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent></CardContent>
      <CardFooter className="flex gap-4">
        <Button asChild size={"sm"}>
          <Link className="capitalize" href={`/jobs/${job.id}`}>
            edit
          </Link>
        </Button>
        <DeleteJobButton />
      </CardFooter>
    </Card>
  );
};

export default JobCard;
