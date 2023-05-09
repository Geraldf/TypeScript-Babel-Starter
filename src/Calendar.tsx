import React, { MouseEvent, useState } from "react";
import { range } from './utils';
import moment from 'moment';
import Month from './Month';

type CalendarProps = {
    dayClicked: (e: MouseEvent) => void;
    dayHovered: (e: MouseEvent) => void;
    useIsoWeekday:boolean;
    firstDayOfWeek:number;
    forceFullWeeks:boolean;
    showWeekSeparators:boolean;
}


export default function Calendar(props: CalendarProps) {
    const months:number[] = range(0, 12);
    const [selectingRange, useSelectingRange] = useState([undefined]);
    
    const dayHovered = (hoveredDay) =>{
        if (!hoveredDay) {
          // clicked on prev or next month
          return;
        }
    
        const selRange = selectingRange;
    
        if (selRange) {
            useSelectingRange[1] = hoveredDay;
        }
      }

      const dayClicked=(date, classes)=> {
        if (!date) {
          // clicked on prev or next month
          return;
        }
    
        let { selectingRange } = this.state;
        const { selectRange, onPickRange, onPickDate } = this.props;
    
        if (!selectRange) {
          if (onPickDate instanceof Function) {
            onPickDate(date, classes);
          }
          return;
        }
    
        if (!selectingRange) {
          selectingRange = [date, date];
        } else {
          if (onPickRange instanceof Function) {
            if (selectingRange[0] > date) {
              onPickRange(date, selectingRange[0]);
            } else {
              onPickRange(selectingRange[0], date);
            }
          }
          selectingRange = undefined;
        }
    
        this.setState({
          selectingRange
        });
      }

      const renderDaysOfWeek=()=> {
        const { useIsoWeekday, firstDayOfWeek, forceFullWeeks, showWeekSeparators } = props;
        const totalDays = forceFullWeeks ? 42 : 37;
    
        const days:any= [];
        range(firstDayOfWeek, totalDays + firstDayOfWeek).forEach(i => {
          const momentDay = useIsoWeekday ? moment().isoWeekday(i) : moment().weekday(i);
          const day = momentDay.format('ddd').charAt(0);
    
          if (showWeekSeparators) {
            if (i % 7 === firstDayOfWeek && days.length) {
              // push week separator
              days.push(<th className="week-separator" key={`seperator-${i}`} />);
            }
          }
          days.push(
            <th key={`weekday-${i}`} className={i % 7 === 0 ? 'bolder' : ''}>
              {day}
            </th>
          );
        });
    
        return (
          <tr>
            <th>&nbsp;</th>
            {days}
          </tr>
        );
      }   
  return (
    <>
    { months.map(month => (
        <Month  key={`month-${month}`}
        dayClicked={dayClicked}
        dayHovered={dayHovered}
        {...this.props}
        selectingRange={selectingRange}/>
    ))}
     </>
  )
}