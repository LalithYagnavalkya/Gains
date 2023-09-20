import { Link } from 'react-router-dom'
import React from 'react'
import { UserAuthForm } from './reset.from'
import { Card } from '@/components/ui/card'

const Reset: React.FC = () => {
  return (
    <div className='overflow-hidden h-screen'>
      <div className="overflow-hidden h-full relative flex-col items-center justify-center">
        <div className="lg:p-8 flex h-full">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <Card className="w-[350px] p-4 pb-6 " >
              <div className="flex pl-2 text-start">
                <img src="/full-logo.svg" alt="" className='w-32 h-32' />
              </div>
              <UserAuthForm />
            </Card>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Reset

