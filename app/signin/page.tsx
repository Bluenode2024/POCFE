'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAccount } from "wagmi";
import { useState } from "react";

export default function Signup() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
  
    console.log("폼 제출됨");
  
    // FormData로 입력값 가져오기
    const formData = new FormData(event.currentTarget);
    const data = {
      username: formData.get("username") as string,
      fullName: "JihoPark",
      department: formData.get("department") as string,
      walletAddress: "0x2234567890123456789012345678901234567891",
      studentId: formData.get("studentId") as string,
    };
  
    console.log("전송 데이터:", data);
  
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("서버 응답 에러");
      }
  
      const result = await response.json();
      console.log("서버 응답:", result);
      alert("회원가입 성공!");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 실패!");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-1 justify-center items-center bg-gray-50">
      <Card className="w-[400px] bg-white shadow-md">
        <CardHeader className="text-center">
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Create an account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">이름</Label>
                <Input name="username" id="username" placeholder="이름을 입력하세요" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="studentId">학번</Label>
                <Input name="studentId" id="studentId" placeholder="학번을 입력하세요" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="department">학과</Label>
                <Input name="department" id="department" placeholder="학과를 입력하세요" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  I accept terms and conditions
                </Label>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "회원가입 중..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-center text-sm text-gray-500">
            Already have an account? <a href="#" className="text-blue-600 hover:underline">Login</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
