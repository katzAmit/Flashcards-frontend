import * as React from "react";

function CategorySelector(){
const options = ['names', 'italy'];
    return(
        <select style={{ height: "50px", fontSize: "16px" }}>
              <option value="">Choose category</option>
              {options.map((option) => (
                <option value={option}>
                  {option}
                </option>
            ))}
        </select>
    );
}

export default CategorySelector;
