import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { Types } from "mongoose";
import { ID_NOT_VALID } from "./id-validation.constants";


@Injectable()
export class IdVAlidationPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata) {
        if (metadata.type != 'param') return value;

        if (!Types.ObjectId.isValid(value)) throw new BadRequestException(ID_NOT_VALID);

        return value;
    }
}