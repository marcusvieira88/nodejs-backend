import Helpers from "../utils/Helpers";
import UserService from "../services/UserService";
import UserEnum from "../enums/UserEnum";
import ValidationError from "../errors/ValidationError";
import ClientService from "../services/ClientService";

export default class AuthenticateBusiness {

    static async authenticate(req) {
        let userData = null;

        switch(req.body.type ){
            case UserEnum.getTypesEnum().USER:
                userData = await UserService.getByMemberNo(req.body.userId);
                if (!userData || userData.deleted_at) {
                    throw new ValidationError('Expert not found.', userData)
                }
                break;
            case UserEnum.getTypesEnum().CLIENT:
                userData = await ClientService.getByEmail(req.body.userId);
                if (!userData || userData.deleted_at) {
                    throw new ValidationError('Client not found.', userData)
                }
                break;
        }

        if (!Helpers.compareHash(req.body.password, userData.password)) {
            throw new ValidationError('Wrong e-mail address or password.')
        }

        return {
            userData: userData,
            token: Helpers.generateToken(req.body.type, userData._id)
        }
    }
}

