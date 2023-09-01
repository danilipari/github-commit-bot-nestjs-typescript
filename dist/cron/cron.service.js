"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const github_service_1 = require("../github/github.service");
const config_1 = require("@nestjs/config");
let CronService = exports.CronService = class CronService {
    constructor(githubService, configService) {
        this.githubService = githubService;
        this.configService = configService;
        this.env = 'development';
        this.env = this.configService.get('NODE_ENV');
        if (this.env === 'production') {
            this.handleCronProduction();
        }
        else {
            this.handleCronDevelopment();
        }
    }
    async handleCronLogic(apiAction, print) {
        const token = this.configService.get('GITHUB_TOKEN');
        const repo = `${this.configService.get('GITHUB_USERNAME')}/${this.configService.get('GITHUB_REPO')}`;
        const path = 'note.txt';
        const content = `Updated content - ${new Date().getTime().toFixed()}`;
        const message = `docs(bot): Automated commit - ${new Date()
            .getTime()
            .toFixed()}`;
        const _payload = {
            token: token,
            repo: repo,
            path: path,
            content: content,
            message: message,
        };
        const call = await this.githubService.updateFile(_payload);
        if (apiAction) {
            console.log('updateFile response -->', call);
        }
        if (print) {
            console.log('updateFile payload -->', {
                ..._payload,
                token: '* * *',
            });
        }
    }
    async handleCronProduction() {
        await this.handleCronLogic(true, false);
    }
    async handleCronDevelopment() {
        await this.handleCronLogic(false, true);
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_4_HOURS, { disabled: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "handleCronProduction", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_MINUTES, { disabled: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "handleCronDevelopment", null);
exports.CronService = CronService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [github_service_1.GithubService,
        config_1.ConfigService])
], CronService);
//# sourceMappingURL=cron.service.js.map