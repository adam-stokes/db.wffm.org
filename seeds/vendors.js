"use strict";
var uuid = require("uuid");

exports.seed = (knex, Promise) => {
    return Promise.join(
        // Deletes ALL existing entries
        knex('users').del(),
        knex('vendors').del(),
        // Inserts seed entries
        knex('vendors')
            .insert({name: 'test vendor', email: "user1@testvendor.com"})
            .returning("id")
            .then((id) => {
                return knex('users').insert({
                    vendor_id: id.shift(),
                    email: 'seconduser@testvendor.com',
                    password: 'heehaw',
                    api_key: uuid.v1()
                })
            })
    );
};