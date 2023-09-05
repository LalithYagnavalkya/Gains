<div className='md:mx-auto w-full h-screen flex justify-center items-center '>
    <Card className='w-[355px]'>
        <CardHeader className="space-y-2">
            <CardTitle className="text-4xl scroll-m-20 font-extrabold tracking-tight lg:text-4xl">Login</CardTitle>
            <CardDescription>
                Enter your credentials below.
            </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            {/* <div className="relative">
                         <div className="absolute inset-0 flex items-center">
                             <span className="w-full border-t" />
                         </div>
                         <div className="relative flex justify-center text-xs uppercase">
                             <span className="bg-background px-2 text-muted-foreground">
                                 Or continue with
                             </span>
                         </div>
                     </div> */}
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full">Login</Button>
        </CardFooter>
    </Card>
</div>