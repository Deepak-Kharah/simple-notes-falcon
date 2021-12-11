export declare interface noteItem {
    title: string;
    description: string;
    key: string;
}

export declare interface NoteAddFormProps {
    onFormSubmit: (title: string, description: string) => void;
}

export declare interface NoteItemProps {
    noteItem: noteItem;
    onNoteItemEdit: (key: string, title: string, description: string) => void;
    onNoteItemDelete: (key: string) => void;
}
