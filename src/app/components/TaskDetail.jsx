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
  <div>
    <div>
      <input value={task.name} onChange={setTaskName} />
    </div>
    <div>
      <button onClick={() => setTaskCompletion(id, !isComplete)}>
        {isComplete ? `Reopen` : `Complete`}
      </button>
    </div>
    <div>
      <select onChange={setTaskGroup} value={task.group}>
        {groups.map(group => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>
    </div>
    <div>
      <Link to="/dashboard">
        <button>Done</button>
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
