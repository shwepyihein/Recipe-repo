import { cn } from '@/lib/utils';
import * as React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  lableClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, lableClassName, type, value, disabled, ...props },
    ref,
  ) => {
    return (
      <div className="relative z-0  w-full">
        <input
          type={type}
          id={props.id}
          className={cn(
            value && 'input_focused',
            'pt-8 pb-3 input block w-full bg-white overflow-hidden   text-navy mt-0  rounded-lg px-4 border appearance-none focus:outline-none focus:ring-0 focus:border-navy border-gray-200',
            className,
            disabled && 'bg-[#f1f1f1] border-none',
          )}
          placeholder=""
          ref={ref}
          {...props}
          value={value}
        />

        <label
          htmlFor={props.id}
          className={cn(
            lableClassName,
            'absolute label duration-300  top-[24px] left-4 -z-1 origin-0 text-[#888]',
          )}
        >
          {label}
        </label>
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
