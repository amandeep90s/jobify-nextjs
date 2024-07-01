"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { getSingleJobAction, updateJobAction } from "@/utils/actions";
import {
  createAndEditJobSchema,
  CreateAndEditJobType,
  JobMode,
  JobStatus,
} from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { CustomFormField, CustomSelectField } from "./FormComponents";

const EditJobForm = ({ jobId }: { jobId: string }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getSingleJobAction(jobId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) =>
      updateJobAction(jobId, values),
    onSuccess: (data) => {
      if (data) {
        toast({ description: "Job Updated" });
        queryClient.invalidateQueries({ queryKey: ["jobs"] });
        queryClient.invalidateQueries({ queryKey: ["job", jobId] });
        queryClient.invalidateQueries({ queryKey: ["stats"] });
        router.push("/jobs");
      } else {
        toast({ description: "These was an error updating the job" });
      }
    },
  });

  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: data?.position ?? "",
      company: data?.company ?? "",
      location: data?.location ?? "",
      status: (data?.status as JobStatus) ?? JobStatus.Pending,
      mode: (data?.mode as JobMode) ?? JobMode.FullTime,
    },
  });

  const onSubmit = (values: CreateAndEditJobType) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">edit job</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          <CustomFormField name="position" control={form.control} />
          <CustomFormField name="company" control={form.control} />
          <CustomFormField name="location" control={form.control} />
          <CustomSelectField
            name="status"
            control={form.control}
            labelText="job status"
            items={Object.values(JobStatus)}
          />
          <CustomSelectField
            name="mode"
            control={form.control}
            labelText="job mode"
            items={Object.values(JobMode)}
          />
          <Button
            type="submit"
            className="self-end capitalize"
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditJobForm;
