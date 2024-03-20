import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable() // provider
export class NotLoggedInGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return !request.isAuthenticated();
  }
}
// 여기서 트루냐 팔스냐에 따라서 다음 컨트롤러 로 갈 수 있음 .