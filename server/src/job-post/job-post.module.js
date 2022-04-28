"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JobPostModule = void 0;
var common_1 = require("@nestjs/common");
var job_post_controller_1 = require("./job-post.controller");
var job_post_service_1 = require("./job-post.service");
var JobPostModule = /** @class */ (function () {
    function JobPostModule() {
    }
    JobPostModule = __decorate([
        (0, common_1.Module)({
            controllers: [job_post_controller_1.JobPostController],
            providers: [job_post_service_1.JobPostService]
        })
    ], JobPostModule);
    return JobPostModule;
}());
exports.JobPostModule = JobPostModule;
