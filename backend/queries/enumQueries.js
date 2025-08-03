const { ENUMS } = require('../config/constants');

module.exports = {
  getEnumValues: (enumName) => `
    SELECT unnest(enum_range(NULL::${enumName})) AS value
    FROM pg_type 
    WHERE typname = '${enumName}'
  `,
  
  GET_SERVICE_TYPES: `
    SELECT unnest(enum_range(NULL::${ENUMS.SERVICE_TYPES})) AS service
    FROM pg_type 
    WHERE typname = '${ENUMS.SERVICE_TYPES}'
  `,

  GET_EXPERTISE_LEVEL: `
    SELECT unnest(enum_range(NULL::${ENUMS.EXPERTISE_LEVEL})) AS expertise_level
    FROM pg_type 
    WHERE typname = '${ENUMS.EXPERTISE_LEVEL}'
  `,

  GET_SKIN_TONES: `
    SELECT unnest(enum_range(NULL::${ENUMS.SKIN_TONES})) AS skin_tone
    FROM pg_type 
    WHERE typname = '${ENUMS.SKIN_TONES}'
  `,

  GET_SKIN_UNDERTONES: `
    SELECT unnest(enum_range(NULL::${ENUMS.SKIN_UNDERTONES})) AS skin_undertone
    FROM pg_type 
    WHERE typname = '${ENUMS.SKIN_UNDERTONES}'
  `,
  
  GET_STYLE_TYPES: `
    SELECT unnest(enum_range(NULL::${ENUMS.STYLE_TYPES})) AS style
    FROM pg_type 
    WHERE typname = '${ENUMS.STYLE_TYPES}'
  `,
  
  GET_COLOR_CATEGORIES: `
    SELECT unnest(enum_range(NULL::${ENUMS.COLOR_CATEGORIES})) AS color_categorie
    FROM pg_type 
    WHERE typname = '${ENUMS.COLOR_CATEGORIES}'
  `,

  GET_PATTERN_TYPES: `
    SELECT unnest(enum_range(NULL::${ENUMS.PATTERN_TYPES})) AS pattern_type
    FROM pg_type 
    WHERE typname = '${ENUMS.PATTERN_TYPES}'
  `,

  GET_FIT_TYPES: `
    SELECT unnest(enum_range(NULL::${ENUMS.FIT_TYPES})) AS fit_type
    FROM pg_type 
    WHERE typname = '${ENUMS.FIT_TYPES}'
  `
};