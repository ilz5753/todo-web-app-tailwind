import { isEqual, isFunction, map } from "lodash";
import { useState } from "react";
import Button from "./Button";
type TAction = "Active" | "All" | "Completed";
type TActionValue = boolean | undefined;
interface IAction {
  id: string;
  name: TAction;
  value: TActionValue;
}
let actions: IAction[] = [
  {
    id: "0",
    name: "Active",
    value: false,
  },
  {
    id: "1",
    name: "All",
    value: undefined,
  },
  {
    id: "2",
    name: "Completed",
    value: true,
  },
];
export default function FilterActions({
  setFilterState,
}: {
  setFilterState?: any;
}) {
  let [aid, setAid] = useState(actions[1].id);
  return (
    <div className="py-2 flex justify-center items-center gap-5">
      {map(actions, ({ name, value, id }) => (
        <Button
          key={id}
          text={name}
          onClick={() => {
            if (isFunction(setFilterState)) setFilterState(value);
            setAid(id);
          }}
          isJustText
          active={isEqual(id, aid)}
        />
      ))}
    </div>
  );
}
