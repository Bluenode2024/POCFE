"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
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
import { useGet } from "@/hooks/useRequest";
import { isAuthenticated } from "@/utils/auth";

interface Project {
  id: number;
  project_name: string;
  description: string;
  end_date: string;
  leader_id: string;
  status: string;
}

interface MyProject {
  project: Project;
}

export default function Dashboard() {
  const router = useRouter();
  const { data: pendingProjects, fetchData: fetchPending } = useGet<Project[]>();
  const { data: myProjects, fetchData: fetchMyProject } = useGet<MyProject[]>();
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      console.log('Fetching pending projects...');
      await fetchPending('/projects/status/pending');
      
      console.log('Fetching my projects...');
      await fetchMyProject('/projects/myproject');
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/signin');
      return;
    }
    loadData();
  }, []); 

  useEffect(() => {
    console.log('Pending Projects:', pendingProjects);
    console.log('My Projects:', myProjects);
  }, [pendingProjects, myProjects]);

  if (!isAuthenticated()) {
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl">
        <div className="p-4">
          <Card className="w-full rounded-lg shadow-md">
            <CardHeader>
              <CardTitle>Pending Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingProjects?.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>{project.project_name}</TableCell>
                        <TableCell>{project.status}</TableCell>
                        <TableCell>{new Date(project.end_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => router.push(`/project/projectdetail/${project.id}`)}
                          >
                            상세 보기
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>        
      </div>
    </div>
  );
}
