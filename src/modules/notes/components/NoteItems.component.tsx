import React from "react";
import EmptyState from "../../common/components/EmptyState.component";
import EmptyIcon from "../../common/media/Empty-amico.svg";
import { noteItem } from "../types/note.type";
import NoteItem from "./NoteItem.component";
import NoteSkeleton from "./NoteSkeleton.component";
import styles from "./NoteItems.module.css";

declare interface INoteItemsOwnProps {
    isLoading: boolean;
    noteItems?: noteItem[];
}

declare interface INoteItemsStoreProps {}

declare interface INoteItemsDispatchProps {}

declare type INoteItemProps = INoteItemsOwnProps &
    INoteItemsStoreProps &
    INoteItemsDispatchProps;

function NoteItems(props: INoteItemProps) {
    const { isLoading, noteItems } = props;

    if (isLoading) {
        return (
            <>
                {Array.from(Array(5).keys()).map((key) => {
                    return <NoteSkeleton key={key} />;
                })}
            </>
        );
    }
    if (!noteItems || noteItems?.length === 0) {
        return (
            <EmptyState
                heading="Start by taking a note"
                description="All the notes you create will be added here"
                Icon={EmptyIcon}
                className={styles["empty-notes"]}
            />
        );
    }
    return (
        <>
            {noteItems.map((noteItem) => {
                return <NoteItem key={noteItem._id} noteItem={noteItem} />;
            })}
        </>
    );
}

export default NoteItems;
