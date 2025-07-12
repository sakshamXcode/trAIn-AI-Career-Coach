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
    <div className="mt-4 text-center">
      <BarLoader width={"100%"} color="gray" />
      <h1 className="mt-4 text-lg font-semibold text-gray-700">
        Loading... Hold on... Don't rush away 🚀
      </h1>
    </div>
  );
}

  if (!data.length) return <p className="p-6 text-red-500">No MCQs available for this topic.</p>;

  const current = data[currentIndex];

  return (
    <>
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold mb-4">
        MCQ {currentIndex + 1} of {data.length}
      </h2>
      <div className="bg-black-100 p-4 rounded-lg shadow">
        <p className="font-semibold">{currentIndex + 1}. {current.question}</p>
        <div className="ml-6 mt-2 text-sm space-y-1">
          {current.options.map((opt, i) => {
            let className = "";
            if (checkedIndex === currentIndex) {
              className =
                opt === current.answer ? "text-green-600 font-semibold" : "text-red-500";
            }
            return (
              <p key={i} className={` ${className}`}>{opt}</p>
            );
          })}
        </div>
        <div className="flex md:flex-row flex-col justify-between mt-6">
          <Button
           className='mb-3'
           disabled={currentIndex === 0}
           onClick={() => {
               setCheckedIndex(null);
               setCurrentIndex((prev) => prev - 1);
            }}
          >
            Previous
          </Button>

          <Button className='mb-3'  onClick={() => setCheckedIndex(currentIndex)}>Check</Button>
          <Button
            disabled={currentIndex === data.length - 1}
            onClick={() => {
                setCheckedIndex(null);
                setCurrentIndex((prev) => prev + 1);
            }}
            >
            Next
          </Button>
        </div>
      </div>
    </div>
<div className="text-center mb-6">
  <h1 className="text-3xl font-bold mb-2">
    ✌️ Relax — this isn’t a test!
  </h1>
  <h2 className="text-lg text-muted-foreground">
    Just pick the answer you think fits and check if you’ve got the pattern right.
  </h2>
</div>


</>
  );
};

export default McqQuestions;
