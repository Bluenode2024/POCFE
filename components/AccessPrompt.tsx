import React from "react";
import { Button } from "@/components/ui/button";

const AccessPrompt = ({
  isDepositConfirmed,
  depositAmount,
  setDepositAmount,
  onConfirmDeposit,
}: {
  isDepositConfirmed: boolean | null;
  depositAmount: string;
  setDepositAmount: (amount: string) => void;
  onConfirmDeposit: () => void;
}) => {
  if (isDepositConfirmed) return null;

  return (
    <div className="absolute inset-0 bg-gray-200 bg-opacity-50 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg text-center w-[90%] max-w-md">
        <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2">
          <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6 6 0 10-12 0v3a2.032 2.032 0 01-.595 1.405L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 text-red-600 mt-6">Deposit Required</h2>
        <p className="mb-4 text-gray-700">
          Deposit the required amount to start validating tasks.
        </p>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter amount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-300"
          />
        </div>
        <Button
          size="sm"
          className="bg-red-500 text-white hover:bg-red-600"
          onClick={onConfirmDeposit}
        >
          Confirm Deposit
        </Button>
      </div>
    </div>
  );
};

export default AccessPrompt;
