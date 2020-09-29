import React, {useState} from 'react';

import { Header } from "./components/layout/Header";
import {Content} from "./components/layout/Content";
import { ProjectsProvider, SelectedProjectProvider } from "./context";

import './App.scss';

export const App = ({ darkModeDefault = false }) => {
    const [ darkMode, setDarkMode ] = useState(darkModeDefault);

    return (
        <SelectedProjectProvider>
            <ProjectsProvider>
                <main
                    className={darkMode ? 'darkmode' : undefined }
                >
                    <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
                    <Content/>
                </main>
            </ProjectsProvider>
        </SelectedProjectProvider>
    );
};
