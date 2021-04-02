'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {

    async createMedicalRecord(ctx) {
        let userInfo = await strapi.services['apointments'].identifyUser(ctx);
        console.log(userInfo);

        // console.log(ctx.request.body.medrec)

        const user = await strapi 
        .query('medical-records')
        .create({
            pacient: ctx.request.body.pacientId,
            medrec: ctx.request.body.medrec
        })

        return true;
    }

};
