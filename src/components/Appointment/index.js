import React from "react";
import Header from "components/Header";
import Show from './Show';
import Empty from "./Empty";

import "./styles.scss";

export default function Appointment(props) {

  const format = (time) => time ? <Header time = {props.time}/> : `No Appointments`;
  const showOrEmpty = () => props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty /> ;

  return (
    <article className="appointment">
      {format(props.time)}
      {showOrEmpty()}
      </article>
  )};