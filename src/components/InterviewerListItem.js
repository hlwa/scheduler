import React from "react";
import classNames from "classnames";
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {

  const itemClass = classNames('interviewers__item',{"--selected":props.selected});


  // const formatSpots = (spot) => {
  //   if (spot === 0 ) {
  //     return "no spots remaining";
  //   } else if (spot === 1) {
  //     return "1 spot remaining";
  //   } else {
  //     return `${spot} spots remaining`
  //   }
  // };
  return (
    <li className={itemClass.split(' ').join('')} onClick={() => props.setInterviewer(props.id)}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>
  );
}