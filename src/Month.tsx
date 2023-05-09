import React, { MouseEvent } from "react";
import moment, { Moment, MomentInput } from "moment";
import Day from "./Day";
import { range } from "./utils";
import { MonthProps, DayProps } from "../../hoster/src/components/Types";

const Spacer = (i: number) => {
  <td className="week-separator" key={`seperator-${i}`} />;
};

export default function Month(props: MonthProps): React.FC {
  const {
    year,
    month,
    forceFullWeeks,
    showWeekSeparators,
    selectedDay,
    firstDayOfWeek,
    selectingRange,
    selectRange,
    selectedRange,
    customClasses,
    titles,
    dayClicked,
    dayHovered,
  } = props;
  const monthStart = moment([year, month, 1]); // current day

  // number of days to insert before the first of the month to correctly align the weekdays
  let prevMonthDaysCount = monthStart.weekday();
  while (prevMonthDaysCount < firstDayOfWeek) {
    prevMonthDaysCount += 7;
  }
  // days in month
  const numberOfDays = monthStart.daysInMonth();
  // insert days at the end to match up 37 (max number of days in a month + 6)
  // or 42 (if user prefers seeing the week closing with Sunday)
  const totalDays = forceFullWeeks ? 42 : 37;

  // day-generating loop
  const days: any = [];
  range(firstDayOfWeek + 1, totalDays + firstDayOfWeek + 1).forEach((i) => {
    const day = moment([year, month, i - prevMonthDaysCount]);

    // pick appropriate classes
    const classes: string[] = [];
    const title = titles instanceof Function ? titles(day) : undefined;
    if (i <= prevMonthDaysCount) {
      classes.push("prev-month");
    } else if (i > numberOfDays + prevMonthDaysCount) {
      classes.push("next-month");
    } else {
      if (selectRange) {
        // selectingRange is used while user is selecting a range
        // (has clicked on start day, and is hovering end day - but not yet clicked)
        let start = (selectingRange || selectedRange)[0];
        let end = (selectingRange || selectedRange)[1];

        // validate range
        if (end.isBefore(start)) {
          [end, start] = selectingRange || selectedRange;
        }

        if (day.isBetween(start, end, "day", "[]")) {
          classes.push("range");
        }

        if (day.isSame(start, "day")) {
          classes.push("range-left");
        }

        if (day.isSame(end, "day")) {
          classes.push("range-right");
        }
      } else if (day.isSame(selectedDay, "day")) {
        classes.push("selected");
      }

      // call here customClasses function to avoid giving improper classes to prev/next month
      if (customClasses instanceof Function) {
        classes.push(customClasses(day));
      }
    }

    if ((i - 1) % 7 === 0) {
      // sunday
      classes.push("bolder");
    }

    if (customClasses) {
      Object.keys(customClasses).forEach((k) => {
        const obj: any = customClasses[k as keyof TCustomClasses];
        // Order here is important! Everything is instance of Object in js
        if (typeof obj === "string") {
          if (obj.indexOf(day.format("ddd")) > -1) {
            classes.push(k);
          }
        } else if (obj instanceof Array) {
          obj.forEach((d) => {
            if (day.format("YYYY-MM-DD") === d) classes.push(k);
          });
        } else if (obj instanceof Function) {
          if (obj(day)) {
            classes.push(k);
          }
        } else if (obj.start && obj.end) {
          const startDate = moment(obj.start, "YYYY-MM-DD").add(-1, "days");
          const endDate = moment(obj.end, "YYYY-MM-DD").add(1, "days");
          if (day.isBetween(startDate, endDate)) {
            classes.push(k);
          }
        }
      });
    }

    if (showWeekSeparators) {
      if ((i - 1) % 7 === firstDayOfWeek && days.length) {
        // push week separator
        days.push(<td className="week-separator" key={`seperator-${i}`} />);
      }
    }
    days.push(
      <Day
        key={`day-${i}`}
        day={day.isValid() ? day : null}
        classes={classes.join(" ")}
        dayClicked={dayClicked}
        dayHovered={dayHovered}
        title={title}
      />
    );
  });

  return days;
}
