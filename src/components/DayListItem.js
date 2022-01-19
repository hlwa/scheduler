import React from "react";
import classNames from "classnames";
import 'components/DayListItem.scss';

export default function DayListItem(props) {

  const dayClass = classNames('day-list__item',{"--selected":props.selected,"--full":props.spots === 0
  });

  const formatSpots = (spot) => {
    if (spot === 0 ) {
      return "no spots remaining";
    } else if (spot === 1) {
      return "1 spot remaining";
    } else {
      return `${spot} spots remaining`
    }
  };

  // console.log(dayClass.split(' ').join(''));
  return (
    <li onClick={() => props.setDay(props.name)} className = {dayClass.split(' ').join('')}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}