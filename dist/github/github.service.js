"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubService = void 0;
const common_1 = require("@nestjs/common");
const node_fetch_1 = require("node-fetch");
let GithubService = exports.GithubService = class GithubService {
    async updateFile(payload) {
        const { token, repo, path, content, message } = payload;
        const url = `https://api.github.com/repos/${repo}/contents/${path}`;
        const getResponse = await (0, node_fetch_1.default)(url, {
            headers: {
                Authorization: `token ${token}`,
            },
        });
        const getFileData = await getResponse.json();
        const sha = getFileData.sha;
        const base64Content = Buffer.from(content).toString('base64');
        const response = await (0, node_fetch_1.default)(url, {
            method: 'PUT',
            headers: {
                Authorization: `token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                content: base64Content,
                sha,
            }),
        });
        return response.json();
    }
};
exports.GithubService = GithubService = __decorate([
    (0, common_1.Injectable)()
], GithubService);
//# sourceMappingURL=github.service.js.map