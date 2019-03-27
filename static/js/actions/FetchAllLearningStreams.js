import { connect } from "react-redux"
import axios from "axios"

export const instance = axios.get("/api/learningStreams").then(
    res => {
        return res;
    }
)
