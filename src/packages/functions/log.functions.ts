import { isDevEnv } from "../constants"

export const logIf = (value: boolean, data: any) => {
    value && console.log(data)
}

export const logIfDevEnv = (data: any) => {
    isDevEnv && console.log(data)
}