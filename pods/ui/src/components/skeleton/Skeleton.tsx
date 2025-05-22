import { cn } from '../../utils/cn';

import '../../App.css';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const {
    dynatraceShared: { useDynatraceAddEventModifier },
  } = window.micropods;
  useDynatraceAddEventModifier(`UI`, `./Skeleton`);
  // if (window?.dynatrace) {
  //   dynatrace.addEventModifier((event, context) => {
  //     return {
  //       ...event,
  //       'event_properties.scope': `pod-ui`,
  //       'event_properties.moduleName': `skeleton`,
  //     };
  //   });
  // }

  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
