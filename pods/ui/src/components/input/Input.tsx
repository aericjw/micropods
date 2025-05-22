type InputProps = {
  placeholder: 'text';
  type: 'text';
};

const Input = ({ placeholder, type }: InputProps) => {
  const {
    dynatraceShared: { useDynatraceAddEventModifier },
  } = window.micropods;
  useDynatraceAddEventModifier(`UI`, `./Input`);
  // if (window?.dynatrace) {
  //   dynatrace.addEventModifier((event, context) => {
  //     return {
  //       ...event,
  //       'event_properties.scope': `pod-ui`,
  //       'event_properties.moduleName': `input`,
  //     };
  //   });
  // }
  return <input placeholder={placeholder} type={type} />;
};

export default Input;
