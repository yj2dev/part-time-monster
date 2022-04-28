"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JobPost = void 0;
var typeorm_1 = require("typeorm");
var JobPostSupport_1 = require("./JobPostSupport");
var JobPost = /** @class */ (function () {
    function JobPost() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' })
    ], JobPost.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)('varchar', { name: 'from_user_id', length: 20 })
    ], JobPost.prototype, "fromUserId");
    __decorate([
        (0, typeorm_1.Column)('varchar', { name: 'from_company_id', length: 20 })
    ], JobPost.prototype, "fromCompanyId");
    __decorate([
        (0, typeorm_1.Column)('varchar', { name: 'working_period', length: 20 })
    ], JobPost.prototype, "workingPeriod");
    __decorate([
        (0, typeorm_1.Column)('varchar', { name: 'working_day', length: 20 })
    ], JobPost.prototype, "workingDay");
    __decorate([
        (0, typeorm_1.Column)('time', { name: 'working_start_time' })
    ], JobPost.prototype, "workingStartTime");
    __decorate([
        (0, typeorm_1.Column)('time', { name: 'working_end_time' })
    ], JobPost.prototype, "workingEndTime");
    __decorate([
        (0, typeorm_1.Column)('int', { name: 'pay' })
    ], JobPost.prototype, "pay");
    __decorate([
        (0, typeorm_1.Column)('varchar', { name: 'pay_type', length: 10 })
    ], JobPost.prototype, "payType");
    __decorate([
        (0, typeorm_1.Column)('varchar', { name: 'sex', length: 4 })
    ], JobPost.prototype, "sex");
    __decorate([
        (0, typeorm_1.Column)('varchar', { name: 'age', length: 10 })
    ], JobPost.prototype, "age");
    __decorate([
        (0, typeorm_1.Column)('varchar', { name: 'education', length: 10 })
    ], JobPost.prototype, "education");
    __decorate([
        (0, typeorm_1.Column)('varchar', { name: 'occupation', length: 100 })
    ], JobPost.prototype, "occupation");
    __decorate([
        (0, typeorm_1.Column)('int', { name: 'recruit_number' })
    ], JobPost.prototype, "recruitNumber");
    __decorate([
        (0, typeorm_1.Column)('varchar', { name: 'title', length: 50 })
    ], JobPost.prototype, "title");
    __decorate([
        (0, typeorm_1.Column)('varchar', { name: 'content', length: 5000 })
    ], JobPost.prototype, "content");
    __decorate([
        (0, typeorm_1.Column)('timestamp', {
            name: 'created_at',
            nullable: true,
            "default": function () { return 'CURRENT_TIMESTAMP'; }
        })
    ], JobPost.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return JobPostSupport_1.JobPostSupport; }, function (jobPostSupport) { return jobPostSupport.toJobPost; })
    ], JobPost.prototype, "jobPostSupports");
    JobPost = __decorate([
        (0, typeorm_1.Entity)('job_post', { schema: 'part_time_monster' })
    ], JobPost);
    return JobPost;
}());
exports.JobPost = JobPost;
