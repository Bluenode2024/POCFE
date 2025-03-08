"use client";

import { useAccount } from "wagmi";
import { useSignMessage } from 'wagmi';
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignIn() {
  const { address } = useAccount();
  const router = useRouter();
  const { signIn, isLoading, error } = useAuth();
  const { signMessageAsync } = useSignMessage();

  const handleSignIn = async () => {
    if (!address) {
      alert("지갑을 연결해주세요!");
      return;
    }

    try {
      const message = "Welcome to PoC System\n\nNetwork: Sepolia\nSign this message to verify your wallet ownership.";
      console.log('Requesting signature for message:', message);
      
      const signature = await signMessageAsync({ message });
      console.log('Received signature:', signature);

      // useAuth의 signIn 함수 사용
      await signIn({
        walletAddress: address,
        message: message,
        signature: signature,
      });
      
      router.push('/');
    } catch (err) {
      console.error("로그인 에러:", err);
      if (err instanceof Error) {
        console.error("에러 상세:", {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
      }
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center bg-gray-50">
      <Card className="w-[400px] bg-white shadow-md">
        <CardHeader className="text-center">
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            {address 
              ? "지갑이 연결되었습니다. 로그인을 진행해주세요." 
              : "지갑 연결이 필요합니다."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Button 
            onClick={handleSignIn} 
            disabled={!address || isLoading}
          >
            {isLoading 
              ? "로그인 중..." 
              : address 
                ? "로그인" 
                : "지갑 연결 필요"}
          </Button>
          {error && (
            <p className="text-red-500 text-sm">{error.message}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
