"use client";

import React from "react";
import CarouselComponent from "@/components/CarouselComponent";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function Home() {
  const images = [
    {src: "https://imgur.com/FUy6dyL.jpg",text: (<><div className="text-2xl font-bold">블루노드 정규 세션</div><span className="text-xs">10,000원 | 9명 참여</span></>),},
    {src: "https://imgur.com/1rf5guF.jpg",text: (<><div className="text-2xl font-bold">블루노드 X 인천광역시 기술 혁신 campaign</div><span className="text-xs">100,000원 | 5명 참여</span></>),},
    {src: "https://imgur.com/y02IRK4.jpg",text: (<><div className="text-2xl font-bold">2025 KOBAC BlueNode</div><span className="text-xs">300,000원 | 7명 참여</span></>),},
    {src: "https://imgur.com/08xTbmI.jpg",text: (<><div className="text-2xl font-bold">Scroll 오픈세션</div><span className="text-xs">10,000원 | 11명 참여</span></>),},
    {src: "https://imgur.com/slfIvqa.jpg",text: (<><div className="text-2xl font-bold">블루노드 방학 세션</div><span className="text-xs">10,000원 | 8명 참여</span></>),},
  ];

  const rankers = [
    { rank: 1, name: "김재원", account: "900,000", contribution: 87 },
    { rank: 2, name: "박지호", account: "750,000", contribution: 55 },
    { rank: 3, name: "김승원", account: "630,000", contribution: 43 },
  ];

  const projects = [
    { title: "NFT 마켓플레이스 개발", deadline: "2025. 1. 21 pm 12:00" },
    { title: "ZKP(영지식 증명) 라이브러리 검증", deadline: "2025. 1. 30 am 12:00" },
    { title: "스마트 컨트랙트 보안 검토", deadline: "2025. 1. 24 pm 14:00" },
    { title: "Blockchain Data Indexing API 개발", deadline: "2025. 2. 1 am 12:00" },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen gap-8 p-4">
      {/* Carousel Component */}
      <div className="w-full">
        <CarouselComponent images={images} />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {/* Left Table */}
        <Card className="w-full max-w-4xl shadow-md">
          <CardHeader>
            <h2 className="text-2xl font-bold text-left">Top 3 Ranker</h2>
          </CardHeader>
          <CardContent>
            <table className="table-auto w-full border-collapse text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b font-semibold">Rank</th>
                  <th className="px-4 py-2 border-b font-semibold">Name</th>
                  <th className="px-4 py-2 border-b font-semibold">Account</th>
                  <th className="px-4 py-2 border-b font-semibold">Contribution</th>
                </tr>
              </thead>
              <tbody>
                {rankers.map((ranker) => (
                  <tr key={ranker.rank} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b text-center">{ranker.rank}</td>
                    <td className="px-4 py-2 border-b">{ranker.name}</td>
                    <td className="px-4 py-2 border-b text-right">{ranker.account}</td>
                    <td className="px-4 py-2 border-b text-center">{ranker.contribution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Right Table */}
        <Card className="w-full rounded-lg shadow-md self-end">
          <CardHeader>
            <CardTitle className="text-2xl">Upcoming Duedate</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Project Title</TableHead>
                  <TableHead>Deadline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project, index) => (
                  <TableRow key={index}>
                    <TableCell>{project.title}</TableCell>
                    <TableCell>{project.deadline}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
