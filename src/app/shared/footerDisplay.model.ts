export class footerModel {
    display_name: string;
    path: string;
}

export class footerDataModel {
    data: subFooterDataModel[];
}

export class subFooterDataModel {
    footer_menu: footerModel[];
    quick_link: footerModel[];
}