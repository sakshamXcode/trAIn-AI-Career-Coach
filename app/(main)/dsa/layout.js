import { BarLoader } from "react-spinners";
import { Suspense } from "react";
import { DsaQuestionsProvider } from "./_components/questions";

export default function Layout({ children }) {
  return (
    <DsaQuestionsProvider>
      <div className="px-5">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-6xl font-bold gradient-title">DSA Revision</h1>
        </div>
        <Suspense
          fallback={<BarLoader className="mt-4" width={"100%"} color="gray" />}
        >
          {children}
        </Suspense>
      </div>
    </DsaQuestionsProvider>
  );
}