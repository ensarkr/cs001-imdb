type doubleReturn<T> = T extends undefined
  ? { status: true } | { status: false; message: string }
  : { status: true; value: T } | { status: false; message: string };

type doubleReturnRequired<T> =
  | { status: true; value: T }
  | { status: false; message: string };

type pageFetchDouble<T> = Promise<
  T extends undefined
    ?
        | { status: true; value: { maxPage: number } }
        | { status: false; message: string }
    :
        | { status: true; value: T & { maxPage: number } }
        | { status: false; message: string }
>;

export { doubleReturn, doubleReturnRequired, pageFetchDouble };
