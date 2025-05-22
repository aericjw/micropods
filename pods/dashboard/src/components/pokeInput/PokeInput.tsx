import { useState, useEffect } from 'react';
import { Abilities } from '../../../constants/pokemon.model';
import useData from 'pod_server/hooks/useData';

const {
  dynatraceShared: {
    useDynatraceAddEventModifier,
    useDynatraceSendBizEvents,
    useDynatraceSendEvent,
    useDynatraceAddEventModifierAndSendBizEvents,
  },
} = window.micropods;

const PokeInput = () => {
  // Enrich automatic events with Scope/Module (dynatrace.addEventModifier)
  useDynatraceAddEventModifier(`Dashboard`, `./PokeInput`);
  const [inputValue, setInputValue] = useState(1);
  const [pokeId, setPokeId] = useState(1);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    setPokeId(inputValue);
  };

  // const [pokeId, setPokeId] = useState('1');
  const { data, isPending, isFetched, isError, error } = useData(pokeId);

  if (isError) {
    // Enrich automatic events with Scope/Module & Ingest context properties/objects via bizEvents (dynatrace.addEventProperties,dynatrace.sendBizEvents)
    useDynatraceAddEventModifierAndSendBizEvents(
      `Dashboard`,
      `./PokeInput`,
      'Error',
      {
        'error.name': error.name,
        'config.url': error.config.url,
        ...{ isPokeInputVisible: true },
        test: { test1: inputValue },
        error: true,
      },
    );
  }

  useEffect(() => {
    if (isFetched && data) {
      useDynatraceSendBizEvents(`Dashboard`, `./PokeInput`, 'Context', {
        abilities: data?.abilities,
        name: data?.name,
        image: data?.sprites?.front_shiny,
      });
    }
  }, [isFetched, data]);

  return (
    <div>
      <div className="bg-orange-400 mt-4 p-4 flex flex-col gap-4 rounded-lg">
        <p>dashboard/PokeInput</p>
        <h1 className="text-lg font-bold">Pokemon Search</h1>
        <div className="mt-4 p-4 flex gap-4 rounded bg-light">
          <input
            type="text"
            className="form-control mt-1 p-1"
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className="bg-teal-100 rounded mt-1 p-1">
            <button onClick={handleButtonClick}>Search</button>
          </div>
        </div>
        {isPending && <p>Loading...</p>}
        {isError && <p>Error fetching data</p>}
        {data && (
          <div>
            <div>
              <h4 className="text-lg font-bold">Name: {data?.name}</h4>
              <img src={data?.sprites?.front_shiny} />
            </div>
            <h5 className="text-md font-semibold">Abilities:</h5>
            <ul className="list-disc list-inside">
              {data?.abilities?.map((ability: Abilities, index: number) => (
                <li key={index}>
                  <p>Ability Name: {ability.ability.name}</p>
                  <p>Is Hidden: {ability.is_hidden ? 'Yes' : 'No'}</p>
                  <p>Slot: {ability.slot}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokeInput;
