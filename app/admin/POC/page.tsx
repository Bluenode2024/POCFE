"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const data = [
  { item: "대형 프로젝트", type: "Project", contribution: "min: 24 / max: 120", description: "개발자 4명 / 평균 6개월" },
  { item: "중형 프로젝트", type: "Project", contribution: "min: 12 / max: 60", description: "평균 2-3명 / 평균 2개월" },
  { item: "소형 프로젝트", type: "Project", contribution: "min: 4 / max: 20", description: "개발 1-2명 / 평균 2주" },
  { item: "스터디 참여", type: "General", contribution: "min: 2 / max: 10", description: "정기적으로 진행하는 스터디에 참여하는 활동입니다. 전체 진행 횟수의 75% 이상 참석해야 합니다." },
  { item: "블록체인 행사 참여", type: "General", contribution: "min: 0.5 / max: 3", description: "블록체인인 관련 행사 참여입니다. 간단한 후기를 디스코드 채널에 공유할 수 있습니다." },
  { item: "리서치 작성", type: "General", contribution: "min: 1~2 / max: 5~10", description: "블록체인 관련 분야(기술, 트레이딩, 이슈)등에 관한 리서치를 작성하는 활동입니다." },
  { item: "세션 진행", type: "General", contribution: "min: 2 / max: 10", description: "정기세션은 주기적이며, 가장 기본이 되는 활동입니다. 따라서 모든 항목 점수의 기준치가 됩니다. 세션 1회당 2점이 부여됩니다." },
  { item: "스터디 진행", type: "General", contribution: "min: 4 / max: 20 ", description: "주 1회 이상,  최소 한 달 이상 진행이 목표이며 스터디의 진행과정은 기록으로 남겨야합니다." },
  { item: "세션 참석", type: "General", contribution: "min: 0.5 / max: 3 ", description: "정기세션 출석에 대한 점수입니다. 진행자는 해당 회차에 대한 출석 점수를 받지 않습니다. (같은 회차 진행 기여, 참석 기여 중복 X)" },
  { item: "프로젝트 회의 참석", type: "General", contribution: "min: 0.5 / max: 3", description: "참석에 대한 사진 기록을 남겨야 합니다. " },
  { item: "학회 홍보 게시물 작성", type: "Operation", contribution: "min: 0.25 - 0.5 / max: 1-2", description: "학회 홍보 또는 학회에서 진행하는 행사에 필요한 홍보 게시물을 작성하는 활동입니다." },
  { item: "학회 커뮤니티 관리", type: "Operation", contribution: "min: 2 / max: 10", description: "한 에포크동안 학회가 소통할수 있는 커뮤니티(ex. 인스타, 트위터, 디스코드)를 관리하는 활동입니다." },
  { item: "외부 인사 초청", type: "Operation", contribution: "min: 2 / max: 10", description: "학회의 활동에 도움을 주시는 외부 인사를 섭외 및 초청하는 활동입니다." },
  { item: "소셜 미디어 디자인 콘텐츠 제작", type: "Design", contribution: "min: 1 / max: 5", description: "학회 소셜 미디어에 업로드되는 디자인 자원을 제작하는 활동입니다." },
  { item: "그랜트 유치", type: "Operation", contribution: "min: 6~10 / max: 30~50", description: "외부 재단이나 체인, 기관으로부터 재정적 지원(Grant)을 확보하는 활동입니다. " },
  { item: "외부 프로젝트 / 파트너십 유치", type: "Operation", contribution: "min: 4 / max: 20", description: "학회와 외부 단체 간의 협업 프로젝트를 성사시키는 활동입니다. "},
  { item: "로드맵 및 마일스톤 설정", type: "Operation", contribution: "min: 1 / max: 5", description: "전체 프로젝트 일정을 명시하고 데드라인과 주요 마일스톤을 설정하여 공유하는 활동입니다." },
  { item: "팀원 역할 분배", type: "Operation", contribution: "min: 0.5 - 1.5 / max: 3 - 5", description: "팀원들에게 태스크와 역할을 분담하고 명시, 공유하는 활동입니다. 프로젝트 규모에 따라 점수가 달라질 수 있습니다. " },
  { item: "회의 스케쥴링 및 진행", type: "Operation", contribution: "min: 0.5 / max: 3", description: "회의 일정을 잡고, 회의를 진행하는 활동입니다. 회차 단위로 측정됩니다." },
  { item: "디자인 시스템 정의", type: "Design", contribution: "min: 1 / max: 5", description: "색상, 폰트, 아이콘 등 프로덕트의 시각적 일관성을 위한 가이드라인을 제작하는 활동입니다." },
  { item: "와이어프레임 제작", type: "Design", contribution: "min: 1 / max: 5", description: "화면 구조와 사용자 흐름 설계를 위한 기본 틀을 디자인하는 활동입니다." },
  { item: "UI 디자인", type: "Design", contribution: "min: 1.5 / max: 8", description: "사용자가 보는 화면의 시각적인 요소를 설계하고 완성하는 작업입니다." },
  { item: "프로토타입 제작", type: "Design", contribution: "min: 1 / max: 5", description: "완성 전의 제품을 실제로 작동 가능한 모형 형태로 만들어 테스트하는 작업입니다." },
  { item: "사용자 흐름 설계", type: "Design", contribution: "min: 1 / max: 5", description: "사용자가 서비스나 제품을 이용할 때의 과정을 설계하는 활동입니다." },
  { item: "포스터 / 배너 디자인", type: "Design", contribution: "min: 0.5 / max: 3", description: "이벤트나 제품 홍보를 위한 포스터와 배너를 디자인하는 활동입니다." },
  { item: "피칭 자료 제작", type: "Design", contribution: "min: 1 / max: 5", description: "프로젝트 아이디어를 발표하기 위해 필요한 자료를 시각적으로 구성하는 작업입니다." },
  { item: "기획서 작성", type: "Operation", contribution: "min: 1 / max: 5", description: "프로젝트의 목표, 목적, 진행 방식, 기대 효과 등을 체계적으로 정리하여 문서로 만드는 활동입니다." },
  { item: "IA 작성", type: "Operation", contribution: "min: 1 / max: 5", description: "프로덕트의 정보 구조와 사용자 흐름을 설계하는 활동입니다." },
  { item: "와이어 프레임 작성", type: "Operation", contribution: "min: 1 / max: 5", description: "인터페이스와 화면 레이아웃의 기본 설계를 수행하는 활동입니다." },
  { item: "UI/UX 요구사항 정의", type: "Operation", contribution: "min: 0.5 / max: 3", description: "사용자가 원하는 경험과 인터페이스의 구체적인 요구사항을 정리하는 활동입니다." },
  { item: "결과물 정리 및 문서화", type: "Operation", contribution: "min: 1 / max: 5", description: "프로젝트가 종료된 후 결과물과 성과를 정리하여 문서화하여 공유하는 활동입니다." },
  { item: "조사 및 분석", type: "Operation", contribution: "min: 1 / max: 5", description: "해커톤을 주최한 재단, 체인에 대한 조사, 시장 조사 등을 포함한 프로젝트를 위한 자료 조사 및 공유 활동입니다." },
  { item: "피칭", type: "Operation", contribution: "min: 0.5 / max: 3", description: "프로젝트나 아이디어를 발표하고 설득력 있게 전달하는 활동입니다." },
];

const Page = () => {
  const [detail, setDetail] = useState("");

  const handleDetail = (entry) => {
    setDetail(entry.description);
  };

  return (
    <div className="p-8 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">POC Table</h1>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left"></TableHead>
              <TableHead className="text-left">Item</TableHead>
              <TableHead className="text-left">Type</TableHead>
              <TableHead className="text-left">Contribution</TableHead>
              <TableHead className="text-left">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((entry, index) => (
              <TableRow key={index} className="hover:bg-gray-100">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{entry.item}</TableCell>
                <TableCell>{entry.type}</TableCell>
                <TableCell>{entry.contribution}</TableCell>
                <TableCell className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-black hover:bg-gray-800 text-white font-semibold py-2 rounded-lg"
                        onClick={() => handleDetail(entry)}>
                        In Detail
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Detail Information</DialogTitle>
                        <DialogDescription>
                          {detail}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;