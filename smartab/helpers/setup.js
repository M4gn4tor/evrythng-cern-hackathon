#!/usr/bin/env node

"use strict";


const EVT = require("evrythng-extended");
var fs = require("fs");
const moment = require("moment");


const operator = new EVT.Operator("iNxi6Sw4qx0Ndmq6GOaFNrzuUC1qtDJWlu95VNoRNgzLVaN4krmII2JI5NRBa7hEzb6FZkwTEcfU56Yb");
operator.project().create({
    name: 'Radon Project'
}).then(function (project) {
    console.log('Created project: ', project.id);
    operator.project(project.id).application().create({
        name: "Smartlab App",
        description: "Radon detector app",
        socialNetworks: {}
    }).then(app => {
        console.log("Created app: ", app)
        const radonApp = new EVT.App(app.appApiKey);
        radonApp.appUser().create({
            email: 'Friedrich-Ernst.Dorn@hack.cern.ch',
            password: 'password',
            firstName: 'Friedrich Ernst',
            lastName: 'Dorn'
        }).then(appUser => {
            console.log('Created user: ', appUser);
            appUser.validate().then(validatedAppUser => {
                console.log(validatedAppUser);
                const user = new EVT.User(validatedAppUser.evrythngApiKey);
                user.thng().create({
                    name: "RadonDetector",
                    description: "Connected Radon Dosimeter"
                }).then(thng => {
                    EVT.api({
                        method: 'post',
                        url: '/auth/evrythng/thngs',
                        data: {
                            thngId: thng.id
                        }
                    }).then(authThng => {
                        console.log(authThng);
                    });
                });
            });
        });

    });
});
