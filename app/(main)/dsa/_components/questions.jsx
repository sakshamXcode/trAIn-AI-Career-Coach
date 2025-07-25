"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { generateQuestions } from "@/actions/dsa-questions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";
import { createContext, useContext } from "react";

// Context for caching DSA questions
const DsaQuestionsContext = createContext();

export function DsaQuestionsProvider({ children }) {
  const [cachedData, setCachedData] = useState(null);
  return (
    <DsaQuestionsContext.Provider value={{ cachedData, setCachedData }}>
      {children}
    </DsaQuestionsContext.Provider>
  );
}

function useDsaQuestionsCache() {
  return useContext(DsaQuestionsContext);
}

const DsaRevision = () => {
  const { cachedData, setCachedData } = useDsaQuestionsCache();
  const [data, setData] = useState(cachedData);
  const [loading, setLoading] = useState(!cachedData);
  const router = useRouter();

  useEffect(() => {
    if (!cachedData) {
      const fetchQuestions = async () => {
        try {
          const result = await generateQuestions();
          setData(result?.dsa_interview_preparation);
          setCachedData(result?.dsa_interview_preparation);
        } catch (err) {
          console.error("Failed to fetch questions", err);
        } finally {
          setLoading(false);
        }
      };
      fetchQuestions();
    }
  }, [cachedData, setCachedData]);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <BarLoader width="100%" color="gray" />
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Fetching your DSA challenge set for the day....
        </p>
      </div>
    );
  }

  if (!data) {
    return <p className="p-6 text-red-500">Failed to load data.</p>;
  }

  const handleClick = (name) => {
    router.push(`/dsa/mcq?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300 bg-clip-text text-transparent">DSA Revision: 25 Questions of the Day</h1>
        <p className="text-lg text-gray-600">Sharpen your skills with handpicked coding and MCQ challenges!</p>
      </div>
      <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="bg-blue-200 sticky top-0 z-10">
            <TableRow>
              <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">#</TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Topic</TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Problem Statement</TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Link</TableHead>
              <TableHead className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">MCQs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100">
            {data.coding_questions.map((q, index) => (
              <TableRow
                key={index}
                className={
                  index % 2 === 0
                    ? "bg-blue-50 hover:bg-blue-100 transition-colors"
                    : "bg-white hover:bg-blue-50 transition-colors"
                }
              >
                <TableCell className="px-4 py-3 font-semibold text-blue-900">{index + 1}</TableCell>
                <TableCell className="px-4 py-3 text-blue-700">{q.topic}</TableCell>
                <TableCell className="px-4 py-3 font-medium text-gray-900">{q.name}</TableCell>
                <TableCell className="px-4 py-3">
                  <a
                    href={q.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-600 underline hover:text-blue-800 font-semibold px-2 py-1 rounded transition-colors"
                  >
                    Open Link
                  </a>
                </TableCell>
                <TableCell className="px-4 py-3 text-center">
                  <Button
                    onClick={() => handleClick(q.name)}
                    className="bg-gradient-to-r from-pink-400 to-blue-400 text-white font-bold shadow hover:from-pink-500 hover:to-blue-500 px-4 py-2 rounded-lg transition-all"
                  >
                    See MCQs
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DsaRevision;
