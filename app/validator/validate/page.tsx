"use client";

import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useContractInteraction } from "@/components/ContractInteraction";
import AccessPrompt from "@/components/AccessPrompt";

const ValidatePage = () => {
  const [isDepositConfirmed, setIsDepositConfirmed] = useState<boolean | null>(null);
  const [isCheckingValidator, setIsCheckingValidator] = useState(false);
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);
  const [tasksList, setTasksList] = useState<ProjectTask[]>(tasks); // Tasks 상태 관리

  const { handleDeposit } = useContractInteraction(setIsDepositConfirmed);
  const { toast } = useToast();

  const handleConfirmDeposit = async () => {
    await handleDeposit(depositAmount);  // 문자열로 직접 전달
  };

  const updateTaskStatus = (
    taskId: string,
    status: ProjectTask['validateStatus'] 
  ) => {
    setTasksList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, validateStatus: status } : task
      )
    );
    toast({
      title: "✅ Validate Completed!",
      description: `The task has been ${status}.`,
    });
  };

  // Validator 체크 완료 시 팝업 종료 및 Toast 메시지 표시
  useEffect(() => {
    if (isDepositConfirmed) {
      setIsCheckingValidator(true); // Validator 팝업 표시
      const timer = setTimeout(() => {
        setIsCheckingValidator(false); // 팝업 종료
        toast({
          title: "✅ Checking Completed",
          description: "Validator has been successfully checked.",
          variant: "default",
        });
      }, 2000); // 2초 후 팝업 종료 및 Toast 호출
      return () => clearTimeout(timer);
    }
  }, [isDepositConfirmed, toast]);
  const pendingTasks = tasksList.filter(
    (task) => task.validateStatus === "Pending"
  );
  const validatedTasks = tasksList.filter(
    (task) =>
      task.validateStatus === "Validated" || task.validateStatus === "Rejected"
  );

  return (
    <div className="relative flex flex-col gap-10 p-4 h-screen">
      {isCheckingValidator && (
        <div className="absolute inset-0 bg-gray-200 bg-opacity-50 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg text-center w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4 text-blue-600">
              Checking Validator
            </h2>
            <p className="text-gray-700">Please wait while we are checking..</p>
          </div>
        </div>
      )}

      <AccessPrompt
        isDepositConfirmed={isDepositConfirmed}
        depositAmount={depositAmount}
        setDepositAmount={setDepositAmount}
        onConfirmDeposit={handleConfirmDeposit}
      />

      <Card className="w-full rounded-lg shadow-md">
        <CardHeader>
          <CardTitle>Validate List</CardTitle>
        </CardHeader>
        <CardContent>
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
                    <TableCell>{task.validateStatus}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => setSelectedTask(task)}
                          >
                            Open Proof
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Task Validation</DialogTitle>
                            <DialogDescription>
                              Here is the task validation information.
                            </DialogDescription>
                          </DialogHeader>
                          <p className="mb-4">
                            <strong>Task:</strong> {selectedTask?.title}
                          </p>
                          <p className="mb-4">
                            <strong>Description:</strong>{" "}
                            {selectedTask?.description}
                          </p>
                          <p className="mb-4">
                            <strong>Image URL:</strong>{" "}
                            <a
                              href={selectedTask?.task_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline break-all"
                            >
                              {selectedTask?.task_url}
                            </a>
                          </p>
                          <p className="mb-4">
                            <strong>Files:</strong>
                            {selectedTask?.files?.length
                              ? selectedTask.files.map((file, index) => (
                                  <a
                                    key={index}
                                    href={URL.createObjectURL(file)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-blue-500 underline break-all mt-2"
                                  >
                                    {file.name}
                                  </a>
                                ))
                              : "No files uploaded"}
                          </p>
                          <p className="mb-4">
                            <strong>Additional Note:</strong>{" "}
                            {selectedTask?.additionalNotes}
                          </p>

                          {/* Validate and Reject Buttons */}
                          <div className="flex gap-2 mt-4">
                            <Button
                              size="lg" // 버튼 크기를 키움
                              variant="default"
                              className="w-1/2"
                              onClick={() =>
                                updateTaskStatus(task.id, "Validated")
                              }
                            >
                              Validate
                            </Button>
                            <Button
                              size="lg" // 버튼 크기를 키움
                              variant="outline"
                              className="w-1/2"
                              onClick={() =>
                                updateTaskStatus(task.id, "Rejected")
                              }
                            >
                              Reject
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
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
                    <TableCell>{task.validateStatus}</TableCell>
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
