"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import user from "../admin/user/page";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [message, setMessage] = useState("Sign this message to log in!");
  const router = useRouter();

  const handleConnectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask를 설치해주세요!");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      alert(`지갑 연결 성공: ${address}`);
    } catch (error) {
      console.error("지갑 연결 실패:", error);
      alert("지갑 연결에 실패했습니다.");
    }
  };

  const handleLogin = async () => {
    if (!walletAddress) {
      alert("지갑을 먼저 연결해주세요!");
      return;
    }

    setLoading(true);

    if (!window.ethereum) {
      alert("MetaMask를 설치해주세요!");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // 서명 생성
      const signature = await signer.signMessage(message);

      // 로그인 요청 데이터
      const data = {
        walletAddress,
        message,
        signature,
      };

      console.log("로그인 요청 데이터:", data);

      const response = await fetch("http://localhost:3001/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("로그인 실패");
      }

      const result = await response.json();
      console.log("로그인 성공:", result);
      alert("로그인 성공!");
      // 로그인 후 토큰 저장 또는 페이지 이동
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("로그인 실패. 다시 시도하세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-semibold text-center mb-6">Log In</h1>
        <div className="grid gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label>지갑 주소</Label>
            <Input
              value={walletAddress || ""}
              readOnly
              placeholder="지갑을 연결해주세요"
            />
            <Button onClick={handleConnectWallet} disabled={loading}>
              지갑 연결
            </Button>
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label>서명 메시지</Label>
            <Input value={message} readOnly />
          </div>

          <Button
            onClick={handleLogin}
            className="w-full"
            disabled={loading || !walletAddress}
          >
            {loading ? "로그인 중..." : "Log In"}
          </Button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account yet?
            <Button
              variant="link"
              className="text-blue-600 hover:underline p-0 m-0 ml-1 border-none bg-transparent cursor-pointer"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
