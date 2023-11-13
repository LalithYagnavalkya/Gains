import React, { ChangeEvent } from "react"
import { IndianRupee } from 'lucide-react';
import { cn } from "@/lib/utils"
export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;
export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { 
    }

const RupeeInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, value, onChange,...props }, ref) => {
        
        const [inputValue, setInputValue] = React.useState<string>(
            (value as string) || ''
        );

        const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
            const { value } = event.target;
            // Remove any non-digit characters from the input (e.g., commas)
            const sanitizedValue = value.replace(/[^0-9]/g, '');
            // Format the number with commas
            const formattedValue = sanitizedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            setInputValue(formattedValue);
            // Pass the updated value to the external onChange handler
            onChange && onChange(event);
        };

       
        return (
            <div className="flex relative">
                <IndianRupee className="h-[16px] w-[16px] absolute mt-2.5 ml-1.5" />
                <input
                    {...props}
                    onChange={handleInputChange} 
                    value={inputValue}
                    type={type}
                    className={cn(
                        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-6 remove-spin-button",
                    )}
                    ref={ref}
                />
            </div>
        )
    }
)

RupeeInput.displayName = "Input";

export { RupeeInput };