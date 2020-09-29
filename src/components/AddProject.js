import React, {useState} from 'react';
import { firebase } from '../firebase';
import { generatePushId } from "../helpers";
import { useProjectsValue } from "../context";

export const AddProject = ({ shouldShow = false }) => {
    const [ show, setShow ] = useState(shouldShow);
    const [ projectName, setProjectName ] = useState('');

    const projectId = generatePushId();
    const { projects, setProjects } = useProjectsValue();

    const addProject = () => {
        projectName &&
            firebase
                .firestore()
                .collection('projects')
                .add({
                    projectId,
                    name: projectName,
                    userId: '4RcQkhwH7QWJJGNqihz9'
                })
                .then(() => {
                    setProjects([...projects]);
                    setProjectName('');
                    setShow(false);
                });
    }

    return (
        <div className="add-project">
            {show && (
                <div className="add-project__input">
                    <input
                        value={projectName}
                        onChange={e=> setProjectName(e.target.value)}
                        className="add-project__name"
                        placeholder="Enter your name"
                        type="text"
                    />
                    <button
                        className="add-project__submit"
                        type="button"
                        onClick={() => addProject()}
                    >
                        Add Project
                    </button>
                    <span
                        className="add-project__cancel"
                        onClick={() => setShow(false)}
                        onKeyDown={() => setShow(false)}
                        tabIndex={0}
                        role="button"
                    >
                        Cancel
                    </span>
                </div>
            )}
            <span className="add-project__plus">+</span>
            <span
                className="add-project__text"
                onClick={() => setShow(!show)}
                onKeyDown={() => setShow(!show)}
                tabIndex={0}
                role="button"
            >
                Add Project
            </span>
        </div>
    );
};
