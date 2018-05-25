import { UserModel } from './user.model';
import { UserTOModel } from '../../payment/userTO.model';
import { PaymentMethodModel } from './paymentMethod.model';
export class ResultReserveTransitModel {
    payOutlet: boolean;
    payCredit: boolean;
    userDetail: UserModel;
    reserveId: string;
    transDetail: string;
    paymentMethod: {
        creditPayment: PaymentMethodModel,
        cashPayment: PaymentMethodModel
    };
    transId: string;
    busPayCode: string;
    foodDetail: string;
}