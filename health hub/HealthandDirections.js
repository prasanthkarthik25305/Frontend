window.onload = function() {
    console.log("Initializing Map...");

    let mapElement = document.getElementById("map");
    console.log("Map element:", mapElement); // Debugging log

    if (!mapElement) {
        console.error("Error: #map div not found!");
        return;
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;

            let map = new google.maps.Map(mapElement, { center: { lat, lng }, zoom: 15 });

            let service = new google.maps.places.PlacesService(map);
            service.nearbySearch(
                { location: { lat, lng }, radius: 5000, type: ['hospital'] },
                (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        let hospitalList = document.getElementById('hospitalList');
                        hospitalList.innerHTML = '';

                        results.forEach(hospital => {
                            let li = document.createElement('li');
                            li.className = 'list-group-item';
                            li.innerHTML = `<strong>${hospital.name}</strong> <br> 
                                <a href="https://www.google.com/maps/search/?api=1&query=${hospital.geometry.location.lat()},${hospital.geometry.location.lng()}" target="_blank">
                                    View Directions
                                </a>`;
                            hospitalList.appendChild(li);
                        });
                    }
                }
            );
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
};
