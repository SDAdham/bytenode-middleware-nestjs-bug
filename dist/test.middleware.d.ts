import { NestMiddleware } from '@nestjs/common';
export declare class TestMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void): void;
}
