import { Listbox, Transition } from "@headlessui/react";
import { All_Skills } from "@prisma/client";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import React from "react";

interface MultiSelectProps {
  options: All_Skills[];
  selected: string[];
  onChange: (selectedOptions: string[]) => void;
}

export default function MultiSelect({
  options,
  selected,
  onChange,
}: MultiSelectProps) {
  return (
    <Listbox value={selected} onChange={onChange} multiple>
      <div className="relative">
        <Listbox.Button className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
          <span className="block truncate">
            {" "}
            {selected.length > 0
              ? options.filter((skill) => selected.includes(skill.id)).map((option) => option.name).join(", ")
              : "Select the required skills"}
          </span>
          <CaretSortIcon className="h-4 w-4 opacity-50" />
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="bg-white absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-popover py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                className="relative cursor-default select-none py-1.5 pl-10 pr-4 text-sm rounded-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                value={option.id}
              >
                {({ selected }) => (
                  <>
                    {option.name}
                    {selected ? (
                      <span className="absolute inset-y-0 right-2 flex items-center pl-3">
                        <CheckIcon className="h-4 w-4" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
