import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from 'pod_ui/Button';
import { Skeleton } from 'pod_ui/Skeleton';
import UIProvider from 'pod_ui/UIProvider';
import ServerProvider from 'pod_server/providers/ServerProvider';
import DashboardPod from 'pod_dashboard/App';
import InvoicesPod from 'pod_invoices/App';

type Module = {
  name: string;
  moduleName: string;
  color: string;
  path?: string;
};

const MODULES: Module[] = [
  {
    name: 'Shell',
    moduleName: 'pod_shell',
    color: 'bg-rose-400',
    path: '/',
  },
  {
    name: 'UI',
    moduleName: 'pod_ui',
    color: 'bg-green-400',
  },
  {
    name: 'Server',
    moduleName: 'pod_server',
    color: 'bg-orange-400',
  },
  {
    name: 'Dashboard',
    moduleName: 'pod_dashboard',
    color: 'bg-teal-400',
    path: '/dashboard',
  },
  {
    name: 'Invoices',
    moduleName: 'pod_invoices',
    color: 'bg-violet-400',
    path: '/invoices',
  },
];

const Legend = () => {
  return (
    <div className="p-2 flex flex-col gap-1 fixed left-2 bottom-2 rounded-lg border bg-white shadow-md">
      {MODULES.map((module) => (
        <div
          className={`p-1 px-2 rounded-xl ${module.color}`}
          key={module.name}
        >
          <h3 className="text-xs font-bold text-gray-800">
            {module.moduleName}
          </h3>
        </div>
      ))}
    </div>
  );
};

const Header = () => {
  const {
    translations: { changeLanguage },
  } = window.micropods;

  return (
    <header className="w-full flex justify-center items-center pt-4 mb-4">
      <div className="w-1/2 flex gap-4 bg-rose-400 text-white rounded-lg p-2 justify-center">
        {MODULES.map((module) =>
          module.path ? (
            <Link key={module.name} to={module.path}>
              {module.name}
            </Link>
          ) : null,
        )}

        <div className="flex bg-white rounded-full gap-4 px-2">
          <div className="cursor-pointer" onClick={() => changeLanguage('en')}>
            🇺🇸
          </div>
          <div className="cursor-pointer" onClick={() => changeLanguage('ro')}>
            🇷🇴
          </div>
        </div>
      </div>
    </header>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const onEvent = (event: any) => {
    if (event.detail.type === 'success') {
      toast.success(event.detail.content, {
        position: 'bottom-center',
      });
    }
  };

  useEffect(() => {
    window.addEventListener('pod_shell/notification', onEvent);

    return () => window.removeEventListener('pod_shell/notification', onEvent);
  }, []);

  return (
    <div className="container h-screen bg-rose-100">
      <Header />

      {children}

      <Legend />
    </div>
  );
};

const RootLayout = () => <Outlet />;

const Homepage = () => {
  return (
    <div>
      <section>
        <h1 className="text-2xl font-bold">This is the shell module</h1>
      </section>

      <section className="mt-4">
        <h3 className="text-xl font-semibold">Integration with pod_ui</h3>

        <div className="bg-green-100 mt-4 p-4 flex flex-col gap-4 rounded-lg">
          <h6 className="text-sm font-semibold">pod_ui/Button</h6>
          <Button>hello from shacdn</Button>
          <h6 className="text-sm font-semibold">pod_ui/Skeleton</h6>
          <Skeleton className="w-24 h-4 rounded-full bg-green-400" />
          <Skeleton className="w-48 h-4 rounded-full bg-green-400" />
          <Skeleton className="w-72 h-4 rounded-full bg-green-400" />
        </div>
      </section>
    </div>
  );
};

const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: (
          <Layout>
            <Homepage />
          </Layout>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <Layout>
            <DashboardPod />
          </Layout>
        ),
      },
      {
        path: 'invoices',
        element: (
          <Layout>
            <InvoicesPod />
          </Layout>
        ),
      },
      {
        path: '*',
        element: <Layout>Not found</Layout>,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

// check if RUM on Grail is enabled for app
if(window.dynatrace){
  // event modifier add contextual attributes to OOTB and custom events that Dynatrace detects
  // event represents the Dynatrace Event created
  // context represents the JavaScript Event that triggered the Dynatrace Event
  dynatrace.addEventModifier(function (event:any, context:any) {
    // check that context exists, that it's related to performance resource timing, and isn't requests for favicon
    if(context && context instanceof PerformanceResourceTiming && !context.name?.includes("favicon")){

      // extract microfrontend name from event
      const regex = /localhost:\d+/;
      const match = context.name.match(regex);

      // IGNORE - I'm only doing this so my demo data isn't "localhost:3000", but more represents the actual MFE
      // For Autodesk, the component name is already in the URL and this step is not necessary
      let mfe = "";
      const domainMapping: Object = {
        "localhost:3000": "exoskeleton",
        "localhost:3001": "pod_ui",
        "localhost:3002": "pod_dashboard",
        "localhost:3003": "pod_server",
        "localhost:3004": "pod_invoices",
        "localhost:8000": "exoskeleton",
        "localhost:8001": "pod_ui",
        "localhost:8002": "pod_dashboard",
        "localhost:8003": "pod_server",
        "localhost:8004": "pod_invoices"
      }
      for (const [domain, name] of Object.entries(domainMapping)){
        if (domain == match[0]){
          mfe = name
        }
      }
      // END IGNORE

      // add an additional property so we can slice, filter, alert, etc. by microfrontend
      return {
        ...event,
        "event_properties.microfrontend": mfe,
      }
    }
  });
}

const App = () => (
  <ErrorBoundary fallback={<p>Something went wrong</p>}>
    <ServerProvider>
      <UIProvider>
        <RouterProvider router={router} />

        <Toaster />
      </UIProvider>
    </ServerProvider>
  </ErrorBoundary>
);

export default App;
