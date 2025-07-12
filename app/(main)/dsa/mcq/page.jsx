import React from 'react'
import McqQuestions from '../_components/dsamcqquestions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
const McqPage = () => {
  return (
    <div>
       <Link href="/dsa">
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to DSA Revision
          </Button>
        </Link>
      <McqQuestions/>
    </div>
  )
}

export default McqPage
