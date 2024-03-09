import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import './loading-circle.css';

const LoadingCircle = forwardRef(({ className, circles, circleClass }, ref) => {
  return (
    <div
      className={cn('flex-start w-max gap-2.5', className)}
      ref={ref}
    >
      {[...Array(circles ?? 5).keys()].map((index) => (
        <div
          key={index}
          className={cn(
            'h-4 w-4 rounded-full bg-primary',
            `circle circle-${index + 1}`,
            circleClass
          )}
        ></div>
      ))}
    </div>
  );
});

LoadingCircle.displayName = 'LoadingCircle';

export { LoadingCircle };
