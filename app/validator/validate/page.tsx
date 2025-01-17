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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const ValidatePage = () => {
  const [isDepositConfirmed, setIsDepositConfirmed] = useState(false); // Deposit 상태
  const [isCheckingValidator, setIsCheckingValidator] = useState(false); // Validator 팝업 상태
  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);
  const [depositAmount, setDepositAmount] = useState<string>("");
  const { toast } = useToast(); // Toast 호출

  const pendingTasks = tasks.filter(
    (task) => task.validateStatus === "Pending"
  );
  const validatedTasks = tasks.filter(
    (task) => task.validateStatus === "Validated"
  );

  // Validator 체크 완료 시 Toast 띄움
  useEffect(() => {
    if (isCheckingValidator) {
      const timer = setTimeout(() => {
        setIsCheckingValidator(false);
        toast({
          title: "✅ Checking Completed",
          description: "Validator has been successfully checked.",
          variant: "success",
        });
      }, 2000); // 2초 후 팝업 종료 및 Toast 호출
      return () => clearTimeout(timer);
    }
  }, [isCheckingValidator, toast]);

  return (
    <div className="relative flex flex-col gap-10 p-4 h-screen">
      {!isDepositConfirmed && (
        <div className="absolute inset-0 bg-gray-200 bg-opacity-50 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg text-center w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4 text-red-600 mt-6">
              Deposit Required
            </h2>
            <p className="mb-4 text-gray-700">
            Deposit the required amount to start validating tasks
            </p>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-300"
              />
            </div>
            <Button
              size="sm"
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={() => {
                setIsDepositConfirmed(true); // Deposit 승인
                setIsCheckingValidator(true); // Validator 팝업 띄우기
              }}
            >
              Confirm Deposit
            </Button>
          </div>
        </div>
      )}

      {isCheckingValidator && (
        <div className="absolute inset-0 bg-gray-200 bg-opacity-50 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg text-center w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4 text-blue-600">
              Checking Validator
            </h2>
            <p className="text-gray-700">Please wait while we're chekcking...</p>
          </div>
        </div>
      )}

      <Card className="w-full rounded-lg shadow-md">
        <CardHeader>
          <CardTitle>Validate List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-lg font-semibold text-blue-600">
            Pending Tasks! Waiting for your validate!
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
                          <h2 className="text-xl font-bold mb-4">
                            Proof Details
                          </h2>
                          <p className="mb-4">
                            <strong>Task:</strong> {selectedTask?.title}
                          </p>
                          <p className="mb-4">
                            <strong>Description:</strong>{" "}
                            {selectedTask?.description}
                          </p>
                          <p className="mb-4">
                            <strong>Proof URL:</strong>{" "}
                            <a
                              href={selectedTask?.task_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              {selectedTask?.task_url}
                            </a>
                          </p>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => {
                              console.log(
                                `Validated Task ID: ${selectedTask?.id}`
                              );
                              setSelectedTask(null);
                            }}
                          >
                            Validate
                          </Button>
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
    </div>
  );
};

export default ValidatePage;
