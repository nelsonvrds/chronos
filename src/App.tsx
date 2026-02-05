import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { Home } from './pages/Home';
import { History } from './pages/History';
import { AboutPomodoro } from './pages/AboutPomodoro';
import { NotFound } from './pages/NotFound';
import { Settings } from './pages/Settings';
import './styles/global.css';
import './styles/theme.css';

export function App() {
    return (
        <TaskContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/como-funciona" element={<AboutPomodoro />} />
                    <Route path="/configuracoes" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TaskContextProvider>
    );
}