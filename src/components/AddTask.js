import React, { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import { firebase } from "../firebase";
import { useSelectedProjectValue } from "../context";
import {ProjectOverlay} from "./ProjectOverlay";
import {TaskDate} from "./TaskDate";

export const AddTask = ({
    showAddTaskMain = true,
    shouldShowMain = false,
    showQuickAddTask,
    setShowQuickAddTask
}) => {
    const [task, setTask] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [project, setProject] = useState('');
    const [showMain, setShowMain] = useState(shouldShowMain);
    const [showProjectOverlay, setShowProjectOverlay] = useState(false);
    const [showTaskDate, setShowTaskDate] = useState(false);

    const { selectedProject } = useSelectedProjectValue();

    const addTask = () => {
        const projectId = project || selectedProject;
        let collatedDate = '';

        if(projectId === 'TODAY') {
            collatedDate = moment().format('DD/MM/YYYY');
        } else if(projectId === 'NEXT_7') {
            collatedDate = moment()
                .add(7, 'days')
                .format('DD/MM/YYYY')
        }

        return(
            task &&
            projectId &&
            firebase
                .firestore()
                .collection('tasks')
                .add({
                    archived: false,
                    projectId,
                    task,
                    date: collatedDate || taskDate,
                    userId: '4RcQkhwH7QWJJGNqihz9'
                })
                .then(() => {
                    setTask('');
                    setProject('');
                    setShowMain('');
                    setShowProjectOverlay(false);
                })
        )
    }

    return (
        <div className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'} >
            {showAddTaskMain && (
                <div className="add-task__shallow"
                     onClick={() => setShowMain(!showMain)}
                     onKeyDown={() => setShowMain(!showMain)}
                     tabIndex={0}
                     role="button"
                >
                    <span className="add-task__plus">+</span>
                    <span className="add-task__text">Add Task</span>
                </div>
            )}

            {(showMain || showQuickAddTask) && (
                <div className="add-task__main">
                    {showQuickAddTask && (
                        <>
                            <div>
                                <h2 className="header">Quick Add Task</h2>
                                <span
                                    className="add-task__cancel-x"
                                    onClick={() => {
                                        setShowMain(false);
                                        setShowProjectOverlay(false);
                                        setShowQuickAddTask(false);
                                    }}
                                    onKeyDown={() => {
                                        setShowMain(false);
                                        setShowProjectOverlay(false);
                                        setShowQuickAddTask(false);
                                    }}
                                    tabIndex={0}
                                    role="button"
                                >
                                    X
                                </span>
                            </div>
                        </>
                    )}
                    <ProjectOverlay
                        setProject={setProject}
                        showProjectOverlay={showProjectOverlay}
                        setShowProjectOverlay={setShowProjectOverlay}
                    />
                    <TaskDate
                        setTaskDate={setTaskDate}
                        showTaskDate={showTaskDate}
                        setShowTaskDate={setShowTaskDate}
                    />
                    <input
                        className="add-task__content"
                        value={task}
                        onChange={e => setTask(e.target.value)}
                        type="text"
                    />
                    <button
                        type="button"
                        className="add-task__submit"
                        onClick={() =>
                            showQuickAddTask
                            ? addTask() && setShowQuickAddTask(false)
                            : addTask()
                        }
                    >
                        Add Task
                    </button>
                    {!showQuickAddTask && (
                        <span
                            className="add-task__cancel"
                            onClick={() => {
                                setShowMain(false);
                                setShowProjectOverlay(false);
                            }}
                            onKeyDown={() => {
                                setShowMain(false);
                                setShowProjectOverlay(false);
                            }}
                            tabIndex={0}
                            role="button"
                        >
                            Cancel
                        </span>
                    )}
                    <span
                        className="add-task__project"
                        onClick={() => setShowProjectOverlay(!showProjectOverlay)}
                        onKeyDown={() => setShowProjectOverlay(!showProjectOverlay)}
                        tabIndex={0}
                        role="button"
                    >
                        <FaRegListAlt />
                    </span>
                    <span
                        className="add-task__date"
                        onClick={() => setShowTaskDate(!showTaskDate)}
                        onKeyDown={() => setShowTaskDate(!showTaskDate)}
                        tabIndex={0}
                        role="button"
                    >
                        <FaRegCalendarAlt />
                    </span>
                </div>
            )}
        </div>
    );
};
