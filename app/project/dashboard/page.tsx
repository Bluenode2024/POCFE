"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
  const { data: activeProjects, fetchData: fetchActive } = useGet<Project[]>();
  const { data: myProjects, fetchData: fetchMyProject } = useGet<MyProject[]>();
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      console.log('Fetching active projects...');
      await fetchActive('/projects/status/active');
      
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

  if (!isAuthenticated()) {
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-1 flex-col items-center min-h-screen bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl py-8 px-4"
      >
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            프로젝트 대시보드
          </motion.h1>
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            진행 중인 프로젝트와 내 프로젝트를 한눈에 확인하세요
          </motion.p>
        </div>
      </motion.div>

      <div className="w-full max-w-7xl">
        {/* 진행 중인 프로젝트 섹션 */}
        <div className="p-4">
          <Card className="w-full rounded-lg shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>진행 중인 프로젝트</CardTitle>
                <Button
                  onClick={() => router.push('/project/generate')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  새 프로젝트 생성
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </Button>
              </div>
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
                    {activeProjects?.map((project) => (
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

        {/* 내 프로젝트 섹션 */}
{/* 내 프로젝트 섹션 */}
<div className="p-4">
  <Card className="w-full rounded-lg shadow-md">
    <CardHeader>
      <CardTitle>내 프로젝트</CardTitle>
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
            {myProjects?.map((project) => (
              <TableRow key={project.project.id}>
                <TableCell>{project.project.project_name}</TableCell>
                <TableCell>{project.project.status}</TableCell>
                <TableCell>
                  {new Date(project.project.end_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => router.push(`/project/projectdetail/${project.project.id}`)}
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
