"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var typeorm_1 = require("typeorm");
var JobPostSupport_1 = require("./JobPostSupport");
var LikeCompany_1 = require("./LikeCompany");
var Company_1 = require("./Company");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.Column)("varchar", { primary: true, name: "id", length: 20 })
    ], User.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)("varchar", { name: "to_company_id", nullable: true, length: 20 })
    ], User.prototype, "toCompanyId");
    __decorate([
        (0, typeorm_1.Column)("tinyint", {
            name: "is_company",
            nullable: true,
            "default": function () { return "'0'"; }
        })
    ], User.prototype, "isCompany");
    __decorate([
        (0, typeorm_1.Column)("varchar", { name: "password", length: 50 })
    ], User.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)("varchar", { name: "name", length: 10 })
    ], User.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)("int", { name: "birth", nullable: true })
    ], User.prototype, "birth");
    __decorate([
        (0, typeorm_1.Column)("varchar", { name: "sex", nullable: true, length: 4 })
    ], User.prototype, "sex");
    __decorate([
        (0, typeorm_1.Column)("varchar", { name: "email", length: 30 })
    ], User.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)("varchar", { name: "phone", length: 20 })
    ], User.prototype, "phone");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return JobPostSupport_1.JobPostSupport; }, function (jobPostSupport) { return jobPostSupport.fromUser; })
    ], User.prototype, "jobPostSupports");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return LikeCompany_1.LikeCompany; }, function (likeCompany) { return likeCompany.fromUser; })
    ], User.prototype, "likeCompanies");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Company_1.Company; }, function (company) { return company.users; }, {
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }),
        (0, typeorm_1.JoinColumn)([{ name: "to_company_id", referencedColumnName: "number" }])
    ], User.prototype, "toCompany");
    User = __decorate([
        (0, typeorm_1.Index)("to_company_id", ["toCompanyId"], {}),
        (0, typeorm_1.Entity)("user", { schema: "part_time_monster" })
    ], User);
    return User;
}());
exports.User = User;
