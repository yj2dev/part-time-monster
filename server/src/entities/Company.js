"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Company = void 0;
var typeorm_1 = require("typeorm");
var LikeCompany_1 = require("./LikeCompany");
var User_1 = require("./User");
var Company = /** @class */ (function () {
    function Company() {
    }
    __decorate([
        (0, typeorm_1.Column)("varchar", { primary: true, name: "number", length: 20 })
    ], Company.prototype, "number");
    __decorate([
        (0, typeorm_1.Column)("varchar", { name: "name", length: 50 })
    ], Company.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)("varchar", { name: "ceo_name", length: 10 })
    ], Company.prototype, "ceoName");
    __decorate([
        (0, typeorm_1.Column)("varchar", { name: "contact", length: 20 })
    ], Company.prototype, "contact");
    __decorate([
        (0, typeorm_1.Column)("varchar", { name: "address", length: 30 })
    ], Company.prototype, "address");
    __decorate([
        (0, typeorm_1.Column)("varchar", { name: "size", length: 10 })
    ], Company.prototype, "size");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return LikeCompany_1.LikeCompany; }, function (likeCompany) { return likeCompany.toCompany; })
    ], Company.prototype, "likeCompanies");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return User_1.User; }, function (user) { return user.toCompany; })
    ], Company.prototype, "users");
    Company = __decorate([
        (0, typeorm_1.Entity)("company", { schema: "part_time_monster" })
    ], Company);
    return Company;
}());
exports.Company = Company;
