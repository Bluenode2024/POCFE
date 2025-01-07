"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { projects as projectData } from "@/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";

export default function Dashboard() {
  const router = useRouter();
  const [projects] = useState(projectData);

  const ongoingProjects = projects.filter(
    (project) => project.status === "Processing"
  );

  /* Sample data calculations for task and amount
  const taskSummary = {
  succeed: ongoingProjects.reduce((sum, p) => sum + (p.tasks?.succeed || 0), 0),
  pended: ongoingProjects.reduce((sum, p) => sum + (p.tasks?.pended || 0), 0),
  };
  taskSummary.total = taskSummary.succeed + taskSummary.pended;

  const amountSummary = {
  deposit: ongoingProjects.reduce((sum, p) => sum + (p.amount?.deposit || 0), 0),
  rewarded: ongoingProjects.reduce((sum, p) => sum + (p.amount?.rewarded || 0), 0),
  slashed: ongoingProjects.reduce((sum, p) => sum + (p.amount?.slashed || 0), 0),
  };
  amountSummary.total = amountSummary.deposit + amountSummary.rewarded - amountSummary.slashed; */

  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl">
        <div className="p-4">
          <Card className="w-full rounded-lg shadow-md">
            <CardHeader>
              <CardTitle>진행 중인 프로젝트</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
                {/* Task Summary Table */}
                <Table className="w-full mb-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Succeed</TableCell>
                      {/*<TableCell>{taskSummary.succeed}</TableCell>*/}
                    </TableRow>
                    <TableRow>
                      <TableCell>Pended</TableCell>
                      {/*<TableCell>{taskSummary.pended}</TableCell>*/}
                    </TableRow>
                    <TableRow>
                      <TableCell>Total</TableCell>
                      {/*<TableCell>{taskSummary.total}</TableCell>*/}
                    </TableRow>
                  </TableBody>
                </Table>

                {/* Amount Summary Table */}
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amount</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Deposit</TableCell>
                      {/*<TableCell>{amountSummary.deposit}</TableCell>*/}
                    </TableRow>
                    <TableRow>
                      <TableCell>Rewarded</TableCell>
                      {/*<TableCell>{amountSummary.rewarded}</TableCell>*/}
                    </TableRow>
                    <TableRow>
                      <TableCell>Slashed</TableCell>
                      {/*<TableCell>{amountSummary.slashed}</TableCell>*/}
                    </TableRow>
                    <TableRow>
                      <TableCell>Total</TableCell>
                      {/*<TableCell>{amountSummary.total}</TableCell>*/}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-start p-4">
          <Button
            size="sm"
            className="bg-blue-500 text-white h-10 w-40"
            onClick={() => router.push("validator")}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
