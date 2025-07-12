"use client";

import React, { useEffect, useState } from "react";
import { generateMCQQuestions } from "@/actions/dsa-questions";
import { BarLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const McqQuestions = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [checkedIndex, setCheckedIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const result = await generateMCQQuestions(name);
        setData(result?.concept_revision || []);
      } catch (err) {
        console.error("Failed to fetch questions", err);
      } finally {
        setLoading(false);
      }
    };

    if (name) fetchQuestions();
  }, [name]);

  if (loading) {
    return (
      <div className="mt-10 text-center">
        <BarLoader width={"100%"} color="#4B5563" />
        <h1 className="mt-6 text-xl font-medium text-gray-700">
          Loading questions... Please wait 🚀
        </h1>
      </div>
    );
  }

  if (!data.length) {
    return <p className="p-6 text-red-500">No MCQs available for this topic.</p>;
  }

  const current = data[currentIndex];
  const isChecked = checkedIndex === currentIndex;
  const correctAnswer = current.answer?.trim().toLowerCase();
  const studyLink = current.study_link;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        MCQ {currentIndex + 1} of {data.length}
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <p className="font-semibold text-lg text-gray-900 mb-4">
          {currentIndex + 1}. {current.question}
        </p>

        <div className="grid gap-3">
          {current.options.map((opt, i) => {
            const option = opt.trim();
            const isCorrect = option.toLowerCase() === correctAnswer;

            let base =
              "rounded-md px-4 py-2 transition-colors border cursor-pointer";

            if (isChecked) {
              return (
                <div
                  key={i}
                  className={
                    isCorrect
                      ? `${base} bg-green-100 text-green-800 border-green-400 font-semibold`
                      : `${base} bg-red-100 text-red-700 border-red-400`
                  }
                >
                  {option}
                </div>
              );
            } else {
              const isSelected = selectedOption === option;
              return (
                <div
                  key={i}
                  onClick={() => setSelectedOption(option)}
                  className={`${base} ${
                    isSelected
                      ? "bg-blue-100 text-blue-800 border-blue-400"
                      : "hover:bg-gray-100 text-gray-800 border-gray-300"
                  }`}
                >
                  {option}
                </div>
              );
            }
          })}
        </div>

        {isChecked && studyLink && (
          <div className="mt-5">
            <a
              href={studyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded"
            >
              📘 Learn More About This Concept
            </a>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
          <Button
            variant="outline"
            disabled={currentIndex === 0}
            onClick={() => {
              setCheckedIndex(null);
              setSelectedOption(null);
              setCurrentIndex((prev) => prev - 1);
            }}
          >
            ⬅️ Previous
          </Button>

          <Button
            onClick={() => setCheckedIndex(currentIndex)}
            disabled={selectedOption === null}
          >
            ✅ Check
          </Button>

          <Button
            variant="outline"
            disabled={currentIndex === data.length - 1}
            onClick={() => {
              setCheckedIndex(null);
              setSelectedOption(null);
              setCurrentIndex((prev) => prev + 1);
            }}
          >
            Next ➡️
          </Button>
        </div>
      </div>

      <div className="text-center text-gray-600 mt-10">
        <h1 className="text-3xl font-bold mb-2">🎯 No pressure!</h1>
        <p className="text-lg">Just have fun learning patterns and solving smart 🚀</p>
      </div>
    </div>
  );
};

export default McqQuestions;
