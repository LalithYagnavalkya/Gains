import { Link } from 'react-router-dom'
import React from 'react'
import { UserAuthForm } from './userLoginForm'
import { Card } from '@/components/ui/card'

const Login: React.FC = () => {
    return (
        <div className='overflow-hidden h-screen'>
            {/* <h1 className="scroll-m-20 pt-6 pl-5 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Gains
            </h1> */}
            <div className="overflow-hidden h-full relative flex-col items-center justify-center">
                <div className="lg:p-8 flex h-full">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <Card className="w-[350px] p-4 pb-6 " >
                        <div className="flex flex-col space-y-2 pb-6 pt-2 pl-2 text-start">
                            <span><img src="/full-logo.svg" alt=""  className='w-32 h-32' /></span>
                        </div>
                        <UserAuthForm />
                        </Card>
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link
                                to="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                to="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login

