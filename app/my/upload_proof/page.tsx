'use client';

import React, { useState } from "react";
import { tasks, ProjectTask } from "@/task";
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const ValidateProofPage = () => {
  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);
  const [proof, setProof] = useState("");

  const notUploadedTasks = tasks.filter((task) => task.validateStatus === "Not Uploaded");
  const otherTasks = tasks.filter((task) => task.validateStatus !== "Not Uploaded");

  return (
    <div className="flex flex-col gap-10 p-4">
        
      <Card className="w-full rounded-lg shadow-md">
        <CardHeader>
          <CardTitle>Not Uploaded Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Task Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notUploadedTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{new Date(task.deadline).toLocaleString()}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => setSelectedTask(task)}
                        >
                          증거 업로드
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <h2 className="text-xl font-bold mb-4">Upload Proof for {task.title}</h2>
                        <div className="mb-4">
                          <Label htmlFor="proof">Proof</Label>
                          <Input
                            id="proof"
                            value={proof}
                            onChange={(e) => setProof(e.target.value)}
                            placeholder="Enter proof data or link"
                          />
                        </div>
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => {
                            console.log(`Proof submitted for task ${task.id}`);
                            setProof("");
                            setSelectedTask(null);
                          }}
                        >
                          Submit Proof
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="w-full rounded-lg shadow-md">
        <CardHeader>
          <CardTitle>Other Tasks</CardTitle>
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
              {otherTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{new Date(task.deadline).toLocaleString()}</TableCell>
                  <TableCell>{task.validateStatus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValidateProofPage;
