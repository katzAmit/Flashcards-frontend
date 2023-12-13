import * as React from "react";
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid';


const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'biology', label: 'Biology', checked: false },
      { value: 'history', label: 'History', checked: false },
      { value: 'geography', label: 'Geography', checked: true },
    ],
  },
  {
    id: 'difficulty',
    name: 'Difficulty',
    options: [
      { value: 'easy', label: 'Easy', checked: false },
      { value: 'medium', label: 'Medium', checked: false },
      { value: 'hard', label: 'Hard', checked: true },
    ],
  },
]

function FilterBox() {
  
  return (
    <form className="mt-2 border-t border-gray-200">
                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex items-center justify-between bg-gray px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-2 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
  );
}

export default FilterBox;
