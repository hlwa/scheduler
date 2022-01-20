import React from "react";
import classNames from "classnames";
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {

  const itemClass = classNames('interviewers__item',{"--selected":props.selected});

  return (
    <li className={itemClass.split(' ').join('')} onClick={props.setInterviewer}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>
  );
}