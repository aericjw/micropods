import './App.css';

import { Button } from 'pod_ui/Button';
import PokeInput from 'pod_dashboard/PokeInput';
import React, { useEffect, useState } from 'react';

const App = () => {
  const {
    dynatraceShared: { useDynatraceAddEventModifier, useDynatraceSendEvent },
  } = window.micropods;

  const [sprites, setSprites] = useState([]);

  useEffect(() => {
    const fetchSprites = async () => {
      const spriteData = [];
      for (let i = 1; i <= 15; i++) {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/item/${i}/`);
          const data = await response.json();
          spriteData.push({
            id: i,
            name: data.name,
            image: data.sprites.default,
          });
        } catch (error) {
          console.error(`Error fetching item ${i}:`, error);
        }
      }
      setSprites(spriteData);
    };

    fetchSprites();
  }, []);

  useDynatraceAddEventModifier(`Invoices`, `./App`);

  const sendEventToShell = () => {
    window.dispatchEvent(
      new CustomEvent('pod_shell/notification', {
        detail: {
          version: 1,
          timestamp: Date.now(),
          type: 'success',
          content: 'Event sent from from pod_invoices: 42 is the answer',
        },
      }),
    );

    useDynatraceSendEvent('Exoskeleton', './Button', 9999);
  };

  return (
    <div className="bg-violet-100 rounded-lg p-4">
      <section>
        <h1 className="text-2xl font-bold">This is the invoices module</h1>
        <div className="container mt-4">
          <div className="flex">
            {sprites.map((item) => (
              <div
                key={item.id}
                className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 text-center"
              >
                <div className="card h-100">
                  <img
                    src={item.image}
                    className="card-img-top p-3"
                    alt={item.name}
                  />
                  <div className="card-body p-2">
                    <p className="card-text text-capitalize">{item.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4">
        <h3 className="text-xl font-semibold">Integration with pod_ui</h3>

        <div className="bg-green-400 mt-4 p-4 flex flex-col gap-4 rounded-lg">
          <h6 className="text-sm font-semibold">pod_ui/Button</h6>
          <Button onClick={sendEventToShell}>Send an event to pod_shell</Button>
        </div>
      </section>
      <div className="bg-teal-100 rounded-lg p-4">
        <section>
          <h1 className="text-2xl font-bold">This is the dashboard module</h1>
          <PokeInput />
        </section>
      </div>
    </div>
  );
};

export default App;
