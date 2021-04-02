'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async createMedicalRecord(ctx) {
        let newMedicalRecord = await strapi.services['medical-records'].createMedicalRecord(ctx);
        return newMedicalRecord;
    },

};
