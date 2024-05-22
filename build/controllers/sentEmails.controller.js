"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sentEmails = void 0;

var _sentEmails = _interopRequireDefault(require("../models/sentEmails"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var nodeMailer = require("nodemailer");

var sentEmails = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var newClient, transporter, mail;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(req.body);
            newClient = new _sentEmails["default"]({
              name: req.body.name,
              dot: req.body.dot,
              email: req.body.email,
              phone: req.body.phone
            });
            transporter = nodeMailer.createTransport({
              host: "smtp.gmail.com",
              port: "465",
              secure: true,
              auth: {
                user: "ardilajr098@gmail.com",
                pass: "dodnrtogblrgizij"
              }
            });
            mail = {
              from: "",
              to: "larangoinsurance@gmail.com",
              subjet: "clients insurances",
              Text: "ardila prueba",
              html: "\n    <div>\n         <div>  <span>   name :  ".concat(newClient.name, "</span>    </div>\n             <div><span> dot :  ").concat(newClient.dot, "</span>    </div>\n            <div> <span> phone :  ").concat(newClient.phone, "</span>    </div>\n           <div> <span>  email :  ").concat(newClient.email, "</span>    </div>\n              </div>\n              ")
            };
            transporter.sendMail(mail, function (error, info) {
              if (error) {
                console.log("error sending email", error);
              } else {
                console.log("error sent");
              }
            }); // try {
            //   const savedProduct = await SentEmails.save();
            //   res.status(201).json(savedProduct);
            // } catch (error) {
            //   console.error("Error saving product:", error);
            //   res.status(500).json({ error: "Error creating product" });
            // }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sentEmails(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.sentEmails = sentEmails;