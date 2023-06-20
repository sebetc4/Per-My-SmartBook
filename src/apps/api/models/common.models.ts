import { allVisibilityValues } from "../../../packages/types";

export const imageSchema = {
    key: {
        type: String,
        required: true,
    },
    visibility: {
        type: String,
        enum: allVisibilityValues,
        required: true,
    },
    plaiceholder: {
        type: String,
        required: true,
    }
}