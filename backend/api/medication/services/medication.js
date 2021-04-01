'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {

    async createMedication(ctx) {
        let userInfo = await strapi.services['apointments'].identifyUser(ctx);
        console.log(userInfo);

        console.log(ctx.request.body)
        const user = await strapi 
        .query('medication')
        .create({
            pacient: ctx.request.body.pacientId, 
            medicament: ctx.request.body.medicament,
            hour: ctx.request.body.hour,
            start: ctx.request.body.start,
            end: ctx.request.body.end,
            doctor_name: userInfo.username
        })

        return true;
    },

};
