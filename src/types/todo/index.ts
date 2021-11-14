export declare interface todoItem {
    value: string;
    key: string;
    isDone: boolean;
}

export declare interface TodoAddFormProps {
    onFormSubmit: (todoValue: string) => void;
}

export declare interface TodoItemProps {
    todoItem: todoItem;
    onTodoItemEdit: (key: string, todoValue: string) => void;
    onTodoItemChecked: (key: string) => void;
    onTodoItemDelete: (key: string) => void;
}

export declare interface TodoAddForm {
    displayName: string;
}
