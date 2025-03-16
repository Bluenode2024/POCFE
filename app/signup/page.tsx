"use client";
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
import { useRouter } from "next/navigation";
import type { RegisterDto } from '@/lib/api/generated/Api';

// 응답 타입 정의
interface RegisterResponse {
  id: string;
  name: string;
  studentNumber: number;
  department: string;
  walletAddress: string;
  createdAt: string;
  updatedAt: string;
}

export default function Signup() {
  const { address } = useAccount();
  const router = useRouter();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const data: RegisterDto = {
      name: formData.get("username") as string,
      studentNumber: formData.get("studentId") as unknown as number,
      department: formData.get("department") as string,
      walletAddress: address || '',
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('회원가입 실패');
      }

      alert("회원가입 성공!");
      router.push('/signin');
    } catch (err) {
      console.error("회원가입 실패:", err);
      setError(err as Error);
      alert(`회원가입 실패: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
    } finally {
      setIsLoading(false);
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
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">이름</Label>
                <Input
                  name="username"
                  id="username"
                  placeholder="이름을 입력하세요"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="studentId">학번</Label>
                <Input
                  name="studentId"
                  id="studentId"
                  placeholder="학번을 입력하세요"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="department">학과</Label>
                <Input
                  name="department"
                  id="department"
                  placeholder="학과를 입력하세요"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm">
                  I accept terms and conditions
                </Label>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full mt-4" 
              disabled={isLoading || !address}
            >
              {isLoading ? "Processing..." : "Sign up"}
            </Button>
            
            {error && (
              <p className="text-red-500 text-sm text-center mt-2">
                {error.message}
              </p>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Button
              variant="link"
              className="text-blue-600 hover:underline p-0 m-0 ml-1 border-none bg-transparent cursor-pointer"
              onClick={() => router.push("/signin")}
            >
              Login
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}