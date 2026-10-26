
/* ==========================================
   DISASTER RELIEF MAP
   Step 10: Interactive Resource Cards
   All resources are fictional demo records.
   ========================================== */

if (typeof L === "undefined") {
    console.error("Leaflet is not loaded. Check your internet connection.");
} else if (typeof emergencyResources === "undefined") {
    console.error("Resource data is missing. Check data.js.");
} else {
    // Create the map.
    const map = L.map("map").setView([23.2599, 77.4126], 12);

    // Add OpenStreetMap tiles.
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">' +
            "OpenStreetMap contributors</a>"
    }).addTo(map);

    // Get the HTML elements.
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const resultCount = document.getElementById("resultCount");
    const resourceCards = document.querySelectorAll(".resource-card");

    // Store all map markers.
    const markerRecords = [];

    // Get a marker color for each category.
    function getMarkerColor(category) {
        switch (category) {
            case "hospital":
                return "#dc2626";
            case "shelter":
                return "#2563eb";
            case "food":
                return "#16a34a";
            case "relief":
                return "#9333ea";
            default:
                return "#475569";
        }
    }

    // Convert category codes into readable names.
    function getCategoryName(category) {
        const categories = {
            hospital: "Hospital",
            shelter: "Emergency Shelter",
            food: "Food and Water Center",
            relief: "Relief Camp"
        };

        return categories[category] || "Emergency Resource";
    }

    // Create a colored marker icon.
    function createMarkerIcon(category) {
        const color = getMarkerColor(category);

        return L.divIcon({
            className: "custom-map-marker",
            html:
                '<div style="' +
                "background:" + color + ";" +
                "width:20px;" +
                "height:20px;" +
                "border:3px solid white;" +
                "border-radius:50%;" +
                "box-shadow:0 1px 5px rgba(0,0,0,0.45);" +
                '"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10],
            popupAnchor: [0, -10]
        });
    }

    // Create markers and information popups.
    emergencyResources.forEach(function (resource) {
        const marker = L.marker(
            [resource.latitude, resource.longitude],
            { icon: createMarkerIcon(resource.category) }
        );

        const popup = document.createElement("div");

        const title = document.createElement("strong");
        title.textContent = resource.name;
        popup.appendChild(title);

        const details = [
            ["Category", getCategoryName(resource.category)],
            ["Address", resource.address],
            ["Phone", resource.phone],
            [
                "Status",
                resource.available
                    ? "Demo: Available"
                    : "Demo: Unavailable"
            ],
            ["Information", resource.description]
        ];

        details.forEach(function (detail) {
            const paragraph = document.createElement("p");
            paragraph.style.margin = "5px 0";

            const label = document.createElement("strong");
            label.textContent = detail[0] + ": ";

            paragraph.appendChild(label);
            paragraph.appendChild(
                document.createTextNode(detail[1])
            );

            popup.appendChild(paragraph);
        });

        const warning = document.createElement("small");
        warning.textContent =
            "Fictional demo record. Not verified for real emergencies.";
        warning.style.color = "#b45309";
        popup.appendChild(warning);

        marker.bindPopup(popup);

        markerRecords.push({
            marker: marker,
            resource: resource
        });
    });

    // Search and filter resources.
    function filterResources() {
        const searchText = searchInput.value.trim().toLowerCase();
        const selectedCategory = categoryFilter.value;
        const matchingLocations = [];

        let visibleCount = 0;

        markerRecords.forEach(function (record) {
            const resource = record.resource;
            const marker = record.marker;

            const matchesName =
                resource.name.toLowerCase().includes(searchText);

            const matchesCategory =
                selectedCategory === "all" ||
                resource.category === selectedCategory;

            if (matchesName && matchesCategory) {
                if (!map.hasLayer(marker)) {
                    marker.addTo(map);
                }

                visibleCount++;

                matchingLocations.push([
                    resource.latitude,
                    resource.longitude
                ]);
            } else {
                if (map.hasLayer(marker)) {
                    map.removeLayer(marker);
                }
            }
        });

        // Update the result count.
        resultCount.textContent =
            "Showing " + visibleCount + " of " +
            emergencyResources.length + " sample resources.";

        // Zoom to matching locations.
        if (matchingLocations.length === 1) {
            map.setView(matchingLocations[0], 14);
        } else if (matchingLocations.length > 1) {
            map.fitBounds(matchingLocations, {
                padding: [30, 30],
                maxZoom: 14
            });
        }
    }

    // When a category card is clicked, select its category.
    function selectCategory(category) {
        categoryFilter.value = category;
        filterResources();

        // Scroll down to the map.
        document.getElementById("map-section").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    // Make every resource card clickable.
    resourceCards.forEach(function (card) {
        card.addEventListener("click", function () {
            selectCategory(card.dataset.category);
        });

        // Also allow keyboard users to activate cards.
        card.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectCategory(card.dataset.category);
            }
        });
    });

    // Update results when the user types or changes the dropdown.
    searchInput.addEventListener("input", filterResources);
    categoryFilter.addEventListener("change", filterResources);

    // Show all resources when the page opens.
    filterResources();

    console.log(
        "Disaster Relief Map loaded with " +
        emergencyResources.length +
        " sample resources."
    );
}
