import React, {useEffect} from "react";

import { Checkbox } from "./Checkbox";
import { useTasks } from "../hooks";
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from "../helpers";
import { useSelectedProjectValue, useProjectsValue } from "../context";
import {AddTask} from "./AddTask";

export const Tasks = () => {
    const { selectedProject } = useSelectedProjectValue();
    const { projects } = useProjectsValue();
    const { tasks } = useTasks(selectedProject);

    let projectName = '';

    if(projects && projects.length > 0 && selectedProject && !collatedTasksExist(selectedProject)) {
        projectName = getTitle(projects, selectedProject).name;
    }

    if(collatedTasksExist(selectedProject) && selectedProject) {
        projectName = getCollatedTitle(collatedTasks, selectedProject).name;
    }

    console.log(tasks)

    useEffect(() => {
        document.title = `${projectName}: Todolist`;
    }, [])

    return (
        <div className="tasks">
            <h2>{projectName}</h2>

            <ul className="tasks__list">
                {tasks.map(task => (
                    <li key={`${task.id}`}>
                        <Checkbox id={task.id} />
                        <span>{task.task}</span>
                    </li>
                ))}
            </ul>
            <AddTask />
        </div>
    );
};
