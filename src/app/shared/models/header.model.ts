export class HeaderModel {
    displayNameEng: string;
    displayNameThai: string;
    groupKey: string;
    routeTo: string;
    dropdownList: Dropdown[];
}

interface Dropdown {
    headerModel: HeaderModel;
}