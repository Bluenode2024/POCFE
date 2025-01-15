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
  const [validatedTaskIds, setValidatedTaskIds] = useState<string[]>([]);
  const [depositAmount, setDepositAmount] = useState<string>("");

  const pendingTasks = tasks.filter(
    (task) => task.validateStatus === "Pending"
  );
  const validatedTasks = tasks.filter(
    (task) => task.validateStatus === "Validated"
  );
  const { toast } = useToast();

  return (
    <div className="relative flex flex-col gap-10 p-4 h-screen">
      {!isDepositConfirmed && (
        <div className="absolute inset-0 bg-gray-200 bg-opacity-50 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg text-center w-[90%] max-w-md">
            <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2">
              <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6 6 0 10-12 0v3a2.032 2.032 0 01-.595 1.405L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4 text-red-600 mt-6">
              Deposit Required
            </h2>
            <p className="mb-4 text-gray-700">
              To start validating tasks, please deposit the required amount into
              the contract.
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
                console.log(`Deposit confirmed with amount: ${depositAmount}`);
              }}
            >
              Confirm Deposit
            </Button>
          </div>
        </div>
      )}

      <Card className="w-full rounded-lg shadow-md ">
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
                                    href={URL.createObjectURL(file)} // 파일을 브라우저에서 열 수 있도록 URL 생성
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
                          <AlertDialog>
                            <AlertDialogTrigger
                              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                validatedTaskIds.includes(task.id)
                                  ? "bg-gray-400 text-gray-700 cursor-not-allowed" // 검증된 경우 회색 버튼
                                  : "bg-black text-white hover:bg-gray-800 focus:ring-gray-700" // 기본 상태
                              }`}
                              disabled={validatedTaskIds.includes(task.id)} // 버튼 비활성화
                            >
                              Validate
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. If there are
                                  issues with your validation, you may lose your
                                  deposit.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    if (selectedTask) {
                                      setValidatedTaskIds((prev) => [
                                        ...prev,
                                        selectedTask.id,
                                      ]); // 검증된 테스크 ID 추가

                                      toast({
                                        title: "Validate: Success!",
                                      });
                                    }
                                  }}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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
