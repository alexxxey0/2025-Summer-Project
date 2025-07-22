import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function FilterDropdownButton(props) {
    const [valuesVisible, setValuesVisible] = useState(false);

    function toggleValues() {
        setValuesVisible(!valuesVisible);
    }

    return (
        <div className="flex flex-col gap-y-2">
            <div onClick={toggleValues} className="flex flex-row items-center gap-x-2 cursor-pointer hover:bg-gray-200 p-1 rounded">
                {valuesVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
                <p>{props.title}</p>
            </div>

            {valuesVisible && <div>
                {props.values.map(value =>
                    <div key={value} className="flex flex-row gap-x-2 items-center">
                        <input type="checkbox" className="filter_checkbox" data-column={props.column} name={value} id={value} value={value} onClick={props.onCheckboxSelection} />
                        <label htmlFor={value}>{value}</label>
                    </div>
                )}
            </div>}
        </div>
    );
}

export default FilterDropdownButton;