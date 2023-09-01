import { GithubService } from '../github/github.service';
import { ConfigService } from '@nestjs/config';
export declare class CronService {
    private readonly githubService;
    private readonly configService;
    private env;
    constructor(githubService: GithubService, configService: ConfigService);
    handleCronLogic(apiAction: boolean, print: boolean): Promise<void>;
    handleCronProduction(): Promise<void>;
    handleCronDevelopment(): Promise<void>;
}
