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
import { useContractInteraction } from "@/components/ContractInteraction";
import AccessPrompt from "@/components/AccessPrompt";

const ValidatePage = () => {
  const [isDepositConfirmed, setIsDepositConfirmed] = useState<boolean | null>(null);
  const [isCheckingValidator, setIsCheckingValidator] = useState(false); // Validator 팝업 상태 추가
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);
  const [validatedTaskIds, setValidatedTaskIds] = useState<string[]>([]);

  const { handleDeposit } = useContractInteraction(setIsDepositConfirmed);
  const { toast } = useToast(); // Toast 사용

  const handleConfirmDeposit = async () => {
    await handleDeposit(depositAmount);
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
          variant: "success",
        });
      }, 2000); // 2초 후 팝업 종료 및 Toast 호출
      return () => clearTimeout(timer);
    }
  }, [isDepositConfirmed, toast]);

  const pendingTasks = tasks.filter((task) => task.validateStatus === "Pending");
  const validatedTasks = tasks.filter((task) => task.validateStatus === "Validated");

  return (
    <div className="relative flex flex-col gap-10 p-4 h-screen">
      {/* Validator 팝업 */}
      {isCheckingValidator && (
        <div className="absolute inset-0 bg-gray-200 bg-opacity-50 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg text-center w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4 text-blue-600">
              Checking Validator
            </h2>
            <p className="text-gray-700">Please wait while we're checking..</p>
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
                    <TableCell>{new Date(task.deadline).toLocaleString()}</TableCell>
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
                    <TableCell>{new Date(task.deadline).toLocaleString()}</TableCell>
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

