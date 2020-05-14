import { Shop } from './shop';

export interface Employee {
    id: number;
    fullName: string;
    logo: string;
    shops?: Shop[]
}