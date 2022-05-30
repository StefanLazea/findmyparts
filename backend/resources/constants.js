const CONSTANTS = {
    PRE_DATE_IDENTIFIER: "de la",
    POST_DATE_IDENTIFIER: "pana la",
    POST_DATE_IDENTIFIER_RO: "până la",
    DATE_FORMAT_LENGTH: 11, //it should be 10
    BODY_STYLE_VARIANTS: [
        "sedan",
        "suv",
        "hatchback",
        "mini-car"
    ],
    FUEL_VARIANTS: [
        'benzina',
        'motorina',
        'benzina + gpl',
        'hybrid',
        'electric'
    ]
}

const BACKEND_CONSTANTS = {
    DOCUMENTS: {
        ITP: 'ITP',
        RCA: 'RCA',
        ROVIGNETA: 'ROVIGNETA'
    }
}

module.exports = { CONSTANTS, BACKEND_CONSTANTS }