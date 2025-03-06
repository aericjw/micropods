import { Button } from 'pod_ui/Button';
import PokeInput from './components/pokeInput/PokeInput.tsx';

const {
  translations: { useTranslation },
  dynatraceShared: { useDynatraceModuleIdentifier },
} = window.micropods;

const App = () => {
  useDynatraceModuleIdentifier(`pod-dashboard`, 'page');
  const { t } = useTranslation();

  const sendEvent = () => {
    window.dispatchEvent(
      new CustomEvent('pod_shell/notification', {
        detail: {
          type: 'success',
          content: 'Event sent from pod_dashboard: Hello world 🎉',
        },
      }),
    );
  };

  return (
    <div className="bg-teal-100 rounded-lg p-4">
      <section>
        <h1 className="text-2xl font-bold">This is the dashboard module</h1>
        <h3>{t('pod_dashboard:welcomeMessage')}</h3>
      </section>

      <section className="mt-4">
        <h3 className="text-xl font-semibold">Integration with pod_ui</h3>

        <div className="bg-green-400 mt-4 p-4 flex flex-col gap-4 rounded-lg">
          <h6 className="text-sm font-semibold">pod_ui/Button</h6>

          <Button onClick={sendEvent}>Send an event to pod_shell</Button>
        </div>
      </section>

      <section className="mt-4">
        <h3 className="text-xl font-semibold">Integration with pod_server</h3>

        <h6 className="text-sm font-semibold mt-4">Data from pod_server</h6>
        <PokeInput />
      </section>
    </div>
  );
};
export default App;
