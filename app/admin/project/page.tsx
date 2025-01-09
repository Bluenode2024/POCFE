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
import BNS_ABI from "@/abi/BNS.abi";
import { useEffect, useState } from "react";
import { Admin_Project, adminpjcolumns } from "../../column";
import { DataTable } from "../../data-table";

async function getData(): Promise<Admin_Project[]> {
  return [
    {
      ProjectID: "1",
      Name: "위메이드 프론트 개발",
      Deadline: "2024.01.18 00:00",
      Detail: "Detail",
    },
    {
      ProjectID: "2",
      Name: "위메이드 백 개발",
      Deadline: "2024.01.22 00:00",
      Detail: "Detail",
    },
    {
      ProjectID: "3",
      Name: "위메이드 컨트랙트 개발",
      Deadline: "2024.01.30 00:00",
      Detail: "Detail",
    },
  ];
}

export default function ProjectDetailPage() {
  const [data, setData] = useState<Admin_Project[]>([]);
  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl">
        <div className="p-4">
          <Card className="w-full rounded-lg shadow-md">
            <CardHeader>
              <CardTitle>Admin Project</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={adminpjcolumns} data={data} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
