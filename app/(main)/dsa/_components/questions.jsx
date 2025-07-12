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


const DsaRevision = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
        const result = await generateQuestions();
        console.log(result);
        setData(result?.dsa_interview_preparation);
    } catch (err) {
        console.error("Failed to fetch questions", err);
    } finally {
        setLoading(false);
    }
};

fetchQuestions();
}, []);

if (loading) return 
<>
<BarLoader/>
 <p> Hold Onto Your Seats....</p> <br/>  
</>

if (!data) return <p className="p-6 text-red-500">Failed to load data.</p>;

function handleClick (name){
 router.push(`/dsa/mcq?name=${encodeURIComponent(name)}`);
}


return (
    <div className="p-6">
      <Table>
        <TableCaption>25 Questions of the Day</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Problem Statement</TableHead>
            <TableHead>Link to Question</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.coding_questions.map((q, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{q.topic}</TableCell>
                <TableCell className="font-medium">{q.name}</TableCell>
                <TableCell>
                  <a
                    href={q.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Open Link
                  </a>
                </TableCell>
                <TableCell>
                    <Button onClick={()=>handleClick(q.name)}>
              See MCQs
            </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DsaRevision;
