"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JobPostSupport = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var JobPost_1 = require("./JobPost");
var JobPostSupport = /** @class */ (function () {
    function JobPostSupport() {
    }
    __decorate([
        (0, typeorm_1.Column)('varchar', { primary: true, name: 'from_user_id', length: 20 })
    ], JobPostSupport.prototype, "fromUserId");
    __decorate([
        (0, typeorm_1.Column)('int', { name: 'to_job_post_id' })
    ], JobPostSupport.prototype, "toJobPostId");
    __decorate([
        (0, typeorm_1.Column)('varchar', { name: 'content', length: 1000 })
    ], JobPostSupport.prototype, "content");
    __decorate([
        (0, typeorm_1.Column)('timestamp', {
            name: 'created_at',
            "default": function () { return 'CURRENT_TIMESTAMP'; }
        })
    ], JobPostSupport.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.jobPostSupports; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'from_user_id', referencedColumnName: 'id' }])
    ], JobPostSupport.prototype, "fromUser");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return JobPost_1.JobPost; }, function (jobPost) { return jobPost.jobPostSupports; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'to_job_post_id', referencedColumnName: 'id' }])
    ], JobPostSupport.prototype, "toJobPost");
    JobPostSupport = __decorate([
        (0, typeorm_1.Index)('from_user_id', ['fromUserId'], {}),
        (0, typeorm_1.Index)('to_job_post_id', ['toJobPostId'], {}),
        (0, typeorm_1.Entity)('job_post_support', { schema: 'part_time_monster' })
    ], JobPostSupport);
    return JobPostSupport;
}());
exports.JobPostSupport = JobPostSupport;
