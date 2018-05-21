export class CardTickets {
	hot?: CardTicket[];
	rec?: CardTicket[];
}

export interface CardTicket {
    id: string;
    isFull: string;
    isPromo: string;
    name: string;
	performCardName: string;
	performCardPic: string;
    performCardShowDate: string;
    performStatus: string;
    performStatusDesc: string;
    performType: string;
    skipInfo: string;
    performUri: string;
}