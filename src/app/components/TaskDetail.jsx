import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  setTaskCompletion,
  addTaskComment,
  setTaskGroup,
  setTaskName
} from "../store/mutations";

const TaskDetail = ({
  id,
  comments,
  task,
  isComplete,
  groups,
  setTaskCompletion,
  setTaskGroup,
  setTaskName
}) => (
  <div className="card p-3 col-6">
    <div>
      <input value={task.name} onChange={setTaskName} className="form-control form-control-lg" />
    </div>
    <div>
      <button onClick={() => setTaskCompletion(id, !isComplete)} className="btn btn-primary ml-2">
        {isComplete ? `Reopen` : `Complete`}
      </button>
    </div>
    <div className="mt-2">
      <select onChange={setTaskGroup} value={task.group} className="form-control">
        {groups.map(group => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>
    </div>
    <div>
      <Link to="/dashboard">
        <button className="btn btn-primary mt-2">Done</button>
      </Link>
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let task = state.tasks.find(task => task.id === id);
  let comments = state.comments.filter(comment => comment.task === id);
  let groups = state.groups;

  return {
    id,
    task,
    comments,
    isComplete: task.isComplete,
    groups
  };
};

function mapDispatchToProps(dispatch, ownProps) {
  let id = ownProps.match.params.id;
  return {
    setTaskCompletion(id, isComplete) {
      dispatch(setTaskCompletion(id, isComplete));
    },
    setTaskGroup(e) {
      dispatch(setTaskGroup(id, e.target.value));
    },
    setTaskName(e) {
      dispatch(setTaskName(id, e.target.value));
    }
  };
}

export const ConnectedTaskDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetail);
