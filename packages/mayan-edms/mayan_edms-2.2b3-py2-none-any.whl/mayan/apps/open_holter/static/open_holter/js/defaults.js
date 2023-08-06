'use strict';

var chartTitle = 'Gráfica';
var projectSocialText = 'Chequea este proyecto de movimientos aereos de pasajeros de Puerto Rico @EstadisticasPR';
var projectURL = 'http://projects.crypticocorp.com/aviation-intelligence/';
var serverURL = 'http://127.0.0.1:9200';
var seriesDefaultColor = '#066265';

var puertoRicoAirports = [
    'Aguadilla, PR: Rafael Hernandez',
    'Arecibo, PR: Antonio/Nery/Juarbe Pol',
    'Ceiba, PR: Jose Aponte de la Torre',
    'Ceiba, PR: Roosevelt Roads NAS',
    'Culebra, PR: Benjamin Rivera Noriega',
    'Dorado, PR: Dorado Airport',
    'Fajardo, PR: Diego Jimenez Torres',
    'Humacao, PR: Dr Hermenegildo Ortiz Quinones',
    'Humacao, PR: Palmas del Mar Airstrip',
    'Mayaguez, PR: Eugenio Maria de Hostos',
    'Ponce, PR: Mercedita',
    'San Juan, PR: Isla Grande',
    'San Juan, PR: Luis Munoz Marin International',
    'Vieques, PR: Antonio Rivera Rodriguez'
];

var puertoRicoCities = [
    'Aguadilla, PR', 'Aguada, PR', 'Isabela, PR', 'Moca, PR', 'Rincón, PR',
    'Arecibo, PR', 'Camuy, PR', 'Hatillo, PR', 'Quebradillas, PR', 'Bayamón, PR',
    'Cataño, PR', 'Guaynabo, PR', 'Caguas, PR', 'Aguas Buenas, PR', 'Gurabo, PR', 
    'Juncos, PR', 'San Lorenzo, PR', 'Carolina, PR', 'Canóvanas, PR', 'Loíza, PR', 
    'Río Grande, PR', 'Cayey, PR', 'Aibonito, PR', 'Barranquitas, PR', 'Cidra, PR', 
    'Comerío, PR', 'Fajardo, PR', 'Ceiba, PR', 'Culebra, PR', 'Luquillo, PR', 
    'Vieques, PR', 'Guayama, PR', 'Arroyo, PR', 'Patillas, PR', 'Salinas, PR', 
    'Humacao, PR', 'Las Piedras, PR', 'Maunabo, PR', 'Naguabo, PR', 
    'Yabucoa, PR', 'Juana Díaz, PR', 'Coamo, PR', 'Santa Isabel, PR', 
    'Villalba, PR', 'Manatí, PR', 'Barceloneta, PR', 'Ciales, PR', 'Florida, PR', 
    'Mayagüez, PR', 'Añasco, PR', 'Hormigueros, PR', 'Ponce, PR', 
    'Guayanilla, PR', 'Peñuelas, PR', 'San Germán, PR', 'Cabo Rojo, PR', 
    'Lajas, PR', 'San Sebastiá, PR', 'Lares, PR', 'Las Marías, PR', 
    'San Juan, PR', 'Trujillo Alto, PR', 'Toa Baja, PR', 'Dorado, PR', 
    'Naranjito, PR', 'Toa Alta, PR', 'Utuado, PR', 'Adjuntas, PR', 
    'Jayuya, PR', 'Vega Baja, PR', 'Corozal, PR', 'Morovis, PR', 
    'Orocovis, PR', 'Vega Alta, PR', 'Yauco, PR', 'Guánica, PR', 
    'Maricao, PR', 'Sabana Grande, PR'
]

var monthNames = [
    'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct',
    'nov', 'dic'
];
