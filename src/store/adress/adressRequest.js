export const requestRouteData = async (coordinate) => {
    const response = await fetch('https://catalog.api.2gis.com/get_pairs/1.0/car?key=ruzojf8309', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            points: [
                {
                    lon1: coordinate.startY,
                    lat1: coordinate.startX,
                    lon2: coordinate.endY,
                    lat2: coordinate.endX,
                },
            ],
            type: 'jam',
            output: 'full',
        }),
    });
    const data = await response.json();
    const geometry = data[0].route;
    const routeCoordinate = geometry.slice(11, -1).replace(/,/g, ' ').split(' ');
    const routeCoodinateArray = [];
    for (let index = 1; index < routeCoordinate.length; index = index + 2) {
        routeCoodinateArray.push([routeCoordinate[index], routeCoordinate[index - 1]]);
    }
    return routeCoodinateArray;
};
