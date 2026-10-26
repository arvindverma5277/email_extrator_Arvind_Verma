
/* ========================================
   DISASTER RELIEF MAP
   Step 6: Sample emergency resource data
   All records below are fictional demo data.
   ======================================== */

const emergencyResources = [
    {
        id: 1,
        name: "Demo City Hospital",
        category: "hospital",
        latitude: 23.2599,
        longitude: 77.4126,
        address: "Sample Address 1, Bhopal",
        phone: "0000000001",
        description: "Demonstration medical facility.",
        available: true
    },
    {
        id: 2,
        name: "Demo Emergency Shelter",
        category: "shelter",
        latitude: 23.2650,
        longitude: 77.4050,
        address: "Sample Address 2, Bhopal",
        phone: "0000000002",
        description: "Demonstration temporary shelter.",
        available: true
    },
    {
        id: 3,
        name: "Demo Food Distribution Center",
        category: "food",
        latitude: 23.2500,
        longitude: 77.4250,
        address: "Sample Address 3, Bhopal",
        phone: "0000000003",
        description: "Demonstration food and water center.",
        available: true
    },
    {
        id: 4,
        name: "Demo Relief Camp",
        category: "relief",
        latitude: 23.2700,
        longitude: 77.4300,
        address: "Sample Address 4, Bhopal",
        phone: "0000000004",
        description: "Demonstration relief support camp.",
        available: true
    },
    {
        id: 5,
        name: "Demo Community Hospital",
        category: "hospital",
        latitude: 23.2450,
        longitude: 77.4000,
        address: "Sample Address 5, Bhopal",
        phone: "0000000005",
        description: "Demonstration healthcare facility.",
        available: false
    },
    {
        id: 6,
        name: "Demo Water Supply Point",
        category: "food",
        latitude: 23.2800,
        longitude: 77.4150,
        address: "Sample Address 6, Bhopal",
        phone: "0000000006",
        description: "Demonstration drinking water point.",
        available: true
    },
    {
        id: 7,
        name: "Demo Community Shelter",
        category: "shelter",
        latitude: 23.2400,
        longitude: 77.4200,
        address: "Sample Address 7, Bhopal",
        phone: "0000000007",
        description: "Demonstration community shelter.",
        available: false
    },
    {
        id: 8,
        name: "Demo Relief Support Center",
        category: "relief",
        latitude: 23.2550,
        longitude: 77.3900,
        address: "Sample Address 8, Bhopal",
        phone: "0000000008",
        description: "Demonstration emergency relief center.",
        available: true
    }
];

console.log(
    "Sample emergency resources loaded:",
    emergencyResources.length
);
