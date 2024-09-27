import { IJwtPayload } from "../../../common/domain/interfaces/IJwtPayload";

import { JwtAdapter } from "../../infrastructure/adapters";
import { TokenDto } from "../dtos/token.dto";

export interface ValidateTokenUseCase {
  execute: (dto: TokenDto, key: string) => Promise<IJwtPayload>;
}

export class ValidateTokenUseCaseImpl implements ValidateTokenUseCase {
  execute = async (dto: TokenDto, key: string): Promise<IJwtPayload> => {
    const payload = await JwtAdapter.ValidateToken<IJwtPayload>(dto.token, key);

    return payload;
  };
}
