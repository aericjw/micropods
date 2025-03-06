import { useEffect } from 'react';

const useDynatraceModuleIdentifier = (scope, moduleName) => {
  console.log(`Shared shell: scope:${scope}, moduleName:${moduleName} `);
  if (window?.dynatrace) {
    dynatrace.addEventModifier((event, context) => {
      return {
        ...event,
        'event_properties.scope': scope,
        'event_properties.moduleName': moduleName,
      };
    });
  }
};

const dynatraceShared = {
  useDynatraceModuleIdentifier,
};
export default dynatraceShared;
