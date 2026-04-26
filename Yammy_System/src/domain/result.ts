export type Result<T, E> = Success<T, E> | Failure<T, E>;

export class Success<T, E> {
    public readonly isSuccess = true;
    public readonly isFailure = false;

    public constructor(public readonly value: T) {}

    public map<U>(fn: (value: T) => U): Result<U, E> {
        return new Success<U, E>(fn(this.value));
    }

    public flatMap<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
        return fn(this.value);
    }
}

export class Failure<T, E> {
    public readonly isSuccess = false;
    public readonly isFailure = true;

    public constructor(public readonly error: E) {}

    public map<U>(_fn: (value: T) => U): Result<U, E> {
        return new Failure<U, E>(this.error);
    }

    public flatMap<U>(_fn: (value: T) => Result<U, E>): Result<U, E> {
        return new Failure<U, E>(this.error);
    }
}

export function ok<T, E = never>(value: T): Result<T, E> {
    return new Success<T, E>(value);
}

export function fail<E, T = never>(error: E): Result<T, E> {
    return new Failure<T, E>(error);
}
