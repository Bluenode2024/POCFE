"use client";

import React, { useState } from "react";
import { tasks, ProjectTask } from "@/task";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const ValidatePage = () => {
  const isDepositConfirmed = true;
  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);
  const [updatedTasks, setUpdatedTasks] = useState<ProjectTask[]>(tasks); // 기존 테스크 복사

  const pendingTasks = updatedTasks.filter(
    (task) => task.validateStatus === "Pending"
  );
  const validatedTasks = updatedTasks.filter(
    (task) =>
      task.validateStatus === "Validated" || task.validateStatus === "Rejected"
  );
  const { toast } = useToast();

  const handleUpdateStatus = (
    taskId: string,
    status: "Validated" | "Rejected"
  ) => {
    setUpdatedTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, validateStatus: status } : task
      )
    );
    toast({
      title: `Task ${status === "Validated" ? "Validated" : "Rejected"}!`,
      description: `The task has been marked as ${status}.`,
    });
  };

  return (
    <div className="relative flex flex-col gap-10 p-4 h-screen">
      {!isDepositConfirmed && (
        <div className="absolute inset-0 bg-gray-200 bg-opacity-50 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg text-center w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4 text-red-600 mt-6">
              Deposit Required
            </h2>
            <p className="mb-4 text-gray-700">
              To start validating tasks, please deposit the required amount into
              the contract.
            </p>
            <Button
              size="sm"
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={() => console.log("Deposit confirmed")}
            >
              Confirm Deposit
            </Button>
          </div>
        </div>
      )}

      <Card className="w-full rounded-lg shadow-md">
        <CardHeader>
          <CardTitle>Validate List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-lg font-semibold text-blue-600">
            Pending Tasks! Waiting for your validation!
          </div>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Task Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Validate Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingTasks.length > 0 ? (
                pendingTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>
                      {new Date(task.deadline).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        style={{ marginLeft: "12px" }}
                      >
                        {task.validateStatus}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {/* Validate Button */}
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Button
                              size="sm"
                              variant="success"
                              className="w-full"
                            >
                              Validate
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Validate Task</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to validate this task?
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleUpdateStatus(task.id, "Validated")
                                }
                              >
                                Confirm
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        {/* Reject Button */}
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="w-full"
                            >
                              Reject
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Reject Task</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to reject this task? This
                                action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleUpdateStatus(task.id, "Rejected")
                                }
                              >
                                Confirm
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No Pending Tasks
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="w-full rounded-lg shadow-md">
        <CardHeader>
          <CardTitle>Validated List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Task Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Validate Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {validatedTasks.length > 0 ? (
                validatedTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>
                      {new Date(task.deadline).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        style={{ marginLeft: "12px" }}
                      >
                        {task.validateStatus}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No Validated Tasks
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValidatePage;
