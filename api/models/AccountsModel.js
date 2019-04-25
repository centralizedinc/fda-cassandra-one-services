"use strict";

var mongoose = require("mongoose");
// const beautifyUnique = require('mongoose-beautiful-unique-validation');
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken")
// var autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;

var AccessKeys = require("../utils/key");
var validation = require('../utils/validation_helper');

// var schema = require('fda-data-models')

var AccountsModelSchema = new mongoose.Schema(
    // schema.account
    {
        username: {
            type: String,
            unique: true,
            // unique: 'username: ({VALUE}) is already taken',
            required: [true, 'Username is a required field'],
        },
        password: {
            type: String,
            required: [true, 'Password is a required field']
        },
        email: {
            type: String,
            required: [true, 'Email is a required field'],
            unique: true,
            // unique: 'email: ({VALUE}) is already registered',
        },
        date_created: {
            type: Date,
            default: new Date()
        },
        date_modified: {
            type: Date,
            default: new Date()
        },
        session_token: {
            type: String
        },
        status: {
            type: Number,
            default: 0
            /**
             *  0 - Registered (Awaiting Confirmation)
             *  1 - Confirmed (Active but no active FDA License)
             *  2 - Active
             *  3 - Suspended
             *  4 - Inactive (For Deletion)
             */
        },
        confirmation_key: {
            type: String
        },
        current_login: {
            type: Date
        },
        last_login: {
            type: Date
        },

        first_name: {
            type: String
        },
        last_name: {
            type: String
        },

        // temporary
        auto_id: {
            type: Number
        },
        account_id: {
            type: String,
        },
        avatar: {},
        name: {
            first: {
                type: String
            },
            middle: {
                type: String
            },
            last: {
                type: String
            },
            display: {
                type: String
            }
        },
        birthday: {
            type: String
        },
        address: {
            address: {
                type: String
            },
            region: {
                type: String
            },
            province: {
                type: String
            },
            city: {
                type: String
            },
            zipcode: {
                type: String
            }
        },
        company: {
            name: String,
            owner: String,
            tin: String,
            address: {
                address: String,
                region: String,
                province: String,
                city: String,
                zipCode: String
            }
        },
        identity: {
            id: String,
            id_number: String,
            expiry_date: Date,
            attachment: String,
        },
        tin: String,
        position: {
            type: String
        },
        groups: {
            type: String
        },
        contact: {
            mobile: String,
            phone: String,
        },
        current_task: {
            type: String
        },
        tasks: [{
            task_id: {
                type: String
            },
            task_name: {
                type: String
            },
            status: {
                type: String
                // if 'A' Approved else 'D' Disapproved
            },
            remarks: {
                type: String
            },
            date_started: {
                type: Date,
                default: new Date()
            },
            date_completed: {
                type: Date,
                default: new Date()
            },
            assigned_user: {
                name: {
                    type: String
                },
                id: {
                    type: String
                }
            }
        }],
    }
);

// AccountsModelSchema.plugin(beautifyUnique);
AccountsModelSchema.path('email').validate(validation.validate_email, validation.validate_email_msg);
AccountsModelSchema.path('password').validate(validation.validate_password, validation.validate_password_msg);

AccountsModelSchema.pre("save", function (callback) {
    var account = this;

    //generate confirmation_key
    console.log('account.confirmation_key :', account.confirmation_key);
    if (account.status === 0 && (!account.confirmation_key || account.confirmation_key === '')) {
        var expiry = (new Date()).getTime() + 86400000; //24 hrs expired
        account.confirmation_key = (new Buffer(account.email + ":" + expiry).toString('base64'))
    }
    console.log('account.confirmation_key: ' + JSON.stringify(account.confirmation_key));


    // Break out if the password hasn't changed
    if (!account.isModified("password")) return callback();

    // Password changed so we need to hash it
    bcrypt.genSalt(5, function (err, salt) {
        if (err) return callback(err);

        bcrypt.hash(account.password, salt, null, function (err, hash) {
            if (err) return callback(err);
            account.password = hash;
            callback();
        });
    });
});


AccountsModelSchema.pre('findOneAndUpdate', function (next) {
    this.options.new = true;
    // this.options.runValidators = true;
    this._update.date_modified = new Date();

    next();
});


/**
 *
 */
AccountsModelSchema.methods.auth = function (password, cb) {
    var account = this;
    bcrypt.compare(password, account.password, function (err, isMatch) {
        if (err) return cb(err);
        var payload = {
            id: account.id
        };
        var token = null;

        var result = {
            isMatch: isMatch
        };
        if (isMatch) {
            token = jwt.sign(payload, AccessKeys.key, {
                expiresIn: '24h'
            });

            account.session_token = token;
            // set last login
            account.last_login = account.current_login;
            account.current_login = new Date();
            account.save(err => {
                result.token = token;
                result.user = account;
                cb(null, result);
            });
        } else {
            cb(null, result);
        }
    });
};

AccountsModelSchema.methods.verifyPassword = function (password, cb) {
    var account = this;
    bcrypt.compare(password, account.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

// const options = {
//     field: 'auto_id', // auto_id will have an auto-incrementing value
//     incrementBy: 1, // incremented by 2 every time
//     nextCount: false, // Not interested in getting the next count - don't add it to the model
//     // resetCount: 'reset', // The model and each document can now reset the counter via the reset() method
//     startAt: 0, // Start the counter at 1000
//     unique: false // Don't add a unique index
// };


// const plugin = new autoIncrement(AccountsModelSchema, 'accounts', options);

// plugin.applyPlugin()
//     .then(() => {
//         console.log("############### init plugin")
//     })
//     .catch(e => {
//         // Plugin failed to initialise
//         console.log("############### init failed: " + e);
//     });

module.exports = mongoose.model("accounts", AccountsModelSchema);
