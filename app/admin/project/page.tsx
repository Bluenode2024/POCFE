"use client";

import { useParams } from "next/navigation";
import { tasks } from "@/task/index";
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
import { useWriteContract } from "wagmi";
import BNS_ABI from '@/abi/BNS.abi';

export default function ProjectDetailPage() {
  const { writeContract } = useWriteContract()
  const BNS_ADDRESS = '0x323A1dEDCa9e3FeCb37A8aAa3febb1f36e2463F8';

  const projectId = "1";

  const filteredTasks = tasks.filter((task) => task.id === projectId);


  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Admin page</h2>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Task ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Send to contract</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.name}>
                  <TableCell>{task.id}</TableCell>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.deadline}</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>{task.address}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => 
                        writeContract({ 
                          abi: BNS_ABI,
                          address: BNS_ADDRESS,
                          functionName: 'transfer',
                          args: [
                            task.address,
                            task.priority
                          ],
                       })
                      }
                    >
                      Send to contract
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
