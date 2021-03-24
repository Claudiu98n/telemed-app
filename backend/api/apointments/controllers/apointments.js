'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    
    async identifyUser(ctx) {
        let userInfo = await strapi.services['apointments'].identifyUser(ctx);
        return userInfo;
    },
    
    async createApointment(ctx) {
        let newApointment = await strapi.services['apointments'].createApointment(ctx);
        return newApointment;
    },

};
