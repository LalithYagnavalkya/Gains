import { Link } from 'react-router-dom'
import React from 'react'
import { UserAuthForm } from './login.form'
import { Card } from '@/components/ui/card'

const Login: React.FC = () => {
    return (
        <>
            <div className="md:hidden">
                <img
                    src="/examples/dashboard-light.png"
                    width={1280}
                    height={866}
                    alt="Open in desktop"
                    className="block dark:hidden"
                />
                <img
                    src="/examples/dashboard-dark.png"
                    width={1280}
                    height={866}
                    alt="Open in desktop"
                    className="hidden dark:block"
                />
            </div>
            <div className='hidden md:block overflow-hidden h-screen'>
                <div className="overflow-hidden h-full relative flex-col items-center justify-center">
                    <div className="lg:p-8 flex h-full">
                        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                            <Card className="w-[350px] p-4 pb-6 " >
                                <div className="flex pl-2 text-start">
                                    <img src="/full-logo.svg" alt="" className='w-32 h-32' />
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
        </>

    )
}

export default Login

