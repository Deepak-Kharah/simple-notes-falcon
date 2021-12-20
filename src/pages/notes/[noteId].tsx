import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGetNoteQuery } from "../../modules/notes/queries/hooks/note.query";

function SingleNote() {
    const router = useRouter();
    const {
        data: note,
        isLoading,
        isError,
    } = useGetNoteQuery((router.query?.noteId as string) || "");

    useEffect(() => {
        if (note?._id) {
            router.push(`/notes?noteId=${note._id}`, `/notes/${note._id}`);
        } else if (isError) {
            router.push(`/notes`);
            // TODO: handle alert
        }
    }, [router.query, note?._id, isError]);

    if (isLoading || !router.query.noteId) {
        return <div>Loading...</div>;
    }

    return <></>;
}

export default SingleNote;
