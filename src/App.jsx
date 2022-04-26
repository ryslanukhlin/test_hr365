import { useState } from 'react';
import ListAdresses from './component/List';
import Map from './component/Map';

import 'leaflet/dist/leaflet.css';
import 'antd/dist/antd.min.css';
import './App.css';

const App = () => {
    const [drag, setDrag] = useState({
        active: false,
        x: '',
    });
    const [width, setWidth] = useState(800);
    const startResize = (e) => {
        setDrag({
            active: true,
            x: e.clientX,
        });
    };

    const resizeFrame = (e) => {
        const { active, x } = drag;
        if (active) {
            const xDiff = Math.abs(x - e.clientX);
            const newW = x > e.clientX ? width - xDiff : width + xDiff;

            if (newW <= 300 || newW >= window.innerWidth / 1.5) {
                return stopResize();
            }
            setDrag({ ...drag, x: e.clientX });
            setWidth(newW);
        }
    };

    const stopResize = () => {
        setDrag({ ...drag, active: false });
    };

    return (
        <div className="app__wrapper" onMouseMove={resizeFrame} onMouseUp={stopResize}>
            <ListAdresses width={width} />
            <div className="borderResizeWidth" onMouseDown={startResize} />
            <Map width={width} />
        </div>
    );
};

export default App;
