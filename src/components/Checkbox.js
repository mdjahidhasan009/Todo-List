import React from "react";
import { firebase } from "../firebase";

export const Checkbox = ({ id }) => {
    const archiveTask = () => {
        firebase
            .firestore()
            .collection('tasks')
            .doc(id)
            .update({
                archived: true
            });
    };

    return (
        <div className="checkbox-holder"
             onClick={() => archiveTask()}
             onKeyDown={() => archiveTask()}
             role="button"
             tabIndex={0}
        >
            <span className="checkbox" />
        </div>
    );
};
