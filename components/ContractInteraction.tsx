import { useEffect } from "react";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import BNS_ABI from "@/abi/IBND.abi";

export const useContractInteraction = (
  onDepositConfirmed: (status: boolean) => void
) => {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const { data: validatorStatus }: any = useReadContract({
    address: "0xA499CaD0aBc424A6E6770871647BdEe4e9777D8C",
    abi: BNS_ABI,
    functionName: "checkValidator",
    args: [address],
  });

  useEffect(() => {
    if (validatorStatus !== undefined) {
      console.log("Validator status:", validatorStatus);
      onDepositConfirmed(Boolean(validatorStatus));
    }
  }, [validatorStatus, onDepositConfirmed]);

  const handleDeposit = async (depositAmount: string) => {
    try {
      console.log("Initiating deposit with amount:", depositAmount);
      await writeContract({
        abi: BNS_ABI,
        address: "0xA499CaD0aBc424A6E6770871647BdEe4e9777D8C",
        functionName: "setValidator",
        args: [address],
      });
      console.log("Deposit successful");
    } catch (error) {
      console.error("Error during deposit:", error);
    }
  };

  return { handleDeposit };
};
