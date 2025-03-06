import { useEffect } from "react";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import BNS_ABI from "@/abi/IBND.abi";

// 읽기 작업의 반환 타입 정의
interface ValidatorStatusResponse {
  data: boolean;
  isError: boolean;
  isLoading: boolean;
}

interface TransactionData {
  hash: string;
  from: string;
  to: string;
  value: string;
  data?: string;
}

interface TransactionResponse {
  hash: string;
  wait: () => Promise<{
    status: number;
    transactionHash: string;
  }>;
}

interface TransactionReceipt {
  status: number;
  blockNumber: number;
  transactionHash: string;
}

interface TransactionError {
  code: number;
  message: string;
  data?: {
    code: number;
    message: string;
  };
}

interface ContractError {
  code: number;
  message: string;
  data?: unknown;
}

export const useContractInteraction = (setIsDepositConfirmed: (value: boolean) => void) => {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  // any를 구체적인 타입으로 변경
  const { data: validatorStatus } = useReadContract({
    address: "0xA499CaD0aBc424A6E6770871647BdEe4e9777D8C",
    abi: BNS_ABI,
    functionName: "checkValidator",
    args: [address],
  }) as ValidatorStatusResponse;

  useEffect(() => {
    if (validatorStatus !== undefined) {
      console.log("Validator status:", validatorStatus);
      setIsDepositConfirmed(Boolean(validatorStatus));
    }
  }, [validatorStatus, setIsDepositConfirmed]);

  const handleError = (error: TransactionError) => {
    console.error('Contract error:', error);
    // ... error handling logic
  };

  const handleContractCall = async (transaction: TransactionData) => {
    try {
      // ... 기존 로직
    } catch (error) {
      if (error instanceof Error) {
        console.error('Transaction error:', error.message);
      }
    }
  };

  return {
    handleDeposit: async (amount: string): Promise<void> => {
      try {
        console.log("Initiating deposit with amount:", amount);
        await writeContract({
          abi: BNS_ABI,
          address: "0xA499CaD0aBc424A6E6770871647BdEe4e9777D8C",
          functionName: "setValidator",
          args: [address],
        });
        console.log("Deposit successful");
      } catch (error) {
        handleError(error as TransactionError);
      }
    }
  };
};
