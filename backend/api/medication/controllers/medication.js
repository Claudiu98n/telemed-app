'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async createMedication(ctx) {
        let newMedication = await strapi.services['medication'].createMedication(ctx);
        return newMedication;
    },

};
