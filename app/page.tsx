"use client";

import React, { useEffect, useState } from "react";
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
import { getAccessToken } from "@/utils/auth";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const currentToken = getAccessToken();
    setToken(currentToken);
  }, []);

  const images = [
    {
      src: "https://i.imgur.com/FUy6dyL.jpg",
      text: (
        <>
          <div className="text-2xl font-bold">블루노드 정규 세션</div>
          <span className="text-xs"> 9명 참여</span>
        </>
      ),
    },
    {
      src: "https://i.imgur.com/1rf5guF.jpg",
      text: (
        <>
          <div className="text-2xl font-bold">
            블루노드 X 인천광역시 기술 혁신 campaign
          </div>
          <span className="text-xs"> 5명 참여</span>
        </>
      ),
    },
    {
      src: "https://i.imgur.com/y02IRK4.jpg",
      text: (
        <>
          <div className="text-2xl font-bold">2025 KOBAC BlueNode</div>
          <span className="text-xs"> 7명 참여</span>
        </>
      ),
    },
    {
      src: "https://i.imgur.com/08xTbmI.jpg",
      text: (
        <>
          <div className="text-2xl font-bold">Scroll 오픈세션</div>
          <span className="text-xs"> 11명 참여</span>
        </>
      ),
    },
    {
      src: "https://i.imgur.com/slfIvqa.jpg",
      text: (
        <>
          <div className="text-2xl font-bold">블루노드 방학 세션</div>
          <span className="text-xs"> 8명 참여</span>
        </>
      ),
    },
  ];

  const rankers = [
    { rank: 1, name: "김재원", account: "900,000", contribution: 87 },
    { rank: 2, name: "박지호", account: "750,000", contribution: 55 },
    { rank: 3, name: "김승원", account: "630,000", contribution: 43 },
  ];

  const projects = [
    { title: "NFT 마켓플레이스 개발", deadline: "2025. 1. 21 pm 12:00" },
    {
      title: "ZKP(영지식 증명) 라이브러리 검증",
      deadline: "2025. 1. 30 am 12:00",
    },
    { title: "스마트 컨트랙트 보안 검토", deadline: "2025. 1. 24 pm 14:00" },
    {
      title: "Blockchain Data Indexing API 개발",
      deadline: "2025. 2. 1 am 12:00",
    },
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
            <h2 className="text-2xl font-bold text-left">User Ranking</h2>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="px-4 py-2 border-b font-semibold text-left">
                    Rank
                  </TableHead>
                  <TableHead className="px-4 py-2 border-b font-semibold text-left">
                    Name
                  </TableHead>
                  <TableHead className="px-4 py-2 border-b font-semibold text-right">
                    Account
                  </TableHead>
                  <TableHead className="px-4 py-2 border-b font-semibold text-center">
                    Contribution
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rankers.map((ranker) => (
                  <TableRow key={ranker.rank} className="hover:bg-gray-50">
                    <TableCell className="px-4 py-2 border-b text-center">
                      {ranker.rank}
                    </TableCell>
                    <TableCell className="px-4 py-2 border-b">
                      {ranker.name}
                    </TableCell>
                    <TableCell className="px-4 py-2 border-b text-right">
                      {ranker.account}
                    </TableCell>
                    <TableCell className="px-4 py-2 border-b text-center">
                      {ranker.contribution}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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

      <div className="flex flex-1 items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">현재 로그인 상태</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              {token ? (
                <>
                  <p className="text-green-600 font-semibold mb-2">로그인 되어 있음</p>
                  <p className="text-sm text-gray-600 break-all">{token}</p>
                </>
              ) : (
                <p className="text-red-500">로그인이 필요합니다</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
