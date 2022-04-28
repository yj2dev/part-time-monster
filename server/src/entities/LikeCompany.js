"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LikeCompany = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Company_1 = require("./Company");
var LikeCompany = /** @class */ (function () {
    function LikeCompany() {
    }
    __decorate([
        (0, typeorm_1.Column)('varchar', { primary: true, name: 'from_user_id', length: 20 })
    ], LikeCompany.prototype, "fromUserId");
    __decorate([
        (0, typeorm_1.Column)('varchar', { name: 'to_company_id', length: 20 })
    ], LikeCompany.prototype, "toCompanyId");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.likeCompanies; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'from_user_id', referencedColumnName: 'id' }])
    ], LikeCompany.prototype, "fromUser");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Company_1.Company; }, function (company) { return company.likeCompanies; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'to_company_id', referencedColumnName: 'number' }])
    ], LikeCompany.prototype, "toCompany");
    LikeCompany = __decorate([
        (0, typeorm_1.Index)('from_user_id', ['fromUserId'], {}),
        (0, typeorm_1.Index)('to_company_id', ['toCompanyId'], {}),
        (0, typeorm_1.Entity)('like_company', { schema: 'part_time_monster' })
    ], LikeCompany);
    return LikeCompany;
}());
exports.LikeCompany = LikeCompany;
