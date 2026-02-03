import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { Home } from './pages/Home';
import { History } from './pages/History';
import './styles/global.css';
import './styles/theme.css';

export function App() {
    return (
        <TaskContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/history" element={<History />} />
                </Routes>
            </BrowserRouter>
        </TaskContextProvider>
    );
}