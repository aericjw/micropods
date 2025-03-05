import { useState } from 'react';
import { Abilities } from '../../../constants/pokemon.model';
import useData from 'pod_server/hooks/useData';

const dtrum = window?.dtrum;

const PokeInput = () => {
  const [pokeId, setPokeId] = useState('1');
  const { data, isPending, isError } = useData(pokeId);

  const setEnterAction = () => {
    console.log(`moduleName: dashboard`);
    const id = dtrum?.enterAction(`click on dashboard/PokenInput`);
    const actionProperties = {
      scope: 'dashboard',
      modulenames: 'PokenInput',
    };
    dtrum.addActionProperties(id, {}, {}, actionProperties);
  };
  return (
    <div>
      <input
        onChange={(e) => {
          setPokeId(e?.target?.value);
          setEnterAction();
        }}
      />
      <div className="bg-orange-400 mt-4 p-4 flex flex-col gap-4 rounded-lg">
        {isPending && <p>Loading...</p>}
        {isError && <p>Error fetching data</p>}
        {data && (
          <div>
            <h4 className="text-lg font-bold">Name: {data?.name}</h4>
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
