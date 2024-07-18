import "./Combobox.css";
import { startTransition, useMemo, useRef, useState, forwardRef} from "react";
// import {  } from "react";
import * as Ariakit from "@ariakit/react";
import { matchSorter } from "match-sorter";
import list from "./list.js";

const Combobox = forwardRef(function Combobox(props, ref) {
  // const comboref = useRef();
  const [searchValue, setSearchValue] = useState("");
  const matches = useMemo(() => matchSorter(list, searchValue), [searchValue]);
  return (
    <Ariakit.ComboboxProvider
      setValue={(value) => {
        // console.log("me",value);
        // console.log("ref: ",comboref.current.value);
        startTransition(() => setSearchValue(value));
      }}
    >
      <Ariakit.Combobox ref={ref} placeholder="القاهرة, الجيزة .." className="combobox" />
      <Ariakit.ComboboxPopover gutter={8} sameWidth className="popover">
        {matches.length ? (
          matches.map((value) => (
            <Ariakit.ComboboxItem
              key={value}
              value={value}
              className="combobox-item"
            />
          ))
        ) : (
          <div className="no-results">No results found</div>
        )}
      </Ariakit.ComboboxPopover>
    </Ariakit.ComboboxProvider>
  );
})
export default Combobox