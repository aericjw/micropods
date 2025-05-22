const useDynatraceAddEventModifier = (scope, moduleName) => {
  console.log(`Shared shell: scope:${scope}, moduleName:${moduleName} `);
  if (window?.dynatrace) {
    dynatrace.addEventModifier((event, context) => {
      return {
        ...event,
        'event_properties.scope': scope,
        'event_properties.modulename': moduleName,
      };
    });
  }
};

const useDynatraceSendErrorEvent = (scope, moduleName, error) => {
  console.log(`Shared shell: scope:${scope}, moduleName:${moduleName} `);
  if (window?.dynatrace) {
    console.log(error.message);
    console.log(error.stack);
    dynatrace.sendEvent({
      'event_properties.scope': scope,
      'event_properties.modulename': moduleName,
      'event_properties.custom_error_message': error.message,
      'event_properties.custom_error_stack': error.stack,
    });
  }
};

const useDynatraceSendEvent = (scope, moduleName, duration) => {
  console.log(`Shared shell: scope:${scope}, moduleName:${moduleName} `);
  if (window?.dynatrace) {
    console.log('sending event');
    dynatrace.sendEvent({
      'event_properties.scope': scope,
      'event_properties.modulename': moduleName,
      duration: duration,
    });
  }
};

const useDynatraceSendBizEvents = (scope, moduleName, type, object) => {
  console.log(`Shared shell: scope:${scope}, moduleName:${moduleName} `);
  if (window?.dynatrace) {
    console.log('Sending Bizevents');
    dynatrace.sendBizEvent(type, {
      'app.name': 'MFE APP DEMO',
      scope: scope,
      moduleName: moduleName,
      ...object,
    });
  }
};

const useDynatraceAddEventModifierAndSendBizEvents = (
  scope,
  moduleName,
  type,
  object,
) => {
  console.log(`Shared shell: scope:${scope}, moduleName:${moduleName} `);
  if (window?.dynatrace) {
    dynatrace.addEventModifier((event, context) => {
      if (context && context instanceof PerformanceResourceTiming) {
        dynatrace.sendBizEvent(type, {
          'app.name': 'MFE APP DEMO',
          scope: scope,
          moduleName: moduleName,
          'page.id': event['page.id'],
          'view.id': event['view.id'],
          'rum.tab_id': event['dt.rum.tab_id'],
          'rum.frame_id': event['dt.rum.frame_id'],
          ...object,
        });
      }
      return {
        ...event,
        'event_properties.scope': scope,
        'event_properties.modulename': moduleName,
      };
    });
  }
};

const dynatraceShared = {
  useDynatraceAddEventModifier,
  useDynatraceSendBizEvents,
  useDynatraceSendEvent,
  useDynatraceAddEventModifierAndSendBizEvents,
  useDynatraceSendErrorEvent,
};
export default dynatraceShared;
