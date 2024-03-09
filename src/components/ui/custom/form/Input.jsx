import { forwardRef, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { FiLock, FiUnlock } from 'react-icons/fi';

const Input = forwardRef(
  ({ className, type, label, inputClass, labelClass, ...props }, ref) => {
    const containerRef = useRef(null);
    const focusInput = () => {
      const input = containerRef.current.querySelector('input');
      if (input) input?.focus();
    };

    const [inputType, setInputType] = useState(type);

    return (
      <div
        ref={containerRef}
        className={cn(
          'relative flex h-12 w-full flex-col gap-1 rounded border border-border pb-[8px] pl-4 pr-4 pt-[3px] shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0 hover:border-primary',
          className
        )}
        onClick={focusInput}
      >
        <div
          className={cn('text-start text-xs text-muted-foreground', labelClass)}
        >
          {label}
        </div>
        <input
          ref={ref}
          type={inputType}
          className={cn('h-5 w-full border-none outline-none', inputClass)}
          {...props}
        />

        {type === 'password' &&
          (inputType === 'password' ? (
            <FiLock
              size={14}
              className=" absolute bottom-[6px] right-[10px] cursor-pointer text-muted-foreground"
              onClick={() => setInputType('text')}
            />
          ) : (
            <FiUnlock
              size={14}
              className=" absolute bottom-[6px] right-[10px] cursor-pointer text-muted-foreground"
              onClick={() => setInputType('password')}
            />
          ))}
      </div>
    );
  }
);
Input.displayName = 'Input';

export default Input;
