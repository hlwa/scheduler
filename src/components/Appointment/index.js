import React from "react";
import Header from "components/Header";
import Show from './Show';
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = 'SAVING';
  const initial = props.interview ? SHOW : EMPTY;
  const { mode, transition, back } = useVisualMode(initial);
  const StatusMode = (mode) => mode === SAVING && <Status message={'Saving'} />;
  
  const format = (time) => time ? <Header time = {props.time}/> : `No Appointments`;
  const EmptyMode = (mode) => mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />;

  const ShowMode = (mode) => mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
    />
  );
  const CreateMode = (mode) => mode === CREATE && (
    <Form
      interviewers={props.interviewers}
      onCancel={() => back(EMPTY)}
      onSave={save}
    />
  );

  const save = (name, interviewer) =>{
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview (props.id, interview, transition(SHOW));////--------->Pessimistic
    // transition(SHOW)//------>Optimistic
  }

  return (
    <article className="appointment">
      {format(props.time)}
      {EmptyMode(mode)}
      {ShowMode(mode)}
      {CreateMode(mode)}
      {StatusMode(mode)}
      </article>
  )};