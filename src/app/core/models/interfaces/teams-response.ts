
export type ServiceResponse = {
    content: SoccerTeam[];
    empty: boolean;
    first: boolean;
    last: false;
    number: number;
    numberOfElements: number;
    pageable: PaginationResponse;
    totalElements: number;
    totalPages: number;
}

export type SoccerTeam = {
    id: number;
    capacidad: number;
    entrenador: string;
    estadio: string;
    fundacion: string;
    nacionalidad: string;
    nombre: string;
    sitioWeb: string;
    valor: number;
}

export type PaginationResponse = {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: SortResponse;
    unpaged: boolean;
}

export type SortResponse = {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}