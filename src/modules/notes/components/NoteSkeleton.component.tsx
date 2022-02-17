import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";
import React from "react";

import styles from "./NoteSkeleton.module.css";

function generateRandomLines(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
}

function NoteSkeleton() {
    return (
        <Box className={styles["note-container"]}>
            <Skeleton
                height={"20px"}
                startColor="gray.50"
                endColor="gray.200"
                borderRadius={"5px"}
            />
            <SkeletonText
                skeletonHeight={"3"}
                borderRadius={"2px"}
                mt="6"
                noOfLines={generateRandomLines(2, 5)}
                spacing="4"
                startColor="gray.50"
                endColor="gray.200"
            />
        </Box>
    );
}

export default NoteSkeleton;
