import { MutationStatus } from "react-query/types/core/types";

export declare interface noteItem {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

// DTOs
export declare interface CreateNoteItemDto {
    title: string;
    content: string;
}

// queries

export declare interface UpdateNoteQueryProps {
    noteId: string;
    note: CreateNoteItemDto;
}
