import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { requestAdress } from '../store/adress/adressReducer';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import '../style/Map.css';

const position = [56.319976973083115, 43.981175016510726];

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({ width }) => {
    const dispatch = useDispatch();
    const { applications, download, geometry, activeAplicationIndex } = useSelector(
        (state) => state.adressReducer,
    );

    useEffect(() => {
        dispatch(requestAdress(applications[0]));
    }, []);

    const start = [
        applications[activeAplicationIndex].startX,
        applications[activeAplicationIndex].startY,
    ];
    const end = [
        applications[activeAplicationIndex].endX,
        applications[activeAplicationIndex].endY,
    ];

    return (
        <div
            className="map__container"
            style={{ width: `calc(100% - ${width}px)`, left: width + 6 + 'px' }}>
            {download ? (
                <h1>Загрузка</h1>
            ) : (
                <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="map">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={start}>
                        <Popup>Откуда</Popup>
                    </Marker>
                    <Marker position={end}>
                        <Popup>Куда</Popup>
                    </Marker>
                    <Polyline positions={geometry}></Polyline>
                </MapContainer>
            )}
        </div>
    );
};

export default Map;
