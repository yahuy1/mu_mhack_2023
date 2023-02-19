import React, { useState } from 'react';
import { selectOptions } from './Data';
import Select from "react-select";

const SelectBar = () => {
    const customStyles = {
        control: (base, state) => ({
            ...base,
            background: "#0a0a23",
            border: 0,
            boxShadow: 'none'
        }),
        menu: base => ({
            ...base,
            marginTop: 0
        }),
        menuList: base => ({
            ...base,
            background: "#adaded",
            color: 'black',
            padding: 0
        }),
        input: base => ({
            ...base,
            color: 'white',
          }),
    };

    const [skills, setSkills] = useState([]);
    const handleSkillsChange = (selected) => {
        setSkills(selected);
    };

    return (
        <Select
            isSearchable
            styles={customStyles}
            isMulti
            options={selectOptions}
            onChange={handleSkillsChange}
            value={skills}
        />
    );
};

export default SelectBar;