"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function generateQuestions() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
You are a coding assistant helping a user prepare for a DSA interview. Your task is to output only a JSON object with the following structure and content:

{
  "dsa_interview_preparation": {
    "coding_questions": [
      {
        "topic": "<TOPIC_NAME>",
        "name": "<QUESTION_TITLE>",
        "link": "<QUESTION_URL>"
      }
      // total 25 such questions you may refer to striver's sheet or apna college's 75 questions
    ]
  }
}

Instructions:
- Fill in 25 refreshing random relevant coding questions for the selected DSA topic (e.g., Graphs, Trees, DP, Arrays considering all important data structures on basis of present day company interview question data ).
- Try to give new questions everytime but when days change, for a particular day give same set of questions
- Provide valid clickable links to each question (preferably LeetCode or GeeksforGeeks).
- Output only the JSON content without explanation or additional commentary.
Topic to use: "All important Concepts in Data Structures"
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Clean any markdown formatting or code block wrappers
    const cleanedText = text.replace(/```(?:json)?\n?|```/g, "").trim();
    const questions = JSON.parse(cleanedText);
    return questions;
  } catch (error) {
    console.error("Error generating problem statements:", error);
    throw new Error("Failed to generate problem statements");
  }
}


export async function generateMCQQuestions(name) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  console.log(name);
  const prompt = `
You are a coding assistant helping a user understand the underlying concept of a DSA coding question. Your task is to generate **5 multiple-choice questions (MCQs)** that help a candidate revise and reinforce the **core idea or algorithmic pattern** behind this question.

Input:
{
  "name": ${name}
}

Instructions:
- Use the coding question title in the input.
- Each MCQ must test the user’s understanding of that core concept, typical use-cases, time complexity, or decision-making strategies.
- MCQs should be **clear, concise, and non-repetitive**.
- Use industry-standard formats and terminology.
- It should help the user to remember the patterns of that problem and leave a good impact on them.
- Output must be a clean **JSON object** only (no extra comments or markdown).

Return format:
json
{
  "concept_revision": [
    {
      "question": "<MCQ question text>",
      "options": ["A <Option 1>", "B <Option 2>", "C <Option 3>", "D <Option 4>"],
      "answer": "<Correct Option>"
    },
    ...
    // total 5 such MCQs
  ]
}`
;

  try {
    const results = await model.generateContent(prompt);
    const responses = await results.response;
    const texts = responses.text();
    // Clean any markdown formatting or code block wrappers
    const cleanedTexts = texts.replace(/```(?:json)?\n?|```/g, "").trim();
    const mcqs = JSON.parse(cleanedTexts);
    return mcqs;
  } catch (error) {
    console.error("Error generating MCQ questions:", error);
    throw new Error("Failed to generate MCQ questions");
  }
}
