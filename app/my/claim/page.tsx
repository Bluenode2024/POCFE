"use client";

import { useParams } from "next/navigation";
import React from "react";
import { tasks } from "@/task/index"; // 데이터를 가져옵니다.
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"; // ShadCN Button 사용
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js 구성 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const { id } = useParams();
  const projectId = "1"; // 현재 프로젝트 ID
  const filteredTasks = tasks.filter((task) => task.project_id === projectId);

  // 하드코딩으로 추가할 데이터
  const hardcodedTasks = [
    {
      id: "201",
      title: "Validate",
      deadline: "2024-12-15T18:00:00Z",
      priority: "Medium",
      amount: 90, // 추가된 amount 속성
    },
    {
      id: "202",
      title: "Leader",
      deadline: "2024-12-20T18:00:00Z",
      priority: "Low",
      amount: 400, // 추가된 amount 속성
    },
  ];

  // 필터된 tasks에 amount 속성을 추가
  const filteredTasksWithAmount = filteredTasks.map((task) => ({
    ...task,
    amount: 500, // 기본 amount 값
  }));

  // 필터된 tasks와 하드코딩 데이터를 합침
  const allTasks = [...filteredTasksWithAmount, ...hardcodedTasks];

  // Total Amount 계산
  const totalAmount = allTasks.reduce((sum, task) => sum + (task.amount || 0), 0);

  // 그래프 데이터
  const monthlyEarnings = [
    { month: "Jan", amount: 1990 },
    { month: "Feb", amount: 500 },
    { month: "Mar", amount: 300 },
    { month: "Apr", amount: 1200 },
    { month: "May", amount: 10 },
    { month: "Jun", amount: 600 },
    { month: "Jul", amount: 0 },
    { month: "Aug", amount: 900},
    { month: "Sep", amount: 100 },
    { month: "Oct", amount: 300 },
    { month: "Nov", amount: 1150 },
    { month: "Dec", amount: 100 },
  ];

  const chartData = {
    labels: monthlyEarnings.map((item) => item.month),
    datasets: [
      {
        label: "Monthly Earnings ($)",
        data: monthlyEarnings.map((item) => item.amount),
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // 카드 크기 내에서 유지되도록 설정
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Left Column */}
      <div className="flex flex-col gap-6 flex-grow">
        {/* Financing Overview Card */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Financing Overview</h2>
            <span className="text-sm text-gray-500">{today}</span>
          </div>
          <div className="flex">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-2 text-center">
              Task<br />
              $300
              </p>
            </div>
            <div className="w-px bg-gray-200 mx-4 "></div> {/* 첫 번째 세로 구분선 */}
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-2 text-center">
                Validate<br />
                $200
              </p>
            </div>
            <div className="w-px bg-gray-200 mx-4"></div> {/* 두 번째 세로 구분선 */}
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-2 text-center">Leader<br />
              $500</p>
            </div>
            <div className="w-px bg-gray-200 mx-4"></div> {/* 세 번째 세로 구분선 */}
            <div className="flex-1">
              <p className="text-sm text-gray-500 text-center">
                Period<br />
                2024 Jan - 2025 Feb
              </p>
            </div>
          </div>
        </div>

        {/* Transactions Card */}
        <Card className="space-y-4">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Transactions</CardTitle>
              <span className="text-sm text-gray-500">{today}</span>
            </div>
          </CardHeader>
          <CardContent>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Task ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.id}</TableCell>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>
                      {new Date(task.deadline).toLocaleString()}
                    </TableCell>
                    <TableCell>{task.priority}</TableCell>
                    <TableCell>${task.amount.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Graph Card */}
        <Card className="space-y-4">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Payment Schedule</CardTitle>
              <span className="text-sm text-gray-500">Last update: {today}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative h-64">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column */}
      <div className="bg-white shadow rounded-lg p-6 flex-grow lg:w-1/3 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Project Budget</h2>
          <span className="text-sm text-gray-500">{today}</span>
        </div>
        <Card className="space-y-4">
          <CardHeader>
            <CardTitle>Budget Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="w-full border border-gray-200 rounded-lg">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="text-left px-4 py-2">Task ID</TableHead>
                  <TableHead className="text-left px-4 py-2">Name</TableHead>
                  <TableHead className="text-left px-4 py-2">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allTasks.map((task) => (
                  <TableRow key={task.id} className="hover:bg-gray-50">
                    <TableCell className="px-4 py-2">{task.id}</TableCell>
                    <TableCell className="px-4 py-2">{task.title}</TableCell>
                    <TableCell className="px-4 py-2">
                      ${task.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 text-left">
              <p className="text-lg font-semibold">Total: ${totalAmount.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Claim Button */}
        <Button className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 rounded-lg">
          Claim
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
