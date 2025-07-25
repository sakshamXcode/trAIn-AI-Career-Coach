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
  You are a coding assistant that helps users strengthen their understanding of Data Structures and Algorithms (DSA) by generating concept-based quiz questions. Given a DSA problem title as input, generate **5 fresh multiple-choice questions (MCQs)** that reinforce key algorithmic concepts.
  
  ### Input:
  {
    "name": "${name}"
  }
  
  ### Requirements:
  - Each MCQ should test a **distinct concept** relevant to the problem (e.g., algorithm design, edge cases, data structure use, complexity analysis, common pitfalls).
  - Avoid repeating questions for the same problem. Ensure **diversity and freshness** across runs and days.
  - Include an **external study link** (GeeksforGeeks, LeetCode Explore, or similar) that directly relates to the concept being tested.
  - Each question must have **exactly one correct answer** from the options (case-sensitive).
  - Questions should be **clear, useful, and non-trivial**, avoiding superficial facts.
  - Output must be **strictly valid JSON**. Do not include any explanations, markdown, or formatting.
  
  ### Output Format:
  {
    "concept_revision": [
      {
        "question": "Which data structure is most optimal for solving the Two Sum problem in linear time?",
        "options": ["Array", "HashMap", "Set", "LinkedList"],
        "answer": "HashMap",
        "study_link": "https://www.geeksforgeeks.org/two-sum-problem/"
      },
      ...
      // Total of 5 MCQs
    ]
  }
  `;
  

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
