import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Autoplay from "embla-carousel-autoplay"
import React from 'react'

const screenshots = [
    { src: '/dashboard-inside.png' },
    { src: '/customers-inside.png' },
    { src: '/add-customer-inside.png' },
    { src: '/customer-inside.png' },
]

const InsideLook: React.FC = () => {
  
    return (
        <div className='container w-[80%]'>
            <h2 id='why-gains' className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 pt-10">Take an inside Look!!</h2>
            <div className="flex justify-center items-center pt-4">
                <Carousel
                    plugins={[
                        Autoplay({
                            delay: 2000,
                        }),
                    ]}
                >
                    <CarouselContent>
                        {screenshots.map(item => {
                            return <CarouselItem className="">
                               <img src={item.src} alt="" />
                            </CarouselItem>
                        })}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    )
}

export default InsideLook