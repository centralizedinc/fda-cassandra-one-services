"use strict";

var AccountsModel = require("../models/AccountsModel");
// var axios = require("axios");
var ApplicationSettings = require("../utils/ApplicationSettings");

// Get Accounts
function getAccounts(cb_accounts) {
  AccountsModel.find((err, accounts) => {
    accounts.sort((a, b) => (a.name > b.name) ? 1 : -1)
    cb_accounts(err, accounts);
  });
}

function getAccountsByConditions(conditions, cb_accounts) {
  AccountsModel.find(conditions, (err, accounts) => {
    cb_accounts(err, accounts);
  });
}

function getAccountByConditions(conditions, cb_accounts) {
  AccountsModel.findOne(conditions, (err, accounts) => {
    cb_accounts(err, accounts);
  });
}

function getAccountById(id, cb_account) {
  AccountsModel.findById(id, (err, account) => {
    cb_account(err, account);
  });
}

// Add Accounts
function addAccount(new_account, cb_account) {
  var account = new AccountsModel(new_account);
  account.date_created = new Date();
  account.save(err => {
    if (err) {
      cb_account(err, account);
    } else {
      modifyAccountById(
        account._id, {
          account_id: getAccountID(account.auto_id)
        },
        (err, account) => {
          cb_account(err, account);
        }
      );
    }
  });
}

function getAccountID(auto_id) {
  var d = new Date();
  var datestring =
    d.getFullYear() +
    ("0" + d.getDate()).slice(-2) +
    ("0" + (d.getMonth() + 1)).slice(-2);

  var s = auto_id + "";
  while (s.length < 6) s = "0" + s;
  return 'a' + datestring + s;
}

// Modify Account
function modifyAccount(conditions, modified_account, cb_account) {
  AccountsModel.findOneAndUpdate(
    conditions,
    modified_account,
    (err, account) => {
      cb_account(err, account);
    }
  );
}

function modifyAccountById(id, modified_account, cb_account) {
  AccountsModel.findByIdAndUpdate(id, modified_account, (err, account) => {
    cb_account(err, account);
  });
}

/**
 * @description findOneAndUpdate pre-hook cannot check if the password is modified,
 *              therefore implementing this method to access the pre-save hook instead
 * @param {*} id
 * @param {*} modified_account
 * @param {*} cb
 */
function updatePassword(id, modified_account, cb) {
  AccountsModel.findById(id, (err, account) => {
    if (!err) {
      account.password = modified_account.password;
      account.save(save_err => {
        cb(save_err, account);
      });
    } else {
      cb(err);
    }
  });
}

function checkPassword(id, old_password, cb) {
  AccountsModel.findById(id, (err, account) => {
    if (err) cb(err);
    account.verifyPassword(old_password, (err, isMatch) => {
      cb(err, isMatch);
    });
  });
}

/**
 *
 * @param {String} key
 * @param {Function} cb
 */
function confirmAccount(key, cb) {
  if (!key) {
    cb({
        errors: [{
          message: "Invalid Key",
          field: "key"
        }]
      },
      null
    );
  } else {
    //check if key is valid
    const decoded = new Buffer(key, "base64").toString();
    const [email, expiry] = decoded.split(":");

    if (expiry < new Date().getTime()) {
      cb({
          errors: [{
            message: "Expired confirmation key",
            field: "key"
          }]
        },
        null
      );
    } else {
      AccountsModel.findOne({
          confirmation_key: key
        },
        (err, account) => {
          if (!err) {
            if (account) {
              account.status = 1;
              account.confirmation_key = "";
              modifyAccountById(account._id, account, (err_update, updated) => {
                cb(err_update, updated);
              });
            } else {
              cb({
                errors: [{
                  message: "Invalid Key",
                  field: "key"
                }]
              });
            }
          } else {
            cb(err, null);
          }
        }
      );
    }
  }
}

/**
 *
 * @param {String} username
 * @param {Function} cb
 */
function checkAccountStatus(username, cb) {
  if (username) {
    AccountsModel.findOne({
        username
      }, {
        status: true
      },
      (err, result) => {
        cb(err, result);
      }
    );
  } else {
    cb({
        errors: [{
          message: "not valid request"
        }]
      },
      null
    );
  }
}

/**
 * @description process account recovery request
 * @param {String} email
 * @param {Function} cb
 */
function forgotPassword(email, cb) {
  AccountsModel.findOne({
      email: email
    }, {
      username: true
    },
    (err, res) => {
      if (!err) {
        if (res) {
          var expiry = new Date().getTime() + 86400000; //24 hrs expired
          var confirmation_key = new Buffer(
            res.username + ":" + res.email + ":" + expiry
          ).toString("base64");
        //   axios
        //     .post(ApplicationSettings.getValue("NOTIFICATION_URL"), {
        //       email,
        //       name: res.username,
        //       confirmation_url: ApplicationSettings.getValue("CONFIRMATION_URL") +
        //         confirmation_key
        //     })
        //     .then(result => {
        //       cb(null, result);
        //     });
          // .catch(error=>{
          //   console.log("ERROR CATCH: " + JSON.stringify(error))
          //   cb(error)
          // })
        } else {
          cb({
            errors: [{
              message: "No account found"
            }]
          });
        }
      } else {
        console.log("ERROR CATCH 2: " + JSON.stringify(err));
        cb(err, res);
      }
    }
  );
}

/**
 *
 * @param {String} username
 * @param {String} email
 * @param {Function} cb
 */
function findAccountId(username, email, cb) {
  AccountsModel.findOne({
      username,
      email
    }, {
      id: true,
      username: true,
      email: true
    },
    (err, account) => {
      cb(err, account);
    }
  );
}

function getAccountsInfo(fields, cb) {
  AccountsModel.find().select(fields).exec((err, accounts) => {
    cb(err, accounts)
  })
}

module.exports = {
  getAccounts,
  getAccountsByConditions,
  getAccountByConditions,
  getAccountById,
  addAccount,
  modifyAccount,
  modifyAccountById,
  checkPassword,
  confirmAccount,
  checkAccountStatus,
  forgotPassword,
  findAccountId,
  updatePassword,
  getAccountsInfo
};