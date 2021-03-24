'use strict';

// const { identifyUser } = require("../controllers/apointments");
const jwt_decode = require("jwt-decode");
const apointments = require("../controllers/apointments");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {

    async identifyUser(ctx) {
        let jwt = ctx.header.authorization.split("Bearer ")[1];
        let {id} = jwt_decode(jwt);
        
        // console.log(jwt);
        // console.log(id);

        const user = await strapi 
        .query('user', 'users-permissions')
        .findOne({id: id})

        console.log('user');
        // console.log(user);

        return user;
    },

    async createApointment(ctx) {
        let userInfo = await strapi.services['apointments'].identifyUser(ctx);
        console.log(userInfo);

        const user = await strapi 
        .query('apointments')
        .create({users_permissions_user: userInfo.id, Data: ctx.request.body.Data})

        return true;
    }

};
