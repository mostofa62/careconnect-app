"use client"; // Ensure this component runs on the client side
import React, { useState, useRef, useEffect, useCallback } from "react";
import Select from "react-select";
import debounce from "lodash.debounce";
import axios from "axios";
import {useField} from 'formik';
import useOutsideClick from "../hooks/useOutsideClick";

interface SelectProps{
    urlSuffix:string;
    fetchLimit:number;
    defaultValueOptions:any,
    placeholder:string,
    name:string,
    isMulti? :boolean,
    isClearable?:boolean,
    isSearchable?:boolean,
    onParentChange:(value:any,name:any)=>void
  }

interface OptionType {
  label: string;
  value: string;
}

const customStyles = {
    control: (provided:any, state:any) => ({
      ...provided,
      boxShadow: 'none',    
      borderColor: state.isFocused ? '#0a4a82' : '#DFDFDF', // Change the border color here
      
      '&:hover': {
        borderColor: state.isFocused ? '#0a4a82' : '#DFDFDF', // Change the border color on hover
      },

      margin: 0, // Remove default margin
      padding: 0, // Remove default padding
    }),
    input: (provided:any) => ({
      ...provided,
      boxShadow: 'none', // Remove the outline from the input element
      margin: 0, // Remove default margin
      padding: 0, // Remove default padding
    }),
    singleValue: (provided:any) => ({
      ...provided,
      ...provided,
    margin: 0, // Remove margin
    padding: 0, // Remove padding
    lineHeight: 1, // Adjust line height to remove extra space
    display: 'flex',
    alignItems: 'center',
    }),
    placeholder: (provided:any) => ({
      ...provided,
      margin: 0, // Remove default margin
      padding: 0, // Remove default padding
    }),
    menu: (provided:any) => ({
      ...provided,
      margin: 0, // Remove default margin
      padding: 0, // Remove default padding
    }),
};

const RemoteSelect = ({
    urlSuffix,
    fetchLimit,
    defaultValueOptions,
    placeholder,
    name,
    isMulti,
    isClearable,
    isSearchable,
    onParentChange

}:SelectProps) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const cacheRef = useRef<{ [key: string]: OptionType[] }>({}); // Cache to store fetched results
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [field, state, { setValue, setTouched }] = useField(name);

  const selectRef = useRef<HTMLDivElement>(null);

  // Function to fetch options based on the query
  const fetchOptions = useCallback(async (inputValue: string="", page: number = 1) => {
    setLoading(true);

    // Check if we have cached results for this query
    if (cacheRef.current[inputValue]) {
        setOptions(cacheRef.current[inputValue]);
        setLoading(false);
        return;
    }

    try {
      const response = await axios.get(`${urlSuffix}`, {
        params: { query: inputValue, page, limit: fetchLimit } // Adjust limit as needed
      });

        if (response.data) {
            const data = response.data.list;

            const formattedOptions = data.map((item: any) => ({
            label: item.label,  // Use `name` field as label
            value: item.value,
            displayLabel: item.displayLabel          
            }));

            //console.log(formattedOptions);

            // Cache and set options
            cacheRef.current[inputValue] = formattedOptions;
            setOptions(formattedOptions);
        }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  },[urlSuffix, fetchLimit]);
  
  useEffect(() => {
    // Fetch the last 5 items by default when the component mounts
    fetchOptions(""); // Empty query to fetch default data
  }, [fetchOptions]);

  const handleInputChange = debounce((inputValue: string) => {
    if (inputValue.length > 2) { // Fetch when input has more than 2 characters
      fetchOptions(inputValue);
    }
  }, 500); // Debounce to avoid too many requests
  
  const handleClearCache = (inputValue: string) => {
    if (cacheRef.current[inputValue]) {
      delete cacheRef.current[inputValue];
    }
  };

  // Adding a key prop to force re-render when options change
  const selectKey = options.map(option => option.value).join(",");
  
  const handleMenuOpen = () => {
    setMenuIsOpen(true);
    fetchOptions(); // Fetch options when menu opens
  };

  const handleMenuClose = () => {
    setMenuIsOpen(false);
    //handleClearCache("");
  };

  const closeMenu  = ()=>{
    setMenuIsOpen(false);
    //setValue(defaultValueOptions)
    //alert('its fired')
  }

  // Use the custom hook to detect clicks outside
  useOutsideClick(selectRef, closeMenu);

  const handleSelectChange = (value:any, action:any, extraParameter:any) => {

    setTouched(true)
    if(action.action == 'clear'){
      //alert(JSON.stringify(extraParameter))          
      setValue(defaultValueOptions)
      onParentChange(defaultValueOptions,action.name)
      handleClearCache("");
    }else{
      setValue(value)
      onParentChange(value,action.name)
    }
    setMenuIsOpen(false);
   
  };

  // Create a wrapper function to pass extraParameter
  const handleChangeWrapper = (value:any, action:any) => {
    handleSelectChange(value, action, defaultValueOptions);
  };
  
  // Custom component for displaying options
    const customSingleValue = ({ data }:any) => (
      <div style={{ margin: 0, padding: 0, lineHeight: '1' }}>{data.label}</div>
    );

  return (
    <div ref={selectRef}>
      {/*JSON.stringify(defaultValueOptions)*/}
    <Select
      
      key={selectKey}      
      styles={customStyles}
      defaultValue={defaultValueOptions}
      placeholder={placeholder||"Type to search"}      
      isMulti={isMulti || false}
      isClearable={isClearable || false}
      isSearchable={isSearchable || false}


      name={name}
      options={options}
      onInputChange={handleInputChange}
      isLoading={loading}
      onChange={handleChangeWrapper}
      onBlur={closeMenu}
      onMenuOpen={handleMenuOpen}
      onMenuClose={handleMenuClose}
      menuIsOpen={menuIsOpen} // Control menu visibility

      //getOptionLabel={(option) => option.label}
      getOptionLabel={option => option.displayLabel}
      getOptionValue={(option) => option.value}
      formatOptionLabel={option => <span>{option.displayLabel}</span>}
      components={{ SingleValue: customSingleValue }}
      
      // Optionally, you can include a custom `formatOptionLabel` if you want to format the dropdown item further
    />
    </div>
  );
};

export default RemoteSelect;
