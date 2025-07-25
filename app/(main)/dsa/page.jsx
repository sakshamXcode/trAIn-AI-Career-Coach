import React from 'react'
import DsaRevision, { DsaQuestionsProvider } from './_components/questions'
const McqPage = () => {
  return (
    <DsaQuestionsProvider>
      <div>
        <DsaRevision/>
      </div>
    </DsaQuestionsProvider>
  )
}

export default McqPage
