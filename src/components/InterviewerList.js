import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import 'components/InterviewerList.scss'

export default function InterviewerList(props) {
  const interviewers = props.interviewers;
  // console.log(interviewers);
  return (

  <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
    {interviewers.map((interviewer) => 
     <InterviewerListItem
     key={interviewer.id}
     id={interviewer.id}
     name={interviewer.name} 
     avatar={interviewer.avatar} 
    //  value or props.value
     selected={interviewer.id === props.value}
     setInterviewer={() => props.onChange(interviewer.id)}  
   />
    )}
  </ul>
</section>
  )};