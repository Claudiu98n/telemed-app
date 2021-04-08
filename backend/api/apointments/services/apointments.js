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

        // console.log('user');

        return {
            email: user.email,
            username: user.username, 
            id: user.id, 
            apointments: user.apointments, 
            apoints: user.apoints, 
            created_at: user.created_at,
            medications: user.medications,
            medical_records: user.medical_records
        };
    },

    async createApointment(ctx) {
        let userInfo = await strapi.services['apointments'].identifyUser(ctx);
        console.log(userInfo);

        let doctorInfo = await strapi
        .query('user', 'users-permissions')
        .findOne({id: ctx.request.body.doctorId});

        let semafor = true;
        doctorInfo.apoints.forEach(el => {
            if(el.date === ctx.request.body.date) {
                semafor = false;
            }
        })

        if (semafor === true) {
            const user = await strapi 
            .query('apointments')
            .create({
                users_permissions_user: userInfo.id, date: ctx.request.body.date,
                doctor: ctx.request.body.doctorId, date: ctx.request.body.date
            })
        }

        let apointResponse = {
            semafor: semafor,
            doctorName: doctorInfo.username
        };

        return apointResponse;
    },

    async generateVideo(ctx) {
        let userInfo = await strapi.services['apointments'].identifyUser(ctx);
        console.log(userInfo);

        console.log('BODY BODY');
        console.log(ctx.request.body.generated);
        console.log(ctx.request.body.meetingId);

        // let meeting = await strapi
        // .query('apointments')
        // .findOne({id: ctx.request.body.meetingId});
        // console.log(meeting);

        let generateMeeting =  await strapi
        .query('apointments')
        .update(
            {id: ctx.request.body.meetingId},
            {generated: ctx.request.body.generated}
        );

        return true;
    }

};
