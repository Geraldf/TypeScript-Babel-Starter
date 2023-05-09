import React, {  MouseEvent } from "react";
import  { Moment } from "moment";



 const Day:React.FC<DayProps>   = (props) =>{
    const { classes, day, title ,dayClicked, dayHovered} = props;
    return (
        <td
          onClick={dayClicked}
          onMouseEnter={dayHovered}
          className={classes}
          title={title}
        >
          <span className="day-number">{day === null ? "" : day.date()}</span>
        </td>
    );
};
export default Day;

