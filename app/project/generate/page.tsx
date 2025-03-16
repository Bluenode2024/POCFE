"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePost, useGet } from "@/hooks/useRequest";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// API 요청 타입 정의
interface User {
  id: string;
  name: string;
  // ... 다른 유저 필드들
}

interface CreateProjectDto {
  project_name: string;
  description: string;
  start_date: string;
  end_date: string;
  members: {
    member_name: string;
    role: 'leader' | 'designer' | 'developer';
  }[];
  repo_link: string[];
}

// API 응답 타입 정의
interface ProjectResponse {
  id: number;
  project_name: string;
  description: string;
  start_date: string;
  end_date: string;
  members: {
    member_name: string;
    role: string;
  }[];
  repo_link: string[];
  created_at: string;
  updated_at: string;
}

export default function Generate() {
  const router = useRouter();
  const { postData, isLoading, error } = usePost<ProjectResponse, CreateProjectDto>();
  const { data: users, fetchData: fetchUsers } = useGet<User[]>();
  const [members, setMembers] = useState<CreateProjectDto['members']>([]);
  const [repoLinks, setRepoLinks] = useState<string[]>(['']);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState<'leader' | 'designer' | 'developer'>('developer');

  useEffect(() => {
    fetchUsers('/users');
  }, []);

  const handleAddMember = () => {
    if (selectedUser && selectedRole && users) {
      const selectedUserData = users.find(user => user.id === selectedUser);
      if (selectedUserData) {
        setMembers([...members, {
          member_name: selectedUserData.name,
          role: selectedRole
        }]);
        setSelectedUser('');
        setSelectedRole('developer');
      }
    }
  };

  const handleAddRepoLink = () => {
    setRepoLinks([...repoLinks, '']);
  };

  const handleRepoLinkChange = (index: number, value: string) => {
    const newLinks = [...repoLinks];
    newLinks[index] = value;
    setRepoLinks(newLinks);
  };

  const handleRemoveRepoLink = (index: number) => {
    setRepoLinks(repoLinks.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const projectData: CreateProjectDto = {
      project_name: formData.get("project_name") as string,
      description: formData.get("description") as string,
      start_date: formData.get("start_date") as string,
      end_date: formData.get("end_date") as string,
      members: members,
      repo_link: repoLinks.filter(link => link.trim() !== '')
    };

    try {
      await postData('/projects', projectData);
      alert("프로젝트가 성공적으로 생성되었습니다!");
      router.push('/project/dashboard');
    } catch (error) {
      console.error('프로젝트 생성 실패:', error);
      alert('프로젝트 생성에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-[800px]">
        <CardHeader>
          <CardTitle>프로젝트 생성</CardTitle>
          <CardDescription>새로운 프로젝트를 생성합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="project_name">프로젝트 이름</Label>
              <Input
                id="project_name"
                name="project_name"
                placeholder="프로젝트 이름을 입력하세요"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">프로젝트 설명</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="프로젝트 설명을 입력하세요"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date">시작일</Label>
                <Input
                  id="start_date"
                  name="start_date"
                  type="date"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date">종료일</Label>
                <Input
                  id="end_date"
                  name="end_date"
                  type="date"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>멤버 추가</Label>
              <div className="flex gap-2">
                <Select
                  value={selectedUser}
                  onValueChange={setSelectedUser}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="멤버 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {users?.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedRole}
                  onValueChange={(value: 'leader' | 'designer' | 'developer') => setSelectedRole(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="역할 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leader">Leader</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="button" onClick={handleAddMember}>추가</Button>
              </div>

              {members.length > 0 && (
                <div className="space-y-2">
                  <Label>추가된 멤버</Label>
                  <div className="space-y-2">
                    {members.map((member, index) => (
                      <div key={index} className="flex items-center gap-2 bg-gray-100 p-2 rounded">
                        <span>{member.member_name} ({member.role})</span>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setMembers(members.filter((_, i) => i !== index));
                          }}
                        >
                          삭제
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Label>Repository 링크</Label>
              {repoLinks.map((link, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Repository URL"
                    value={link}
                    onChange={(e) => handleRepoLinkChange(index, e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleRemoveRepoLink(index)}
                  >
                    삭제
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={handleAddRepoLink}>
                Repository 추가
              </Button>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "생성 중..." : "프로젝트 생성"}
            </Button>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error.message}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
