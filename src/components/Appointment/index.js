import React from "react";
import Header from "components/Header";
import Show from './Show';
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = 'SAVING';
  const DELETE = 'DELETE';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';
  const initial = props.interview ? SHOW : EMPTY;
  const { mode, transition, back } = useVisualMode(initial);
  const StatusMode = (mode) => mode === SAVING && <Status message={'Saving'} />;
  const DeleteMode = (mode) => mode === DELETE && <Status message={'Deleting'} />;
  const ConfirmMOde = (mode) => mode === CONFIRM && <Confirm message={'Are you sure to delete?'} onConfirm={deleteSth} onCancel={() => back(SHOW)}/>;
  const errorSaveMode = (mode) => mode === ERROR_SAVE && <Error message={'Save failed'} onClose={back}/>;
  const errorDeleteMode = (mode) => mode === ERROR_DELETE && <Error message={'Delete failed'} onClose={() => transition(SHOW)}/>;
  const format = (time) => time ? <Header time = {props.time}/> : `No Appointments`;
  const EmptyMode = (mode) => mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />;


  const deleteSth= () => {
    transition(DELETE);

    props.cancelInterview(props.id)
    .then(()=>transition(EMPTY))
    .catch((error)=>transition(ERROR_DELETE, true));
  };

  const ShowMode = (mode) => (mode === SHOW) && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={() => transition(CONFIRM)}
      onEdit={() => transition(EDIT)}
    />
  );

  const save = (name, interviewer) =>{
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

  props.bookInterview (props.id, interview)
    .then(() => transition(SHOW))
    .catch((error)=>transition(ERROR_SAVE, true))
  };


  const CreateMode = (mode) => mode === CREATE && (
    <Form
      interviewers={props.interviewers}
      onCancel={() => back(EMPTY)}
      onSave={save}
    />
  );

  const EditMode = (mode) => mode === EDIT && (
    <Form
      student={props.interview.student}
      interviewer={props.interview.interviewer.id}
      interviewers={props.interviewers}
      onCancel={() => back(SHOW)}
      onSave={save}
    />
  );


  return (
    <article className="appointment">
      {format(props.time)}
      {EmptyMode(mode)}
      {ShowMode(mode)}
      {CreateMode(mode)}
      {StatusMode(mode)}
      {DeleteMode(mode)}
      {ConfirmMOde(mode)}
      {EditMode(mode)}
      {errorSaveMode(mode)}
      {errorDeleteMode(mode)}
      </article>
  )};