export class Category {
    id: number = 0;
    name: string = '';
    description: string = '';
    categoryTypeCode: number = 0;
    categoryTypeName: string = '';

    static types = {
        1: 'Expense',
        2: 'Income'
    };

    static fromJson(json: any): Category{
        return Object.assign(new Category(), json);
    }
}