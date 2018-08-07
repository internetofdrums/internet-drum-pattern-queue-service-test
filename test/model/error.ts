export interface Error {
    message: string
}

export enum ErrorMessages {
    NotFound = "The resource could not be found.",
    QueueEmpty = "The queue is currently empty.",
    QueueFull = "The pattern could not be added to the queue, because the queue is currently full.",
    PatternNotParsable = "The pattern could not be correctly parsed.",
    PatternAlreadyPresent = "The pattern is already present in the queue.",
}
