type Mutable<T> = { -readonly [P in keyof T]: T[P] };

type DeepMutable<T> = { -readonly [P in keyof T]: DeepMutable<T[P]> };

export default DeepMutable;
