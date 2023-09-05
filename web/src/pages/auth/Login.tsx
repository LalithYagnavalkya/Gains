import { Link } from 'react-router-dom'
import React from 'react'
import { UserAuthForm } from './userLoginForm'

const Login: React.FC = () => {
    return (
        <div className='overflow-hidden h-screen'>
            <div className="overflow-hidden h-full relative flex-col items-center justify-center">
                <div className="lg:p-8 flex h-full">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight lg:text-4xl">
                                GAINS
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email and password below
                            </p>
                        </div>
                        <UserAuthForm />
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

