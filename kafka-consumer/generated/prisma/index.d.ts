
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Sensor
 * 
 */
export type Sensor = $Result.DefaultSelection<Prisma.$SensorPayload>
/**
 * Model SensorMetricsAmbient
 * 
 */
export type SensorMetricsAmbient = $Result.DefaultSelection<Prisma.$SensorMetricsAmbientPayload>
/**
 * Model SensorMetricsTraffic
 * 
 */
export type SensorMetricsTraffic = $Result.DefaultSelection<Prisma.$SensorMetricsTrafficPayload>
/**
 * Model SensorMetricsAir
 * 
 */
export type SensorMetricsAir = $Result.DefaultSelection<Prisma.$SensorMetricsAirPayload>
/**
 * Model SensorMetricsWaterUsage
 * 
 */
export type SensorMetricsWaterUsage = $Result.DefaultSelection<Prisma.$SensorMetricsWaterUsagePayload>
/**
 * Model SensorMetricsWaterQuality
 * 
 */
export type SensorMetricsWaterQuality = $Result.DefaultSelection<Prisma.$SensorMetricsWaterQualityPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Sensors
 * const sensors = await prisma.sensor.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Sensors
   * const sensors = await prisma.sensor.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.sensor`: Exposes CRUD operations for the **Sensor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sensors
    * const sensors = await prisma.sensor.findMany()
    * ```
    */
  get sensor(): Prisma.SensorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sensorMetricsAmbient`: Exposes CRUD operations for the **SensorMetricsAmbient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SensorMetricsAmbients
    * const sensorMetricsAmbients = await prisma.sensorMetricsAmbient.findMany()
    * ```
    */
  get sensorMetricsAmbient(): Prisma.SensorMetricsAmbientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sensorMetricsTraffic`: Exposes CRUD operations for the **SensorMetricsTraffic** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SensorMetricsTraffics
    * const sensorMetricsTraffics = await prisma.sensorMetricsTraffic.findMany()
    * ```
    */
  get sensorMetricsTraffic(): Prisma.SensorMetricsTrafficDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sensorMetricsAir`: Exposes CRUD operations for the **SensorMetricsAir** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SensorMetricsAirs
    * const sensorMetricsAirs = await prisma.sensorMetricsAir.findMany()
    * ```
    */
  get sensorMetricsAir(): Prisma.SensorMetricsAirDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sensorMetricsWaterUsage`: Exposes CRUD operations for the **SensorMetricsWaterUsage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SensorMetricsWaterUsages
    * const sensorMetricsWaterUsages = await prisma.sensorMetricsWaterUsage.findMany()
    * ```
    */
  get sensorMetricsWaterUsage(): Prisma.SensorMetricsWaterUsageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sensorMetricsWaterQuality`: Exposes CRUD operations for the **SensorMetricsWaterQuality** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SensorMetricsWaterQualities
    * const sensorMetricsWaterQualities = await prisma.sensorMetricsWaterQuality.findMany()
    * ```
    */
  get sensorMetricsWaterQuality(): Prisma.SensorMetricsWaterQualityDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Sensor: 'Sensor',
    SensorMetricsAmbient: 'SensorMetricsAmbient',
    SensorMetricsTraffic: 'SensorMetricsTraffic',
    SensorMetricsAir: 'SensorMetricsAir',
    SensorMetricsWaterUsage: 'SensorMetricsWaterUsage',
    SensorMetricsWaterQuality: 'SensorMetricsWaterQuality'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "sensor" | "sensorMetricsAmbient" | "sensorMetricsTraffic" | "sensorMetricsAir" | "sensorMetricsWaterUsage" | "sensorMetricsWaterQuality"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Sensor: {
        payload: Prisma.$SensorPayload<ExtArgs>
        fields: Prisma.SensorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SensorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SensorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorPayload>
          }
          findFirst: {
            args: Prisma.SensorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SensorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorPayload>
          }
          findMany: {
            args: Prisma.SensorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorPayload>[]
          }
          delete: {
            args: Prisma.SensorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorPayload>
          }
          update: {
            args: Prisma.SensorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorPayload>
          }
          deleteMany: {
            args: Prisma.SensorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SensorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SensorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorPayload>[]
          }
          aggregate: {
            args: Prisma.SensorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSensor>
          }
          groupBy: {
            args: Prisma.SensorGroupByArgs<ExtArgs>
            result: $Utils.Optional<SensorGroupByOutputType>[]
          }
          count: {
            args: Prisma.SensorCountArgs<ExtArgs>
            result: $Utils.Optional<SensorCountAggregateOutputType> | number
          }
        }
      }
      SensorMetricsAmbient: {
        payload: Prisma.$SensorMetricsAmbientPayload<ExtArgs>
        fields: Prisma.SensorMetricsAmbientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SensorMetricsAmbientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAmbientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SensorMetricsAmbientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAmbientPayload>
          }
          findFirst: {
            args: Prisma.SensorMetricsAmbientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAmbientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SensorMetricsAmbientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAmbientPayload>
          }
          findMany: {
            args: Prisma.SensorMetricsAmbientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAmbientPayload>[]
          }
          create: {
            args: Prisma.SensorMetricsAmbientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAmbientPayload>
          }
          createMany: {
            args: Prisma.SensorMetricsAmbientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SensorMetricsAmbientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAmbientPayload>[]
          }
          delete: {
            args: Prisma.SensorMetricsAmbientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAmbientPayload>
          }
          update: {
            args: Prisma.SensorMetricsAmbientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAmbientPayload>
          }
          deleteMany: {
            args: Prisma.SensorMetricsAmbientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SensorMetricsAmbientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SensorMetricsAmbientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAmbientPayload>[]
          }
          upsert: {
            args: Prisma.SensorMetricsAmbientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAmbientPayload>
          }
          aggregate: {
            args: Prisma.SensorMetricsAmbientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSensorMetricsAmbient>
          }
          groupBy: {
            args: Prisma.SensorMetricsAmbientGroupByArgs<ExtArgs>
            result: $Utils.Optional<SensorMetricsAmbientGroupByOutputType>[]
          }
          count: {
            args: Prisma.SensorMetricsAmbientCountArgs<ExtArgs>
            result: $Utils.Optional<SensorMetricsAmbientCountAggregateOutputType> | number
          }
        }
      }
      SensorMetricsTraffic: {
        payload: Prisma.$SensorMetricsTrafficPayload<ExtArgs>
        fields: Prisma.SensorMetricsTrafficFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SensorMetricsTrafficFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsTrafficPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SensorMetricsTrafficFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsTrafficPayload>
          }
          findFirst: {
            args: Prisma.SensorMetricsTrafficFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsTrafficPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SensorMetricsTrafficFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsTrafficPayload>
          }
          findMany: {
            args: Prisma.SensorMetricsTrafficFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsTrafficPayload>[]
          }
          create: {
            args: Prisma.SensorMetricsTrafficCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsTrafficPayload>
          }
          createMany: {
            args: Prisma.SensorMetricsTrafficCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SensorMetricsTrafficCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsTrafficPayload>[]
          }
          delete: {
            args: Prisma.SensorMetricsTrafficDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsTrafficPayload>
          }
          update: {
            args: Prisma.SensorMetricsTrafficUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsTrafficPayload>
          }
          deleteMany: {
            args: Prisma.SensorMetricsTrafficDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SensorMetricsTrafficUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SensorMetricsTrafficUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsTrafficPayload>[]
          }
          upsert: {
            args: Prisma.SensorMetricsTrafficUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsTrafficPayload>
          }
          aggregate: {
            args: Prisma.SensorMetricsTrafficAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSensorMetricsTraffic>
          }
          groupBy: {
            args: Prisma.SensorMetricsTrafficGroupByArgs<ExtArgs>
            result: $Utils.Optional<SensorMetricsTrafficGroupByOutputType>[]
          }
          count: {
            args: Prisma.SensorMetricsTrafficCountArgs<ExtArgs>
            result: $Utils.Optional<SensorMetricsTrafficCountAggregateOutputType> | number
          }
        }
      }
      SensorMetricsAir: {
        payload: Prisma.$SensorMetricsAirPayload<ExtArgs>
        fields: Prisma.SensorMetricsAirFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SensorMetricsAirFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAirPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SensorMetricsAirFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAirPayload>
          }
          findFirst: {
            args: Prisma.SensorMetricsAirFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAirPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SensorMetricsAirFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAirPayload>
          }
          findMany: {
            args: Prisma.SensorMetricsAirFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAirPayload>[]
          }
          create: {
            args: Prisma.SensorMetricsAirCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAirPayload>
          }
          createMany: {
            args: Prisma.SensorMetricsAirCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SensorMetricsAirCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAirPayload>[]
          }
          delete: {
            args: Prisma.SensorMetricsAirDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAirPayload>
          }
          update: {
            args: Prisma.SensorMetricsAirUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAirPayload>
          }
          deleteMany: {
            args: Prisma.SensorMetricsAirDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SensorMetricsAirUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SensorMetricsAirUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAirPayload>[]
          }
          upsert: {
            args: Prisma.SensorMetricsAirUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsAirPayload>
          }
          aggregate: {
            args: Prisma.SensorMetricsAirAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSensorMetricsAir>
          }
          groupBy: {
            args: Prisma.SensorMetricsAirGroupByArgs<ExtArgs>
            result: $Utils.Optional<SensorMetricsAirGroupByOutputType>[]
          }
          count: {
            args: Prisma.SensorMetricsAirCountArgs<ExtArgs>
            result: $Utils.Optional<SensorMetricsAirCountAggregateOutputType> | number
          }
        }
      }
      SensorMetricsWaterUsage: {
        payload: Prisma.$SensorMetricsWaterUsagePayload<ExtArgs>
        fields: Prisma.SensorMetricsWaterUsageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SensorMetricsWaterUsageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterUsagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SensorMetricsWaterUsageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterUsagePayload>
          }
          findFirst: {
            args: Prisma.SensorMetricsWaterUsageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterUsagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SensorMetricsWaterUsageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterUsagePayload>
          }
          findMany: {
            args: Prisma.SensorMetricsWaterUsageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterUsagePayload>[]
          }
          create: {
            args: Prisma.SensorMetricsWaterUsageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterUsagePayload>
          }
          createMany: {
            args: Prisma.SensorMetricsWaterUsageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SensorMetricsWaterUsageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterUsagePayload>[]
          }
          delete: {
            args: Prisma.SensorMetricsWaterUsageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterUsagePayload>
          }
          update: {
            args: Prisma.SensorMetricsWaterUsageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterUsagePayload>
          }
          deleteMany: {
            args: Prisma.SensorMetricsWaterUsageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SensorMetricsWaterUsageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SensorMetricsWaterUsageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterUsagePayload>[]
          }
          upsert: {
            args: Prisma.SensorMetricsWaterUsageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterUsagePayload>
          }
          aggregate: {
            args: Prisma.SensorMetricsWaterUsageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSensorMetricsWaterUsage>
          }
          groupBy: {
            args: Prisma.SensorMetricsWaterUsageGroupByArgs<ExtArgs>
            result: $Utils.Optional<SensorMetricsWaterUsageGroupByOutputType>[]
          }
          count: {
            args: Prisma.SensorMetricsWaterUsageCountArgs<ExtArgs>
            result: $Utils.Optional<SensorMetricsWaterUsageCountAggregateOutputType> | number
          }
        }
      }
      SensorMetricsWaterQuality: {
        payload: Prisma.$SensorMetricsWaterQualityPayload<ExtArgs>
        fields: Prisma.SensorMetricsWaterQualityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SensorMetricsWaterQualityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterQualityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SensorMetricsWaterQualityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterQualityPayload>
          }
          findFirst: {
            args: Prisma.SensorMetricsWaterQualityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterQualityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SensorMetricsWaterQualityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterQualityPayload>
          }
          findMany: {
            args: Prisma.SensorMetricsWaterQualityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterQualityPayload>[]
          }
          create: {
            args: Prisma.SensorMetricsWaterQualityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterQualityPayload>
          }
          createMany: {
            args: Prisma.SensorMetricsWaterQualityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SensorMetricsWaterQualityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterQualityPayload>[]
          }
          delete: {
            args: Prisma.SensorMetricsWaterQualityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterQualityPayload>
          }
          update: {
            args: Prisma.SensorMetricsWaterQualityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterQualityPayload>
          }
          deleteMany: {
            args: Prisma.SensorMetricsWaterQualityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SensorMetricsWaterQualityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SensorMetricsWaterQualityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterQualityPayload>[]
          }
          upsert: {
            args: Prisma.SensorMetricsWaterQualityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SensorMetricsWaterQualityPayload>
          }
          aggregate: {
            args: Prisma.SensorMetricsWaterQualityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSensorMetricsWaterQuality>
          }
          groupBy: {
            args: Prisma.SensorMetricsWaterQualityGroupByArgs<ExtArgs>
            result: $Utils.Optional<SensorMetricsWaterQualityGroupByOutputType>[]
          }
          count: {
            args: Prisma.SensorMetricsWaterQualityCountArgs<ExtArgs>
            result: $Utils.Optional<SensorMetricsWaterQualityCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    sensor?: SensorOmit
    sensorMetricsAmbient?: SensorMetricsAmbientOmit
    sensorMetricsTraffic?: SensorMetricsTrafficOmit
    sensorMetricsAir?: SensorMetricsAirOmit
    sensorMetricsWaterUsage?: SensorMetricsWaterUsageOmit
    sensorMetricsWaterQuality?: SensorMetricsWaterQualityOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type SensorCountOutputType
   */

  export type SensorCountOutputType = {
    ambientMetrics: number
    trafficMetrics: number
    airMetrics: number
    waterUsageMetrics: number
    waterQualityMetrics: number
  }

  export type SensorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ambientMetrics?: boolean | SensorCountOutputTypeCountAmbientMetricsArgs
    trafficMetrics?: boolean | SensorCountOutputTypeCountTrafficMetricsArgs
    airMetrics?: boolean | SensorCountOutputTypeCountAirMetricsArgs
    waterUsageMetrics?: boolean | SensorCountOutputTypeCountWaterUsageMetricsArgs
    waterQualityMetrics?: boolean | SensorCountOutputTypeCountWaterQualityMetricsArgs
  }

  // Custom InputTypes
  /**
   * SensorCountOutputType without action
   */
  export type SensorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorCountOutputType
     */
    select?: SensorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SensorCountOutputType without action
   */
  export type SensorCountOutputTypeCountAmbientMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SensorMetricsAmbientWhereInput
  }

  /**
   * SensorCountOutputType without action
   */
  export type SensorCountOutputTypeCountTrafficMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SensorMetricsTrafficWhereInput
  }

  /**
   * SensorCountOutputType without action
   */
  export type SensorCountOutputTypeCountAirMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SensorMetricsAirWhereInput
  }

  /**
   * SensorCountOutputType without action
   */
  export type SensorCountOutputTypeCountWaterUsageMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SensorMetricsWaterUsageWhereInput
  }

  /**
   * SensorCountOutputType without action
   */
  export type SensorCountOutputTypeCountWaterQualityMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SensorMetricsWaterQualityWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Sensor
   */

  export type AggregateSensor = {
    _count: SensorCountAggregateOutputType | null
    _avg: SensorAvgAggregateOutputType | null
    _sum: SensorSumAggregateOutputType | null
    _min: SensorMinAggregateOutputType | null
    _max: SensorMaxAggregateOutputType | null
  }

  export type SensorAvgAggregateOutputType = {
    kmPoint: number | null
  }

  export type SensorSumAggregateOutputType = {
    kmPoint: number | null
  }

  export type SensorMinAggregateOutputType = {
    id: string | null
    installedAt: Date | null
    cityId: string | null
    kmPoint: number | null
    sensorType: string | null
    stateId: string | null
    roadId: string | null
    industrialZone: boolean | null
  }

  export type SensorMaxAggregateOutputType = {
    id: string | null
    installedAt: Date | null
    cityId: string | null
    kmPoint: number | null
    sensorType: string | null
    stateId: string | null
    roadId: string | null
    industrialZone: boolean | null
  }

  export type SensorCountAggregateOutputType = {
    id: number
    installedAt: number
    cityId: number
    kmPoint: number
    sensorType: number
    stateId: number
    roadId: number
    industrialZone: number
    _all: number
  }


  export type SensorAvgAggregateInputType = {
    kmPoint?: true
  }

  export type SensorSumAggregateInputType = {
    kmPoint?: true
  }

  export type SensorMinAggregateInputType = {
    id?: true
    installedAt?: true
    cityId?: true
    kmPoint?: true
    sensorType?: true
    stateId?: true
    roadId?: true
    industrialZone?: true
  }

  export type SensorMaxAggregateInputType = {
    id?: true
    installedAt?: true
    cityId?: true
    kmPoint?: true
    sensorType?: true
    stateId?: true
    roadId?: true
    industrialZone?: true
  }

  export type SensorCountAggregateInputType = {
    id?: true
    installedAt?: true
    cityId?: true
    kmPoint?: true
    sensorType?: true
    stateId?: true
    roadId?: true
    industrialZone?: true
    _all?: true
  }

  export type SensorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sensor to aggregate.
     */
    where?: SensorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sensors to fetch.
     */
    orderBy?: SensorOrderByWithRelationInput | SensorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SensorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sensors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sensors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sensors
    **/
    _count?: true | SensorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SensorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SensorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SensorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SensorMaxAggregateInputType
  }

  export type GetSensorAggregateType<T extends SensorAggregateArgs> = {
        [P in keyof T & keyof AggregateSensor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSensor[P]>
      : GetScalarType<T[P], AggregateSensor[P]>
  }




  export type SensorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SensorWhereInput
    orderBy?: SensorOrderByWithAggregationInput | SensorOrderByWithAggregationInput[]
    by: SensorScalarFieldEnum[] | SensorScalarFieldEnum
    having?: SensorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SensorCountAggregateInputType | true
    _avg?: SensorAvgAggregateInputType
    _sum?: SensorSumAggregateInputType
    _min?: SensorMinAggregateInputType
    _max?: SensorMaxAggregateInputType
  }

  export type SensorGroupByOutputType = {
    id: string
    installedAt: Date
    cityId: string
    kmPoint: number
    sensorType: string
    stateId: string
    roadId: string | null
    industrialZone: boolean
    _count: SensorCountAggregateOutputType | null
    _avg: SensorAvgAggregateOutputType | null
    _sum: SensorSumAggregateOutputType | null
    _min: SensorMinAggregateOutputType | null
    _max: SensorMaxAggregateOutputType | null
  }

  type GetSensorGroupByPayload<T extends SensorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SensorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SensorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SensorGroupByOutputType[P]>
            : GetScalarType<T[P], SensorGroupByOutputType[P]>
        }
      >
    >


  export type SensorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    installedAt?: boolean
    cityId?: boolean
    kmPoint?: boolean
    sensorType?: boolean
    stateId?: boolean
    roadId?: boolean
    industrialZone?: boolean
    ambientMetrics?: boolean | Sensor$ambientMetricsArgs<ExtArgs>
    trafficMetrics?: boolean | Sensor$trafficMetricsArgs<ExtArgs>
    airMetrics?: boolean | Sensor$airMetricsArgs<ExtArgs>
    waterUsageMetrics?: boolean | Sensor$waterUsageMetricsArgs<ExtArgs>
    waterQualityMetrics?: boolean | Sensor$waterQualityMetricsArgs<ExtArgs>
    _count?: boolean | SensorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sensor"]>


  export type SensorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    installedAt?: boolean
    cityId?: boolean
    kmPoint?: boolean
    sensorType?: boolean
    stateId?: boolean
    roadId?: boolean
    industrialZone?: boolean
  }, ExtArgs["result"]["sensor"]>

  export type SensorSelectScalar = {
    id?: boolean
    installedAt?: boolean
    cityId?: boolean
    kmPoint?: boolean
    sensorType?: boolean
    stateId?: boolean
    roadId?: boolean
    industrialZone?: boolean
  }

  export type SensorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "installedAt" | "cityId" | "kmPoint" | "sensorType" | "stateId" | "roadId" | "industrialZone", ExtArgs["result"]["sensor"]>
  export type SensorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ambientMetrics?: boolean | Sensor$ambientMetricsArgs<ExtArgs>
    trafficMetrics?: boolean | Sensor$trafficMetricsArgs<ExtArgs>
    airMetrics?: boolean | Sensor$airMetricsArgs<ExtArgs>
    waterUsageMetrics?: boolean | Sensor$waterUsageMetricsArgs<ExtArgs>
    waterQualityMetrics?: boolean | Sensor$waterQualityMetricsArgs<ExtArgs>
    _count?: boolean | SensorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SensorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SensorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sensor"
    objects: {
      ambientMetrics: Prisma.$SensorMetricsAmbientPayload<ExtArgs>[]
      trafficMetrics: Prisma.$SensorMetricsTrafficPayload<ExtArgs>[]
      airMetrics: Prisma.$SensorMetricsAirPayload<ExtArgs>[]
      waterUsageMetrics: Prisma.$SensorMetricsWaterUsagePayload<ExtArgs>[]
      waterQualityMetrics: Prisma.$SensorMetricsWaterQualityPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      installedAt: Date
      cityId: string
      kmPoint: number
      sensorType: string
      stateId: string
      roadId: string | null
      industrialZone: boolean
    }, ExtArgs["result"]["sensor"]>
    composites: {}
  }

  type SensorGetPayload<S extends boolean | null | undefined | SensorDefaultArgs> = $Result.GetResult<Prisma.$SensorPayload, S>

  type SensorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SensorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SensorCountAggregateInputType | true
    }

  export interface SensorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sensor'], meta: { name: 'Sensor' } }
    /**
     * Find zero or one Sensor that matches the filter.
     * @param {SensorFindUniqueArgs} args - Arguments to find a Sensor
     * @example
     * // Get one Sensor
     * const sensor = await prisma.sensor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SensorFindUniqueArgs>(args: SelectSubset<T, SensorFindUniqueArgs<ExtArgs>>): Prisma__SensorClient<$Result.GetResult<Prisma.$SensorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sensor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SensorFindUniqueOrThrowArgs} args - Arguments to find a Sensor
     * @example
     * // Get one Sensor
     * const sensor = await prisma.sensor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SensorFindUniqueOrThrowArgs>(args: SelectSubset<T, SensorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SensorClient<$Result.GetResult<Prisma.$SensorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sensor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorFindFirstArgs} args - Arguments to find a Sensor
     * @example
     * // Get one Sensor
     * const sensor = await prisma.sensor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SensorFindFirstArgs>(args?: SelectSubset<T, SensorFindFirstArgs<ExtArgs>>): Prisma__SensorClient<$Result.GetResult<Prisma.$SensorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sensor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorFindFirstOrThrowArgs} args - Arguments to find a Sensor
     * @example
     * // Get one Sensor
     * const sensor = await prisma.sensor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SensorFindFirstOrThrowArgs>(args?: SelectSubset<T, SensorFindFirstOrThrowArgs<ExtArgs>>): Prisma__SensorClient<$Result.GetResult<Prisma.$SensorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sensors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sensors
     * const sensors = await prisma.sensor.findMany()
     * 
     * // Get first 10 Sensors
     * const sensors = await prisma.sensor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sensorWithIdOnly = await prisma.sensor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SensorFindManyArgs>(args?: SelectSubset<T, SensorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Delete a Sensor.
     * @param {SensorDeleteArgs} args - Arguments to delete one Sensor.
     * @example
     * // Delete one Sensor
     * const Sensor = await prisma.sensor.delete({
     *   where: {
     *     // ... filter to delete one Sensor
     *   }
     * })
     * 
     */
    delete<T extends SensorDeleteArgs>(args: SelectSubset<T, SensorDeleteArgs<ExtArgs>>): Prisma__SensorClient<$Result.GetResult<Prisma.$SensorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sensor.
     * @param {SensorUpdateArgs} args - Arguments to update one Sensor.
     * @example
     * // Update one Sensor
     * const sensor = await prisma.sensor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SensorUpdateArgs>(args: SelectSubset<T, SensorUpdateArgs<ExtArgs>>): Prisma__SensorClient<$Result.GetResult<Prisma.$SensorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sensors.
     * @param {SensorDeleteManyArgs} args - Arguments to filter Sensors to delete.
     * @example
     * // Delete a few Sensors
     * const { count } = await prisma.sensor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SensorDeleteManyArgs>(args?: SelectSubset<T, SensorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sensors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sensors
     * const sensor = await prisma.sensor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SensorUpdateManyArgs>(args: SelectSubset<T, SensorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sensors and returns the data updated in the database.
     * @param {SensorUpdateManyAndReturnArgs} args - Arguments to update many Sensors.
     * @example
     * // Update many Sensors
     * const sensor = await prisma.sensor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sensors and only return the `id`
     * const sensorWithIdOnly = await prisma.sensor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SensorUpdateManyAndReturnArgs>(args: SelectSubset<T, SensorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>


    /**
     * Count the number of Sensors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorCountArgs} args - Arguments to filter Sensors to count.
     * @example
     * // Count the number of Sensors
     * const count = await prisma.sensor.count({
     *   where: {
     *     // ... the filter for the Sensors we want to count
     *   }
     * })
    **/
    count<T extends SensorCountArgs>(
      args?: Subset<T, SensorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SensorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sensor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SensorAggregateArgs>(args: Subset<T, SensorAggregateArgs>): Prisma.PrismaPromise<GetSensorAggregateType<T>>

    /**
     * Group by Sensor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SensorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SensorGroupByArgs['orderBy'] }
        : { orderBy?: SensorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SensorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSensorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sensor model
   */
  readonly fields: SensorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sensor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SensorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ambientMetrics<T extends Sensor$ambientMetricsArgs<ExtArgs> = {}>(args?: Subset<T, Sensor$ambientMetricsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorMetricsAmbientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    trafficMetrics<T extends Sensor$trafficMetricsArgs<ExtArgs> = {}>(args?: Subset<T, Sensor$trafficMetricsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorMetricsTrafficPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    airMetrics<T extends Sensor$airMetricsArgs<ExtArgs> = {}>(args?: Subset<T, Sensor$airMetricsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorMetricsAirPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    waterUsageMetrics<T extends Sensor$waterUsageMetricsArgs<ExtArgs> = {}>(args?: Subset<T, Sensor$waterUsageMetricsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorMetricsWaterUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    waterQualityMetrics<T extends Sensor$waterQualityMetricsArgs<ExtArgs> = {}>(args?: Subset<T, Sensor$waterQualityMetricsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorMetricsWaterQualityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Sensor model
   */
  interface SensorFieldRefs {
    readonly id: FieldRef<"Sensor", 'String'>
    readonly installedAt: FieldRef<"Sensor", 'DateTime'>
    readonly cityId: FieldRef<"Sensor", 'String'>
    readonly kmPoint: FieldRef<"Sensor", 'Float'>
    readonly sensorType: FieldRef<"Sensor", 'String'>
    readonly stateId: FieldRef<"Sensor", 'String'>
    readonly roadId: FieldRef<"Sensor", 'String'>
    readonly industrialZone: FieldRef<"Sensor", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Sensor findUnique
   */
  export type SensorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sensor
     */
    select?: SensorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sensor
     */
    omit?: SensorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorInclude<ExtArgs> | null
    /**
     * Filter, which Sensor to fetch.
     */
    where: SensorWhereUniqueInput
  }

  /**
   * Sensor findUniqueOrThrow
   */
  export type SensorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sensor
     */
    select?: SensorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sensor
     */
    omit?: SensorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorInclude<ExtArgs> | null
    /**
     * Filter, which Sensor to fetch.
     */
    where: SensorWhereUniqueInput
  }

  /**
   * Sensor findFirst
   */
  export type SensorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sensor
     */
    select?: SensorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sensor
     */
    omit?: SensorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorInclude<ExtArgs> | null
    /**
     * Filter, which Sensor to fetch.
     */
    where?: SensorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sensors to fetch.
     */
    orderBy?: SensorOrderByWithRelationInput | SensorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sensors.
     */
    cursor?: SensorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sensors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sensors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sensors.
     */
    distinct?: SensorScalarFieldEnum | SensorScalarFieldEnum[]
  }

  /**
   * Sensor findFirstOrThrow
   */
  export type SensorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sensor
     */
    select?: SensorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sensor
     */
    omit?: SensorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorInclude<ExtArgs> | null
    /**
     * Filter, which Sensor to fetch.
     */
    where?: SensorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sensors to fetch.
     */
    orderBy?: SensorOrderByWithRelationInput | SensorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sensors.
     */
    cursor?: SensorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sensors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sensors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sensors.
     */
    distinct?: SensorScalarFieldEnum | SensorScalarFieldEnum[]
  }

  /**
   * Sensor findMany
   */
  export type SensorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sensor
     */
    select?: SensorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sensor
     */
    omit?: SensorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorInclude<ExtArgs> | null
    /**
     * Filter, which Sensors to fetch.
     */
    where?: SensorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sensors to fetch.
     */
    orderBy?: SensorOrderByWithRelationInput | SensorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sensors.
     */
    cursor?: SensorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sensors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sensors.
     */
    skip?: number
    distinct?: SensorScalarFieldEnum | SensorScalarFieldEnum[]
  }

  /**
   * Sensor update
   */
  export type SensorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sensor
     */
    select?: SensorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sensor
     */
    omit?: SensorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorInclude<ExtArgs> | null
    /**
     * The data needed to update a Sensor.
     */
    data: XOR<SensorUpdateInput, SensorUncheckedUpdateInput>
    /**
     * Choose, which Sensor to update.
     */
    where: SensorWhereUniqueInput
  }

  /**
   * Sensor updateMany
   */
  export type SensorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sensors.
     */
    data: XOR<SensorUpdateManyMutationInput, SensorUncheckedUpdateManyInput>
    /**
     * Filter which Sensors to update
     */
    where?: SensorWhereInput
    /**
     * Limit how many Sensors to update.
     */
    limit?: number
  }

  /**
   * Sensor updateManyAndReturn
   */
  export type SensorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sensor
     */
    select?: SensorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sensor
     */
    omit?: SensorOmit<ExtArgs> | null
    /**
     * The data used to update Sensors.
     */
    data: XOR<SensorUpdateManyMutationInput, SensorUncheckedUpdateManyInput>
    /**
     * Filter which Sensors to update
     */
    where?: SensorWhereInput
    /**
     * Limit how many Sensors to update.
     */
    limit?: number
  }

  /**
   * Sensor delete
   */
  export type SensorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sensor
     */
    select?: SensorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sensor
     */
    omit?: SensorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorInclude<ExtArgs> | null
    /**
     * Filter which Sensor to delete.
     */
    where: SensorWhereUniqueInput
  }

  /**
   * Sensor deleteMany
   */
  export type SensorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sensors to delete
     */
    where?: SensorWhereInput
    /**
     * Limit how many Sensors to delete.
     */
    limit?: number
  }

  /**
   * Sensor.ambientMetrics
   */
  export type Sensor$ambientMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAmbient
     */
    select?: SensorMetricsAmbientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAmbient
     */
    omit?: SensorMetricsAmbientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAmbientInclude<ExtArgs> | null
    where?: SensorMetricsAmbientWhereInput
    orderBy?: SensorMetricsAmbientOrderByWithRelationInput | SensorMetricsAmbientOrderByWithRelationInput[]
    cursor?: SensorMetricsAmbientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SensorMetricsAmbientScalarFieldEnum | SensorMetricsAmbientScalarFieldEnum[]
  }

  /**
   * Sensor.trafficMetrics
   */
  export type Sensor$trafficMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsTraffic
     */
    select?: SensorMetricsTrafficSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsTraffic
     */
    omit?: SensorMetricsTrafficOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsTrafficInclude<ExtArgs> | null
    where?: SensorMetricsTrafficWhereInput
    orderBy?: SensorMetricsTrafficOrderByWithRelationInput | SensorMetricsTrafficOrderByWithRelationInput[]
    cursor?: SensorMetricsTrafficWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SensorMetricsTrafficScalarFieldEnum | SensorMetricsTrafficScalarFieldEnum[]
  }

  /**
   * Sensor.airMetrics
   */
  export type Sensor$airMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAir
     */
    select?: SensorMetricsAirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAir
     */
    omit?: SensorMetricsAirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAirInclude<ExtArgs> | null
    where?: SensorMetricsAirWhereInput
    orderBy?: SensorMetricsAirOrderByWithRelationInput | SensorMetricsAirOrderByWithRelationInput[]
    cursor?: SensorMetricsAirWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SensorMetricsAirScalarFieldEnum | SensorMetricsAirScalarFieldEnum[]
  }

  /**
   * Sensor.waterUsageMetrics
   */
  export type Sensor$waterUsageMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterUsage
     */
    select?: SensorMetricsWaterUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterUsage
     */
    omit?: SensorMetricsWaterUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterUsageInclude<ExtArgs> | null
    where?: SensorMetricsWaterUsageWhereInput
    orderBy?: SensorMetricsWaterUsageOrderByWithRelationInput | SensorMetricsWaterUsageOrderByWithRelationInput[]
    cursor?: SensorMetricsWaterUsageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SensorMetricsWaterUsageScalarFieldEnum | SensorMetricsWaterUsageScalarFieldEnum[]
  }

  /**
   * Sensor.waterQualityMetrics
   */
  export type Sensor$waterQualityMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterQuality
     */
    select?: SensorMetricsWaterQualitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterQuality
     */
    omit?: SensorMetricsWaterQualityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterQualityInclude<ExtArgs> | null
    where?: SensorMetricsWaterQualityWhereInput
    orderBy?: SensorMetricsWaterQualityOrderByWithRelationInput | SensorMetricsWaterQualityOrderByWithRelationInput[]
    cursor?: SensorMetricsWaterQualityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SensorMetricsWaterQualityScalarFieldEnum | SensorMetricsWaterQualityScalarFieldEnum[]
  }

  /**
   * Sensor without action
   */
  export type SensorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sensor
     */
    select?: SensorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sensor
     */
    omit?: SensorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorInclude<ExtArgs> | null
  }


  /**
   * Model SensorMetricsAmbient
   */

  export type AggregateSensorMetricsAmbient = {
    _count: SensorMetricsAmbientCountAggregateOutputType | null
    _avg: SensorMetricsAmbientAvgAggregateOutputType | null
    _sum: SensorMetricsAmbientSumAggregateOutputType | null
    _min: SensorMetricsAmbientMinAggregateOutputType | null
    _max: SensorMetricsAmbientMaxAggregateOutputType | null
  }

  export type SensorMetricsAmbientAvgAggregateOutputType = {
    temperature: number | null
    humidity: number | null
    solarRadiation: number | null
  }

  export type SensorMetricsAmbientSumAggregateOutputType = {
    temperature: number | null
    humidity: number | null
    solarRadiation: number | null
  }

  export type SensorMetricsAmbientMinAggregateOutputType = {
    sensorId: string | null
    eventTime: Date | null
    temperature: number | null
    humidity: number | null
    solarRadiation: number | null
  }

  export type SensorMetricsAmbientMaxAggregateOutputType = {
    sensorId: string | null
    eventTime: Date | null
    temperature: number | null
    humidity: number | null
    solarRadiation: number | null
  }

  export type SensorMetricsAmbientCountAggregateOutputType = {
    sensorId: number
    eventTime: number
    temperature: number
    humidity: number
    solarRadiation: number
    _all: number
  }


  export type SensorMetricsAmbientAvgAggregateInputType = {
    temperature?: true
    humidity?: true
    solarRadiation?: true
  }

  export type SensorMetricsAmbientSumAggregateInputType = {
    temperature?: true
    humidity?: true
    solarRadiation?: true
  }

  export type SensorMetricsAmbientMinAggregateInputType = {
    sensorId?: true
    eventTime?: true
    temperature?: true
    humidity?: true
    solarRadiation?: true
  }

  export type SensorMetricsAmbientMaxAggregateInputType = {
    sensorId?: true
    eventTime?: true
    temperature?: true
    humidity?: true
    solarRadiation?: true
  }

  export type SensorMetricsAmbientCountAggregateInputType = {
    sensorId?: true
    eventTime?: true
    temperature?: true
    humidity?: true
    solarRadiation?: true
    _all?: true
  }

  export type SensorMetricsAmbientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SensorMetricsAmbient to aggregate.
     */
    where?: SensorMetricsAmbientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorMetricsAmbients to fetch.
     */
    orderBy?: SensorMetricsAmbientOrderByWithRelationInput | SensorMetricsAmbientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SensorMetricsAmbientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorMetricsAmbients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorMetricsAmbients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SensorMetricsAmbients
    **/
    _count?: true | SensorMetricsAmbientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SensorMetricsAmbientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SensorMetricsAmbientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SensorMetricsAmbientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SensorMetricsAmbientMaxAggregateInputType
  }

  export type GetSensorMetricsAmbientAggregateType<T extends SensorMetricsAmbientAggregateArgs> = {
        [P in keyof T & keyof AggregateSensorMetricsAmbient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSensorMetricsAmbient[P]>
      : GetScalarType<T[P], AggregateSensorMetricsAmbient[P]>
  }




  export type SensorMetricsAmbientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SensorMetricsAmbientWhereInput
    orderBy?: SensorMetricsAmbientOrderByWithAggregationInput | SensorMetricsAmbientOrderByWithAggregationInput[]
    by: SensorMetricsAmbientScalarFieldEnum[] | SensorMetricsAmbientScalarFieldEnum
    having?: SensorMetricsAmbientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SensorMetricsAmbientCountAggregateInputType | true
    _avg?: SensorMetricsAmbientAvgAggregateInputType
    _sum?: SensorMetricsAmbientSumAggregateInputType
    _min?: SensorMetricsAmbientMinAggregateInputType
    _max?: SensorMetricsAmbientMaxAggregateInputType
  }

  export type SensorMetricsAmbientGroupByOutputType = {
    sensorId: string
    eventTime: Date
    temperature: number
    humidity: number
    solarRadiation: number
    _count: SensorMetricsAmbientCountAggregateOutputType | null
    _avg: SensorMetricsAmbientAvgAggregateOutputType | null
    _sum: SensorMetricsAmbientSumAggregateOutputType | null
    _min: SensorMetricsAmbientMinAggregateOutputType | null
    _max: SensorMetricsAmbientMaxAggregateOutputType | null
  }

  type GetSensorMetricsAmbientGroupByPayload<T extends SensorMetricsAmbientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SensorMetricsAmbientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SensorMetricsAmbientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SensorMetricsAmbientGroupByOutputType[P]>
            : GetScalarType<T[P], SensorMetricsAmbientGroupByOutputType[P]>
        }
      >
    >


  export type SensorMetricsAmbientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sensorId?: boolean
    eventTime?: boolean
    temperature?: boolean
    humidity?: boolean
    solarRadiation?: boolean
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sensorMetricsAmbient"]>

  export type SensorMetricsAmbientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sensorId?: boolean
    eventTime?: boolean
    temperature?: boolean
    humidity?: boolean
    solarRadiation?: boolean
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sensorMetricsAmbient"]>

  export type SensorMetricsAmbientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sensorId?: boolean
    eventTime?: boolean
    temperature?: boolean
    humidity?: boolean
    solarRadiation?: boolean
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sensorMetricsAmbient"]>

  export type SensorMetricsAmbientSelectScalar = {
    sensorId?: boolean
    eventTime?: boolean
    temperature?: boolean
    humidity?: boolean
    solarRadiation?: boolean
  }

  export type SensorMetricsAmbientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"sensorId" | "eventTime" | "temperature" | "humidity" | "solarRadiation", ExtArgs["result"]["sensorMetricsAmbient"]>
  export type SensorMetricsAmbientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }
  export type SensorMetricsAmbientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }
  export type SensorMetricsAmbientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }

  export type $SensorMetricsAmbientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SensorMetricsAmbient"
    objects: {
      sensor: Prisma.$SensorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      sensorId: string
      eventTime: Date
      temperature: number
      humidity: number
      solarRadiation: number
    }, ExtArgs["result"]["sensorMetricsAmbient"]>
    composites: {}
  }

  type SensorMetricsAmbientGetPayload<S extends boolean | null | undefined | SensorMetricsAmbientDefaultArgs> = $Result.GetResult<Prisma.$SensorMetricsAmbientPayload, S>

  type SensorMetricsAmbientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SensorMetricsAmbientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SensorMetricsAmbientCountAggregateInputType | true
    }

  export interface SensorMetricsAmbientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SensorMetricsAmbient'], meta: { name: 'SensorMetricsAmbient' } }
    /**
     * Find zero or one SensorMetricsAmbient that matches the filter.
     * @param {SensorMetricsAmbientFindUniqueArgs} args - Arguments to find a SensorMetricsAmbient
     * @example
     * // Get one SensorMetricsAmbient
     * const sensorMetricsAmbient = await prisma.sensorMetricsAmbient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SensorMetricsAmbientFindUniqueArgs>(args: SelectSubset<T, SensorMetricsAmbientFindUniqueArgs<ExtArgs>>): Prisma__SensorMetricsAmbientClient<$Result.GetResult<Prisma.$SensorMetricsAmbientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SensorMetricsAmbient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SensorMetricsAmbientFindUniqueOrThrowArgs} args - Arguments to find a SensorMetricsAmbient
     * @example
     * // Get one SensorMetricsAmbient
     * const sensorMetricsAmbient = await prisma.sensorMetricsAmbient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SensorMetricsAmbientFindUniqueOrThrowArgs>(args: SelectSubset<T, SensorMetricsAmbientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SensorMetricsAmbientClient<$Result.GetResult<Prisma.$SensorMetricsAmbientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SensorMetricsAmbient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsAmbientFindFirstArgs} args - Arguments to find a SensorMetricsAmbient
     * @example
     * // Get one SensorMetricsAmbient
     * const sensorMetricsAmbient = await prisma.sensorMetricsAmbient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SensorMetricsAmbientFindFirstArgs>(args?: SelectSubset<T, SensorMetricsAmbientFindFirstArgs<ExtArgs>>): Prisma__SensorMetricsAmbientClient<$Result.GetResult<Prisma.$SensorMetricsAmbientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SensorMetricsAmbient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsAmbientFindFirstOrThrowArgs} args - Arguments to find a SensorMetricsAmbient
     * @example
     * // Get one SensorMetricsAmbient
     * const sensorMetricsAmbient = await prisma.sensorMetricsAmbient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SensorMetricsAmbientFindFirstOrThrowArgs>(args?: SelectSubset<T, SensorMetricsAmbientFindFirstOrThrowArgs<ExtArgs>>): Prisma__SensorMetricsAmbientClient<$Result.GetResult<Prisma.$SensorMetricsAmbientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SensorMetricsAmbients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsAmbientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SensorMetricsAmbients
     * const sensorMetricsAmbients = await prisma.sensorMetricsAmbient.findMany()
     * 
     * // Get first 10 SensorMetricsAmbients
     * const sensorMetricsAmbients = await prisma.sensorMetricsAmbient.findMany({ take: 10 })
     * 
     * // Only select the `sensorId`
     * const sensorMetricsAmbientWithSensorIdOnly = await prisma.sensorMetricsAmbient.findMany({ select: { sensorId: true } })
     * 
     */
    findMany<T extends SensorMetricsAmbientFindManyArgs>(args?: SelectSubset<T, SensorMetricsAmbientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorMetricsAmbientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SensorMetricsAmbient.
     * @param {SensorMetricsAmbientCreateArgs} args - Arguments to create a SensorMetricsAmbient.
     * @example
     * // Create one SensorMetricsAmbient
     * const SensorMetricsAmbient = await prisma.sensorMetricsAmbient.create({
     *   data: {
     *     // ... data to create a SensorMetricsAmbient
     *   }
     * })
     * 
     */
    create<T extends SensorMetricsAmbientCreateArgs>(args: SelectSubset<T, SensorMetricsAmbientCreateArgs<ExtArgs>>): Prisma__SensorMetricsAmbientClient<$Result.GetResult<Prisma.$SensorMetricsAmbientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SensorMetricsAmbients.
     * @param {SensorMetricsAmbientCreateManyArgs} args - Arguments to create many SensorMetricsAmbients.
     * @example
     * // Create many SensorMetricsAmbients
     * const sensorMetricsAmbient = await prisma.sensorMetricsAmbient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SensorMetricsAmbientCreateManyArgs>(args?: SelectSubset<T, SensorMetricsAmbientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SensorMetricsAmbients and returns the data saved in the database.
     * @param {SensorMetricsAmbientCreateManyAndReturnArgs} args - Arguments to create many SensorMetricsAmbients.
     * @example
     * // Create many SensorMetricsAmbients
     * const sensorMetricsAmbient = await prisma.sensorMetricsAmbient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SensorMetricsAmbients and only return the `sensorId`
     * const sensorMetricsAmbientWithSensorIdOnly = await prisma.sensorMetricsAmbient.createManyAndReturn({
     *   select: { sensorId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SensorMetricsAmbientCreateManyAndReturnArgs>(args?: SelectSubset<T, SensorMetricsAmbientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorMetricsAmbientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SensorMetricsAmbient.
     * @param {SensorMetricsAmbientDeleteArgs} args - Arguments to delete one SensorMetricsAmbient.
     * @example
     * // Delete one SensorMetricsAmbient
     * const SensorMetricsAmbient = await prisma.sensorMetricsAmbient.delete({
     *   where: {
     *     // ... filter to delete one SensorMetricsAmbient
     *   }
     * })
     * 
     */
    delete<T extends SensorMetricsAmbientDeleteArgs>(args: SelectSubset<T, SensorMetricsAmbientDeleteArgs<ExtArgs>>): Prisma__SensorMetricsAmbientClient<$Result.GetResult<Prisma.$SensorMetricsAmbientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SensorMetricsAmbient.
     * @param {SensorMetricsAmbientUpdateArgs} args - Arguments to update one SensorMetricsAmbient.
     * @example
     * // Update one SensorMetricsAmbient
     * const sensorMetricsAmbient = await prisma.sensorMetricsAmbient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SensorMetricsAmbientUpdateArgs>(args: SelectSubset<T, SensorMetricsAmbientUpdateArgs<ExtArgs>>): Prisma__SensorMetricsAmbientClient<$Result.GetResult<Prisma.$SensorMetricsAmbientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SensorMetricsAmbients.
     * @param {SensorMetricsAmbientDeleteManyArgs} args - Arguments to filter SensorMetricsAmbients to delete.
     * @example
     * // Delete a few SensorMetricsAmbients
     * const { count } = await prisma.sensorMetricsAmbient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SensorMetricsAmbientDeleteManyArgs>(args?: SelectSubset<T, SensorMetricsAmbientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SensorMetricsAmbients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsAmbientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SensorMetricsAmbients
     * const sensorMetricsAmbient = await prisma.sensorMetricsAmbient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SensorMetricsAmbientUpdateManyArgs>(args: SelectSubset<T, SensorMetricsAmbientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SensorMetricsAmbients and returns the data updated in the database.
     * @param {SensorMetricsAmbientUpdateManyAndReturnArgs} args - Arguments to update many SensorMetricsAmbients.
     * @example
     * // Update many SensorMetricsAmbients
     * const sensorMetricsAmbient = await prisma.sensorMetricsAmbient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SensorMetricsAmbients and only return the `sensorId`
     * const sensorMetricsAmbientWithSensorIdOnly = await prisma.sensorMetricsAmbient.updateManyAndReturn({
     *   select: { sensorId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SensorMetricsAmbientUpdateManyAndReturnArgs>(args: SelectSubset<T, SensorMetricsAmbientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorMetricsAmbientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SensorMetricsAmbient.
     * @param {SensorMetricsAmbientUpsertArgs} args - Arguments to update or create a SensorMetricsAmbient.
     * @example
     * // Update or create a SensorMetricsAmbient
     * const sensorMetricsAmbient = await prisma.sensorMetricsAmbient.upsert({
     *   create: {
     *     // ... data to create a SensorMetricsAmbient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SensorMetricsAmbient we want to update
     *   }
     * })
     */
    upsert<T extends SensorMetricsAmbientUpsertArgs>(args: SelectSubset<T, SensorMetricsAmbientUpsertArgs<ExtArgs>>): Prisma__SensorMetricsAmbientClient<$Result.GetResult<Prisma.$SensorMetricsAmbientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SensorMetricsAmbients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsAmbientCountArgs} args - Arguments to filter SensorMetricsAmbients to count.
     * @example
     * // Count the number of SensorMetricsAmbients
     * const count = await prisma.sensorMetricsAmbient.count({
     *   where: {
     *     // ... the filter for the SensorMetricsAmbients we want to count
     *   }
     * })
    **/
    count<T extends SensorMetricsAmbientCountArgs>(
      args?: Subset<T, SensorMetricsAmbientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SensorMetricsAmbientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SensorMetricsAmbient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsAmbientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SensorMetricsAmbientAggregateArgs>(args: Subset<T, SensorMetricsAmbientAggregateArgs>): Prisma.PrismaPromise<GetSensorMetricsAmbientAggregateType<T>>

    /**
     * Group by SensorMetricsAmbient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsAmbientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SensorMetricsAmbientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SensorMetricsAmbientGroupByArgs['orderBy'] }
        : { orderBy?: SensorMetricsAmbientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SensorMetricsAmbientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSensorMetricsAmbientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SensorMetricsAmbient model
   */
  readonly fields: SensorMetricsAmbientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SensorMetricsAmbient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SensorMetricsAmbientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sensor<T extends SensorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SensorDefaultArgs<ExtArgs>>): Prisma__SensorClient<$Result.GetResult<Prisma.$SensorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SensorMetricsAmbient model
   */
  interface SensorMetricsAmbientFieldRefs {
    readonly sensorId: FieldRef<"SensorMetricsAmbient", 'String'>
    readonly eventTime: FieldRef<"SensorMetricsAmbient", 'DateTime'>
    readonly temperature: FieldRef<"SensorMetricsAmbient", 'Float'>
    readonly humidity: FieldRef<"SensorMetricsAmbient", 'Float'>
    readonly solarRadiation: FieldRef<"SensorMetricsAmbient", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * SensorMetricsAmbient findUnique
   */
  export type SensorMetricsAmbientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAmbient
     */
    select?: SensorMetricsAmbientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAmbient
     */
    omit?: SensorMetricsAmbientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAmbientInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsAmbient to fetch.
     */
    where: SensorMetricsAmbientWhereUniqueInput
  }

  /**
   * SensorMetricsAmbient findUniqueOrThrow
   */
  export type SensorMetricsAmbientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAmbient
     */
    select?: SensorMetricsAmbientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAmbient
     */
    omit?: SensorMetricsAmbientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAmbientInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsAmbient to fetch.
     */
    where: SensorMetricsAmbientWhereUniqueInput
  }

  /**
   * SensorMetricsAmbient findFirst
   */
  export type SensorMetricsAmbientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAmbient
     */
    select?: SensorMetricsAmbientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAmbient
     */
    omit?: SensorMetricsAmbientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAmbientInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsAmbient to fetch.
     */
    where?: SensorMetricsAmbientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorMetricsAmbients to fetch.
     */
    orderBy?: SensorMetricsAmbientOrderByWithRelationInput | SensorMetricsAmbientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SensorMetricsAmbients.
     */
    cursor?: SensorMetricsAmbientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorMetricsAmbients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorMetricsAmbients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SensorMetricsAmbients.
     */
    distinct?: SensorMetricsAmbientScalarFieldEnum | SensorMetricsAmbientScalarFieldEnum[]
  }

  /**
   * SensorMetricsAmbient findFirstOrThrow
   */
  export type SensorMetricsAmbientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAmbient
     */
    select?: SensorMetricsAmbientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAmbient
     */
    omit?: SensorMetricsAmbientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAmbientInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsAmbient to fetch.
     */
    where?: SensorMetricsAmbientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorMetricsAmbients to fetch.
     */
    orderBy?: SensorMetricsAmbientOrderByWithRelationInput | SensorMetricsAmbientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SensorMetricsAmbients.
     */
    cursor?: SensorMetricsAmbientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorMetricsAmbients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorMetricsAmbients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SensorMetricsAmbients.
     */
    distinct?: SensorMetricsAmbientScalarFieldEnum | SensorMetricsAmbientScalarFieldEnum[]
  }

  /**
   * SensorMetricsAmbient findMany
   */
  export type SensorMetricsAmbientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAmbient
     */
    select?: SensorMetricsAmbientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAmbient
     */
    omit?: SensorMetricsAmbientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAmbientInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsAmbients to fetch.
     */
    where?: SensorMetricsAmbientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorMetricsAmbients to fetch.
     */
    orderBy?: SensorMetricsAmbientOrderByWithRelationInput | SensorMetricsAmbientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SensorMetricsAmbients.
     */
    cursor?: SensorMetricsAmbientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorMetricsAmbients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorMetricsAmbients.
     */
    skip?: number
    distinct?: SensorMetricsAmbientScalarFieldEnum | SensorMetricsAmbientScalarFieldEnum[]
  }

  /**
   * SensorMetricsAmbient create
   */
  export type SensorMetricsAmbientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAmbient
     */
    select?: SensorMetricsAmbientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAmbient
     */
    omit?: SensorMetricsAmbientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAmbientInclude<ExtArgs> | null
    /**
     * The data needed to create a SensorMetricsAmbient.
     */
    data: XOR<SensorMetricsAmbientCreateInput, SensorMetricsAmbientUncheckedCreateInput>
  }

  /**
   * SensorMetricsAmbient createMany
   */
  export type SensorMetricsAmbientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SensorMetricsAmbients.
     */
    data: SensorMetricsAmbientCreateManyInput | SensorMetricsAmbientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SensorMetricsAmbient createManyAndReturn
   */
  export type SensorMetricsAmbientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAmbient
     */
    select?: SensorMetricsAmbientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAmbient
     */
    omit?: SensorMetricsAmbientOmit<ExtArgs> | null
    /**
     * The data used to create many SensorMetricsAmbients.
     */
    data: SensorMetricsAmbientCreateManyInput | SensorMetricsAmbientCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAmbientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SensorMetricsAmbient update
   */
  export type SensorMetricsAmbientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAmbient
     */
    select?: SensorMetricsAmbientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAmbient
     */
    omit?: SensorMetricsAmbientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAmbientInclude<ExtArgs> | null
    /**
     * The data needed to update a SensorMetricsAmbient.
     */
    data: XOR<SensorMetricsAmbientUpdateInput, SensorMetricsAmbientUncheckedUpdateInput>
    /**
     * Choose, which SensorMetricsAmbient to update.
     */
    where: SensorMetricsAmbientWhereUniqueInput
  }

  /**
   * SensorMetricsAmbient updateMany
   */
  export type SensorMetricsAmbientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SensorMetricsAmbients.
     */
    data: XOR<SensorMetricsAmbientUpdateManyMutationInput, SensorMetricsAmbientUncheckedUpdateManyInput>
    /**
     * Filter which SensorMetricsAmbients to update
     */
    where?: SensorMetricsAmbientWhereInput
    /**
     * Limit how many SensorMetricsAmbients to update.
     */
    limit?: number
  }

  /**
   * SensorMetricsAmbient updateManyAndReturn
   */
  export type SensorMetricsAmbientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAmbient
     */
    select?: SensorMetricsAmbientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAmbient
     */
    omit?: SensorMetricsAmbientOmit<ExtArgs> | null
    /**
     * The data used to update SensorMetricsAmbients.
     */
    data: XOR<SensorMetricsAmbientUpdateManyMutationInput, SensorMetricsAmbientUncheckedUpdateManyInput>
    /**
     * Filter which SensorMetricsAmbients to update
     */
    where?: SensorMetricsAmbientWhereInput
    /**
     * Limit how many SensorMetricsAmbients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAmbientIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SensorMetricsAmbient upsert
   */
  export type SensorMetricsAmbientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAmbient
     */
    select?: SensorMetricsAmbientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAmbient
     */
    omit?: SensorMetricsAmbientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAmbientInclude<ExtArgs> | null
    /**
     * The filter to search for the SensorMetricsAmbient to update in case it exists.
     */
    where: SensorMetricsAmbientWhereUniqueInput
    /**
     * In case the SensorMetricsAmbient found by the `where` argument doesn't exist, create a new SensorMetricsAmbient with this data.
     */
    create: XOR<SensorMetricsAmbientCreateInput, SensorMetricsAmbientUncheckedCreateInput>
    /**
     * In case the SensorMetricsAmbient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SensorMetricsAmbientUpdateInput, SensorMetricsAmbientUncheckedUpdateInput>
  }

  /**
   * SensorMetricsAmbient delete
   */
  export type SensorMetricsAmbientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAmbient
     */
    select?: SensorMetricsAmbientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAmbient
     */
    omit?: SensorMetricsAmbientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAmbientInclude<ExtArgs> | null
    /**
     * Filter which SensorMetricsAmbient to delete.
     */
    where: SensorMetricsAmbientWhereUniqueInput
  }

  /**
   * SensorMetricsAmbient deleteMany
   */
  export type SensorMetricsAmbientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SensorMetricsAmbients to delete
     */
    where?: SensorMetricsAmbientWhereInput
    /**
     * Limit how many SensorMetricsAmbients to delete.
     */
    limit?: number
  }

  /**
   * SensorMetricsAmbient without action
   */
  export type SensorMetricsAmbientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAmbient
     */
    select?: SensorMetricsAmbientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAmbient
     */
    omit?: SensorMetricsAmbientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAmbientInclude<ExtArgs> | null
  }


  /**
   * Model SensorMetricsTraffic
   */

  export type AggregateSensorMetricsTraffic = {
    _count: SensorMetricsTrafficCountAggregateOutputType | null
    _avg: SensorMetricsTrafficAvgAggregateOutputType | null
    _sum: SensorMetricsTrafficSumAggregateOutputType | null
    _min: SensorMetricsTrafficMinAggregateOutputType | null
    _max: SensorMetricsTrafficMaxAggregateOutputType | null
  }

  export type SensorMetricsTrafficAvgAggregateOutputType = {
    vehicleDensity: number | null
    avgSpeed: number | null
    flowRate: number | null
    occupancy: number | null
    congestionIndex: number | null
  }

  export type SensorMetricsTrafficSumAggregateOutputType = {
    vehicleDensity: number | null
    avgSpeed: number | null
    flowRate: number | null
    occupancy: number | null
    congestionIndex: number | null
  }

  export type SensorMetricsTrafficMinAggregateOutputType = {
    sensorId: string | null
    eventTime: Date | null
    vehicleDensity: number | null
    avgSpeed: number | null
    flowRate: number | null
    occupancy: number | null
    congestionIndex: number | null
  }

  export type SensorMetricsTrafficMaxAggregateOutputType = {
    sensorId: string | null
    eventTime: Date | null
    vehicleDensity: number | null
    avgSpeed: number | null
    flowRate: number | null
    occupancy: number | null
    congestionIndex: number | null
  }

  export type SensorMetricsTrafficCountAggregateOutputType = {
    sensorId: number
    eventTime: number
    vehicleDensity: number
    avgSpeed: number
    flowRate: number
    occupancy: number
    congestionIndex: number
    _all: number
  }


  export type SensorMetricsTrafficAvgAggregateInputType = {
    vehicleDensity?: true
    avgSpeed?: true
    flowRate?: true
    occupancy?: true
    congestionIndex?: true
  }

  export type SensorMetricsTrafficSumAggregateInputType = {
    vehicleDensity?: true
    avgSpeed?: true
    flowRate?: true
    occupancy?: true
    congestionIndex?: true
  }

  export type SensorMetricsTrafficMinAggregateInputType = {
    sensorId?: true
    eventTime?: true
    vehicleDensity?: true
    avgSpeed?: true
    flowRate?: true
    occupancy?: true
    congestionIndex?: true
  }

  export type SensorMetricsTrafficMaxAggregateInputType = {
    sensorId?: true
    eventTime?: true
    vehicleDensity?: true
    avgSpeed?: true
    flowRate?: true
    occupancy?: true
    congestionIndex?: true
  }

  export type SensorMetricsTrafficCountAggregateInputType = {
    sensorId?: true
    eventTime?: true
    vehicleDensity?: true
    avgSpeed?: true
    flowRate?: true
    occupancy?: true
    congestionIndex?: true
    _all?: true
  }

  export type SensorMetricsTrafficAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SensorMetricsTraffic to aggregate.
     */
    where?: SensorMetricsTrafficWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorMetricsTraffics to fetch.
     */
    orderBy?: SensorMetricsTrafficOrderByWithRelationInput | SensorMetricsTrafficOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SensorMetricsTrafficWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorMetricsTraffics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorMetricsTraffics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SensorMetricsTraffics
    **/
    _count?: true | SensorMetricsTrafficCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SensorMetricsTrafficAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SensorMetricsTrafficSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SensorMetricsTrafficMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SensorMetricsTrafficMaxAggregateInputType
  }

  export type GetSensorMetricsTrafficAggregateType<T extends SensorMetricsTrafficAggregateArgs> = {
        [P in keyof T & keyof AggregateSensorMetricsTraffic]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSensorMetricsTraffic[P]>
      : GetScalarType<T[P], AggregateSensorMetricsTraffic[P]>
  }




  export type SensorMetricsTrafficGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SensorMetricsTrafficWhereInput
    orderBy?: SensorMetricsTrafficOrderByWithAggregationInput | SensorMetricsTrafficOrderByWithAggregationInput[]
    by: SensorMetricsTrafficScalarFieldEnum[] | SensorMetricsTrafficScalarFieldEnum
    having?: SensorMetricsTrafficScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SensorMetricsTrafficCountAggregateInputType | true
    _avg?: SensorMetricsTrafficAvgAggregateInputType
    _sum?: SensorMetricsTrafficSumAggregateInputType
    _min?: SensorMetricsTrafficMinAggregateInputType
    _max?: SensorMetricsTrafficMaxAggregateInputType
  }

  export type SensorMetricsTrafficGroupByOutputType = {
    sensorId: string
    eventTime: Date
    vehicleDensity: number
    avgSpeed: number
    flowRate: number
    occupancy: number
    congestionIndex: number
    _count: SensorMetricsTrafficCountAggregateOutputType | null
    _avg: SensorMetricsTrafficAvgAggregateOutputType | null
    _sum: SensorMetricsTrafficSumAggregateOutputType | null
    _min: SensorMetricsTrafficMinAggregateOutputType | null
    _max: SensorMetricsTrafficMaxAggregateOutputType | null
  }

  type GetSensorMetricsTrafficGroupByPayload<T extends SensorMetricsTrafficGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SensorMetricsTrafficGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SensorMetricsTrafficGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SensorMetricsTrafficGroupByOutputType[P]>
            : GetScalarType<T[P], SensorMetricsTrafficGroupByOutputType[P]>
        }
      >
    >


  export type SensorMetricsTrafficSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sensorId?: boolean
    eventTime?: boolean
    vehicleDensity?: boolean
    avgSpeed?: boolean
    flowRate?: boolean
    occupancy?: boolean
    congestionIndex?: boolean
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sensorMetricsTraffic"]>

  export type SensorMetricsTrafficSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sensorId?: boolean
    eventTime?: boolean
    vehicleDensity?: boolean
    avgSpeed?: boolean
    flowRate?: boolean
    occupancy?: boolean
    congestionIndex?: boolean
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sensorMetricsTraffic"]>

  export type SensorMetricsTrafficSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sensorId?: boolean
    eventTime?: boolean
    vehicleDensity?: boolean
    avgSpeed?: boolean
    flowRate?: boolean
    occupancy?: boolean
    congestionIndex?: boolean
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sensorMetricsTraffic"]>

  export type SensorMetricsTrafficSelectScalar = {
    sensorId?: boolean
    eventTime?: boolean
    vehicleDensity?: boolean
    avgSpeed?: boolean
    flowRate?: boolean
    occupancy?: boolean
    congestionIndex?: boolean
  }

  export type SensorMetricsTrafficOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"sensorId" | "eventTime" | "vehicleDensity" | "avgSpeed" | "flowRate" | "occupancy" | "congestionIndex", ExtArgs["result"]["sensorMetricsTraffic"]>
  export type SensorMetricsTrafficInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }
  export type SensorMetricsTrafficIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }
  export type SensorMetricsTrafficIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }

  export type $SensorMetricsTrafficPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SensorMetricsTraffic"
    objects: {
      sensor: Prisma.$SensorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      sensorId: string
      eventTime: Date
      vehicleDensity: number
      avgSpeed: number
      flowRate: number
      occupancy: number
      congestionIndex: number
    }, ExtArgs["result"]["sensorMetricsTraffic"]>
    composites: {}
  }

  type SensorMetricsTrafficGetPayload<S extends boolean | null | undefined | SensorMetricsTrafficDefaultArgs> = $Result.GetResult<Prisma.$SensorMetricsTrafficPayload, S>

  type SensorMetricsTrafficCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SensorMetricsTrafficFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SensorMetricsTrafficCountAggregateInputType | true
    }

  export interface SensorMetricsTrafficDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SensorMetricsTraffic'], meta: { name: 'SensorMetricsTraffic' } }
    /**
     * Find zero or one SensorMetricsTraffic that matches the filter.
     * @param {SensorMetricsTrafficFindUniqueArgs} args - Arguments to find a SensorMetricsTraffic
     * @example
     * // Get one SensorMetricsTraffic
     * const sensorMetricsTraffic = await prisma.sensorMetricsTraffic.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SensorMetricsTrafficFindUniqueArgs>(args: SelectSubset<T, SensorMetricsTrafficFindUniqueArgs<ExtArgs>>): Prisma__SensorMetricsTrafficClient<$Result.GetResult<Prisma.$SensorMetricsTrafficPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SensorMetricsTraffic that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SensorMetricsTrafficFindUniqueOrThrowArgs} args - Arguments to find a SensorMetricsTraffic
     * @example
     * // Get one SensorMetricsTraffic
     * const sensorMetricsTraffic = await prisma.sensorMetricsTraffic.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SensorMetricsTrafficFindUniqueOrThrowArgs>(args: SelectSubset<T, SensorMetricsTrafficFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SensorMetricsTrafficClient<$Result.GetResult<Prisma.$SensorMetricsTrafficPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SensorMetricsTraffic that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsTrafficFindFirstArgs} args - Arguments to find a SensorMetricsTraffic
     * @example
     * // Get one SensorMetricsTraffic
     * const sensorMetricsTraffic = await prisma.sensorMetricsTraffic.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SensorMetricsTrafficFindFirstArgs>(args?: SelectSubset<T, SensorMetricsTrafficFindFirstArgs<ExtArgs>>): Prisma__SensorMetricsTrafficClient<$Result.GetResult<Prisma.$SensorMetricsTrafficPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SensorMetricsTraffic that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsTrafficFindFirstOrThrowArgs} args - Arguments to find a SensorMetricsTraffic
     * @example
     * // Get one SensorMetricsTraffic
     * const sensorMetricsTraffic = await prisma.sensorMetricsTraffic.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SensorMetricsTrafficFindFirstOrThrowArgs>(args?: SelectSubset<T, SensorMetricsTrafficFindFirstOrThrowArgs<ExtArgs>>): Prisma__SensorMetricsTrafficClient<$Result.GetResult<Prisma.$SensorMetricsTrafficPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SensorMetricsTraffics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsTrafficFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SensorMetricsTraffics
     * const sensorMetricsTraffics = await prisma.sensorMetricsTraffic.findMany()
     * 
     * // Get first 10 SensorMetricsTraffics
     * const sensorMetricsTraffics = await prisma.sensorMetricsTraffic.findMany({ take: 10 })
     * 
     * // Only select the `sensorId`
     * const sensorMetricsTrafficWithSensorIdOnly = await prisma.sensorMetricsTraffic.findMany({ select: { sensorId: true } })
     * 
     */
    findMany<T extends SensorMetricsTrafficFindManyArgs>(args?: SelectSubset<T, SensorMetricsTrafficFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorMetricsTrafficPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SensorMetricsTraffic.
     * @param {SensorMetricsTrafficCreateArgs} args - Arguments to create a SensorMetricsTraffic.
     * @example
     * // Create one SensorMetricsTraffic
     * const SensorMetricsTraffic = await prisma.sensorMetricsTraffic.create({
     *   data: {
     *     // ... data to create a SensorMetricsTraffic
     *   }
     * })
     * 
     */
    create<T extends SensorMetricsTrafficCreateArgs>(args: SelectSubset<T, SensorMetricsTrafficCreateArgs<ExtArgs>>): Prisma__SensorMetricsTrafficClient<$Result.GetResult<Prisma.$SensorMetricsTrafficPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SensorMetricsTraffics.
     * @param {SensorMetricsTrafficCreateManyArgs} args - Arguments to create many SensorMetricsTraffics.
     * @example
     * // Create many SensorMetricsTraffics
     * const sensorMetricsTraffic = await prisma.sensorMetricsTraffic.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SensorMetricsTrafficCreateManyArgs>(args?: SelectSubset<T, SensorMetricsTrafficCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SensorMetricsTraffics and returns the data saved in the database.
     * @param {SensorMetricsTrafficCreateManyAndReturnArgs} args - Arguments to create many SensorMetricsTraffics.
     * @example
     * // Create many SensorMetricsTraffics
     * const sensorMetricsTraffic = await prisma.sensorMetricsTraffic.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SensorMetricsTraffics and only return the `sensorId`
     * const sensorMetricsTrafficWithSensorIdOnly = await prisma.sensorMetricsTraffic.createManyAndReturn({
     *   select: { sensorId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SensorMetricsTrafficCreateManyAndReturnArgs>(args?: SelectSubset<T, SensorMetricsTrafficCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorMetricsTrafficPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SensorMetricsTraffic.
     * @param {SensorMetricsTrafficDeleteArgs} args - Arguments to delete one SensorMetricsTraffic.
     * @example
     * // Delete one SensorMetricsTraffic
     * const SensorMetricsTraffic = await prisma.sensorMetricsTraffic.delete({
     *   where: {
     *     // ... filter to delete one SensorMetricsTraffic
     *   }
     * })
     * 
     */
    delete<T extends SensorMetricsTrafficDeleteArgs>(args: SelectSubset<T, SensorMetricsTrafficDeleteArgs<ExtArgs>>): Prisma__SensorMetricsTrafficClient<$Result.GetResult<Prisma.$SensorMetricsTrafficPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SensorMetricsTraffic.
     * @param {SensorMetricsTrafficUpdateArgs} args - Arguments to update one SensorMetricsTraffic.
     * @example
     * // Update one SensorMetricsTraffic
     * const sensorMetricsTraffic = await prisma.sensorMetricsTraffic.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SensorMetricsTrafficUpdateArgs>(args: SelectSubset<T, SensorMetricsTrafficUpdateArgs<ExtArgs>>): Prisma__SensorMetricsTrafficClient<$Result.GetResult<Prisma.$SensorMetricsTrafficPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SensorMetricsTraffics.
     * @param {SensorMetricsTrafficDeleteManyArgs} args - Arguments to filter SensorMetricsTraffics to delete.
     * @example
     * // Delete a few SensorMetricsTraffics
     * const { count } = await prisma.sensorMetricsTraffic.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SensorMetricsTrafficDeleteManyArgs>(args?: SelectSubset<T, SensorMetricsTrafficDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SensorMetricsTraffics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsTrafficUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SensorMetricsTraffics
     * const sensorMetricsTraffic = await prisma.sensorMetricsTraffic.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SensorMetricsTrafficUpdateManyArgs>(args: SelectSubset<T, SensorMetricsTrafficUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SensorMetricsTraffics and returns the data updated in the database.
     * @param {SensorMetricsTrafficUpdateManyAndReturnArgs} args - Arguments to update many SensorMetricsTraffics.
     * @example
     * // Update many SensorMetricsTraffics
     * const sensorMetricsTraffic = await prisma.sensorMetricsTraffic.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SensorMetricsTraffics and only return the `sensorId`
     * const sensorMetricsTrafficWithSensorIdOnly = await prisma.sensorMetricsTraffic.updateManyAndReturn({
     *   select: { sensorId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SensorMetricsTrafficUpdateManyAndReturnArgs>(args: SelectSubset<T, SensorMetricsTrafficUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorMetricsTrafficPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SensorMetricsTraffic.
     * @param {SensorMetricsTrafficUpsertArgs} args - Arguments to update or create a SensorMetricsTraffic.
     * @example
     * // Update or create a SensorMetricsTraffic
     * const sensorMetricsTraffic = await prisma.sensorMetricsTraffic.upsert({
     *   create: {
     *     // ... data to create a SensorMetricsTraffic
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SensorMetricsTraffic we want to update
     *   }
     * })
     */
    upsert<T extends SensorMetricsTrafficUpsertArgs>(args: SelectSubset<T, SensorMetricsTrafficUpsertArgs<ExtArgs>>): Prisma__SensorMetricsTrafficClient<$Result.GetResult<Prisma.$SensorMetricsTrafficPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SensorMetricsTraffics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsTrafficCountArgs} args - Arguments to filter SensorMetricsTraffics to count.
     * @example
     * // Count the number of SensorMetricsTraffics
     * const count = await prisma.sensorMetricsTraffic.count({
     *   where: {
     *     // ... the filter for the SensorMetricsTraffics we want to count
     *   }
     * })
    **/
    count<T extends SensorMetricsTrafficCountArgs>(
      args?: Subset<T, SensorMetricsTrafficCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SensorMetricsTrafficCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SensorMetricsTraffic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsTrafficAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SensorMetricsTrafficAggregateArgs>(args: Subset<T, SensorMetricsTrafficAggregateArgs>): Prisma.PrismaPromise<GetSensorMetricsTrafficAggregateType<T>>

    /**
     * Group by SensorMetricsTraffic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsTrafficGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SensorMetricsTrafficGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SensorMetricsTrafficGroupByArgs['orderBy'] }
        : { orderBy?: SensorMetricsTrafficGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SensorMetricsTrafficGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSensorMetricsTrafficGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SensorMetricsTraffic model
   */
  readonly fields: SensorMetricsTrafficFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SensorMetricsTraffic.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SensorMetricsTrafficClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sensor<T extends SensorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SensorDefaultArgs<ExtArgs>>): Prisma__SensorClient<$Result.GetResult<Prisma.$SensorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SensorMetricsTraffic model
   */
  interface SensorMetricsTrafficFieldRefs {
    readonly sensorId: FieldRef<"SensorMetricsTraffic", 'String'>
    readonly eventTime: FieldRef<"SensorMetricsTraffic", 'DateTime'>
    readonly vehicleDensity: FieldRef<"SensorMetricsTraffic", 'Float'>
    readonly avgSpeed: FieldRef<"SensorMetricsTraffic", 'Float'>
    readonly flowRate: FieldRef<"SensorMetricsTraffic", 'Float'>
    readonly occupancy: FieldRef<"SensorMetricsTraffic", 'Float'>
    readonly congestionIndex: FieldRef<"SensorMetricsTraffic", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * SensorMetricsTraffic findUnique
   */
  export type SensorMetricsTrafficFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsTraffic
     */
    select?: SensorMetricsTrafficSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsTraffic
     */
    omit?: SensorMetricsTrafficOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsTrafficInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsTraffic to fetch.
     */
    where: SensorMetricsTrafficWhereUniqueInput
  }

  /**
   * SensorMetricsTraffic findUniqueOrThrow
   */
  export type SensorMetricsTrafficFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsTraffic
     */
    select?: SensorMetricsTrafficSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsTraffic
     */
    omit?: SensorMetricsTrafficOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsTrafficInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsTraffic to fetch.
     */
    where: SensorMetricsTrafficWhereUniqueInput
  }

  /**
   * SensorMetricsTraffic findFirst
   */
  export type SensorMetricsTrafficFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsTraffic
     */
    select?: SensorMetricsTrafficSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsTraffic
     */
    omit?: SensorMetricsTrafficOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsTrafficInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsTraffic to fetch.
     */
    where?: SensorMetricsTrafficWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorMetricsTraffics to fetch.
     */
    orderBy?: SensorMetricsTrafficOrderByWithRelationInput | SensorMetricsTrafficOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SensorMetricsTraffics.
     */
    cursor?: SensorMetricsTrafficWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorMetricsTraffics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorMetricsTraffics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SensorMetricsTraffics.
     */
    distinct?: SensorMetricsTrafficScalarFieldEnum | SensorMetricsTrafficScalarFieldEnum[]
  }

  /**
   * SensorMetricsTraffic findFirstOrThrow
   */
  export type SensorMetricsTrafficFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsTraffic
     */
    select?: SensorMetricsTrafficSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsTraffic
     */
    omit?: SensorMetricsTrafficOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsTrafficInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsTraffic to fetch.
     */
    where?: SensorMetricsTrafficWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorMetricsTraffics to fetch.
     */
    orderBy?: SensorMetricsTrafficOrderByWithRelationInput | SensorMetricsTrafficOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SensorMetricsTraffics.
     */
    cursor?: SensorMetricsTrafficWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorMetricsTraffics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorMetricsTraffics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SensorMetricsTraffics.
     */
    distinct?: SensorMetricsTrafficScalarFieldEnum | SensorMetricsTrafficScalarFieldEnum[]
  }

  /**
   * SensorMetricsTraffic findMany
   */
  export type SensorMetricsTrafficFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsTraffic
     */
    select?: SensorMetricsTrafficSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsTraffic
     */
    omit?: SensorMetricsTrafficOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsTrafficInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsTraffics to fetch.
     */
    where?: SensorMetricsTrafficWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorMetricsTraffics to fetch.
     */
    orderBy?: SensorMetricsTrafficOrderByWithRelationInput | SensorMetricsTrafficOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SensorMetricsTraffics.
     */
    cursor?: SensorMetricsTrafficWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorMetricsTraffics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorMetricsTraffics.
     */
    skip?: number
    distinct?: SensorMetricsTrafficScalarFieldEnum | SensorMetricsTrafficScalarFieldEnum[]
  }

  /**
   * SensorMetricsTraffic create
   */
  export type SensorMetricsTrafficCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsTraffic
     */
    select?: SensorMetricsTrafficSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsTraffic
     */
    omit?: SensorMetricsTrafficOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsTrafficInclude<ExtArgs> | null
    /**
     * The data needed to create a SensorMetricsTraffic.
     */
    data: XOR<SensorMetricsTrafficCreateInput, SensorMetricsTrafficUncheckedCreateInput>
  }

  /**
   * SensorMetricsTraffic createMany
   */
  export type SensorMetricsTrafficCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SensorMetricsTraffics.
     */
    data: SensorMetricsTrafficCreateManyInput | SensorMetricsTrafficCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SensorMetricsTraffic createManyAndReturn
   */
  export type SensorMetricsTrafficCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsTraffic
     */
    select?: SensorMetricsTrafficSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsTraffic
     */
    omit?: SensorMetricsTrafficOmit<ExtArgs> | null
    /**
     * The data used to create many SensorMetricsTraffics.
     */
    data: SensorMetricsTrafficCreateManyInput | SensorMetricsTrafficCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsTrafficIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SensorMetricsTraffic update
   */
  export type SensorMetricsTrafficUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsTraffic
     */
    select?: SensorMetricsTrafficSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsTraffic
     */
    omit?: SensorMetricsTrafficOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsTrafficInclude<ExtArgs> | null
    /**
     * The data needed to update a SensorMetricsTraffic.
     */
    data: XOR<SensorMetricsTrafficUpdateInput, SensorMetricsTrafficUncheckedUpdateInput>
    /**
     * Choose, which SensorMetricsTraffic to update.
     */
    where: SensorMetricsTrafficWhereUniqueInput
  }

  /**
   * SensorMetricsTraffic updateMany
   */
  export type SensorMetricsTrafficUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SensorMetricsTraffics.
     */
    data: XOR<SensorMetricsTrafficUpdateManyMutationInput, SensorMetricsTrafficUncheckedUpdateManyInput>
    /**
     * Filter which SensorMetricsTraffics to update
     */
    where?: SensorMetricsTrafficWhereInput
    /**
     * Limit how many SensorMetricsTraffics to update.
     */
    limit?: number
  }

  /**
   * SensorMetricsTraffic updateManyAndReturn
   */
  export type SensorMetricsTrafficUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsTraffic
     */
    select?: SensorMetricsTrafficSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsTraffic
     */
    omit?: SensorMetricsTrafficOmit<ExtArgs> | null
    /**
     * The data used to update SensorMetricsTraffics.
     */
    data: XOR<SensorMetricsTrafficUpdateManyMutationInput, SensorMetricsTrafficUncheckedUpdateManyInput>
    /**
     * Filter which SensorMetricsTraffics to update
     */
    where?: SensorMetricsTrafficWhereInput
    /**
     * Limit how many SensorMetricsTraffics to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsTrafficIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SensorMetricsTraffic upsert
   */
  export type SensorMetricsTrafficUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsTraffic
     */
    select?: SensorMetricsTrafficSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsTraffic
     */
    omit?: SensorMetricsTrafficOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsTrafficInclude<ExtArgs> | null
    /**
     * The filter to search for the SensorMetricsTraffic to update in case it exists.
     */
    where: SensorMetricsTrafficWhereUniqueInput
    /**
     * In case the SensorMetricsTraffic found by the `where` argument doesn't exist, create a new SensorMetricsTraffic with this data.
     */
    create: XOR<SensorMetricsTrafficCreateInput, SensorMetricsTrafficUncheckedCreateInput>
    /**
     * In case the SensorMetricsTraffic was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SensorMetricsTrafficUpdateInput, SensorMetricsTrafficUncheckedUpdateInput>
  }

  /**
   * SensorMetricsTraffic delete
   */
  export type SensorMetricsTrafficDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsTraffic
     */
    select?: SensorMetricsTrafficSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsTraffic
     */
    omit?: SensorMetricsTrafficOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsTrafficInclude<ExtArgs> | null
    /**
     * Filter which SensorMetricsTraffic to delete.
     */
    where: SensorMetricsTrafficWhereUniqueInput
  }

  /**
   * SensorMetricsTraffic deleteMany
   */
  export type SensorMetricsTrafficDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SensorMetricsTraffics to delete
     */
    where?: SensorMetricsTrafficWhereInput
    /**
     * Limit how many SensorMetricsTraffics to delete.
     */
    limit?: number
  }

  /**
   * SensorMetricsTraffic without action
   */
  export type SensorMetricsTrafficDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsTraffic
     */
    select?: SensorMetricsTrafficSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsTraffic
     */
    omit?: SensorMetricsTrafficOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsTrafficInclude<ExtArgs> | null
  }


  /**
   * Model SensorMetricsAir
   */

  export type AggregateSensorMetricsAir = {
    _count: SensorMetricsAirCountAggregateOutputType | null
    _avg: SensorMetricsAirAvgAggregateOutputType | null
    _sum: SensorMetricsAirSumAggregateOutputType | null
    _min: SensorMetricsAirMinAggregateOutputType | null
    _max: SensorMetricsAirMaxAggregateOutputType | null
  }

  export type SensorMetricsAirAvgAggregateOutputType = {
    pm10: number | null
    co: number | null
    co2: number | null
    no2: number | null
    o3: number | null
    so2: number | null
  }

  export type SensorMetricsAirSumAggregateOutputType = {
    pm10: number | null
    co: number | null
    co2: number | null
    no2: number | null
    o3: number | null
    so2: number | null
  }

  export type SensorMetricsAirMinAggregateOutputType = {
    sensorId: string | null
    eventTime: Date | null
    pm10: number | null
    co: number | null
    co2: number | null
    no2: number | null
    o3: number | null
    so2: number | null
  }

  export type SensorMetricsAirMaxAggregateOutputType = {
    sensorId: string | null
    eventTime: Date | null
    pm10: number | null
    co: number | null
    co2: number | null
    no2: number | null
    o3: number | null
    so2: number | null
  }

  export type SensorMetricsAirCountAggregateOutputType = {
    sensorId: number
    eventTime: number
    pm10: number
    co: number
    co2: number
    no2: number
    o3: number
    so2: number
    _all: number
  }


  export type SensorMetricsAirAvgAggregateInputType = {
    pm10?: true
    co?: true
    co2?: true
    no2?: true
    o3?: true
    so2?: true
  }

  export type SensorMetricsAirSumAggregateInputType = {
    pm10?: true
    co?: true
    co2?: true
    no2?: true
    o3?: true
    so2?: true
  }

  export type SensorMetricsAirMinAggregateInputType = {
    sensorId?: true
    eventTime?: true
    pm10?: true
    co?: true
    co2?: true
    no2?: true
    o3?: true
    so2?: true
  }

  export type SensorMetricsAirMaxAggregateInputType = {
    sensorId?: true
    eventTime?: true
    pm10?: true
    co?: true
    co2?: true
    no2?: true
    o3?: true
    so2?: true
  }

  export type SensorMetricsAirCountAggregateInputType = {
    sensorId?: true
    eventTime?: true
    pm10?: true
    co?: true
    co2?: true
    no2?: true
    o3?: true
    so2?: true
    _all?: true
  }

  export type SensorMetricsAirAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SensorMetricsAir to aggregate.
     */
    where?: SensorMetricsAirWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorMetricsAirs to fetch.
     */
    orderBy?: SensorMetricsAirOrderByWithRelationInput | SensorMetricsAirOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SensorMetricsAirWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorMetricsAirs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorMetricsAirs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SensorMetricsAirs
    **/
    _count?: true | SensorMetricsAirCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SensorMetricsAirAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SensorMetricsAirSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SensorMetricsAirMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SensorMetricsAirMaxAggregateInputType
  }

  export type GetSensorMetricsAirAggregateType<T extends SensorMetricsAirAggregateArgs> = {
        [P in keyof T & keyof AggregateSensorMetricsAir]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSensorMetricsAir[P]>
      : GetScalarType<T[P], AggregateSensorMetricsAir[P]>
  }




  export type SensorMetricsAirGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SensorMetricsAirWhereInput
    orderBy?: SensorMetricsAirOrderByWithAggregationInput | SensorMetricsAirOrderByWithAggregationInput[]
    by: SensorMetricsAirScalarFieldEnum[] | SensorMetricsAirScalarFieldEnum
    having?: SensorMetricsAirScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SensorMetricsAirCountAggregateInputType | true
    _avg?: SensorMetricsAirAvgAggregateInputType
    _sum?: SensorMetricsAirSumAggregateInputType
    _min?: SensorMetricsAirMinAggregateInputType
    _max?: SensorMetricsAirMaxAggregateInputType
  }

  export type SensorMetricsAirGroupByOutputType = {
    sensorId: string
    eventTime: Date
    pm10: number
    co: number
    co2: number
    no2: number
    o3: number
    so2: number
    _count: SensorMetricsAirCountAggregateOutputType | null
    _avg: SensorMetricsAirAvgAggregateOutputType | null
    _sum: SensorMetricsAirSumAggregateOutputType | null
    _min: SensorMetricsAirMinAggregateOutputType | null
    _max: SensorMetricsAirMaxAggregateOutputType | null
  }

  type GetSensorMetricsAirGroupByPayload<T extends SensorMetricsAirGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SensorMetricsAirGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SensorMetricsAirGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SensorMetricsAirGroupByOutputType[P]>
            : GetScalarType<T[P], SensorMetricsAirGroupByOutputType[P]>
        }
      >
    >


  export type SensorMetricsAirSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sensorId?: boolean
    eventTime?: boolean
    pm10?: boolean
    co?: boolean
    co2?: boolean
    no2?: boolean
    o3?: boolean
    so2?: boolean
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sensorMetricsAir"]>

  export type SensorMetricsAirSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sensorId?: boolean
    eventTime?: boolean
    pm10?: boolean
    co?: boolean
    co2?: boolean
    no2?: boolean
    o3?: boolean
    so2?: boolean
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sensorMetricsAir"]>

  export type SensorMetricsAirSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sensorId?: boolean
    eventTime?: boolean
    pm10?: boolean
    co?: boolean
    co2?: boolean
    no2?: boolean
    o3?: boolean
    so2?: boolean
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sensorMetricsAir"]>

  export type SensorMetricsAirSelectScalar = {
    sensorId?: boolean
    eventTime?: boolean
    pm10?: boolean
    co?: boolean
    co2?: boolean
    no2?: boolean
    o3?: boolean
    so2?: boolean
  }

  export type SensorMetricsAirOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"sensorId" | "eventTime" | "pm10" | "co" | "co2" | "no2" | "o3" | "so2", ExtArgs["result"]["sensorMetricsAir"]>
  export type SensorMetricsAirInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }
  export type SensorMetricsAirIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }
  export type SensorMetricsAirIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }

  export type $SensorMetricsAirPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SensorMetricsAir"
    objects: {
      sensor: Prisma.$SensorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      sensorId: string
      eventTime: Date
      pm10: number
      co: number
      co2: number
      no2: number
      o3: number
      so2: number
    }, ExtArgs["result"]["sensorMetricsAir"]>
    composites: {}
  }

  type SensorMetricsAirGetPayload<S extends boolean | null | undefined | SensorMetricsAirDefaultArgs> = $Result.GetResult<Prisma.$SensorMetricsAirPayload, S>

  type SensorMetricsAirCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SensorMetricsAirFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SensorMetricsAirCountAggregateInputType | true
    }

  export interface SensorMetricsAirDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SensorMetricsAir'], meta: { name: 'SensorMetricsAir' } }
    /**
     * Find zero or one SensorMetricsAir that matches the filter.
     * @param {SensorMetricsAirFindUniqueArgs} args - Arguments to find a SensorMetricsAir
     * @example
     * // Get one SensorMetricsAir
     * const sensorMetricsAir = await prisma.sensorMetricsAir.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SensorMetricsAirFindUniqueArgs>(args: SelectSubset<T, SensorMetricsAirFindUniqueArgs<ExtArgs>>): Prisma__SensorMetricsAirClient<$Result.GetResult<Prisma.$SensorMetricsAirPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SensorMetricsAir that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SensorMetricsAirFindUniqueOrThrowArgs} args - Arguments to find a SensorMetricsAir
     * @example
     * // Get one SensorMetricsAir
     * const sensorMetricsAir = await prisma.sensorMetricsAir.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SensorMetricsAirFindUniqueOrThrowArgs>(args: SelectSubset<T, SensorMetricsAirFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SensorMetricsAirClient<$Result.GetResult<Prisma.$SensorMetricsAirPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SensorMetricsAir that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsAirFindFirstArgs} args - Arguments to find a SensorMetricsAir
     * @example
     * // Get one SensorMetricsAir
     * const sensorMetricsAir = await prisma.sensorMetricsAir.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SensorMetricsAirFindFirstArgs>(args?: SelectSubset<T, SensorMetricsAirFindFirstArgs<ExtArgs>>): Prisma__SensorMetricsAirClient<$Result.GetResult<Prisma.$SensorMetricsAirPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SensorMetricsAir that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsAirFindFirstOrThrowArgs} args - Arguments to find a SensorMetricsAir
     * @example
     * // Get one SensorMetricsAir
     * const sensorMetricsAir = await prisma.sensorMetricsAir.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SensorMetricsAirFindFirstOrThrowArgs>(args?: SelectSubset<T, SensorMetricsAirFindFirstOrThrowArgs<ExtArgs>>): Prisma__SensorMetricsAirClient<$Result.GetResult<Prisma.$SensorMetricsAirPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SensorMetricsAirs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsAirFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SensorMetricsAirs
     * const sensorMetricsAirs = await prisma.sensorMetricsAir.findMany()
     * 
     * // Get first 10 SensorMetricsAirs
     * const sensorMetricsAirs = await prisma.sensorMetricsAir.findMany({ take: 10 })
     * 
     * // Only select the `sensorId`
     * const sensorMetricsAirWithSensorIdOnly = await prisma.sensorMetricsAir.findMany({ select: { sensorId: true } })
     * 
     */
    findMany<T extends SensorMetricsAirFindManyArgs>(args?: SelectSubset<T, SensorMetricsAirFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorMetricsAirPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SensorMetricsAir.
     * @param {SensorMetricsAirCreateArgs} args - Arguments to create a SensorMetricsAir.
     * @example
     * // Create one SensorMetricsAir
     * const SensorMetricsAir = await prisma.sensorMetricsAir.create({
     *   data: {
     *     // ... data to create a SensorMetricsAir
     *   }
     * })
     * 
     */
    create<T extends SensorMetricsAirCreateArgs>(args: SelectSubset<T, SensorMetricsAirCreateArgs<ExtArgs>>): Prisma__SensorMetricsAirClient<$Result.GetResult<Prisma.$SensorMetricsAirPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SensorMetricsAirs.
     * @param {SensorMetricsAirCreateManyArgs} args - Arguments to create many SensorMetricsAirs.
     * @example
     * // Create many SensorMetricsAirs
     * const sensorMetricsAir = await prisma.sensorMetricsAir.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SensorMetricsAirCreateManyArgs>(args?: SelectSubset<T, SensorMetricsAirCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SensorMetricsAirs and returns the data saved in the database.
     * @param {SensorMetricsAirCreateManyAndReturnArgs} args - Arguments to create many SensorMetricsAirs.
     * @example
     * // Create many SensorMetricsAirs
     * const sensorMetricsAir = await prisma.sensorMetricsAir.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SensorMetricsAirs and only return the `sensorId`
     * const sensorMetricsAirWithSensorIdOnly = await prisma.sensorMetricsAir.createManyAndReturn({
     *   select: { sensorId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SensorMetricsAirCreateManyAndReturnArgs>(args?: SelectSubset<T, SensorMetricsAirCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorMetricsAirPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SensorMetricsAir.
     * @param {SensorMetricsAirDeleteArgs} args - Arguments to delete one SensorMetricsAir.
     * @example
     * // Delete one SensorMetricsAir
     * const SensorMetricsAir = await prisma.sensorMetricsAir.delete({
     *   where: {
     *     // ... filter to delete one SensorMetricsAir
     *   }
     * })
     * 
     */
    delete<T extends SensorMetricsAirDeleteArgs>(args: SelectSubset<T, SensorMetricsAirDeleteArgs<ExtArgs>>): Prisma__SensorMetricsAirClient<$Result.GetResult<Prisma.$SensorMetricsAirPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SensorMetricsAir.
     * @param {SensorMetricsAirUpdateArgs} args - Arguments to update one SensorMetricsAir.
     * @example
     * // Update one SensorMetricsAir
     * const sensorMetricsAir = await prisma.sensorMetricsAir.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SensorMetricsAirUpdateArgs>(args: SelectSubset<T, SensorMetricsAirUpdateArgs<ExtArgs>>): Prisma__SensorMetricsAirClient<$Result.GetResult<Prisma.$SensorMetricsAirPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SensorMetricsAirs.
     * @param {SensorMetricsAirDeleteManyArgs} args - Arguments to filter SensorMetricsAirs to delete.
     * @example
     * // Delete a few SensorMetricsAirs
     * const { count } = await prisma.sensorMetricsAir.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SensorMetricsAirDeleteManyArgs>(args?: SelectSubset<T, SensorMetricsAirDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SensorMetricsAirs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsAirUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SensorMetricsAirs
     * const sensorMetricsAir = await prisma.sensorMetricsAir.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SensorMetricsAirUpdateManyArgs>(args: SelectSubset<T, SensorMetricsAirUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SensorMetricsAirs and returns the data updated in the database.
     * @param {SensorMetricsAirUpdateManyAndReturnArgs} args - Arguments to update many SensorMetricsAirs.
     * @example
     * // Update many SensorMetricsAirs
     * const sensorMetricsAir = await prisma.sensorMetricsAir.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SensorMetricsAirs and only return the `sensorId`
     * const sensorMetricsAirWithSensorIdOnly = await prisma.sensorMetricsAir.updateManyAndReturn({
     *   select: { sensorId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SensorMetricsAirUpdateManyAndReturnArgs>(args: SelectSubset<T, SensorMetricsAirUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorMetricsAirPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SensorMetricsAir.
     * @param {SensorMetricsAirUpsertArgs} args - Arguments to update or create a SensorMetricsAir.
     * @example
     * // Update or create a SensorMetricsAir
     * const sensorMetricsAir = await prisma.sensorMetricsAir.upsert({
     *   create: {
     *     // ... data to create a SensorMetricsAir
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SensorMetricsAir we want to update
     *   }
     * })
     */
    upsert<T extends SensorMetricsAirUpsertArgs>(args: SelectSubset<T, SensorMetricsAirUpsertArgs<ExtArgs>>): Prisma__SensorMetricsAirClient<$Result.GetResult<Prisma.$SensorMetricsAirPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SensorMetricsAirs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsAirCountArgs} args - Arguments to filter SensorMetricsAirs to count.
     * @example
     * // Count the number of SensorMetricsAirs
     * const count = await prisma.sensorMetricsAir.count({
     *   where: {
     *     // ... the filter for the SensorMetricsAirs we want to count
     *   }
     * })
    **/
    count<T extends SensorMetricsAirCountArgs>(
      args?: Subset<T, SensorMetricsAirCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SensorMetricsAirCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SensorMetricsAir.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsAirAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SensorMetricsAirAggregateArgs>(args: Subset<T, SensorMetricsAirAggregateArgs>): Prisma.PrismaPromise<GetSensorMetricsAirAggregateType<T>>

    /**
     * Group by SensorMetricsAir.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsAirGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SensorMetricsAirGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SensorMetricsAirGroupByArgs['orderBy'] }
        : { orderBy?: SensorMetricsAirGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SensorMetricsAirGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSensorMetricsAirGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SensorMetricsAir model
   */
  readonly fields: SensorMetricsAirFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SensorMetricsAir.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SensorMetricsAirClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sensor<T extends SensorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SensorDefaultArgs<ExtArgs>>): Prisma__SensorClient<$Result.GetResult<Prisma.$SensorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SensorMetricsAir model
   */
  interface SensorMetricsAirFieldRefs {
    readonly sensorId: FieldRef<"SensorMetricsAir", 'String'>
    readonly eventTime: FieldRef<"SensorMetricsAir", 'DateTime'>
    readonly pm10: FieldRef<"SensorMetricsAir", 'Float'>
    readonly co: FieldRef<"SensorMetricsAir", 'Float'>
    readonly co2: FieldRef<"SensorMetricsAir", 'Float'>
    readonly no2: FieldRef<"SensorMetricsAir", 'Float'>
    readonly o3: FieldRef<"SensorMetricsAir", 'Float'>
    readonly so2: FieldRef<"SensorMetricsAir", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * SensorMetricsAir findUnique
   */
  export type SensorMetricsAirFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAir
     */
    select?: SensorMetricsAirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAir
     */
    omit?: SensorMetricsAirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAirInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsAir to fetch.
     */
    where: SensorMetricsAirWhereUniqueInput
  }

  /**
   * SensorMetricsAir findUniqueOrThrow
   */
  export type SensorMetricsAirFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAir
     */
    select?: SensorMetricsAirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAir
     */
    omit?: SensorMetricsAirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAirInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsAir to fetch.
     */
    where: SensorMetricsAirWhereUniqueInput
  }

  /**
   * SensorMetricsAir findFirst
   */
  export type SensorMetricsAirFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAir
     */
    select?: SensorMetricsAirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAir
     */
    omit?: SensorMetricsAirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAirInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsAir to fetch.
     */
    where?: SensorMetricsAirWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorMetricsAirs to fetch.
     */
    orderBy?: SensorMetricsAirOrderByWithRelationInput | SensorMetricsAirOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SensorMetricsAirs.
     */
    cursor?: SensorMetricsAirWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorMetricsAirs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorMetricsAirs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SensorMetricsAirs.
     */
    distinct?: SensorMetricsAirScalarFieldEnum | SensorMetricsAirScalarFieldEnum[]
  }

  /**
   * SensorMetricsAir findFirstOrThrow
   */
  export type SensorMetricsAirFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAir
     */
    select?: SensorMetricsAirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAir
     */
    omit?: SensorMetricsAirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAirInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsAir to fetch.
     */
    where?: SensorMetricsAirWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorMetricsAirs to fetch.
     */
    orderBy?: SensorMetricsAirOrderByWithRelationInput | SensorMetricsAirOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SensorMetricsAirs.
     */
    cursor?: SensorMetricsAirWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorMetricsAirs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorMetricsAirs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SensorMetricsAirs.
     */
    distinct?: SensorMetricsAirScalarFieldEnum | SensorMetricsAirScalarFieldEnum[]
  }

  /**
   * SensorMetricsAir findMany
   */
  export type SensorMetricsAirFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAir
     */
    select?: SensorMetricsAirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAir
     */
    omit?: SensorMetricsAirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAirInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsAirs to fetch.
     */
    where?: SensorMetricsAirWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorMetricsAirs to fetch.
     */
    orderBy?: SensorMetricsAirOrderByWithRelationInput | SensorMetricsAirOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SensorMetricsAirs.
     */
    cursor?: SensorMetricsAirWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorMetricsAirs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorMetricsAirs.
     */
    skip?: number
    distinct?: SensorMetricsAirScalarFieldEnum | SensorMetricsAirScalarFieldEnum[]
  }

  /**
   * SensorMetricsAir create
   */
  export type SensorMetricsAirCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAir
     */
    select?: SensorMetricsAirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAir
     */
    omit?: SensorMetricsAirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAirInclude<ExtArgs> | null
    /**
     * The data needed to create a SensorMetricsAir.
     */
    data: XOR<SensorMetricsAirCreateInput, SensorMetricsAirUncheckedCreateInput>
  }

  /**
   * SensorMetricsAir createMany
   */
  export type SensorMetricsAirCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SensorMetricsAirs.
     */
    data: SensorMetricsAirCreateManyInput | SensorMetricsAirCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SensorMetricsAir createManyAndReturn
   */
  export type SensorMetricsAirCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAir
     */
    select?: SensorMetricsAirSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAir
     */
    omit?: SensorMetricsAirOmit<ExtArgs> | null
    /**
     * The data used to create many SensorMetricsAirs.
     */
    data: SensorMetricsAirCreateManyInput | SensorMetricsAirCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAirIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SensorMetricsAir update
   */
  export type SensorMetricsAirUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAir
     */
    select?: SensorMetricsAirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAir
     */
    omit?: SensorMetricsAirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAirInclude<ExtArgs> | null
    /**
     * The data needed to update a SensorMetricsAir.
     */
    data: XOR<SensorMetricsAirUpdateInput, SensorMetricsAirUncheckedUpdateInput>
    /**
     * Choose, which SensorMetricsAir to update.
     */
    where: SensorMetricsAirWhereUniqueInput
  }

  /**
   * SensorMetricsAir updateMany
   */
  export type SensorMetricsAirUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SensorMetricsAirs.
     */
    data: XOR<SensorMetricsAirUpdateManyMutationInput, SensorMetricsAirUncheckedUpdateManyInput>
    /**
     * Filter which SensorMetricsAirs to update
     */
    where?: SensorMetricsAirWhereInput
    /**
     * Limit how many SensorMetricsAirs to update.
     */
    limit?: number
  }

  /**
   * SensorMetricsAir updateManyAndReturn
   */
  export type SensorMetricsAirUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAir
     */
    select?: SensorMetricsAirSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAir
     */
    omit?: SensorMetricsAirOmit<ExtArgs> | null
    /**
     * The data used to update SensorMetricsAirs.
     */
    data: XOR<SensorMetricsAirUpdateManyMutationInput, SensorMetricsAirUncheckedUpdateManyInput>
    /**
     * Filter which SensorMetricsAirs to update
     */
    where?: SensorMetricsAirWhereInput
    /**
     * Limit how many SensorMetricsAirs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAirIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SensorMetricsAir upsert
   */
  export type SensorMetricsAirUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAir
     */
    select?: SensorMetricsAirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAir
     */
    omit?: SensorMetricsAirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAirInclude<ExtArgs> | null
    /**
     * The filter to search for the SensorMetricsAir to update in case it exists.
     */
    where: SensorMetricsAirWhereUniqueInput
    /**
     * In case the SensorMetricsAir found by the `where` argument doesn't exist, create a new SensorMetricsAir with this data.
     */
    create: XOR<SensorMetricsAirCreateInput, SensorMetricsAirUncheckedCreateInput>
    /**
     * In case the SensorMetricsAir was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SensorMetricsAirUpdateInput, SensorMetricsAirUncheckedUpdateInput>
  }

  /**
   * SensorMetricsAir delete
   */
  export type SensorMetricsAirDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAir
     */
    select?: SensorMetricsAirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAir
     */
    omit?: SensorMetricsAirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAirInclude<ExtArgs> | null
    /**
     * Filter which SensorMetricsAir to delete.
     */
    where: SensorMetricsAirWhereUniqueInput
  }

  /**
   * SensorMetricsAir deleteMany
   */
  export type SensorMetricsAirDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SensorMetricsAirs to delete
     */
    where?: SensorMetricsAirWhereInput
    /**
     * Limit how many SensorMetricsAirs to delete.
     */
    limit?: number
  }

  /**
   * SensorMetricsAir without action
   */
  export type SensorMetricsAirDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsAir
     */
    select?: SensorMetricsAirSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsAir
     */
    omit?: SensorMetricsAirOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsAirInclude<ExtArgs> | null
  }


  /**
   * Model SensorMetricsWaterUsage
   */

  export type AggregateSensorMetricsWaterUsage = {
    _count: SensorMetricsWaterUsageCountAggregateOutputType | null
    _avg: SensorMetricsWaterUsageAvgAggregateOutputType | null
    _sum: SensorMetricsWaterUsageSumAggregateOutputType | null
    _min: SensorMetricsWaterUsageMinAggregateOutputType | null
    _max: SensorMetricsWaterUsageMaxAggregateOutputType | null
  }

  export type SensorMetricsWaterUsageAvgAggregateOutputType = {
    usageLiters: number | null
  }

  export type SensorMetricsWaterUsageSumAggregateOutputType = {
    usageLiters: number | null
  }

  export type SensorMetricsWaterUsageMinAggregateOutputType = {
    sensorId: string | null
    eventTime: Date | null
    usageLiters: number | null
  }

  export type SensorMetricsWaterUsageMaxAggregateOutputType = {
    sensorId: string | null
    eventTime: Date | null
    usageLiters: number | null
  }

  export type SensorMetricsWaterUsageCountAggregateOutputType = {
    sensorId: number
    eventTime: number
    usageLiters: number
    _all: number
  }


  export type SensorMetricsWaterUsageAvgAggregateInputType = {
    usageLiters?: true
  }

  export type SensorMetricsWaterUsageSumAggregateInputType = {
    usageLiters?: true
  }

  export type SensorMetricsWaterUsageMinAggregateInputType = {
    sensorId?: true
    eventTime?: true
    usageLiters?: true
  }

  export type SensorMetricsWaterUsageMaxAggregateInputType = {
    sensorId?: true
    eventTime?: true
    usageLiters?: true
  }

  export type SensorMetricsWaterUsageCountAggregateInputType = {
    sensorId?: true
    eventTime?: true
    usageLiters?: true
    _all?: true
  }

  export type SensorMetricsWaterUsageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SensorMetricsWaterUsage to aggregate.
     */
    where?: SensorMetricsWaterUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorMetricsWaterUsages to fetch.
     */
    orderBy?: SensorMetricsWaterUsageOrderByWithRelationInput | SensorMetricsWaterUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SensorMetricsWaterUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorMetricsWaterUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorMetricsWaterUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SensorMetricsWaterUsages
    **/
    _count?: true | SensorMetricsWaterUsageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SensorMetricsWaterUsageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SensorMetricsWaterUsageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SensorMetricsWaterUsageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SensorMetricsWaterUsageMaxAggregateInputType
  }

  export type GetSensorMetricsWaterUsageAggregateType<T extends SensorMetricsWaterUsageAggregateArgs> = {
        [P in keyof T & keyof AggregateSensorMetricsWaterUsage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSensorMetricsWaterUsage[P]>
      : GetScalarType<T[P], AggregateSensorMetricsWaterUsage[P]>
  }




  export type SensorMetricsWaterUsageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SensorMetricsWaterUsageWhereInput
    orderBy?: SensorMetricsWaterUsageOrderByWithAggregationInput | SensorMetricsWaterUsageOrderByWithAggregationInput[]
    by: SensorMetricsWaterUsageScalarFieldEnum[] | SensorMetricsWaterUsageScalarFieldEnum
    having?: SensorMetricsWaterUsageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SensorMetricsWaterUsageCountAggregateInputType | true
    _avg?: SensorMetricsWaterUsageAvgAggregateInputType
    _sum?: SensorMetricsWaterUsageSumAggregateInputType
    _min?: SensorMetricsWaterUsageMinAggregateInputType
    _max?: SensorMetricsWaterUsageMaxAggregateInputType
  }

  export type SensorMetricsWaterUsageGroupByOutputType = {
    sensorId: string
    eventTime: Date
    usageLiters: number
    _count: SensorMetricsWaterUsageCountAggregateOutputType | null
    _avg: SensorMetricsWaterUsageAvgAggregateOutputType | null
    _sum: SensorMetricsWaterUsageSumAggregateOutputType | null
    _min: SensorMetricsWaterUsageMinAggregateOutputType | null
    _max: SensorMetricsWaterUsageMaxAggregateOutputType | null
  }

  type GetSensorMetricsWaterUsageGroupByPayload<T extends SensorMetricsWaterUsageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SensorMetricsWaterUsageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SensorMetricsWaterUsageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SensorMetricsWaterUsageGroupByOutputType[P]>
            : GetScalarType<T[P], SensorMetricsWaterUsageGroupByOutputType[P]>
        }
      >
    >


  export type SensorMetricsWaterUsageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sensorId?: boolean
    eventTime?: boolean
    usageLiters?: boolean
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sensorMetricsWaterUsage"]>

  export type SensorMetricsWaterUsageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sensorId?: boolean
    eventTime?: boolean
    usageLiters?: boolean
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sensorMetricsWaterUsage"]>

  export type SensorMetricsWaterUsageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sensorId?: boolean
    eventTime?: boolean
    usageLiters?: boolean
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sensorMetricsWaterUsage"]>

  export type SensorMetricsWaterUsageSelectScalar = {
    sensorId?: boolean
    eventTime?: boolean
    usageLiters?: boolean
  }

  export type SensorMetricsWaterUsageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"sensorId" | "eventTime" | "usageLiters", ExtArgs["result"]["sensorMetricsWaterUsage"]>
  export type SensorMetricsWaterUsageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }
  export type SensorMetricsWaterUsageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }
  export type SensorMetricsWaterUsageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }

  export type $SensorMetricsWaterUsagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SensorMetricsWaterUsage"
    objects: {
      sensor: Prisma.$SensorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      sensorId: string
      eventTime: Date
      usageLiters: number
    }, ExtArgs["result"]["sensorMetricsWaterUsage"]>
    composites: {}
  }

  type SensorMetricsWaterUsageGetPayload<S extends boolean | null | undefined | SensorMetricsWaterUsageDefaultArgs> = $Result.GetResult<Prisma.$SensorMetricsWaterUsagePayload, S>

  type SensorMetricsWaterUsageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SensorMetricsWaterUsageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SensorMetricsWaterUsageCountAggregateInputType | true
    }

  export interface SensorMetricsWaterUsageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SensorMetricsWaterUsage'], meta: { name: 'SensorMetricsWaterUsage' } }
    /**
     * Find zero or one SensorMetricsWaterUsage that matches the filter.
     * @param {SensorMetricsWaterUsageFindUniqueArgs} args - Arguments to find a SensorMetricsWaterUsage
     * @example
     * // Get one SensorMetricsWaterUsage
     * const sensorMetricsWaterUsage = await prisma.sensorMetricsWaterUsage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SensorMetricsWaterUsageFindUniqueArgs>(args: SelectSubset<T, SensorMetricsWaterUsageFindUniqueArgs<ExtArgs>>): Prisma__SensorMetricsWaterUsageClient<$Result.GetResult<Prisma.$SensorMetricsWaterUsagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SensorMetricsWaterUsage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SensorMetricsWaterUsageFindUniqueOrThrowArgs} args - Arguments to find a SensorMetricsWaterUsage
     * @example
     * // Get one SensorMetricsWaterUsage
     * const sensorMetricsWaterUsage = await prisma.sensorMetricsWaterUsage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SensorMetricsWaterUsageFindUniqueOrThrowArgs>(args: SelectSubset<T, SensorMetricsWaterUsageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SensorMetricsWaterUsageClient<$Result.GetResult<Prisma.$SensorMetricsWaterUsagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SensorMetricsWaterUsage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsWaterUsageFindFirstArgs} args - Arguments to find a SensorMetricsWaterUsage
     * @example
     * // Get one SensorMetricsWaterUsage
     * const sensorMetricsWaterUsage = await prisma.sensorMetricsWaterUsage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SensorMetricsWaterUsageFindFirstArgs>(args?: SelectSubset<T, SensorMetricsWaterUsageFindFirstArgs<ExtArgs>>): Prisma__SensorMetricsWaterUsageClient<$Result.GetResult<Prisma.$SensorMetricsWaterUsagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SensorMetricsWaterUsage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsWaterUsageFindFirstOrThrowArgs} args - Arguments to find a SensorMetricsWaterUsage
     * @example
     * // Get one SensorMetricsWaterUsage
     * const sensorMetricsWaterUsage = await prisma.sensorMetricsWaterUsage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SensorMetricsWaterUsageFindFirstOrThrowArgs>(args?: SelectSubset<T, SensorMetricsWaterUsageFindFirstOrThrowArgs<ExtArgs>>): Prisma__SensorMetricsWaterUsageClient<$Result.GetResult<Prisma.$SensorMetricsWaterUsagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SensorMetricsWaterUsages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsWaterUsageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SensorMetricsWaterUsages
     * const sensorMetricsWaterUsages = await prisma.sensorMetricsWaterUsage.findMany()
     * 
     * // Get first 10 SensorMetricsWaterUsages
     * const sensorMetricsWaterUsages = await prisma.sensorMetricsWaterUsage.findMany({ take: 10 })
     * 
     * // Only select the `sensorId`
     * const sensorMetricsWaterUsageWithSensorIdOnly = await prisma.sensorMetricsWaterUsage.findMany({ select: { sensorId: true } })
     * 
     */
    findMany<T extends SensorMetricsWaterUsageFindManyArgs>(args?: SelectSubset<T, SensorMetricsWaterUsageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorMetricsWaterUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SensorMetricsWaterUsage.
     * @param {SensorMetricsWaterUsageCreateArgs} args - Arguments to create a SensorMetricsWaterUsage.
     * @example
     * // Create one SensorMetricsWaterUsage
     * const SensorMetricsWaterUsage = await prisma.sensorMetricsWaterUsage.create({
     *   data: {
     *     // ... data to create a SensorMetricsWaterUsage
     *   }
     * })
     * 
     */
    create<T extends SensorMetricsWaterUsageCreateArgs>(args: SelectSubset<T, SensorMetricsWaterUsageCreateArgs<ExtArgs>>): Prisma__SensorMetricsWaterUsageClient<$Result.GetResult<Prisma.$SensorMetricsWaterUsagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SensorMetricsWaterUsages.
     * @param {SensorMetricsWaterUsageCreateManyArgs} args - Arguments to create many SensorMetricsWaterUsages.
     * @example
     * // Create many SensorMetricsWaterUsages
     * const sensorMetricsWaterUsage = await prisma.sensorMetricsWaterUsage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SensorMetricsWaterUsageCreateManyArgs>(args?: SelectSubset<T, SensorMetricsWaterUsageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SensorMetricsWaterUsages and returns the data saved in the database.
     * @param {SensorMetricsWaterUsageCreateManyAndReturnArgs} args - Arguments to create many SensorMetricsWaterUsages.
     * @example
     * // Create many SensorMetricsWaterUsages
     * const sensorMetricsWaterUsage = await prisma.sensorMetricsWaterUsage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SensorMetricsWaterUsages and only return the `sensorId`
     * const sensorMetricsWaterUsageWithSensorIdOnly = await prisma.sensorMetricsWaterUsage.createManyAndReturn({
     *   select: { sensorId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SensorMetricsWaterUsageCreateManyAndReturnArgs>(args?: SelectSubset<T, SensorMetricsWaterUsageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorMetricsWaterUsagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SensorMetricsWaterUsage.
     * @param {SensorMetricsWaterUsageDeleteArgs} args - Arguments to delete one SensorMetricsWaterUsage.
     * @example
     * // Delete one SensorMetricsWaterUsage
     * const SensorMetricsWaterUsage = await prisma.sensorMetricsWaterUsage.delete({
     *   where: {
     *     // ... filter to delete one SensorMetricsWaterUsage
     *   }
     * })
     * 
     */
    delete<T extends SensorMetricsWaterUsageDeleteArgs>(args: SelectSubset<T, SensorMetricsWaterUsageDeleteArgs<ExtArgs>>): Prisma__SensorMetricsWaterUsageClient<$Result.GetResult<Prisma.$SensorMetricsWaterUsagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SensorMetricsWaterUsage.
     * @param {SensorMetricsWaterUsageUpdateArgs} args - Arguments to update one SensorMetricsWaterUsage.
     * @example
     * // Update one SensorMetricsWaterUsage
     * const sensorMetricsWaterUsage = await prisma.sensorMetricsWaterUsage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SensorMetricsWaterUsageUpdateArgs>(args: SelectSubset<T, SensorMetricsWaterUsageUpdateArgs<ExtArgs>>): Prisma__SensorMetricsWaterUsageClient<$Result.GetResult<Prisma.$SensorMetricsWaterUsagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SensorMetricsWaterUsages.
     * @param {SensorMetricsWaterUsageDeleteManyArgs} args - Arguments to filter SensorMetricsWaterUsages to delete.
     * @example
     * // Delete a few SensorMetricsWaterUsages
     * const { count } = await prisma.sensorMetricsWaterUsage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SensorMetricsWaterUsageDeleteManyArgs>(args?: SelectSubset<T, SensorMetricsWaterUsageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SensorMetricsWaterUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsWaterUsageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SensorMetricsWaterUsages
     * const sensorMetricsWaterUsage = await prisma.sensorMetricsWaterUsage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SensorMetricsWaterUsageUpdateManyArgs>(args: SelectSubset<T, SensorMetricsWaterUsageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SensorMetricsWaterUsages and returns the data updated in the database.
     * @param {SensorMetricsWaterUsageUpdateManyAndReturnArgs} args - Arguments to update many SensorMetricsWaterUsages.
     * @example
     * // Update many SensorMetricsWaterUsages
     * const sensorMetricsWaterUsage = await prisma.sensorMetricsWaterUsage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SensorMetricsWaterUsages and only return the `sensorId`
     * const sensorMetricsWaterUsageWithSensorIdOnly = await prisma.sensorMetricsWaterUsage.updateManyAndReturn({
     *   select: { sensorId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SensorMetricsWaterUsageUpdateManyAndReturnArgs>(args: SelectSubset<T, SensorMetricsWaterUsageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorMetricsWaterUsagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SensorMetricsWaterUsage.
     * @param {SensorMetricsWaterUsageUpsertArgs} args - Arguments to update or create a SensorMetricsWaterUsage.
     * @example
     * // Update or create a SensorMetricsWaterUsage
     * const sensorMetricsWaterUsage = await prisma.sensorMetricsWaterUsage.upsert({
     *   create: {
     *     // ... data to create a SensorMetricsWaterUsage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SensorMetricsWaterUsage we want to update
     *   }
     * })
     */
    upsert<T extends SensorMetricsWaterUsageUpsertArgs>(args: SelectSubset<T, SensorMetricsWaterUsageUpsertArgs<ExtArgs>>): Prisma__SensorMetricsWaterUsageClient<$Result.GetResult<Prisma.$SensorMetricsWaterUsagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SensorMetricsWaterUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsWaterUsageCountArgs} args - Arguments to filter SensorMetricsWaterUsages to count.
     * @example
     * // Count the number of SensorMetricsWaterUsages
     * const count = await prisma.sensorMetricsWaterUsage.count({
     *   where: {
     *     // ... the filter for the SensorMetricsWaterUsages we want to count
     *   }
     * })
    **/
    count<T extends SensorMetricsWaterUsageCountArgs>(
      args?: Subset<T, SensorMetricsWaterUsageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SensorMetricsWaterUsageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SensorMetricsWaterUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsWaterUsageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SensorMetricsWaterUsageAggregateArgs>(args: Subset<T, SensorMetricsWaterUsageAggregateArgs>): Prisma.PrismaPromise<GetSensorMetricsWaterUsageAggregateType<T>>

    /**
     * Group by SensorMetricsWaterUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsWaterUsageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SensorMetricsWaterUsageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SensorMetricsWaterUsageGroupByArgs['orderBy'] }
        : { orderBy?: SensorMetricsWaterUsageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SensorMetricsWaterUsageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSensorMetricsWaterUsageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SensorMetricsWaterUsage model
   */
  readonly fields: SensorMetricsWaterUsageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SensorMetricsWaterUsage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SensorMetricsWaterUsageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sensor<T extends SensorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SensorDefaultArgs<ExtArgs>>): Prisma__SensorClient<$Result.GetResult<Prisma.$SensorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SensorMetricsWaterUsage model
   */
  interface SensorMetricsWaterUsageFieldRefs {
    readonly sensorId: FieldRef<"SensorMetricsWaterUsage", 'String'>
    readonly eventTime: FieldRef<"SensorMetricsWaterUsage", 'DateTime'>
    readonly usageLiters: FieldRef<"SensorMetricsWaterUsage", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * SensorMetricsWaterUsage findUnique
   */
  export type SensorMetricsWaterUsageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterUsage
     */
    select?: SensorMetricsWaterUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterUsage
     */
    omit?: SensorMetricsWaterUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterUsageInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsWaterUsage to fetch.
     */
    where: SensorMetricsWaterUsageWhereUniqueInput
  }

  /**
   * SensorMetricsWaterUsage findUniqueOrThrow
   */
  export type SensorMetricsWaterUsageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterUsage
     */
    select?: SensorMetricsWaterUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterUsage
     */
    omit?: SensorMetricsWaterUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterUsageInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsWaterUsage to fetch.
     */
    where: SensorMetricsWaterUsageWhereUniqueInput
  }

  /**
   * SensorMetricsWaterUsage findFirst
   */
  export type SensorMetricsWaterUsageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterUsage
     */
    select?: SensorMetricsWaterUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterUsage
     */
    omit?: SensorMetricsWaterUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterUsageInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsWaterUsage to fetch.
     */
    where?: SensorMetricsWaterUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorMetricsWaterUsages to fetch.
     */
    orderBy?: SensorMetricsWaterUsageOrderByWithRelationInput | SensorMetricsWaterUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SensorMetricsWaterUsages.
     */
    cursor?: SensorMetricsWaterUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorMetricsWaterUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorMetricsWaterUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SensorMetricsWaterUsages.
     */
    distinct?: SensorMetricsWaterUsageScalarFieldEnum | SensorMetricsWaterUsageScalarFieldEnum[]
  }

  /**
   * SensorMetricsWaterUsage findFirstOrThrow
   */
  export type SensorMetricsWaterUsageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterUsage
     */
    select?: SensorMetricsWaterUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterUsage
     */
    omit?: SensorMetricsWaterUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterUsageInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsWaterUsage to fetch.
     */
    where?: SensorMetricsWaterUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorMetricsWaterUsages to fetch.
     */
    orderBy?: SensorMetricsWaterUsageOrderByWithRelationInput | SensorMetricsWaterUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SensorMetricsWaterUsages.
     */
    cursor?: SensorMetricsWaterUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorMetricsWaterUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorMetricsWaterUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SensorMetricsWaterUsages.
     */
    distinct?: SensorMetricsWaterUsageScalarFieldEnum | SensorMetricsWaterUsageScalarFieldEnum[]
  }

  /**
   * SensorMetricsWaterUsage findMany
   */
  export type SensorMetricsWaterUsageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterUsage
     */
    select?: SensorMetricsWaterUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterUsage
     */
    omit?: SensorMetricsWaterUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterUsageInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsWaterUsages to fetch.
     */
    where?: SensorMetricsWaterUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorMetricsWaterUsages to fetch.
     */
    orderBy?: SensorMetricsWaterUsageOrderByWithRelationInput | SensorMetricsWaterUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SensorMetricsWaterUsages.
     */
    cursor?: SensorMetricsWaterUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorMetricsWaterUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorMetricsWaterUsages.
     */
    skip?: number
    distinct?: SensorMetricsWaterUsageScalarFieldEnum | SensorMetricsWaterUsageScalarFieldEnum[]
  }

  /**
   * SensorMetricsWaterUsage create
   */
  export type SensorMetricsWaterUsageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterUsage
     */
    select?: SensorMetricsWaterUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterUsage
     */
    omit?: SensorMetricsWaterUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterUsageInclude<ExtArgs> | null
    /**
     * The data needed to create a SensorMetricsWaterUsage.
     */
    data: XOR<SensorMetricsWaterUsageCreateInput, SensorMetricsWaterUsageUncheckedCreateInput>
  }

  /**
   * SensorMetricsWaterUsage createMany
   */
  export type SensorMetricsWaterUsageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SensorMetricsWaterUsages.
     */
    data: SensorMetricsWaterUsageCreateManyInput | SensorMetricsWaterUsageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SensorMetricsWaterUsage createManyAndReturn
   */
  export type SensorMetricsWaterUsageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterUsage
     */
    select?: SensorMetricsWaterUsageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterUsage
     */
    omit?: SensorMetricsWaterUsageOmit<ExtArgs> | null
    /**
     * The data used to create many SensorMetricsWaterUsages.
     */
    data: SensorMetricsWaterUsageCreateManyInput | SensorMetricsWaterUsageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterUsageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SensorMetricsWaterUsage update
   */
  export type SensorMetricsWaterUsageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterUsage
     */
    select?: SensorMetricsWaterUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterUsage
     */
    omit?: SensorMetricsWaterUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterUsageInclude<ExtArgs> | null
    /**
     * The data needed to update a SensorMetricsWaterUsage.
     */
    data: XOR<SensorMetricsWaterUsageUpdateInput, SensorMetricsWaterUsageUncheckedUpdateInput>
    /**
     * Choose, which SensorMetricsWaterUsage to update.
     */
    where: SensorMetricsWaterUsageWhereUniqueInput
  }

  /**
   * SensorMetricsWaterUsage updateMany
   */
  export type SensorMetricsWaterUsageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SensorMetricsWaterUsages.
     */
    data: XOR<SensorMetricsWaterUsageUpdateManyMutationInput, SensorMetricsWaterUsageUncheckedUpdateManyInput>
    /**
     * Filter which SensorMetricsWaterUsages to update
     */
    where?: SensorMetricsWaterUsageWhereInput
    /**
     * Limit how many SensorMetricsWaterUsages to update.
     */
    limit?: number
  }

  /**
   * SensorMetricsWaterUsage updateManyAndReturn
   */
  export type SensorMetricsWaterUsageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterUsage
     */
    select?: SensorMetricsWaterUsageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterUsage
     */
    omit?: SensorMetricsWaterUsageOmit<ExtArgs> | null
    /**
     * The data used to update SensorMetricsWaterUsages.
     */
    data: XOR<SensorMetricsWaterUsageUpdateManyMutationInput, SensorMetricsWaterUsageUncheckedUpdateManyInput>
    /**
     * Filter which SensorMetricsWaterUsages to update
     */
    where?: SensorMetricsWaterUsageWhereInput
    /**
     * Limit how many SensorMetricsWaterUsages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterUsageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SensorMetricsWaterUsage upsert
   */
  export type SensorMetricsWaterUsageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterUsage
     */
    select?: SensorMetricsWaterUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterUsage
     */
    omit?: SensorMetricsWaterUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterUsageInclude<ExtArgs> | null
    /**
     * The filter to search for the SensorMetricsWaterUsage to update in case it exists.
     */
    where: SensorMetricsWaterUsageWhereUniqueInput
    /**
     * In case the SensorMetricsWaterUsage found by the `where` argument doesn't exist, create a new SensorMetricsWaterUsage with this data.
     */
    create: XOR<SensorMetricsWaterUsageCreateInput, SensorMetricsWaterUsageUncheckedCreateInput>
    /**
     * In case the SensorMetricsWaterUsage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SensorMetricsWaterUsageUpdateInput, SensorMetricsWaterUsageUncheckedUpdateInput>
  }

  /**
   * SensorMetricsWaterUsage delete
   */
  export type SensorMetricsWaterUsageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterUsage
     */
    select?: SensorMetricsWaterUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterUsage
     */
    omit?: SensorMetricsWaterUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterUsageInclude<ExtArgs> | null
    /**
     * Filter which SensorMetricsWaterUsage to delete.
     */
    where: SensorMetricsWaterUsageWhereUniqueInput
  }

  /**
   * SensorMetricsWaterUsage deleteMany
   */
  export type SensorMetricsWaterUsageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SensorMetricsWaterUsages to delete
     */
    where?: SensorMetricsWaterUsageWhereInput
    /**
     * Limit how many SensorMetricsWaterUsages to delete.
     */
    limit?: number
  }

  /**
   * SensorMetricsWaterUsage without action
   */
  export type SensorMetricsWaterUsageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterUsage
     */
    select?: SensorMetricsWaterUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterUsage
     */
    omit?: SensorMetricsWaterUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterUsageInclude<ExtArgs> | null
  }


  /**
   * Model SensorMetricsWaterQuality
   */

  export type AggregateSensorMetricsWaterQuality = {
    _count: SensorMetricsWaterQualityCountAggregateOutputType | null
    _avg: SensorMetricsWaterQualityAvgAggregateOutputType | null
    _sum: SensorMetricsWaterQualitySumAggregateOutputType | null
    _min: SensorMetricsWaterQualityMinAggregateOutputType | null
    _max: SensorMetricsWaterQualityMaxAggregateOutputType | null
  }

  export type SensorMetricsWaterQualityAvgAggregateOutputType = {
    waterTemperature: number | null
    phLevel: number | null
    turbidity: number | null
    dissolvedOxygen: number | null
    conductivity: number | null
  }

  export type SensorMetricsWaterQualitySumAggregateOutputType = {
    waterTemperature: number | null
    phLevel: number | null
    turbidity: number | null
    dissolvedOxygen: number | null
    conductivity: number | null
  }

  export type SensorMetricsWaterQualityMinAggregateOutputType = {
    sensorId: string | null
    eventTime: Date | null
    waterTemperature: number | null
    phLevel: number | null
    turbidity: number | null
    dissolvedOxygen: number | null
    conductivity: number | null
  }

  export type SensorMetricsWaterQualityMaxAggregateOutputType = {
    sensorId: string | null
    eventTime: Date | null
    waterTemperature: number | null
    phLevel: number | null
    turbidity: number | null
    dissolvedOxygen: number | null
    conductivity: number | null
  }

  export type SensorMetricsWaterQualityCountAggregateOutputType = {
    sensorId: number
    eventTime: number
    waterTemperature: number
    phLevel: number
    turbidity: number
    dissolvedOxygen: number
    conductivity: number
    _all: number
  }


  export type SensorMetricsWaterQualityAvgAggregateInputType = {
    waterTemperature?: true
    phLevel?: true
    turbidity?: true
    dissolvedOxygen?: true
    conductivity?: true
  }

  export type SensorMetricsWaterQualitySumAggregateInputType = {
    waterTemperature?: true
    phLevel?: true
    turbidity?: true
    dissolvedOxygen?: true
    conductivity?: true
  }

  export type SensorMetricsWaterQualityMinAggregateInputType = {
    sensorId?: true
    eventTime?: true
    waterTemperature?: true
    phLevel?: true
    turbidity?: true
    dissolvedOxygen?: true
    conductivity?: true
  }

  export type SensorMetricsWaterQualityMaxAggregateInputType = {
    sensorId?: true
    eventTime?: true
    waterTemperature?: true
    phLevel?: true
    turbidity?: true
    dissolvedOxygen?: true
    conductivity?: true
  }

  export type SensorMetricsWaterQualityCountAggregateInputType = {
    sensorId?: true
    eventTime?: true
    waterTemperature?: true
    phLevel?: true
    turbidity?: true
    dissolvedOxygen?: true
    conductivity?: true
    _all?: true
  }

  export type SensorMetricsWaterQualityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SensorMetricsWaterQuality to aggregate.
     */
    where?: SensorMetricsWaterQualityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorMetricsWaterQualities to fetch.
     */
    orderBy?: SensorMetricsWaterQualityOrderByWithRelationInput | SensorMetricsWaterQualityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SensorMetricsWaterQualityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorMetricsWaterQualities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorMetricsWaterQualities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SensorMetricsWaterQualities
    **/
    _count?: true | SensorMetricsWaterQualityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SensorMetricsWaterQualityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SensorMetricsWaterQualitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SensorMetricsWaterQualityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SensorMetricsWaterQualityMaxAggregateInputType
  }

  export type GetSensorMetricsWaterQualityAggregateType<T extends SensorMetricsWaterQualityAggregateArgs> = {
        [P in keyof T & keyof AggregateSensorMetricsWaterQuality]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSensorMetricsWaterQuality[P]>
      : GetScalarType<T[P], AggregateSensorMetricsWaterQuality[P]>
  }




  export type SensorMetricsWaterQualityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SensorMetricsWaterQualityWhereInput
    orderBy?: SensorMetricsWaterQualityOrderByWithAggregationInput | SensorMetricsWaterQualityOrderByWithAggregationInput[]
    by: SensorMetricsWaterQualityScalarFieldEnum[] | SensorMetricsWaterQualityScalarFieldEnum
    having?: SensorMetricsWaterQualityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SensorMetricsWaterQualityCountAggregateInputType | true
    _avg?: SensorMetricsWaterQualityAvgAggregateInputType
    _sum?: SensorMetricsWaterQualitySumAggregateInputType
    _min?: SensorMetricsWaterQualityMinAggregateInputType
    _max?: SensorMetricsWaterQualityMaxAggregateInputType
  }

  export type SensorMetricsWaterQualityGroupByOutputType = {
    sensorId: string
    eventTime: Date
    waterTemperature: number
    phLevel: number
    turbidity: number
    dissolvedOxygen: number
    conductivity: number
    _count: SensorMetricsWaterQualityCountAggregateOutputType | null
    _avg: SensorMetricsWaterQualityAvgAggregateOutputType | null
    _sum: SensorMetricsWaterQualitySumAggregateOutputType | null
    _min: SensorMetricsWaterQualityMinAggregateOutputType | null
    _max: SensorMetricsWaterQualityMaxAggregateOutputType | null
  }

  type GetSensorMetricsWaterQualityGroupByPayload<T extends SensorMetricsWaterQualityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SensorMetricsWaterQualityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SensorMetricsWaterQualityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SensorMetricsWaterQualityGroupByOutputType[P]>
            : GetScalarType<T[P], SensorMetricsWaterQualityGroupByOutputType[P]>
        }
      >
    >


  export type SensorMetricsWaterQualitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sensorId?: boolean
    eventTime?: boolean
    waterTemperature?: boolean
    phLevel?: boolean
    turbidity?: boolean
    dissolvedOxygen?: boolean
    conductivity?: boolean
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sensorMetricsWaterQuality"]>

  export type SensorMetricsWaterQualitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sensorId?: boolean
    eventTime?: boolean
    waterTemperature?: boolean
    phLevel?: boolean
    turbidity?: boolean
    dissolvedOxygen?: boolean
    conductivity?: boolean
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sensorMetricsWaterQuality"]>

  export type SensorMetricsWaterQualitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sensorId?: boolean
    eventTime?: boolean
    waterTemperature?: boolean
    phLevel?: boolean
    turbidity?: boolean
    dissolvedOxygen?: boolean
    conductivity?: boolean
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sensorMetricsWaterQuality"]>

  export type SensorMetricsWaterQualitySelectScalar = {
    sensorId?: boolean
    eventTime?: boolean
    waterTemperature?: boolean
    phLevel?: boolean
    turbidity?: boolean
    dissolvedOxygen?: boolean
    conductivity?: boolean
  }

  export type SensorMetricsWaterQualityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"sensorId" | "eventTime" | "waterTemperature" | "phLevel" | "turbidity" | "dissolvedOxygen" | "conductivity", ExtArgs["result"]["sensorMetricsWaterQuality"]>
  export type SensorMetricsWaterQualityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }
  export type SensorMetricsWaterQualityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }
  export type SensorMetricsWaterQualityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sensor?: boolean | SensorDefaultArgs<ExtArgs>
  }

  export type $SensorMetricsWaterQualityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SensorMetricsWaterQuality"
    objects: {
      sensor: Prisma.$SensorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      sensorId: string
      eventTime: Date
      waterTemperature: number
      phLevel: number
      turbidity: number
      dissolvedOxygen: number
      conductivity: number
    }, ExtArgs["result"]["sensorMetricsWaterQuality"]>
    composites: {}
  }

  type SensorMetricsWaterQualityGetPayload<S extends boolean | null | undefined | SensorMetricsWaterQualityDefaultArgs> = $Result.GetResult<Prisma.$SensorMetricsWaterQualityPayload, S>

  type SensorMetricsWaterQualityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SensorMetricsWaterQualityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SensorMetricsWaterQualityCountAggregateInputType | true
    }

  export interface SensorMetricsWaterQualityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SensorMetricsWaterQuality'], meta: { name: 'SensorMetricsWaterQuality' } }
    /**
     * Find zero or one SensorMetricsWaterQuality that matches the filter.
     * @param {SensorMetricsWaterQualityFindUniqueArgs} args - Arguments to find a SensorMetricsWaterQuality
     * @example
     * // Get one SensorMetricsWaterQuality
     * const sensorMetricsWaterQuality = await prisma.sensorMetricsWaterQuality.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SensorMetricsWaterQualityFindUniqueArgs>(args: SelectSubset<T, SensorMetricsWaterQualityFindUniqueArgs<ExtArgs>>): Prisma__SensorMetricsWaterQualityClient<$Result.GetResult<Prisma.$SensorMetricsWaterQualityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SensorMetricsWaterQuality that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SensorMetricsWaterQualityFindUniqueOrThrowArgs} args - Arguments to find a SensorMetricsWaterQuality
     * @example
     * // Get one SensorMetricsWaterQuality
     * const sensorMetricsWaterQuality = await prisma.sensorMetricsWaterQuality.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SensorMetricsWaterQualityFindUniqueOrThrowArgs>(args: SelectSubset<T, SensorMetricsWaterQualityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SensorMetricsWaterQualityClient<$Result.GetResult<Prisma.$SensorMetricsWaterQualityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SensorMetricsWaterQuality that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsWaterQualityFindFirstArgs} args - Arguments to find a SensorMetricsWaterQuality
     * @example
     * // Get one SensorMetricsWaterQuality
     * const sensorMetricsWaterQuality = await prisma.sensorMetricsWaterQuality.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SensorMetricsWaterQualityFindFirstArgs>(args?: SelectSubset<T, SensorMetricsWaterQualityFindFirstArgs<ExtArgs>>): Prisma__SensorMetricsWaterQualityClient<$Result.GetResult<Prisma.$SensorMetricsWaterQualityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SensorMetricsWaterQuality that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsWaterQualityFindFirstOrThrowArgs} args - Arguments to find a SensorMetricsWaterQuality
     * @example
     * // Get one SensorMetricsWaterQuality
     * const sensorMetricsWaterQuality = await prisma.sensorMetricsWaterQuality.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SensorMetricsWaterQualityFindFirstOrThrowArgs>(args?: SelectSubset<T, SensorMetricsWaterQualityFindFirstOrThrowArgs<ExtArgs>>): Prisma__SensorMetricsWaterQualityClient<$Result.GetResult<Prisma.$SensorMetricsWaterQualityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SensorMetricsWaterQualities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsWaterQualityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SensorMetricsWaterQualities
     * const sensorMetricsWaterQualities = await prisma.sensorMetricsWaterQuality.findMany()
     * 
     * // Get first 10 SensorMetricsWaterQualities
     * const sensorMetricsWaterQualities = await prisma.sensorMetricsWaterQuality.findMany({ take: 10 })
     * 
     * // Only select the `sensorId`
     * const sensorMetricsWaterQualityWithSensorIdOnly = await prisma.sensorMetricsWaterQuality.findMany({ select: { sensorId: true } })
     * 
     */
    findMany<T extends SensorMetricsWaterQualityFindManyArgs>(args?: SelectSubset<T, SensorMetricsWaterQualityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorMetricsWaterQualityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SensorMetricsWaterQuality.
     * @param {SensorMetricsWaterQualityCreateArgs} args - Arguments to create a SensorMetricsWaterQuality.
     * @example
     * // Create one SensorMetricsWaterQuality
     * const SensorMetricsWaterQuality = await prisma.sensorMetricsWaterQuality.create({
     *   data: {
     *     // ... data to create a SensorMetricsWaterQuality
     *   }
     * })
     * 
     */
    create<T extends SensorMetricsWaterQualityCreateArgs>(args: SelectSubset<T, SensorMetricsWaterQualityCreateArgs<ExtArgs>>): Prisma__SensorMetricsWaterQualityClient<$Result.GetResult<Prisma.$SensorMetricsWaterQualityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SensorMetricsWaterQualities.
     * @param {SensorMetricsWaterQualityCreateManyArgs} args - Arguments to create many SensorMetricsWaterQualities.
     * @example
     * // Create many SensorMetricsWaterQualities
     * const sensorMetricsWaterQuality = await prisma.sensorMetricsWaterQuality.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SensorMetricsWaterQualityCreateManyArgs>(args?: SelectSubset<T, SensorMetricsWaterQualityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SensorMetricsWaterQualities and returns the data saved in the database.
     * @param {SensorMetricsWaterQualityCreateManyAndReturnArgs} args - Arguments to create many SensorMetricsWaterQualities.
     * @example
     * // Create many SensorMetricsWaterQualities
     * const sensorMetricsWaterQuality = await prisma.sensorMetricsWaterQuality.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SensorMetricsWaterQualities and only return the `sensorId`
     * const sensorMetricsWaterQualityWithSensorIdOnly = await prisma.sensorMetricsWaterQuality.createManyAndReturn({
     *   select: { sensorId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SensorMetricsWaterQualityCreateManyAndReturnArgs>(args?: SelectSubset<T, SensorMetricsWaterQualityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorMetricsWaterQualityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SensorMetricsWaterQuality.
     * @param {SensorMetricsWaterQualityDeleteArgs} args - Arguments to delete one SensorMetricsWaterQuality.
     * @example
     * // Delete one SensorMetricsWaterQuality
     * const SensorMetricsWaterQuality = await prisma.sensorMetricsWaterQuality.delete({
     *   where: {
     *     // ... filter to delete one SensorMetricsWaterQuality
     *   }
     * })
     * 
     */
    delete<T extends SensorMetricsWaterQualityDeleteArgs>(args: SelectSubset<T, SensorMetricsWaterQualityDeleteArgs<ExtArgs>>): Prisma__SensorMetricsWaterQualityClient<$Result.GetResult<Prisma.$SensorMetricsWaterQualityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SensorMetricsWaterQuality.
     * @param {SensorMetricsWaterQualityUpdateArgs} args - Arguments to update one SensorMetricsWaterQuality.
     * @example
     * // Update one SensorMetricsWaterQuality
     * const sensorMetricsWaterQuality = await prisma.sensorMetricsWaterQuality.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SensorMetricsWaterQualityUpdateArgs>(args: SelectSubset<T, SensorMetricsWaterQualityUpdateArgs<ExtArgs>>): Prisma__SensorMetricsWaterQualityClient<$Result.GetResult<Prisma.$SensorMetricsWaterQualityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SensorMetricsWaterQualities.
     * @param {SensorMetricsWaterQualityDeleteManyArgs} args - Arguments to filter SensorMetricsWaterQualities to delete.
     * @example
     * // Delete a few SensorMetricsWaterQualities
     * const { count } = await prisma.sensorMetricsWaterQuality.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SensorMetricsWaterQualityDeleteManyArgs>(args?: SelectSubset<T, SensorMetricsWaterQualityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SensorMetricsWaterQualities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsWaterQualityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SensorMetricsWaterQualities
     * const sensorMetricsWaterQuality = await prisma.sensorMetricsWaterQuality.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SensorMetricsWaterQualityUpdateManyArgs>(args: SelectSubset<T, SensorMetricsWaterQualityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SensorMetricsWaterQualities and returns the data updated in the database.
     * @param {SensorMetricsWaterQualityUpdateManyAndReturnArgs} args - Arguments to update many SensorMetricsWaterQualities.
     * @example
     * // Update many SensorMetricsWaterQualities
     * const sensorMetricsWaterQuality = await prisma.sensorMetricsWaterQuality.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SensorMetricsWaterQualities and only return the `sensorId`
     * const sensorMetricsWaterQualityWithSensorIdOnly = await prisma.sensorMetricsWaterQuality.updateManyAndReturn({
     *   select: { sensorId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SensorMetricsWaterQualityUpdateManyAndReturnArgs>(args: SelectSubset<T, SensorMetricsWaterQualityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SensorMetricsWaterQualityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SensorMetricsWaterQuality.
     * @param {SensorMetricsWaterQualityUpsertArgs} args - Arguments to update or create a SensorMetricsWaterQuality.
     * @example
     * // Update or create a SensorMetricsWaterQuality
     * const sensorMetricsWaterQuality = await prisma.sensorMetricsWaterQuality.upsert({
     *   create: {
     *     // ... data to create a SensorMetricsWaterQuality
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SensorMetricsWaterQuality we want to update
     *   }
     * })
     */
    upsert<T extends SensorMetricsWaterQualityUpsertArgs>(args: SelectSubset<T, SensorMetricsWaterQualityUpsertArgs<ExtArgs>>): Prisma__SensorMetricsWaterQualityClient<$Result.GetResult<Prisma.$SensorMetricsWaterQualityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SensorMetricsWaterQualities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsWaterQualityCountArgs} args - Arguments to filter SensorMetricsWaterQualities to count.
     * @example
     * // Count the number of SensorMetricsWaterQualities
     * const count = await prisma.sensorMetricsWaterQuality.count({
     *   where: {
     *     // ... the filter for the SensorMetricsWaterQualities we want to count
     *   }
     * })
    **/
    count<T extends SensorMetricsWaterQualityCountArgs>(
      args?: Subset<T, SensorMetricsWaterQualityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SensorMetricsWaterQualityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SensorMetricsWaterQuality.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsWaterQualityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SensorMetricsWaterQualityAggregateArgs>(args: Subset<T, SensorMetricsWaterQualityAggregateArgs>): Prisma.PrismaPromise<GetSensorMetricsWaterQualityAggregateType<T>>

    /**
     * Group by SensorMetricsWaterQuality.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SensorMetricsWaterQualityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SensorMetricsWaterQualityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SensorMetricsWaterQualityGroupByArgs['orderBy'] }
        : { orderBy?: SensorMetricsWaterQualityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SensorMetricsWaterQualityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSensorMetricsWaterQualityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SensorMetricsWaterQuality model
   */
  readonly fields: SensorMetricsWaterQualityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SensorMetricsWaterQuality.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SensorMetricsWaterQualityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sensor<T extends SensorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SensorDefaultArgs<ExtArgs>>): Prisma__SensorClient<$Result.GetResult<Prisma.$SensorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SensorMetricsWaterQuality model
   */
  interface SensorMetricsWaterQualityFieldRefs {
    readonly sensorId: FieldRef<"SensorMetricsWaterQuality", 'String'>
    readonly eventTime: FieldRef<"SensorMetricsWaterQuality", 'DateTime'>
    readonly waterTemperature: FieldRef<"SensorMetricsWaterQuality", 'Float'>
    readonly phLevel: FieldRef<"SensorMetricsWaterQuality", 'Float'>
    readonly turbidity: FieldRef<"SensorMetricsWaterQuality", 'Float'>
    readonly dissolvedOxygen: FieldRef<"SensorMetricsWaterQuality", 'Float'>
    readonly conductivity: FieldRef<"SensorMetricsWaterQuality", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * SensorMetricsWaterQuality findUnique
   */
  export type SensorMetricsWaterQualityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterQuality
     */
    select?: SensorMetricsWaterQualitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterQuality
     */
    omit?: SensorMetricsWaterQualityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterQualityInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsWaterQuality to fetch.
     */
    where: SensorMetricsWaterQualityWhereUniqueInput
  }

  /**
   * SensorMetricsWaterQuality findUniqueOrThrow
   */
  export type SensorMetricsWaterQualityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterQuality
     */
    select?: SensorMetricsWaterQualitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterQuality
     */
    omit?: SensorMetricsWaterQualityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterQualityInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsWaterQuality to fetch.
     */
    where: SensorMetricsWaterQualityWhereUniqueInput
  }

  /**
   * SensorMetricsWaterQuality findFirst
   */
  export type SensorMetricsWaterQualityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterQuality
     */
    select?: SensorMetricsWaterQualitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterQuality
     */
    omit?: SensorMetricsWaterQualityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterQualityInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsWaterQuality to fetch.
     */
    where?: SensorMetricsWaterQualityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorMetricsWaterQualities to fetch.
     */
    orderBy?: SensorMetricsWaterQualityOrderByWithRelationInput | SensorMetricsWaterQualityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SensorMetricsWaterQualities.
     */
    cursor?: SensorMetricsWaterQualityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorMetricsWaterQualities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorMetricsWaterQualities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SensorMetricsWaterQualities.
     */
    distinct?: SensorMetricsWaterQualityScalarFieldEnum | SensorMetricsWaterQualityScalarFieldEnum[]
  }

  /**
   * SensorMetricsWaterQuality findFirstOrThrow
   */
  export type SensorMetricsWaterQualityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterQuality
     */
    select?: SensorMetricsWaterQualitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterQuality
     */
    omit?: SensorMetricsWaterQualityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterQualityInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsWaterQuality to fetch.
     */
    where?: SensorMetricsWaterQualityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorMetricsWaterQualities to fetch.
     */
    orderBy?: SensorMetricsWaterQualityOrderByWithRelationInput | SensorMetricsWaterQualityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SensorMetricsWaterQualities.
     */
    cursor?: SensorMetricsWaterQualityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorMetricsWaterQualities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorMetricsWaterQualities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SensorMetricsWaterQualities.
     */
    distinct?: SensorMetricsWaterQualityScalarFieldEnum | SensorMetricsWaterQualityScalarFieldEnum[]
  }

  /**
   * SensorMetricsWaterQuality findMany
   */
  export type SensorMetricsWaterQualityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterQuality
     */
    select?: SensorMetricsWaterQualitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterQuality
     */
    omit?: SensorMetricsWaterQualityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterQualityInclude<ExtArgs> | null
    /**
     * Filter, which SensorMetricsWaterQualities to fetch.
     */
    where?: SensorMetricsWaterQualityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SensorMetricsWaterQualities to fetch.
     */
    orderBy?: SensorMetricsWaterQualityOrderByWithRelationInput | SensorMetricsWaterQualityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SensorMetricsWaterQualities.
     */
    cursor?: SensorMetricsWaterQualityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SensorMetricsWaterQualities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SensorMetricsWaterQualities.
     */
    skip?: number
    distinct?: SensorMetricsWaterQualityScalarFieldEnum | SensorMetricsWaterQualityScalarFieldEnum[]
  }

  /**
   * SensorMetricsWaterQuality create
   */
  export type SensorMetricsWaterQualityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterQuality
     */
    select?: SensorMetricsWaterQualitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterQuality
     */
    omit?: SensorMetricsWaterQualityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterQualityInclude<ExtArgs> | null
    /**
     * The data needed to create a SensorMetricsWaterQuality.
     */
    data: XOR<SensorMetricsWaterQualityCreateInput, SensorMetricsWaterQualityUncheckedCreateInput>
  }

  /**
   * SensorMetricsWaterQuality createMany
   */
  export type SensorMetricsWaterQualityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SensorMetricsWaterQualities.
     */
    data: SensorMetricsWaterQualityCreateManyInput | SensorMetricsWaterQualityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SensorMetricsWaterQuality createManyAndReturn
   */
  export type SensorMetricsWaterQualityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterQuality
     */
    select?: SensorMetricsWaterQualitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterQuality
     */
    omit?: SensorMetricsWaterQualityOmit<ExtArgs> | null
    /**
     * The data used to create many SensorMetricsWaterQualities.
     */
    data: SensorMetricsWaterQualityCreateManyInput | SensorMetricsWaterQualityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterQualityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SensorMetricsWaterQuality update
   */
  export type SensorMetricsWaterQualityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterQuality
     */
    select?: SensorMetricsWaterQualitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterQuality
     */
    omit?: SensorMetricsWaterQualityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterQualityInclude<ExtArgs> | null
    /**
     * The data needed to update a SensorMetricsWaterQuality.
     */
    data: XOR<SensorMetricsWaterQualityUpdateInput, SensorMetricsWaterQualityUncheckedUpdateInput>
    /**
     * Choose, which SensorMetricsWaterQuality to update.
     */
    where: SensorMetricsWaterQualityWhereUniqueInput
  }

  /**
   * SensorMetricsWaterQuality updateMany
   */
  export type SensorMetricsWaterQualityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SensorMetricsWaterQualities.
     */
    data: XOR<SensorMetricsWaterQualityUpdateManyMutationInput, SensorMetricsWaterQualityUncheckedUpdateManyInput>
    /**
     * Filter which SensorMetricsWaterQualities to update
     */
    where?: SensorMetricsWaterQualityWhereInput
    /**
     * Limit how many SensorMetricsWaterQualities to update.
     */
    limit?: number
  }

  /**
   * SensorMetricsWaterQuality updateManyAndReturn
   */
  export type SensorMetricsWaterQualityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterQuality
     */
    select?: SensorMetricsWaterQualitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterQuality
     */
    omit?: SensorMetricsWaterQualityOmit<ExtArgs> | null
    /**
     * The data used to update SensorMetricsWaterQualities.
     */
    data: XOR<SensorMetricsWaterQualityUpdateManyMutationInput, SensorMetricsWaterQualityUncheckedUpdateManyInput>
    /**
     * Filter which SensorMetricsWaterQualities to update
     */
    where?: SensorMetricsWaterQualityWhereInput
    /**
     * Limit how many SensorMetricsWaterQualities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterQualityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SensorMetricsWaterQuality upsert
   */
  export type SensorMetricsWaterQualityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterQuality
     */
    select?: SensorMetricsWaterQualitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterQuality
     */
    omit?: SensorMetricsWaterQualityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterQualityInclude<ExtArgs> | null
    /**
     * The filter to search for the SensorMetricsWaterQuality to update in case it exists.
     */
    where: SensorMetricsWaterQualityWhereUniqueInput
    /**
     * In case the SensorMetricsWaterQuality found by the `where` argument doesn't exist, create a new SensorMetricsWaterQuality with this data.
     */
    create: XOR<SensorMetricsWaterQualityCreateInput, SensorMetricsWaterQualityUncheckedCreateInput>
    /**
     * In case the SensorMetricsWaterQuality was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SensorMetricsWaterQualityUpdateInput, SensorMetricsWaterQualityUncheckedUpdateInput>
  }

  /**
   * SensorMetricsWaterQuality delete
   */
  export type SensorMetricsWaterQualityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterQuality
     */
    select?: SensorMetricsWaterQualitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterQuality
     */
    omit?: SensorMetricsWaterQualityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterQualityInclude<ExtArgs> | null
    /**
     * Filter which SensorMetricsWaterQuality to delete.
     */
    where: SensorMetricsWaterQualityWhereUniqueInput
  }

  /**
   * SensorMetricsWaterQuality deleteMany
   */
  export type SensorMetricsWaterQualityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SensorMetricsWaterQualities to delete
     */
    where?: SensorMetricsWaterQualityWhereInput
    /**
     * Limit how many SensorMetricsWaterQualities to delete.
     */
    limit?: number
  }

  /**
   * SensorMetricsWaterQuality without action
   */
  export type SensorMetricsWaterQualityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SensorMetricsWaterQuality
     */
    select?: SensorMetricsWaterQualitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the SensorMetricsWaterQuality
     */
    omit?: SensorMetricsWaterQualityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SensorMetricsWaterQualityInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SensorScalarFieldEnum: {
    id: 'id',
    installedAt: 'installedAt',
    cityId: 'cityId',
    kmPoint: 'kmPoint',
    sensorType: 'sensorType',
    stateId: 'stateId',
    roadId: 'roadId',
    industrialZone: 'industrialZone'
  };

  export type SensorScalarFieldEnum = (typeof SensorScalarFieldEnum)[keyof typeof SensorScalarFieldEnum]


  export const SensorMetricsAmbientScalarFieldEnum: {
    sensorId: 'sensorId',
    eventTime: 'eventTime',
    temperature: 'temperature',
    humidity: 'humidity',
    solarRadiation: 'solarRadiation'
  };

  export type SensorMetricsAmbientScalarFieldEnum = (typeof SensorMetricsAmbientScalarFieldEnum)[keyof typeof SensorMetricsAmbientScalarFieldEnum]


  export const SensorMetricsTrafficScalarFieldEnum: {
    sensorId: 'sensorId',
    eventTime: 'eventTime',
    vehicleDensity: 'vehicleDensity',
    avgSpeed: 'avgSpeed',
    flowRate: 'flowRate',
    occupancy: 'occupancy',
    congestionIndex: 'congestionIndex'
  };

  export type SensorMetricsTrafficScalarFieldEnum = (typeof SensorMetricsTrafficScalarFieldEnum)[keyof typeof SensorMetricsTrafficScalarFieldEnum]


  export const SensorMetricsAirScalarFieldEnum: {
    sensorId: 'sensorId',
    eventTime: 'eventTime',
    pm10: 'pm10',
    co: 'co',
    co2: 'co2',
    no2: 'no2',
    o3: 'o3',
    so2: 'so2'
  };

  export type SensorMetricsAirScalarFieldEnum = (typeof SensorMetricsAirScalarFieldEnum)[keyof typeof SensorMetricsAirScalarFieldEnum]


  export const SensorMetricsWaterUsageScalarFieldEnum: {
    sensorId: 'sensorId',
    eventTime: 'eventTime',
    usageLiters: 'usageLiters'
  };

  export type SensorMetricsWaterUsageScalarFieldEnum = (typeof SensorMetricsWaterUsageScalarFieldEnum)[keyof typeof SensorMetricsWaterUsageScalarFieldEnum]


  export const SensorMetricsWaterQualityScalarFieldEnum: {
    sensorId: 'sensorId',
    eventTime: 'eventTime',
    waterTemperature: 'waterTemperature',
    phLevel: 'phLevel',
    turbidity: 'turbidity',
    dissolvedOxygen: 'dissolvedOxygen',
    conductivity: 'conductivity'
  };

  export type SensorMetricsWaterQualityScalarFieldEnum = (typeof SensorMetricsWaterQualityScalarFieldEnum)[keyof typeof SensorMetricsWaterQualityScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type SensorWhereInput = {
    AND?: SensorWhereInput | SensorWhereInput[]
    OR?: SensorWhereInput[]
    NOT?: SensorWhereInput | SensorWhereInput[]
    id?: StringFilter<"Sensor"> | string
    installedAt?: DateTimeFilter<"Sensor"> | Date | string
    cityId?: StringFilter<"Sensor"> | string
    kmPoint?: FloatFilter<"Sensor"> | number
    sensorType?: StringFilter<"Sensor"> | string
    stateId?: StringFilter<"Sensor"> | string
    roadId?: StringNullableFilter<"Sensor"> | string | null
    industrialZone?: BoolFilter<"Sensor"> | boolean
    ambientMetrics?: SensorMetricsAmbientListRelationFilter
    trafficMetrics?: SensorMetricsTrafficListRelationFilter
    airMetrics?: SensorMetricsAirListRelationFilter
    waterUsageMetrics?: SensorMetricsWaterUsageListRelationFilter
    waterQualityMetrics?: SensorMetricsWaterQualityListRelationFilter
  }

  export type SensorOrderByWithRelationInput = {
    id?: SortOrder
    installedAt?: SortOrder
    cityId?: SortOrder
    kmPoint?: SortOrder
    sensorType?: SortOrder
    stateId?: SortOrder
    roadId?: SortOrderInput | SortOrder
    industrialZone?: SortOrder
    ambientMetrics?: SensorMetricsAmbientOrderByRelationAggregateInput
    trafficMetrics?: SensorMetricsTrafficOrderByRelationAggregateInput
    airMetrics?: SensorMetricsAirOrderByRelationAggregateInput
    waterUsageMetrics?: SensorMetricsWaterUsageOrderByRelationAggregateInput
    waterQualityMetrics?: SensorMetricsWaterQualityOrderByRelationAggregateInput
  }

  export type SensorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SensorWhereInput | SensorWhereInput[]
    OR?: SensorWhereInput[]
    NOT?: SensorWhereInput | SensorWhereInput[]
    installedAt?: DateTimeFilter<"Sensor"> | Date | string
    cityId?: StringFilter<"Sensor"> | string
    kmPoint?: FloatFilter<"Sensor"> | number
    sensorType?: StringFilter<"Sensor"> | string
    stateId?: StringFilter<"Sensor"> | string
    roadId?: StringNullableFilter<"Sensor"> | string | null
    industrialZone?: BoolFilter<"Sensor"> | boolean
    ambientMetrics?: SensorMetricsAmbientListRelationFilter
    trafficMetrics?: SensorMetricsTrafficListRelationFilter
    airMetrics?: SensorMetricsAirListRelationFilter
    waterUsageMetrics?: SensorMetricsWaterUsageListRelationFilter
    waterQualityMetrics?: SensorMetricsWaterQualityListRelationFilter
  }, "id">

  export type SensorOrderByWithAggregationInput = {
    id?: SortOrder
    installedAt?: SortOrder
    cityId?: SortOrder
    kmPoint?: SortOrder
    sensorType?: SortOrder
    stateId?: SortOrder
    roadId?: SortOrderInput | SortOrder
    industrialZone?: SortOrder
    _count?: SensorCountOrderByAggregateInput
    _avg?: SensorAvgOrderByAggregateInput
    _max?: SensorMaxOrderByAggregateInput
    _min?: SensorMinOrderByAggregateInput
    _sum?: SensorSumOrderByAggregateInput
  }

  export type SensorScalarWhereWithAggregatesInput = {
    AND?: SensorScalarWhereWithAggregatesInput | SensorScalarWhereWithAggregatesInput[]
    OR?: SensorScalarWhereWithAggregatesInput[]
    NOT?: SensorScalarWhereWithAggregatesInput | SensorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Sensor"> | string
    installedAt?: DateTimeWithAggregatesFilter<"Sensor"> | Date | string
    cityId?: StringWithAggregatesFilter<"Sensor"> | string
    kmPoint?: FloatWithAggregatesFilter<"Sensor"> | number
    sensorType?: StringWithAggregatesFilter<"Sensor"> | string
    stateId?: StringWithAggregatesFilter<"Sensor"> | string
    roadId?: StringNullableWithAggregatesFilter<"Sensor"> | string | null
    industrialZone?: BoolWithAggregatesFilter<"Sensor"> | boolean
  }

  export type SensorMetricsAmbientWhereInput = {
    AND?: SensorMetricsAmbientWhereInput | SensorMetricsAmbientWhereInput[]
    OR?: SensorMetricsAmbientWhereInput[]
    NOT?: SensorMetricsAmbientWhereInput | SensorMetricsAmbientWhereInput[]
    sensorId?: StringFilter<"SensorMetricsAmbient"> | string
    eventTime?: DateTimeFilter<"SensorMetricsAmbient"> | Date | string
    temperature?: FloatFilter<"SensorMetricsAmbient"> | number
    humidity?: FloatFilter<"SensorMetricsAmbient"> | number
    solarRadiation?: FloatFilter<"SensorMetricsAmbient"> | number
    sensor?: XOR<SensorScalarRelationFilter, SensorWhereInput>
  }

  export type SensorMetricsAmbientOrderByWithRelationInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    solarRadiation?: SortOrder
    sensor?: SensorOrderByWithRelationInput
  }

  export type SensorMetricsAmbientWhereUniqueInput = Prisma.AtLeast<{
    sensorId_eventTime?: SensorMetricsAmbientSensorIdEventTimeCompoundUniqueInput
    AND?: SensorMetricsAmbientWhereInput | SensorMetricsAmbientWhereInput[]
    OR?: SensorMetricsAmbientWhereInput[]
    NOT?: SensorMetricsAmbientWhereInput | SensorMetricsAmbientWhereInput[]
    sensorId?: StringFilter<"SensorMetricsAmbient"> | string
    eventTime?: DateTimeFilter<"SensorMetricsAmbient"> | Date | string
    temperature?: FloatFilter<"SensorMetricsAmbient"> | number
    humidity?: FloatFilter<"SensorMetricsAmbient"> | number
    solarRadiation?: FloatFilter<"SensorMetricsAmbient"> | number
    sensor?: XOR<SensorScalarRelationFilter, SensorWhereInput>
  }, "sensorId_eventTime">

  export type SensorMetricsAmbientOrderByWithAggregationInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    solarRadiation?: SortOrder
    _count?: SensorMetricsAmbientCountOrderByAggregateInput
    _avg?: SensorMetricsAmbientAvgOrderByAggregateInput
    _max?: SensorMetricsAmbientMaxOrderByAggregateInput
    _min?: SensorMetricsAmbientMinOrderByAggregateInput
    _sum?: SensorMetricsAmbientSumOrderByAggregateInput
  }

  export type SensorMetricsAmbientScalarWhereWithAggregatesInput = {
    AND?: SensorMetricsAmbientScalarWhereWithAggregatesInput | SensorMetricsAmbientScalarWhereWithAggregatesInput[]
    OR?: SensorMetricsAmbientScalarWhereWithAggregatesInput[]
    NOT?: SensorMetricsAmbientScalarWhereWithAggregatesInput | SensorMetricsAmbientScalarWhereWithAggregatesInput[]
    sensorId?: StringWithAggregatesFilter<"SensorMetricsAmbient"> | string
    eventTime?: DateTimeWithAggregatesFilter<"SensorMetricsAmbient"> | Date | string
    temperature?: FloatWithAggregatesFilter<"SensorMetricsAmbient"> | number
    humidity?: FloatWithAggregatesFilter<"SensorMetricsAmbient"> | number
    solarRadiation?: FloatWithAggregatesFilter<"SensorMetricsAmbient"> | number
  }

  export type SensorMetricsTrafficWhereInput = {
    AND?: SensorMetricsTrafficWhereInput | SensorMetricsTrafficWhereInput[]
    OR?: SensorMetricsTrafficWhereInput[]
    NOT?: SensorMetricsTrafficWhereInput | SensorMetricsTrafficWhereInput[]
    sensorId?: StringFilter<"SensorMetricsTraffic"> | string
    eventTime?: DateTimeFilter<"SensorMetricsTraffic"> | Date | string
    vehicleDensity?: FloatFilter<"SensorMetricsTraffic"> | number
    avgSpeed?: FloatFilter<"SensorMetricsTraffic"> | number
    flowRate?: FloatFilter<"SensorMetricsTraffic"> | number
    occupancy?: FloatFilter<"SensorMetricsTraffic"> | number
    congestionIndex?: FloatFilter<"SensorMetricsTraffic"> | number
    sensor?: XOR<SensorScalarRelationFilter, SensorWhereInput>
  }

  export type SensorMetricsTrafficOrderByWithRelationInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    vehicleDensity?: SortOrder
    avgSpeed?: SortOrder
    flowRate?: SortOrder
    occupancy?: SortOrder
    congestionIndex?: SortOrder
    sensor?: SensorOrderByWithRelationInput
  }

  export type SensorMetricsTrafficWhereUniqueInput = Prisma.AtLeast<{
    sensorId_eventTime?: SensorMetricsTrafficSensorIdEventTimeCompoundUniqueInput
    AND?: SensorMetricsTrafficWhereInput | SensorMetricsTrafficWhereInput[]
    OR?: SensorMetricsTrafficWhereInput[]
    NOT?: SensorMetricsTrafficWhereInput | SensorMetricsTrafficWhereInput[]
    sensorId?: StringFilter<"SensorMetricsTraffic"> | string
    eventTime?: DateTimeFilter<"SensorMetricsTraffic"> | Date | string
    vehicleDensity?: FloatFilter<"SensorMetricsTraffic"> | number
    avgSpeed?: FloatFilter<"SensorMetricsTraffic"> | number
    flowRate?: FloatFilter<"SensorMetricsTraffic"> | number
    occupancy?: FloatFilter<"SensorMetricsTraffic"> | number
    congestionIndex?: FloatFilter<"SensorMetricsTraffic"> | number
    sensor?: XOR<SensorScalarRelationFilter, SensorWhereInput>
  }, "sensorId_eventTime">

  export type SensorMetricsTrafficOrderByWithAggregationInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    vehicleDensity?: SortOrder
    avgSpeed?: SortOrder
    flowRate?: SortOrder
    occupancy?: SortOrder
    congestionIndex?: SortOrder
    _count?: SensorMetricsTrafficCountOrderByAggregateInput
    _avg?: SensorMetricsTrafficAvgOrderByAggregateInput
    _max?: SensorMetricsTrafficMaxOrderByAggregateInput
    _min?: SensorMetricsTrafficMinOrderByAggregateInput
    _sum?: SensorMetricsTrafficSumOrderByAggregateInput
  }

  export type SensorMetricsTrafficScalarWhereWithAggregatesInput = {
    AND?: SensorMetricsTrafficScalarWhereWithAggregatesInput | SensorMetricsTrafficScalarWhereWithAggregatesInput[]
    OR?: SensorMetricsTrafficScalarWhereWithAggregatesInput[]
    NOT?: SensorMetricsTrafficScalarWhereWithAggregatesInput | SensorMetricsTrafficScalarWhereWithAggregatesInput[]
    sensorId?: StringWithAggregatesFilter<"SensorMetricsTraffic"> | string
    eventTime?: DateTimeWithAggregatesFilter<"SensorMetricsTraffic"> | Date | string
    vehicleDensity?: FloatWithAggregatesFilter<"SensorMetricsTraffic"> | number
    avgSpeed?: FloatWithAggregatesFilter<"SensorMetricsTraffic"> | number
    flowRate?: FloatWithAggregatesFilter<"SensorMetricsTraffic"> | number
    occupancy?: FloatWithAggregatesFilter<"SensorMetricsTraffic"> | number
    congestionIndex?: FloatWithAggregatesFilter<"SensorMetricsTraffic"> | number
  }

  export type SensorMetricsAirWhereInput = {
    AND?: SensorMetricsAirWhereInput | SensorMetricsAirWhereInput[]
    OR?: SensorMetricsAirWhereInput[]
    NOT?: SensorMetricsAirWhereInput | SensorMetricsAirWhereInput[]
    sensorId?: StringFilter<"SensorMetricsAir"> | string
    eventTime?: DateTimeFilter<"SensorMetricsAir"> | Date | string
    pm10?: FloatFilter<"SensorMetricsAir"> | number
    co?: FloatFilter<"SensorMetricsAir"> | number
    co2?: FloatFilter<"SensorMetricsAir"> | number
    no2?: FloatFilter<"SensorMetricsAir"> | number
    o3?: FloatFilter<"SensorMetricsAir"> | number
    so2?: FloatFilter<"SensorMetricsAir"> | number
    sensor?: XOR<SensorScalarRelationFilter, SensorWhereInput>
  }

  export type SensorMetricsAirOrderByWithRelationInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    pm10?: SortOrder
    co?: SortOrder
    co2?: SortOrder
    no2?: SortOrder
    o3?: SortOrder
    so2?: SortOrder
    sensor?: SensorOrderByWithRelationInput
  }

  export type SensorMetricsAirWhereUniqueInput = Prisma.AtLeast<{
    sensorId_eventTime?: SensorMetricsAirSensorIdEventTimeCompoundUniqueInput
    AND?: SensorMetricsAirWhereInput | SensorMetricsAirWhereInput[]
    OR?: SensorMetricsAirWhereInput[]
    NOT?: SensorMetricsAirWhereInput | SensorMetricsAirWhereInput[]
    sensorId?: StringFilter<"SensorMetricsAir"> | string
    eventTime?: DateTimeFilter<"SensorMetricsAir"> | Date | string
    pm10?: FloatFilter<"SensorMetricsAir"> | number
    co?: FloatFilter<"SensorMetricsAir"> | number
    co2?: FloatFilter<"SensorMetricsAir"> | number
    no2?: FloatFilter<"SensorMetricsAir"> | number
    o3?: FloatFilter<"SensorMetricsAir"> | number
    so2?: FloatFilter<"SensorMetricsAir"> | number
    sensor?: XOR<SensorScalarRelationFilter, SensorWhereInput>
  }, "sensorId_eventTime">

  export type SensorMetricsAirOrderByWithAggregationInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    pm10?: SortOrder
    co?: SortOrder
    co2?: SortOrder
    no2?: SortOrder
    o3?: SortOrder
    so2?: SortOrder
    _count?: SensorMetricsAirCountOrderByAggregateInput
    _avg?: SensorMetricsAirAvgOrderByAggregateInput
    _max?: SensorMetricsAirMaxOrderByAggregateInput
    _min?: SensorMetricsAirMinOrderByAggregateInput
    _sum?: SensorMetricsAirSumOrderByAggregateInput
  }

  export type SensorMetricsAirScalarWhereWithAggregatesInput = {
    AND?: SensorMetricsAirScalarWhereWithAggregatesInput | SensorMetricsAirScalarWhereWithAggregatesInput[]
    OR?: SensorMetricsAirScalarWhereWithAggregatesInput[]
    NOT?: SensorMetricsAirScalarWhereWithAggregatesInput | SensorMetricsAirScalarWhereWithAggregatesInput[]
    sensorId?: StringWithAggregatesFilter<"SensorMetricsAir"> | string
    eventTime?: DateTimeWithAggregatesFilter<"SensorMetricsAir"> | Date | string
    pm10?: FloatWithAggregatesFilter<"SensorMetricsAir"> | number
    co?: FloatWithAggregatesFilter<"SensorMetricsAir"> | number
    co2?: FloatWithAggregatesFilter<"SensorMetricsAir"> | number
    no2?: FloatWithAggregatesFilter<"SensorMetricsAir"> | number
    o3?: FloatWithAggregatesFilter<"SensorMetricsAir"> | number
    so2?: FloatWithAggregatesFilter<"SensorMetricsAir"> | number
  }

  export type SensorMetricsWaterUsageWhereInput = {
    AND?: SensorMetricsWaterUsageWhereInput | SensorMetricsWaterUsageWhereInput[]
    OR?: SensorMetricsWaterUsageWhereInput[]
    NOT?: SensorMetricsWaterUsageWhereInput | SensorMetricsWaterUsageWhereInput[]
    sensorId?: StringFilter<"SensorMetricsWaterUsage"> | string
    eventTime?: DateTimeFilter<"SensorMetricsWaterUsage"> | Date | string
    usageLiters?: FloatFilter<"SensorMetricsWaterUsage"> | number
    sensor?: XOR<SensorScalarRelationFilter, SensorWhereInput>
  }

  export type SensorMetricsWaterUsageOrderByWithRelationInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    usageLiters?: SortOrder
    sensor?: SensorOrderByWithRelationInput
  }

  export type SensorMetricsWaterUsageWhereUniqueInput = Prisma.AtLeast<{
    sensorId_eventTime?: SensorMetricsWaterUsageSensorIdEventTimeCompoundUniqueInput
    AND?: SensorMetricsWaterUsageWhereInput | SensorMetricsWaterUsageWhereInput[]
    OR?: SensorMetricsWaterUsageWhereInput[]
    NOT?: SensorMetricsWaterUsageWhereInput | SensorMetricsWaterUsageWhereInput[]
    sensorId?: StringFilter<"SensorMetricsWaterUsage"> | string
    eventTime?: DateTimeFilter<"SensorMetricsWaterUsage"> | Date | string
    usageLiters?: FloatFilter<"SensorMetricsWaterUsage"> | number
    sensor?: XOR<SensorScalarRelationFilter, SensorWhereInput>
  }, "sensorId_eventTime">

  export type SensorMetricsWaterUsageOrderByWithAggregationInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    usageLiters?: SortOrder
    _count?: SensorMetricsWaterUsageCountOrderByAggregateInput
    _avg?: SensorMetricsWaterUsageAvgOrderByAggregateInput
    _max?: SensorMetricsWaterUsageMaxOrderByAggregateInput
    _min?: SensorMetricsWaterUsageMinOrderByAggregateInput
    _sum?: SensorMetricsWaterUsageSumOrderByAggregateInput
  }

  export type SensorMetricsWaterUsageScalarWhereWithAggregatesInput = {
    AND?: SensorMetricsWaterUsageScalarWhereWithAggregatesInput | SensorMetricsWaterUsageScalarWhereWithAggregatesInput[]
    OR?: SensorMetricsWaterUsageScalarWhereWithAggregatesInput[]
    NOT?: SensorMetricsWaterUsageScalarWhereWithAggregatesInput | SensorMetricsWaterUsageScalarWhereWithAggregatesInput[]
    sensorId?: StringWithAggregatesFilter<"SensorMetricsWaterUsage"> | string
    eventTime?: DateTimeWithAggregatesFilter<"SensorMetricsWaterUsage"> | Date | string
    usageLiters?: FloatWithAggregatesFilter<"SensorMetricsWaterUsage"> | number
  }

  export type SensorMetricsWaterQualityWhereInput = {
    AND?: SensorMetricsWaterQualityWhereInput | SensorMetricsWaterQualityWhereInput[]
    OR?: SensorMetricsWaterQualityWhereInput[]
    NOT?: SensorMetricsWaterQualityWhereInput | SensorMetricsWaterQualityWhereInput[]
    sensorId?: StringFilter<"SensorMetricsWaterQuality"> | string
    eventTime?: DateTimeFilter<"SensorMetricsWaterQuality"> | Date | string
    waterTemperature?: FloatFilter<"SensorMetricsWaterQuality"> | number
    phLevel?: FloatFilter<"SensorMetricsWaterQuality"> | number
    turbidity?: FloatFilter<"SensorMetricsWaterQuality"> | number
    dissolvedOxygen?: FloatFilter<"SensorMetricsWaterQuality"> | number
    conductivity?: FloatFilter<"SensorMetricsWaterQuality"> | number
    sensor?: XOR<SensorScalarRelationFilter, SensorWhereInput>
  }

  export type SensorMetricsWaterQualityOrderByWithRelationInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    waterTemperature?: SortOrder
    phLevel?: SortOrder
    turbidity?: SortOrder
    dissolvedOxygen?: SortOrder
    conductivity?: SortOrder
    sensor?: SensorOrderByWithRelationInput
  }

  export type SensorMetricsWaterQualityWhereUniqueInput = Prisma.AtLeast<{
    sensorId_eventTime?: SensorMetricsWaterQualitySensorIdEventTimeCompoundUniqueInput
    AND?: SensorMetricsWaterQualityWhereInput | SensorMetricsWaterQualityWhereInput[]
    OR?: SensorMetricsWaterQualityWhereInput[]
    NOT?: SensorMetricsWaterQualityWhereInput | SensorMetricsWaterQualityWhereInput[]
    sensorId?: StringFilter<"SensorMetricsWaterQuality"> | string
    eventTime?: DateTimeFilter<"SensorMetricsWaterQuality"> | Date | string
    waterTemperature?: FloatFilter<"SensorMetricsWaterQuality"> | number
    phLevel?: FloatFilter<"SensorMetricsWaterQuality"> | number
    turbidity?: FloatFilter<"SensorMetricsWaterQuality"> | number
    dissolvedOxygen?: FloatFilter<"SensorMetricsWaterQuality"> | number
    conductivity?: FloatFilter<"SensorMetricsWaterQuality"> | number
    sensor?: XOR<SensorScalarRelationFilter, SensorWhereInput>
  }, "sensorId_eventTime">

  export type SensorMetricsWaterQualityOrderByWithAggregationInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    waterTemperature?: SortOrder
    phLevel?: SortOrder
    turbidity?: SortOrder
    dissolvedOxygen?: SortOrder
    conductivity?: SortOrder
    _count?: SensorMetricsWaterQualityCountOrderByAggregateInput
    _avg?: SensorMetricsWaterQualityAvgOrderByAggregateInput
    _max?: SensorMetricsWaterQualityMaxOrderByAggregateInput
    _min?: SensorMetricsWaterQualityMinOrderByAggregateInput
    _sum?: SensorMetricsWaterQualitySumOrderByAggregateInput
  }

  export type SensorMetricsWaterQualityScalarWhereWithAggregatesInput = {
    AND?: SensorMetricsWaterQualityScalarWhereWithAggregatesInput | SensorMetricsWaterQualityScalarWhereWithAggregatesInput[]
    OR?: SensorMetricsWaterQualityScalarWhereWithAggregatesInput[]
    NOT?: SensorMetricsWaterQualityScalarWhereWithAggregatesInput | SensorMetricsWaterQualityScalarWhereWithAggregatesInput[]
    sensorId?: StringWithAggregatesFilter<"SensorMetricsWaterQuality"> | string
    eventTime?: DateTimeWithAggregatesFilter<"SensorMetricsWaterQuality"> | Date | string
    waterTemperature?: FloatWithAggregatesFilter<"SensorMetricsWaterQuality"> | number
    phLevel?: FloatWithAggregatesFilter<"SensorMetricsWaterQuality"> | number
    turbidity?: FloatWithAggregatesFilter<"SensorMetricsWaterQuality"> | number
    dissolvedOxygen?: FloatWithAggregatesFilter<"SensorMetricsWaterQuality"> | number
    conductivity?: FloatWithAggregatesFilter<"SensorMetricsWaterQuality"> | number
  }

  export type SensorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cityId?: StringFieldUpdateOperationsInput | string
    kmPoint?: FloatFieldUpdateOperationsInput | number
    sensorType?: StringFieldUpdateOperationsInput | string
    stateId?: StringFieldUpdateOperationsInput | string
    roadId?: NullableStringFieldUpdateOperationsInput | string | null
    industrialZone?: BoolFieldUpdateOperationsInput | boolean
    ambientMetrics?: SensorMetricsAmbientUpdateManyWithoutSensorNestedInput
    trafficMetrics?: SensorMetricsTrafficUpdateManyWithoutSensorNestedInput
    airMetrics?: SensorMetricsAirUpdateManyWithoutSensorNestedInput
    waterUsageMetrics?: SensorMetricsWaterUsageUpdateManyWithoutSensorNestedInput
    waterQualityMetrics?: SensorMetricsWaterQualityUpdateManyWithoutSensorNestedInput
  }

  export type SensorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cityId?: StringFieldUpdateOperationsInput | string
    kmPoint?: FloatFieldUpdateOperationsInput | number
    sensorType?: StringFieldUpdateOperationsInput | string
    stateId?: StringFieldUpdateOperationsInput | string
    roadId?: NullableStringFieldUpdateOperationsInput | string | null
    industrialZone?: BoolFieldUpdateOperationsInput | boolean
    ambientMetrics?: SensorMetricsAmbientUncheckedUpdateManyWithoutSensorNestedInput
    trafficMetrics?: SensorMetricsTrafficUncheckedUpdateManyWithoutSensorNestedInput
    airMetrics?: SensorMetricsAirUncheckedUpdateManyWithoutSensorNestedInput
    waterUsageMetrics?: SensorMetricsWaterUsageUncheckedUpdateManyWithoutSensorNestedInput
    waterQualityMetrics?: SensorMetricsWaterQualityUncheckedUpdateManyWithoutSensorNestedInput
  }

  export type SensorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cityId?: StringFieldUpdateOperationsInput | string
    kmPoint?: FloatFieldUpdateOperationsInput | number
    sensorType?: StringFieldUpdateOperationsInput | string
    stateId?: StringFieldUpdateOperationsInput | string
    roadId?: NullableStringFieldUpdateOperationsInput | string | null
    industrialZone?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SensorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cityId?: StringFieldUpdateOperationsInput | string
    kmPoint?: FloatFieldUpdateOperationsInput | number
    sensorType?: StringFieldUpdateOperationsInput | string
    stateId?: StringFieldUpdateOperationsInput | string
    roadId?: NullableStringFieldUpdateOperationsInput | string | null
    industrialZone?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SensorMetricsAmbientCreateInput = {
    eventTime: Date | string
    temperature: number
    humidity: number
    solarRadiation: number
    sensor: SensorCreateNestedOneWithoutAmbientMetricsInput
  }

  export type SensorMetricsAmbientUncheckedCreateInput = {
    sensorId: string
    eventTime: Date | string
    temperature: number
    humidity: number
    solarRadiation: number
  }

  export type SensorMetricsAmbientUpdateInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    temperature?: FloatFieldUpdateOperationsInput | number
    humidity?: FloatFieldUpdateOperationsInput | number
    solarRadiation?: FloatFieldUpdateOperationsInput | number
    sensor?: SensorUpdateOneRequiredWithoutAmbientMetricsNestedInput
  }

  export type SensorMetricsAmbientUncheckedUpdateInput = {
    sensorId?: StringFieldUpdateOperationsInput | string
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    temperature?: FloatFieldUpdateOperationsInput | number
    humidity?: FloatFieldUpdateOperationsInput | number
    solarRadiation?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsAmbientCreateManyInput = {
    sensorId: string
    eventTime: Date | string
    temperature: number
    humidity: number
    solarRadiation: number
  }

  export type SensorMetricsAmbientUpdateManyMutationInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    temperature?: FloatFieldUpdateOperationsInput | number
    humidity?: FloatFieldUpdateOperationsInput | number
    solarRadiation?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsAmbientUncheckedUpdateManyInput = {
    sensorId?: StringFieldUpdateOperationsInput | string
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    temperature?: FloatFieldUpdateOperationsInput | number
    humidity?: FloatFieldUpdateOperationsInput | number
    solarRadiation?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsTrafficCreateInput = {
    eventTime: Date | string
    vehicleDensity: number
    avgSpeed: number
    flowRate: number
    occupancy: number
    congestionIndex: number
    sensor: SensorCreateNestedOneWithoutTrafficMetricsInput
  }

  export type SensorMetricsTrafficUncheckedCreateInput = {
    sensorId: string
    eventTime: Date | string
    vehicleDensity: number
    avgSpeed: number
    flowRate: number
    occupancy: number
    congestionIndex: number
  }

  export type SensorMetricsTrafficUpdateInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleDensity?: FloatFieldUpdateOperationsInput | number
    avgSpeed?: FloatFieldUpdateOperationsInput | number
    flowRate?: FloatFieldUpdateOperationsInput | number
    occupancy?: FloatFieldUpdateOperationsInput | number
    congestionIndex?: FloatFieldUpdateOperationsInput | number
    sensor?: SensorUpdateOneRequiredWithoutTrafficMetricsNestedInput
  }

  export type SensorMetricsTrafficUncheckedUpdateInput = {
    sensorId?: StringFieldUpdateOperationsInput | string
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleDensity?: FloatFieldUpdateOperationsInput | number
    avgSpeed?: FloatFieldUpdateOperationsInput | number
    flowRate?: FloatFieldUpdateOperationsInput | number
    occupancy?: FloatFieldUpdateOperationsInput | number
    congestionIndex?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsTrafficCreateManyInput = {
    sensorId: string
    eventTime: Date | string
    vehicleDensity: number
    avgSpeed: number
    flowRate: number
    occupancy: number
    congestionIndex: number
  }

  export type SensorMetricsTrafficUpdateManyMutationInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleDensity?: FloatFieldUpdateOperationsInput | number
    avgSpeed?: FloatFieldUpdateOperationsInput | number
    flowRate?: FloatFieldUpdateOperationsInput | number
    occupancy?: FloatFieldUpdateOperationsInput | number
    congestionIndex?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsTrafficUncheckedUpdateManyInput = {
    sensorId?: StringFieldUpdateOperationsInput | string
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleDensity?: FloatFieldUpdateOperationsInput | number
    avgSpeed?: FloatFieldUpdateOperationsInput | number
    flowRate?: FloatFieldUpdateOperationsInput | number
    occupancy?: FloatFieldUpdateOperationsInput | number
    congestionIndex?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsAirCreateInput = {
    eventTime: Date | string
    pm10: number
    co: number
    co2: number
    no2: number
    o3: number
    so2: number
    sensor: SensorCreateNestedOneWithoutAirMetricsInput
  }

  export type SensorMetricsAirUncheckedCreateInput = {
    sensorId: string
    eventTime: Date | string
    pm10: number
    co: number
    co2: number
    no2: number
    o3: number
    so2: number
  }

  export type SensorMetricsAirUpdateInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    pm10?: FloatFieldUpdateOperationsInput | number
    co?: FloatFieldUpdateOperationsInput | number
    co2?: FloatFieldUpdateOperationsInput | number
    no2?: FloatFieldUpdateOperationsInput | number
    o3?: FloatFieldUpdateOperationsInput | number
    so2?: FloatFieldUpdateOperationsInput | number
    sensor?: SensorUpdateOneRequiredWithoutAirMetricsNestedInput
  }

  export type SensorMetricsAirUncheckedUpdateInput = {
    sensorId?: StringFieldUpdateOperationsInput | string
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    pm10?: FloatFieldUpdateOperationsInput | number
    co?: FloatFieldUpdateOperationsInput | number
    co2?: FloatFieldUpdateOperationsInput | number
    no2?: FloatFieldUpdateOperationsInput | number
    o3?: FloatFieldUpdateOperationsInput | number
    so2?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsAirCreateManyInput = {
    sensorId: string
    eventTime: Date | string
    pm10: number
    co: number
    co2: number
    no2: number
    o3: number
    so2: number
  }

  export type SensorMetricsAirUpdateManyMutationInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    pm10?: FloatFieldUpdateOperationsInput | number
    co?: FloatFieldUpdateOperationsInput | number
    co2?: FloatFieldUpdateOperationsInput | number
    no2?: FloatFieldUpdateOperationsInput | number
    o3?: FloatFieldUpdateOperationsInput | number
    so2?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsAirUncheckedUpdateManyInput = {
    sensorId?: StringFieldUpdateOperationsInput | string
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    pm10?: FloatFieldUpdateOperationsInput | number
    co?: FloatFieldUpdateOperationsInput | number
    co2?: FloatFieldUpdateOperationsInput | number
    no2?: FloatFieldUpdateOperationsInput | number
    o3?: FloatFieldUpdateOperationsInput | number
    so2?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsWaterUsageCreateInput = {
    eventTime: Date | string
    usageLiters: number
    sensor: SensorCreateNestedOneWithoutWaterUsageMetricsInput
  }

  export type SensorMetricsWaterUsageUncheckedCreateInput = {
    sensorId: string
    eventTime: Date | string
    usageLiters: number
  }

  export type SensorMetricsWaterUsageUpdateInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    usageLiters?: FloatFieldUpdateOperationsInput | number
    sensor?: SensorUpdateOneRequiredWithoutWaterUsageMetricsNestedInput
  }

  export type SensorMetricsWaterUsageUncheckedUpdateInput = {
    sensorId?: StringFieldUpdateOperationsInput | string
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    usageLiters?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsWaterUsageCreateManyInput = {
    sensorId: string
    eventTime: Date | string
    usageLiters: number
  }

  export type SensorMetricsWaterUsageUpdateManyMutationInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    usageLiters?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsWaterUsageUncheckedUpdateManyInput = {
    sensorId?: StringFieldUpdateOperationsInput | string
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    usageLiters?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsWaterQualityCreateInput = {
    eventTime: Date | string
    waterTemperature: number
    phLevel: number
    turbidity: number
    dissolvedOxygen: number
    conductivity: number
    sensor: SensorCreateNestedOneWithoutWaterQualityMetricsInput
  }

  export type SensorMetricsWaterQualityUncheckedCreateInput = {
    sensorId: string
    eventTime: Date | string
    waterTemperature: number
    phLevel: number
    turbidity: number
    dissolvedOxygen: number
    conductivity: number
  }

  export type SensorMetricsWaterQualityUpdateInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    waterTemperature?: FloatFieldUpdateOperationsInput | number
    phLevel?: FloatFieldUpdateOperationsInput | number
    turbidity?: FloatFieldUpdateOperationsInput | number
    dissolvedOxygen?: FloatFieldUpdateOperationsInput | number
    conductivity?: FloatFieldUpdateOperationsInput | number
    sensor?: SensorUpdateOneRequiredWithoutWaterQualityMetricsNestedInput
  }

  export type SensorMetricsWaterQualityUncheckedUpdateInput = {
    sensorId?: StringFieldUpdateOperationsInput | string
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    waterTemperature?: FloatFieldUpdateOperationsInput | number
    phLevel?: FloatFieldUpdateOperationsInput | number
    turbidity?: FloatFieldUpdateOperationsInput | number
    dissolvedOxygen?: FloatFieldUpdateOperationsInput | number
    conductivity?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsWaterQualityCreateManyInput = {
    sensorId: string
    eventTime: Date | string
    waterTemperature: number
    phLevel: number
    turbidity: number
    dissolvedOxygen: number
    conductivity: number
  }

  export type SensorMetricsWaterQualityUpdateManyMutationInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    waterTemperature?: FloatFieldUpdateOperationsInput | number
    phLevel?: FloatFieldUpdateOperationsInput | number
    turbidity?: FloatFieldUpdateOperationsInput | number
    dissolvedOxygen?: FloatFieldUpdateOperationsInput | number
    conductivity?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsWaterQualityUncheckedUpdateManyInput = {
    sensorId?: StringFieldUpdateOperationsInput | string
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    waterTemperature?: FloatFieldUpdateOperationsInput | number
    phLevel?: FloatFieldUpdateOperationsInput | number
    turbidity?: FloatFieldUpdateOperationsInput | number
    dissolvedOxygen?: FloatFieldUpdateOperationsInput | number
    conductivity?: FloatFieldUpdateOperationsInput | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SensorMetricsAmbientListRelationFilter = {
    every?: SensorMetricsAmbientWhereInput
    some?: SensorMetricsAmbientWhereInput
    none?: SensorMetricsAmbientWhereInput
  }

  export type SensorMetricsTrafficListRelationFilter = {
    every?: SensorMetricsTrafficWhereInput
    some?: SensorMetricsTrafficWhereInput
    none?: SensorMetricsTrafficWhereInput
  }

  export type SensorMetricsAirListRelationFilter = {
    every?: SensorMetricsAirWhereInput
    some?: SensorMetricsAirWhereInput
    none?: SensorMetricsAirWhereInput
  }

  export type SensorMetricsWaterUsageListRelationFilter = {
    every?: SensorMetricsWaterUsageWhereInput
    some?: SensorMetricsWaterUsageWhereInput
    none?: SensorMetricsWaterUsageWhereInput
  }

  export type SensorMetricsWaterQualityListRelationFilter = {
    every?: SensorMetricsWaterQualityWhereInput
    some?: SensorMetricsWaterQualityWhereInput
    none?: SensorMetricsWaterQualityWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SensorMetricsAmbientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SensorMetricsTrafficOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SensorMetricsAirOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SensorMetricsWaterUsageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SensorMetricsWaterQualityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SensorCountOrderByAggregateInput = {
    id?: SortOrder
    installedAt?: SortOrder
    cityId?: SortOrder
    kmPoint?: SortOrder
    sensorType?: SortOrder
    stateId?: SortOrder
    roadId?: SortOrder
    industrialZone?: SortOrder
  }

  export type SensorAvgOrderByAggregateInput = {
    kmPoint?: SortOrder
  }

  export type SensorMaxOrderByAggregateInput = {
    id?: SortOrder
    installedAt?: SortOrder
    cityId?: SortOrder
    kmPoint?: SortOrder
    sensorType?: SortOrder
    stateId?: SortOrder
    roadId?: SortOrder
    industrialZone?: SortOrder
  }

  export type SensorMinOrderByAggregateInput = {
    id?: SortOrder
    installedAt?: SortOrder
    cityId?: SortOrder
    kmPoint?: SortOrder
    sensorType?: SortOrder
    stateId?: SortOrder
    roadId?: SortOrder
    industrialZone?: SortOrder
  }

  export type SensorSumOrderByAggregateInput = {
    kmPoint?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type SensorScalarRelationFilter = {
    is?: SensorWhereInput
    isNot?: SensorWhereInput
  }

  export type SensorMetricsAmbientSensorIdEventTimeCompoundUniqueInput = {
    sensorId: string
    eventTime: Date | string
  }

  export type SensorMetricsAmbientCountOrderByAggregateInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    solarRadiation?: SortOrder
  }

  export type SensorMetricsAmbientAvgOrderByAggregateInput = {
    temperature?: SortOrder
    humidity?: SortOrder
    solarRadiation?: SortOrder
  }

  export type SensorMetricsAmbientMaxOrderByAggregateInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    solarRadiation?: SortOrder
  }

  export type SensorMetricsAmbientMinOrderByAggregateInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    solarRadiation?: SortOrder
  }

  export type SensorMetricsAmbientSumOrderByAggregateInput = {
    temperature?: SortOrder
    humidity?: SortOrder
    solarRadiation?: SortOrder
  }

  export type SensorMetricsTrafficSensorIdEventTimeCompoundUniqueInput = {
    sensorId: string
    eventTime: Date | string
  }

  export type SensorMetricsTrafficCountOrderByAggregateInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    vehicleDensity?: SortOrder
    avgSpeed?: SortOrder
    flowRate?: SortOrder
    occupancy?: SortOrder
    congestionIndex?: SortOrder
  }

  export type SensorMetricsTrafficAvgOrderByAggregateInput = {
    vehicleDensity?: SortOrder
    avgSpeed?: SortOrder
    flowRate?: SortOrder
    occupancy?: SortOrder
    congestionIndex?: SortOrder
  }

  export type SensorMetricsTrafficMaxOrderByAggregateInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    vehicleDensity?: SortOrder
    avgSpeed?: SortOrder
    flowRate?: SortOrder
    occupancy?: SortOrder
    congestionIndex?: SortOrder
  }

  export type SensorMetricsTrafficMinOrderByAggregateInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    vehicleDensity?: SortOrder
    avgSpeed?: SortOrder
    flowRate?: SortOrder
    occupancy?: SortOrder
    congestionIndex?: SortOrder
  }

  export type SensorMetricsTrafficSumOrderByAggregateInput = {
    vehicleDensity?: SortOrder
    avgSpeed?: SortOrder
    flowRate?: SortOrder
    occupancy?: SortOrder
    congestionIndex?: SortOrder
  }

  export type SensorMetricsAirSensorIdEventTimeCompoundUniqueInput = {
    sensorId: string
    eventTime: Date | string
  }

  export type SensorMetricsAirCountOrderByAggregateInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    pm10?: SortOrder
    co?: SortOrder
    co2?: SortOrder
    no2?: SortOrder
    o3?: SortOrder
    so2?: SortOrder
  }

  export type SensorMetricsAirAvgOrderByAggregateInput = {
    pm10?: SortOrder
    co?: SortOrder
    co2?: SortOrder
    no2?: SortOrder
    o3?: SortOrder
    so2?: SortOrder
  }

  export type SensorMetricsAirMaxOrderByAggregateInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    pm10?: SortOrder
    co?: SortOrder
    co2?: SortOrder
    no2?: SortOrder
    o3?: SortOrder
    so2?: SortOrder
  }

  export type SensorMetricsAirMinOrderByAggregateInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    pm10?: SortOrder
    co?: SortOrder
    co2?: SortOrder
    no2?: SortOrder
    o3?: SortOrder
    so2?: SortOrder
  }

  export type SensorMetricsAirSumOrderByAggregateInput = {
    pm10?: SortOrder
    co?: SortOrder
    co2?: SortOrder
    no2?: SortOrder
    o3?: SortOrder
    so2?: SortOrder
  }

  export type SensorMetricsWaterUsageSensorIdEventTimeCompoundUniqueInput = {
    sensorId: string
    eventTime: Date | string
  }

  export type SensorMetricsWaterUsageCountOrderByAggregateInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    usageLiters?: SortOrder
  }

  export type SensorMetricsWaterUsageAvgOrderByAggregateInput = {
    usageLiters?: SortOrder
  }

  export type SensorMetricsWaterUsageMaxOrderByAggregateInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    usageLiters?: SortOrder
  }

  export type SensorMetricsWaterUsageMinOrderByAggregateInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    usageLiters?: SortOrder
  }

  export type SensorMetricsWaterUsageSumOrderByAggregateInput = {
    usageLiters?: SortOrder
  }

  export type SensorMetricsWaterQualitySensorIdEventTimeCompoundUniqueInput = {
    sensorId: string
    eventTime: Date | string
  }

  export type SensorMetricsWaterQualityCountOrderByAggregateInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    waterTemperature?: SortOrder
    phLevel?: SortOrder
    turbidity?: SortOrder
    dissolvedOxygen?: SortOrder
    conductivity?: SortOrder
  }

  export type SensorMetricsWaterQualityAvgOrderByAggregateInput = {
    waterTemperature?: SortOrder
    phLevel?: SortOrder
    turbidity?: SortOrder
    dissolvedOxygen?: SortOrder
    conductivity?: SortOrder
  }

  export type SensorMetricsWaterQualityMaxOrderByAggregateInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    waterTemperature?: SortOrder
    phLevel?: SortOrder
    turbidity?: SortOrder
    dissolvedOxygen?: SortOrder
    conductivity?: SortOrder
  }

  export type SensorMetricsWaterQualityMinOrderByAggregateInput = {
    sensorId?: SortOrder
    eventTime?: SortOrder
    waterTemperature?: SortOrder
    phLevel?: SortOrder
    turbidity?: SortOrder
    dissolvedOxygen?: SortOrder
    conductivity?: SortOrder
  }

  export type SensorMetricsWaterQualitySumOrderByAggregateInput = {
    waterTemperature?: SortOrder
    phLevel?: SortOrder
    turbidity?: SortOrder
    dissolvedOxygen?: SortOrder
    conductivity?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type SensorMetricsAmbientUpdateManyWithoutSensorNestedInput = {
    create?: XOR<SensorMetricsAmbientCreateWithoutSensorInput, SensorMetricsAmbientUncheckedCreateWithoutSensorInput> | SensorMetricsAmbientCreateWithoutSensorInput[] | SensorMetricsAmbientUncheckedCreateWithoutSensorInput[]
    connectOrCreate?: SensorMetricsAmbientCreateOrConnectWithoutSensorInput | SensorMetricsAmbientCreateOrConnectWithoutSensorInput[]
    upsert?: SensorMetricsAmbientUpsertWithWhereUniqueWithoutSensorInput | SensorMetricsAmbientUpsertWithWhereUniqueWithoutSensorInput[]
    createMany?: SensorMetricsAmbientCreateManySensorInputEnvelope
    set?: SensorMetricsAmbientWhereUniqueInput | SensorMetricsAmbientWhereUniqueInput[]
    disconnect?: SensorMetricsAmbientWhereUniqueInput | SensorMetricsAmbientWhereUniqueInput[]
    delete?: SensorMetricsAmbientWhereUniqueInput | SensorMetricsAmbientWhereUniqueInput[]
    connect?: SensorMetricsAmbientWhereUniqueInput | SensorMetricsAmbientWhereUniqueInput[]
    update?: SensorMetricsAmbientUpdateWithWhereUniqueWithoutSensorInput | SensorMetricsAmbientUpdateWithWhereUniqueWithoutSensorInput[]
    updateMany?: SensorMetricsAmbientUpdateManyWithWhereWithoutSensorInput | SensorMetricsAmbientUpdateManyWithWhereWithoutSensorInput[]
    deleteMany?: SensorMetricsAmbientScalarWhereInput | SensorMetricsAmbientScalarWhereInput[]
  }

  export type SensorMetricsTrafficUpdateManyWithoutSensorNestedInput = {
    create?: XOR<SensorMetricsTrafficCreateWithoutSensorInput, SensorMetricsTrafficUncheckedCreateWithoutSensorInput> | SensorMetricsTrafficCreateWithoutSensorInput[] | SensorMetricsTrafficUncheckedCreateWithoutSensorInput[]
    connectOrCreate?: SensorMetricsTrafficCreateOrConnectWithoutSensorInput | SensorMetricsTrafficCreateOrConnectWithoutSensorInput[]
    upsert?: SensorMetricsTrafficUpsertWithWhereUniqueWithoutSensorInput | SensorMetricsTrafficUpsertWithWhereUniqueWithoutSensorInput[]
    createMany?: SensorMetricsTrafficCreateManySensorInputEnvelope
    set?: SensorMetricsTrafficWhereUniqueInput | SensorMetricsTrafficWhereUniqueInput[]
    disconnect?: SensorMetricsTrafficWhereUniqueInput | SensorMetricsTrafficWhereUniqueInput[]
    delete?: SensorMetricsTrafficWhereUniqueInput | SensorMetricsTrafficWhereUniqueInput[]
    connect?: SensorMetricsTrafficWhereUniqueInput | SensorMetricsTrafficWhereUniqueInput[]
    update?: SensorMetricsTrafficUpdateWithWhereUniqueWithoutSensorInput | SensorMetricsTrafficUpdateWithWhereUniqueWithoutSensorInput[]
    updateMany?: SensorMetricsTrafficUpdateManyWithWhereWithoutSensorInput | SensorMetricsTrafficUpdateManyWithWhereWithoutSensorInput[]
    deleteMany?: SensorMetricsTrafficScalarWhereInput | SensorMetricsTrafficScalarWhereInput[]
  }

  export type SensorMetricsAirUpdateManyWithoutSensorNestedInput = {
    create?: XOR<SensorMetricsAirCreateWithoutSensorInput, SensorMetricsAirUncheckedCreateWithoutSensorInput> | SensorMetricsAirCreateWithoutSensorInput[] | SensorMetricsAirUncheckedCreateWithoutSensorInput[]
    connectOrCreate?: SensorMetricsAirCreateOrConnectWithoutSensorInput | SensorMetricsAirCreateOrConnectWithoutSensorInput[]
    upsert?: SensorMetricsAirUpsertWithWhereUniqueWithoutSensorInput | SensorMetricsAirUpsertWithWhereUniqueWithoutSensorInput[]
    createMany?: SensorMetricsAirCreateManySensorInputEnvelope
    set?: SensorMetricsAirWhereUniqueInput | SensorMetricsAirWhereUniqueInput[]
    disconnect?: SensorMetricsAirWhereUniqueInput | SensorMetricsAirWhereUniqueInput[]
    delete?: SensorMetricsAirWhereUniqueInput | SensorMetricsAirWhereUniqueInput[]
    connect?: SensorMetricsAirWhereUniqueInput | SensorMetricsAirWhereUniqueInput[]
    update?: SensorMetricsAirUpdateWithWhereUniqueWithoutSensorInput | SensorMetricsAirUpdateWithWhereUniqueWithoutSensorInput[]
    updateMany?: SensorMetricsAirUpdateManyWithWhereWithoutSensorInput | SensorMetricsAirUpdateManyWithWhereWithoutSensorInput[]
    deleteMany?: SensorMetricsAirScalarWhereInput | SensorMetricsAirScalarWhereInput[]
  }

  export type SensorMetricsWaterUsageUpdateManyWithoutSensorNestedInput = {
    create?: XOR<SensorMetricsWaterUsageCreateWithoutSensorInput, SensorMetricsWaterUsageUncheckedCreateWithoutSensorInput> | SensorMetricsWaterUsageCreateWithoutSensorInput[] | SensorMetricsWaterUsageUncheckedCreateWithoutSensorInput[]
    connectOrCreate?: SensorMetricsWaterUsageCreateOrConnectWithoutSensorInput | SensorMetricsWaterUsageCreateOrConnectWithoutSensorInput[]
    upsert?: SensorMetricsWaterUsageUpsertWithWhereUniqueWithoutSensorInput | SensorMetricsWaterUsageUpsertWithWhereUniqueWithoutSensorInput[]
    createMany?: SensorMetricsWaterUsageCreateManySensorInputEnvelope
    set?: SensorMetricsWaterUsageWhereUniqueInput | SensorMetricsWaterUsageWhereUniqueInput[]
    disconnect?: SensorMetricsWaterUsageWhereUniqueInput | SensorMetricsWaterUsageWhereUniqueInput[]
    delete?: SensorMetricsWaterUsageWhereUniqueInput | SensorMetricsWaterUsageWhereUniqueInput[]
    connect?: SensorMetricsWaterUsageWhereUniqueInput | SensorMetricsWaterUsageWhereUniqueInput[]
    update?: SensorMetricsWaterUsageUpdateWithWhereUniqueWithoutSensorInput | SensorMetricsWaterUsageUpdateWithWhereUniqueWithoutSensorInput[]
    updateMany?: SensorMetricsWaterUsageUpdateManyWithWhereWithoutSensorInput | SensorMetricsWaterUsageUpdateManyWithWhereWithoutSensorInput[]
    deleteMany?: SensorMetricsWaterUsageScalarWhereInput | SensorMetricsWaterUsageScalarWhereInput[]
  }

  export type SensorMetricsWaterQualityUpdateManyWithoutSensorNestedInput = {
    create?: XOR<SensorMetricsWaterQualityCreateWithoutSensorInput, SensorMetricsWaterQualityUncheckedCreateWithoutSensorInput> | SensorMetricsWaterQualityCreateWithoutSensorInput[] | SensorMetricsWaterQualityUncheckedCreateWithoutSensorInput[]
    connectOrCreate?: SensorMetricsWaterQualityCreateOrConnectWithoutSensorInput | SensorMetricsWaterQualityCreateOrConnectWithoutSensorInput[]
    upsert?: SensorMetricsWaterQualityUpsertWithWhereUniqueWithoutSensorInput | SensorMetricsWaterQualityUpsertWithWhereUniqueWithoutSensorInput[]
    createMany?: SensorMetricsWaterQualityCreateManySensorInputEnvelope
    set?: SensorMetricsWaterQualityWhereUniqueInput | SensorMetricsWaterQualityWhereUniqueInput[]
    disconnect?: SensorMetricsWaterQualityWhereUniqueInput | SensorMetricsWaterQualityWhereUniqueInput[]
    delete?: SensorMetricsWaterQualityWhereUniqueInput | SensorMetricsWaterQualityWhereUniqueInput[]
    connect?: SensorMetricsWaterQualityWhereUniqueInput | SensorMetricsWaterQualityWhereUniqueInput[]
    update?: SensorMetricsWaterQualityUpdateWithWhereUniqueWithoutSensorInput | SensorMetricsWaterQualityUpdateWithWhereUniqueWithoutSensorInput[]
    updateMany?: SensorMetricsWaterQualityUpdateManyWithWhereWithoutSensorInput | SensorMetricsWaterQualityUpdateManyWithWhereWithoutSensorInput[]
    deleteMany?: SensorMetricsWaterQualityScalarWhereInput | SensorMetricsWaterQualityScalarWhereInput[]
  }

  export type SensorMetricsAmbientUncheckedUpdateManyWithoutSensorNestedInput = {
    create?: XOR<SensorMetricsAmbientCreateWithoutSensorInput, SensorMetricsAmbientUncheckedCreateWithoutSensorInput> | SensorMetricsAmbientCreateWithoutSensorInput[] | SensorMetricsAmbientUncheckedCreateWithoutSensorInput[]
    connectOrCreate?: SensorMetricsAmbientCreateOrConnectWithoutSensorInput | SensorMetricsAmbientCreateOrConnectWithoutSensorInput[]
    upsert?: SensorMetricsAmbientUpsertWithWhereUniqueWithoutSensorInput | SensorMetricsAmbientUpsertWithWhereUniqueWithoutSensorInput[]
    createMany?: SensorMetricsAmbientCreateManySensorInputEnvelope
    set?: SensorMetricsAmbientWhereUniqueInput | SensorMetricsAmbientWhereUniqueInput[]
    disconnect?: SensorMetricsAmbientWhereUniqueInput | SensorMetricsAmbientWhereUniqueInput[]
    delete?: SensorMetricsAmbientWhereUniqueInput | SensorMetricsAmbientWhereUniqueInput[]
    connect?: SensorMetricsAmbientWhereUniqueInput | SensorMetricsAmbientWhereUniqueInput[]
    update?: SensorMetricsAmbientUpdateWithWhereUniqueWithoutSensorInput | SensorMetricsAmbientUpdateWithWhereUniqueWithoutSensorInput[]
    updateMany?: SensorMetricsAmbientUpdateManyWithWhereWithoutSensorInput | SensorMetricsAmbientUpdateManyWithWhereWithoutSensorInput[]
    deleteMany?: SensorMetricsAmbientScalarWhereInput | SensorMetricsAmbientScalarWhereInput[]
  }

  export type SensorMetricsTrafficUncheckedUpdateManyWithoutSensorNestedInput = {
    create?: XOR<SensorMetricsTrafficCreateWithoutSensorInput, SensorMetricsTrafficUncheckedCreateWithoutSensorInput> | SensorMetricsTrafficCreateWithoutSensorInput[] | SensorMetricsTrafficUncheckedCreateWithoutSensorInput[]
    connectOrCreate?: SensorMetricsTrafficCreateOrConnectWithoutSensorInput | SensorMetricsTrafficCreateOrConnectWithoutSensorInput[]
    upsert?: SensorMetricsTrafficUpsertWithWhereUniqueWithoutSensorInput | SensorMetricsTrafficUpsertWithWhereUniqueWithoutSensorInput[]
    createMany?: SensorMetricsTrafficCreateManySensorInputEnvelope
    set?: SensorMetricsTrafficWhereUniqueInput | SensorMetricsTrafficWhereUniqueInput[]
    disconnect?: SensorMetricsTrafficWhereUniqueInput | SensorMetricsTrafficWhereUniqueInput[]
    delete?: SensorMetricsTrafficWhereUniqueInput | SensorMetricsTrafficWhereUniqueInput[]
    connect?: SensorMetricsTrafficWhereUniqueInput | SensorMetricsTrafficWhereUniqueInput[]
    update?: SensorMetricsTrafficUpdateWithWhereUniqueWithoutSensorInput | SensorMetricsTrafficUpdateWithWhereUniqueWithoutSensorInput[]
    updateMany?: SensorMetricsTrafficUpdateManyWithWhereWithoutSensorInput | SensorMetricsTrafficUpdateManyWithWhereWithoutSensorInput[]
    deleteMany?: SensorMetricsTrafficScalarWhereInput | SensorMetricsTrafficScalarWhereInput[]
  }

  export type SensorMetricsAirUncheckedUpdateManyWithoutSensorNestedInput = {
    create?: XOR<SensorMetricsAirCreateWithoutSensorInput, SensorMetricsAirUncheckedCreateWithoutSensorInput> | SensorMetricsAirCreateWithoutSensorInput[] | SensorMetricsAirUncheckedCreateWithoutSensorInput[]
    connectOrCreate?: SensorMetricsAirCreateOrConnectWithoutSensorInput | SensorMetricsAirCreateOrConnectWithoutSensorInput[]
    upsert?: SensorMetricsAirUpsertWithWhereUniqueWithoutSensorInput | SensorMetricsAirUpsertWithWhereUniqueWithoutSensorInput[]
    createMany?: SensorMetricsAirCreateManySensorInputEnvelope
    set?: SensorMetricsAirWhereUniqueInput | SensorMetricsAirWhereUniqueInput[]
    disconnect?: SensorMetricsAirWhereUniqueInput | SensorMetricsAirWhereUniqueInput[]
    delete?: SensorMetricsAirWhereUniqueInput | SensorMetricsAirWhereUniqueInput[]
    connect?: SensorMetricsAirWhereUniqueInput | SensorMetricsAirWhereUniqueInput[]
    update?: SensorMetricsAirUpdateWithWhereUniqueWithoutSensorInput | SensorMetricsAirUpdateWithWhereUniqueWithoutSensorInput[]
    updateMany?: SensorMetricsAirUpdateManyWithWhereWithoutSensorInput | SensorMetricsAirUpdateManyWithWhereWithoutSensorInput[]
    deleteMany?: SensorMetricsAirScalarWhereInput | SensorMetricsAirScalarWhereInput[]
  }

  export type SensorMetricsWaterUsageUncheckedUpdateManyWithoutSensorNestedInput = {
    create?: XOR<SensorMetricsWaterUsageCreateWithoutSensorInput, SensorMetricsWaterUsageUncheckedCreateWithoutSensorInput> | SensorMetricsWaterUsageCreateWithoutSensorInput[] | SensorMetricsWaterUsageUncheckedCreateWithoutSensorInput[]
    connectOrCreate?: SensorMetricsWaterUsageCreateOrConnectWithoutSensorInput | SensorMetricsWaterUsageCreateOrConnectWithoutSensorInput[]
    upsert?: SensorMetricsWaterUsageUpsertWithWhereUniqueWithoutSensorInput | SensorMetricsWaterUsageUpsertWithWhereUniqueWithoutSensorInput[]
    createMany?: SensorMetricsWaterUsageCreateManySensorInputEnvelope
    set?: SensorMetricsWaterUsageWhereUniqueInput | SensorMetricsWaterUsageWhereUniqueInput[]
    disconnect?: SensorMetricsWaterUsageWhereUniqueInput | SensorMetricsWaterUsageWhereUniqueInput[]
    delete?: SensorMetricsWaterUsageWhereUniqueInput | SensorMetricsWaterUsageWhereUniqueInput[]
    connect?: SensorMetricsWaterUsageWhereUniqueInput | SensorMetricsWaterUsageWhereUniqueInput[]
    update?: SensorMetricsWaterUsageUpdateWithWhereUniqueWithoutSensorInput | SensorMetricsWaterUsageUpdateWithWhereUniqueWithoutSensorInput[]
    updateMany?: SensorMetricsWaterUsageUpdateManyWithWhereWithoutSensorInput | SensorMetricsWaterUsageUpdateManyWithWhereWithoutSensorInput[]
    deleteMany?: SensorMetricsWaterUsageScalarWhereInput | SensorMetricsWaterUsageScalarWhereInput[]
  }

  export type SensorMetricsWaterQualityUncheckedUpdateManyWithoutSensorNestedInput = {
    create?: XOR<SensorMetricsWaterQualityCreateWithoutSensorInput, SensorMetricsWaterQualityUncheckedCreateWithoutSensorInput> | SensorMetricsWaterQualityCreateWithoutSensorInput[] | SensorMetricsWaterQualityUncheckedCreateWithoutSensorInput[]
    connectOrCreate?: SensorMetricsWaterQualityCreateOrConnectWithoutSensorInput | SensorMetricsWaterQualityCreateOrConnectWithoutSensorInput[]
    upsert?: SensorMetricsWaterQualityUpsertWithWhereUniqueWithoutSensorInput | SensorMetricsWaterQualityUpsertWithWhereUniqueWithoutSensorInput[]
    createMany?: SensorMetricsWaterQualityCreateManySensorInputEnvelope
    set?: SensorMetricsWaterQualityWhereUniqueInput | SensorMetricsWaterQualityWhereUniqueInput[]
    disconnect?: SensorMetricsWaterQualityWhereUniqueInput | SensorMetricsWaterQualityWhereUniqueInput[]
    delete?: SensorMetricsWaterQualityWhereUniqueInput | SensorMetricsWaterQualityWhereUniqueInput[]
    connect?: SensorMetricsWaterQualityWhereUniqueInput | SensorMetricsWaterQualityWhereUniqueInput[]
    update?: SensorMetricsWaterQualityUpdateWithWhereUniqueWithoutSensorInput | SensorMetricsWaterQualityUpdateWithWhereUniqueWithoutSensorInput[]
    updateMany?: SensorMetricsWaterQualityUpdateManyWithWhereWithoutSensorInput | SensorMetricsWaterQualityUpdateManyWithWhereWithoutSensorInput[]
    deleteMany?: SensorMetricsWaterQualityScalarWhereInput | SensorMetricsWaterQualityScalarWhereInput[]
  }

  export type SensorCreateNestedOneWithoutAmbientMetricsInput = {
    connect?: SensorWhereUniqueInput
  }

  export type SensorUpdateOneRequiredWithoutAmbientMetricsNestedInput = {
    connect?: SensorWhereUniqueInput
    update?: XOR<XOR<SensorUpdateToOneWithWhereWithoutAmbientMetricsInput, SensorUpdateWithoutAmbientMetricsInput>, SensorUncheckedUpdateWithoutAmbientMetricsInput>
  }

  export type SensorCreateNestedOneWithoutTrafficMetricsInput = {
    connect?: SensorWhereUniqueInput
  }

  export type SensorUpdateOneRequiredWithoutTrafficMetricsNestedInput = {
    connect?: SensorWhereUniqueInput
    update?: XOR<XOR<SensorUpdateToOneWithWhereWithoutTrafficMetricsInput, SensorUpdateWithoutTrafficMetricsInput>, SensorUncheckedUpdateWithoutTrafficMetricsInput>
  }

  export type SensorCreateNestedOneWithoutAirMetricsInput = {
    connect?: SensorWhereUniqueInput
  }

  export type SensorUpdateOneRequiredWithoutAirMetricsNestedInput = {
    connect?: SensorWhereUniqueInput
    update?: XOR<XOR<SensorUpdateToOneWithWhereWithoutAirMetricsInput, SensorUpdateWithoutAirMetricsInput>, SensorUncheckedUpdateWithoutAirMetricsInput>
  }

  export type SensorCreateNestedOneWithoutWaterUsageMetricsInput = {
    connect?: SensorWhereUniqueInput
  }

  export type SensorUpdateOneRequiredWithoutWaterUsageMetricsNestedInput = {
    connect?: SensorWhereUniqueInput
    update?: XOR<XOR<SensorUpdateToOneWithWhereWithoutWaterUsageMetricsInput, SensorUpdateWithoutWaterUsageMetricsInput>, SensorUncheckedUpdateWithoutWaterUsageMetricsInput>
  }

  export type SensorCreateNestedOneWithoutWaterQualityMetricsInput = {
    connect?: SensorWhereUniqueInput
  }

  export type SensorUpdateOneRequiredWithoutWaterQualityMetricsNestedInput = {
    connect?: SensorWhereUniqueInput
    update?: XOR<XOR<SensorUpdateToOneWithWhereWithoutWaterQualityMetricsInput, SensorUpdateWithoutWaterQualityMetricsInput>, SensorUncheckedUpdateWithoutWaterQualityMetricsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type SensorMetricsAmbientCreateWithoutSensorInput = {
    eventTime: Date | string
    temperature: number
    humidity: number
    solarRadiation: number
  }

  export type SensorMetricsAmbientUncheckedCreateWithoutSensorInput = {
    eventTime: Date | string
    temperature: number
    humidity: number
    solarRadiation: number
  }

  export type SensorMetricsAmbientCreateOrConnectWithoutSensorInput = {
    where: SensorMetricsAmbientWhereUniqueInput
    create: XOR<SensorMetricsAmbientCreateWithoutSensorInput, SensorMetricsAmbientUncheckedCreateWithoutSensorInput>
  }

  export type SensorMetricsAmbientUpsertWithWhereUniqueWithoutSensorInput = {
    where: SensorMetricsAmbientWhereUniqueInput
    update: XOR<SensorMetricsAmbientUpdateWithoutSensorInput, SensorMetricsAmbientUncheckedUpdateWithoutSensorInput>
    create: XOR<SensorMetricsAmbientCreateWithoutSensorInput, SensorMetricsAmbientUncheckedCreateWithoutSensorInput>
  }

  export type SensorMetricsAmbientCreateManySensorInputEnvelope = {
    data: SensorMetricsAmbientCreateManySensorInput | SensorMetricsAmbientCreateManySensorInput[]
    skipDuplicates?: boolean
  }

  export type SensorMetricsAmbientUpdateWithWhereUniqueWithoutSensorInput = {
    where: SensorMetricsAmbientWhereUniqueInput
    data: XOR<SensorMetricsAmbientUpdateWithoutSensorInput, SensorMetricsAmbientUncheckedUpdateWithoutSensorInput>
  }

  export type SensorMetricsAmbientUpdateManyWithWhereWithoutSensorInput = {
    where: SensorMetricsAmbientScalarWhereInput
    data: XOR<SensorMetricsAmbientUpdateManyMutationInput, SensorMetricsAmbientUncheckedUpdateManyWithoutSensorInput>
  }

  export type SensorMetricsAmbientScalarWhereInput = {
    AND?: SensorMetricsAmbientScalarWhereInput | SensorMetricsAmbientScalarWhereInput[]
    OR?: SensorMetricsAmbientScalarWhereInput[]
    NOT?: SensorMetricsAmbientScalarWhereInput | SensorMetricsAmbientScalarWhereInput[]
    sensorId?: StringFilter<"SensorMetricsAmbient"> | string
    eventTime?: DateTimeFilter<"SensorMetricsAmbient"> | Date | string
    temperature?: FloatFilter<"SensorMetricsAmbient"> | number
    humidity?: FloatFilter<"SensorMetricsAmbient"> | number
    solarRadiation?: FloatFilter<"SensorMetricsAmbient"> | number
  }

  export type SensorMetricsTrafficCreateWithoutSensorInput = {
    eventTime: Date | string
    vehicleDensity: number
    avgSpeed: number
    flowRate: number
    occupancy: number
    congestionIndex: number
  }

  export type SensorMetricsTrafficUncheckedCreateWithoutSensorInput = {
    eventTime: Date | string
    vehicleDensity: number
    avgSpeed: number
    flowRate: number
    occupancy: number
    congestionIndex: number
  }

  export type SensorMetricsTrafficCreateOrConnectWithoutSensorInput = {
    where: SensorMetricsTrafficWhereUniqueInput
    create: XOR<SensorMetricsTrafficCreateWithoutSensorInput, SensorMetricsTrafficUncheckedCreateWithoutSensorInput>
  }

  export type SensorMetricsTrafficUpsertWithWhereUniqueWithoutSensorInput = {
    where: SensorMetricsTrafficWhereUniqueInput
    update: XOR<SensorMetricsTrafficUpdateWithoutSensorInput, SensorMetricsTrafficUncheckedUpdateWithoutSensorInput>
    create: XOR<SensorMetricsTrafficCreateWithoutSensorInput, SensorMetricsTrafficUncheckedCreateWithoutSensorInput>
  }

  export type SensorMetricsTrafficCreateManySensorInputEnvelope = {
    data: SensorMetricsTrafficCreateManySensorInput | SensorMetricsTrafficCreateManySensorInput[]
    skipDuplicates?: boolean
  }

  export type SensorMetricsTrafficUpdateWithWhereUniqueWithoutSensorInput = {
    where: SensorMetricsTrafficWhereUniqueInput
    data: XOR<SensorMetricsTrafficUpdateWithoutSensorInput, SensorMetricsTrafficUncheckedUpdateWithoutSensorInput>
  }

  export type SensorMetricsTrafficUpdateManyWithWhereWithoutSensorInput = {
    where: SensorMetricsTrafficScalarWhereInput
    data: XOR<SensorMetricsTrafficUpdateManyMutationInput, SensorMetricsTrafficUncheckedUpdateManyWithoutSensorInput>
  }

  export type SensorMetricsTrafficScalarWhereInput = {
    AND?: SensorMetricsTrafficScalarWhereInput | SensorMetricsTrafficScalarWhereInput[]
    OR?: SensorMetricsTrafficScalarWhereInput[]
    NOT?: SensorMetricsTrafficScalarWhereInput | SensorMetricsTrafficScalarWhereInput[]
    sensorId?: StringFilter<"SensorMetricsTraffic"> | string
    eventTime?: DateTimeFilter<"SensorMetricsTraffic"> | Date | string
    vehicleDensity?: FloatFilter<"SensorMetricsTraffic"> | number
    avgSpeed?: FloatFilter<"SensorMetricsTraffic"> | number
    flowRate?: FloatFilter<"SensorMetricsTraffic"> | number
    occupancy?: FloatFilter<"SensorMetricsTraffic"> | number
    congestionIndex?: FloatFilter<"SensorMetricsTraffic"> | number
  }

  export type SensorMetricsAirCreateWithoutSensorInput = {
    eventTime: Date | string
    pm10: number
    co: number
    co2: number
    no2: number
    o3: number
    so2: number
  }

  export type SensorMetricsAirUncheckedCreateWithoutSensorInput = {
    eventTime: Date | string
    pm10: number
    co: number
    co2: number
    no2: number
    o3: number
    so2: number
  }

  export type SensorMetricsAirCreateOrConnectWithoutSensorInput = {
    where: SensorMetricsAirWhereUniqueInput
    create: XOR<SensorMetricsAirCreateWithoutSensorInput, SensorMetricsAirUncheckedCreateWithoutSensorInput>
  }

  export type SensorMetricsAirUpsertWithWhereUniqueWithoutSensorInput = {
    where: SensorMetricsAirWhereUniqueInput
    update: XOR<SensorMetricsAirUpdateWithoutSensorInput, SensorMetricsAirUncheckedUpdateWithoutSensorInput>
    create: XOR<SensorMetricsAirCreateWithoutSensorInput, SensorMetricsAirUncheckedCreateWithoutSensorInput>
  }

  export type SensorMetricsAirCreateManySensorInputEnvelope = {
    data: SensorMetricsAirCreateManySensorInput | SensorMetricsAirCreateManySensorInput[]
    skipDuplicates?: boolean
  }

  export type SensorMetricsAirUpdateWithWhereUniqueWithoutSensorInput = {
    where: SensorMetricsAirWhereUniqueInput
    data: XOR<SensorMetricsAirUpdateWithoutSensorInput, SensorMetricsAirUncheckedUpdateWithoutSensorInput>
  }

  export type SensorMetricsAirUpdateManyWithWhereWithoutSensorInput = {
    where: SensorMetricsAirScalarWhereInput
    data: XOR<SensorMetricsAirUpdateManyMutationInput, SensorMetricsAirUncheckedUpdateManyWithoutSensorInput>
  }

  export type SensorMetricsAirScalarWhereInput = {
    AND?: SensorMetricsAirScalarWhereInput | SensorMetricsAirScalarWhereInput[]
    OR?: SensorMetricsAirScalarWhereInput[]
    NOT?: SensorMetricsAirScalarWhereInput | SensorMetricsAirScalarWhereInput[]
    sensorId?: StringFilter<"SensorMetricsAir"> | string
    eventTime?: DateTimeFilter<"SensorMetricsAir"> | Date | string
    pm10?: FloatFilter<"SensorMetricsAir"> | number
    co?: FloatFilter<"SensorMetricsAir"> | number
    co2?: FloatFilter<"SensorMetricsAir"> | number
    no2?: FloatFilter<"SensorMetricsAir"> | number
    o3?: FloatFilter<"SensorMetricsAir"> | number
    so2?: FloatFilter<"SensorMetricsAir"> | number
  }

  export type SensorMetricsWaterUsageCreateWithoutSensorInput = {
    eventTime: Date | string
    usageLiters: number
  }

  export type SensorMetricsWaterUsageUncheckedCreateWithoutSensorInput = {
    eventTime: Date | string
    usageLiters: number
  }

  export type SensorMetricsWaterUsageCreateOrConnectWithoutSensorInput = {
    where: SensorMetricsWaterUsageWhereUniqueInput
    create: XOR<SensorMetricsWaterUsageCreateWithoutSensorInput, SensorMetricsWaterUsageUncheckedCreateWithoutSensorInput>
  }

  export type SensorMetricsWaterUsageUpsertWithWhereUniqueWithoutSensorInput = {
    where: SensorMetricsWaterUsageWhereUniqueInput
    update: XOR<SensorMetricsWaterUsageUpdateWithoutSensorInput, SensorMetricsWaterUsageUncheckedUpdateWithoutSensorInput>
    create: XOR<SensorMetricsWaterUsageCreateWithoutSensorInput, SensorMetricsWaterUsageUncheckedCreateWithoutSensorInput>
  }

  export type SensorMetricsWaterUsageCreateManySensorInputEnvelope = {
    data: SensorMetricsWaterUsageCreateManySensorInput | SensorMetricsWaterUsageCreateManySensorInput[]
    skipDuplicates?: boolean
  }

  export type SensorMetricsWaterUsageUpdateWithWhereUniqueWithoutSensorInput = {
    where: SensorMetricsWaterUsageWhereUniqueInput
    data: XOR<SensorMetricsWaterUsageUpdateWithoutSensorInput, SensorMetricsWaterUsageUncheckedUpdateWithoutSensorInput>
  }

  export type SensorMetricsWaterUsageUpdateManyWithWhereWithoutSensorInput = {
    where: SensorMetricsWaterUsageScalarWhereInput
    data: XOR<SensorMetricsWaterUsageUpdateManyMutationInput, SensorMetricsWaterUsageUncheckedUpdateManyWithoutSensorInput>
  }

  export type SensorMetricsWaterUsageScalarWhereInput = {
    AND?: SensorMetricsWaterUsageScalarWhereInput | SensorMetricsWaterUsageScalarWhereInput[]
    OR?: SensorMetricsWaterUsageScalarWhereInput[]
    NOT?: SensorMetricsWaterUsageScalarWhereInput | SensorMetricsWaterUsageScalarWhereInput[]
    sensorId?: StringFilter<"SensorMetricsWaterUsage"> | string
    eventTime?: DateTimeFilter<"SensorMetricsWaterUsage"> | Date | string
    usageLiters?: FloatFilter<"SensorMetricsWaterUsage"> | number
  }

  export type SensorMetricsWaterQualityCreateWithoutSensorInput = {
    eventTime: Date | string
    waterTemperature: number
    phLevel: number
    turbidity: number
    dissolvedOxygen: number
    conductivity: number
  }

  export type SensorMetricsWaterQualityUncheckedCreateWithoutSensorInput = {
    eventTime: Date | string
    waterTemperature: number
    phLevel: number
    turbidity: number
    dissolvedOxygen: number
    conductivity: number
  }

  export type SensorMetricsWaterQualityCreateOrConnectWithoutSensorInput = {
    where: SensorMetricsWaterQualityWhereUniqueInput
    create: XOR<SensorMetricsWaterQualityCreateWithoutSensorInput, SensorMetricsWaterQualityUncheckedCreateWithoutSensorInput>
  }

  export type SensorMetricsWaterQualityUpsertWithWhereUniqueWithoutSensorInput = {
    where: SensorMetricsWaterQualityWhereUniqueInput
    update: XOR<SensorMetricsWaterQualityUpdateWithoutSensorInput, SensorMetricsWaterQualityUncheckedUpdateWithoutSensorInput>
    create: XOR<SensorMetricsWaterQualityCreateWithoutSensorInput, SensorMetricsWaterQualityUncheckedCreateWithoutSensorInput>
  }

  export type SensorMetricsWaterQualityCreateManySensorInputEnvelope = {
    data: SensorMetricsWaterQualityCreateManySensorInput | SensorMetricsWaterQualityCreateManySensorInput[]
    skipDuplicates?: boolean
  }

  export type SensorMetricsWaterQualityUpdateWithWhereUniqueWithoutSensorInput = {
    where: SensorMetricsWaterQualityWhereUniqueInput
    data: XOR<SensorMetricsWaterQualityUpdateWithoutSensorInput, SensorMetricsWaterQualityUncheckedUpdateWithoutSensorInput>
  }

  export type SensorMetricsWaterQualityUpdateManyWithWhereWithoutSensorInput = {
    where: SensorMetricsWaterQualityScalarWhereInput
    data: XOR<SensorMetricsWaterQualityUpdateManyMutationInput, SensorMetricsWaterQualityUncheckedUpdateManyWithoutSensorInput>
  }

  export type SensorMetricsWaterQualityScalarWhereInput = {
    AND?: SensorMetricsWaterQualityScalarWhereInput | SensorMetricsWaterQualityScalarWhereInput[]
    OR?: SensorMetricsWaterQualityScalarWhereInput[]
    NOT?: SensorMetricsWaterQualityScalarWhereInput | SensorMetricsWaterQualityScalarWhereInput[]
    sensorId?: StringFilter<"SensorMetricsWaterQuality"> | string
    eventTime?: DateTimeFilter<"SensorMetricsWaterQuality"> | Date | string
    waterTemperature?: FloatFilter<"SensorMetricsWaterQuality"> | number
    phLevel?: FloatFilter<"SensorMetricsWaterQuality"> | number
    turbidity?: FloatFilter<"SensorMetricsWaterQuality"> | number
    dissolvedOxygen?: FloatFilter<"SensorMetricsWaterQuality"> | number
    conductivity?: FloatFilter<"SensorMetricsWaterQuality"> | number
  }

  export type SensorUpdateToOneWithWhereWithoutAmbientMetricsInput = {
    where?: SensorWhereInput
    data: XOR<SensorUpdateWithoutAmbientMetricsInput, SensorUncheckedUpdateWithoutAmbientMetricsInput>
  }

  export type SensorUpdateWithoutAmbientMetricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cityId?: StringFieldUpdateOperationsInput | string
    kmPoint?: FloatFieldUpdateOperationsInput | number
    sensorType?: StringFieldUpdateOperationsInput | string
    stateId?: StringFieldUpdateOperationsInput | string
    roadId?: NullableStringFieldUpdateOperationsInput | string | null
    industrialZone?: BoolFieldUpdateOperationsInput | boolean
    trafficMetrics?: SensorMetricsTrafficUpdateManyWithoutSensorNestedInput
    airMetrics?: SensorMetricsAirUpdateManyWithoutSensorNestedInput
    waterUsageMetrics?: SensorMetricsWaterUsageUpdateManyWithoutSensorNestedInput
    waterQualityMetrics?: SensorMetricsWaterQualityUpdateManyWithoutSensorNestedInput
  }

  export type SensorUncheckedUpdateWithoutAmbientMetricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cityId?: StringFieldUpdateOperationsInput | string
    kmPoint?: FloatFieldUpdateOperationsInput | number
    sensorType?: StringFieldUpdateOperationsInput | string
    stateId?: StringFieldUpdateOperationsInput | string
    roadId?: NullableStringFieldUpdateOperationsInput | string | null
    industrialZone?: BoolFieldUpdateOperationsInput | boolean
    trafficMetrics?: SensorMetricsTrafficUncheckedUpdateManyWithoutSensorNestedInput
    airMetrics?: SensorMetricsAirUncheckedUpdateManyWithoutSensorNestedInput
    waterUsageMetrics?: SensorMetricsWaterUsageUncheckedUpdateManyWithoutSensorNestedInput
    waterQualityMetrics?: SensorMetricsWaterQualityUncheckedUpdateManyWithoutSensorNestedInput
  }

  export type SensorUpdateToOneWithWhereWithoutTrafficMetricsInput = {
    where?: SensorWhereInput
    data: XOR<SensorUpdateWithoutTrafficMetricsInput, SensorUncheckedUpdateWithoutTrafficMetricsInput>
  }

  export type SensorUpdateWithoutTrafficMetricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cityId?: StringFieldUpdateOperationsInput | string
    kmPoint?: FloatFieldUpdateOperationsInput | number
    sensorType?: StringFieldUpdateOperationsInput | string
    stateId?: StringFieldUpdateOperationsInput | string
    roadId?: NullableStringFieldUpdateOperationsInput | string | null
    industrialZone?: BoolFieldUpdateOperationsInput | boolean
    ambientMetrics?: SensorMetricsAmbientUpdateManyWithoutSensorNestedInput
    airMetrics?: SensorMetricsAirUpdateManyWithoutSensorNestedInput
    waterUsageMetrics?: SensorMetricsWaterUsageUpdateManyWithoutSensorNestedInput
    waterQualityMetrics?: SensorMetricsWaterQualityUpdateManyWithoutSensorNestedInput
  }

  export type SensorUncheckedUpdateWithoutTrafficMetricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cityId?: StringFieldUpdateOperationsInput | string
    kmPoint?: FloatFieldUpdateOperationsInput | number
    sensorType?: StringFieldUpdateOperationsInput | string
    stateId?: StringFieldUpdateOperationsInput | string
    roadId?: NullableStringFieldUpdateOperationsInput | string | null
    industrialZone?: BoolFieldUpdateOperationsInput | boolean
    ambientMetrics?: SensorMetricsAmbientUncheckedUpdateManyWithoutSensorNestedInput
    airMetrics?: SensorMetricsAirUncheckedUpdateManyWithoutSensorNestedInput
    waterUsageMetrics?: SensorMetricsWaterUsageUncheckedUpdateManyWithoutSensorNestedInput
    waterQualityMetrics?: SensorMetricsWaterQualityUncheckedUpdateManyWithoutSensorNestedInput
  }

  export type SensorUpdateToOneWithWhereWithoutAirMetricsInput = {
    where?: SensorWhereInput
    data: XOR<SensorUpdateWithoutAirMetricsInput, SensorUncheckedUpdateWithoutAirMetricsInput>
  }

  export type SensorUpdateWithoutAirMetricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cityId?: StringFieldUpdateOperationsInput | string
    kmPoint?: FloatFieldUpdateOperationsInput | number
    sensorType?: StringFieldUpdateOperationsInput | string
    stateId?: StringFieldUpdateOperationsInput | string
    roadId?: NullableStringFieldUpdateOperationsInput | string | null
    industrialZone?: BoolFieldUpdateOperationsInput | boolean
    ambientMetrics?: SensorMetricsAmbientUpdateManyWithoutSensorNestedInput
    trafficMetrics?: SensorMetricsTrafficUpdateManyWithoutSensorNestedInput
    waterUsageMetrics?: SensorMetricsWaterUsageUpdateManyWithoutSensorNestedInput
    waterQualityMetrics?: SensorMetricsWaterQualityUpdateManyWithoutSensorNestedInput
  }

  export type SensorUncheckedUpdateWithoutAirMetricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cityId?: StringFieldUpdateOperationsInput | string
    kmPoint?: FloatFieldUpdateOperationsInput | number
    sensorType?: StringFieldUpdateOperationsInput | string
    stateId?: StringFieldUpdateOperationsInput | string
    roadId?: NullableStringFieldUpdateOperationsInput | string | null
    industrialZone?: BoolFieldUpdateOperationsInput | boolean
    ambientMetrics?: SensorMetricsAmbientUncheckedUpdateManyWithoutSensorNestedInput
    trafficMetrics?: SensorMetricsTrafficUncheckedUpdateManyWithoutSensorNestedInput
    waterUsageMetrics?: SensorMetricsWaterUsageUncheckedUpdateManyWithoutSensorNestedInput
    waterQualityMetrics?: SensorMetricsWaterQualityUncheckedUpdateManyWithoutSensorNestedInput
  }

  export type SensorUpdateToOneWithWhereWithoutWaterUsageMetricsInput = {
    where?: SensorWhereInput
    data: XOR<SensorUpdateWithoutWaterUsageMetricsInput, SensorUncheckedUpdateWithoutWaterUsageMetricsInput>
  }

  export type SensorUpdateWithoutWaterUsageMetricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cityId?: StringFieldUpdateOperationsInput | string
    kmPoint?: FloatFieldUpdateOperationsInput | number
    sensorType?: StringFieldUpdateOperationsInput | string
    stateId?: StringFieldUpdateOperationsInput | string
    roadId?: NullableStringFieldUpdateOperationsInput | string | null
    industrialZone?: BoolFieldUpdateOperationsInput | boolean
    ambientMetrics?: SensorMetricsAmbientUpdateManyWithoutSensorNestedInput
    trafficMetrics?: SensorMetricsTrafficUpdateManyWithoutSensorNestedInput
    airMetrics?: SensorMetricsAirUpdateManyWithoutSensorNestedInput
    waterQualityMetrics?: SensorMetricsWaterQualityUpdateManyWithoutSensorNestedInput
  }

  export type SensorUncheckedUpdateWithoutWaterUsageMetricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cityId?: StringFieldUpdateOperationsInput | string
    kmPoint?: FloatFieldUpdateOperationsInput | number
    sensorType?: StringFieldUpdateOperationsInput | string
    stateId?: StringFieldUpdateOperationsInput | string
    roadId?: NullableStringFieldUpdateOperationsInput | string | null
    industrialZone?: BoolFieldUpdateOperationsInput | boolean
    ambientMetrics?: SensorMetricsAmbientUncheckedUpdateManyWithoutSensorNestedInput
    trafficMetrics?: SensorMetricsTrafficUncheckedUpdateManyWithoutSensorNestedInput
    airMetrics?: SensorMetricsAirUncheckedUpdateManyWithoutSensorNestedInput
    waterQualityMetrics?: SensorMetricsWaterQualityUncheckedUpdateManyWithoutSensorNestedInput
  }

  export type SensorUpdateToOneWithWhereWithoutWaterQualityMetricsInput = {
    where?: SensorWhereInput
    data: XOR<SensorUpdateWithoutWaterQualityMetricsInput, SensorUncheckedUpdateWithoutWaterQualityMetricsInput>
  }

  export type SensorUpdateWithoutWaterQualityMetricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cityId?: StringFieldUpdateOperationsInput | string
    kmPoint?: FloatFieldUpdateOperationsInput | number
    sensorType?: StringFieldUpdateOperationsInput | string
    stateId?: StringFieldUpdateOperationsInput | string
    roadId?: NullableStringFieldUpdateOperationsInput | string | null
    industrialZone?: BoolFieldUpdateOperationsInput | boolean
    ambientMetrics?: SensorMetricsAmbientUpdateManyWithoutSensorNestedInput
    trafficMetrics?: SensorMetricsTrafficUpdateManyWithoutSensorNestedInput
    airMetrics?: SensorMetricsAirUpdateManyWithoutSensorNestedInput
    waterUsageMetrics?: SensorMetricsWaterUsageUpdateManyWithoutSensorNestedInput
  }

  export type SensorUncheckedUpdateWithoutWaterQualityMetricsInput = {
    id?: StringFieldUpdateOperationsInput | string
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cityId?: StringFieldUpdateOperationsInput | string
    kmPoint?: FloatFieldUpdateOperationsInput | number
    sensorType?: StringFieldUpdateOperationsInput | string
    stateId?: StringFieldUpdateOperationsInput | string
    roadId?: NullableStringFieldUpdateOperationsInput | string | null
    industrialZone?: BoolFieldUpdateOperationsInput | boolean
    ambientMetrics?: SensorMetricsAmbientUncheckedUpdateManyWithoutSensorNestedInput
    trafficMetrics?: SensorMetricsTrafficUncheckedUpdateManyWithoutSensorNestedInput
    airMetrics?: SensorMetricsAirUncheckedUpdateManyWithoutSensorNestedInput
    waterUsageMetrics?: SensorMetricsWaterUsageUncheckedUpdateManyWithoutSensorNestedInput
  }

  export type SensorMetricsAmbientUpdateWithoutSensorInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    temperature?: FloatFieldUpdateOperationsInput | number
    humidity?: FloatFieldUpdateOperationsInput | number
    solarRadiation?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsAmbientUncheckedUpdateWithoutSensorInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    temperature?: FloatFieldUpdateOperationsInput | number
    humidity?: FloatFieldUpdateOperationsInput | number
    solarRadiation?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsAmbientCreateManySensorInput = {
    eventTime: Date | string
    temperature: number
    humidity: number
    solarRadiation: number
  }

  export type SensorMetricsAmbientUncheckedUpdateManyWithoutSensorInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    temperature?: FloatFieldUpdateOperationsInput | number
    humidity?: FloatFieldUpdateOperationsInput | number
    solarRadiation?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsTrafficUpdateWithoutSensorInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleDensity?: FloatFieldUpdateOperationsInput | number
    avgSpeed?: FloatFieldUpdateOperationsInput | number
    flowRate?: FloatFieldUpdateOperationsInput | number
    occupancy?: FloatFieldUpdateOperationsInput | number
    congestionIndex?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsTrafficUncheckedUpdateWithoutSensorInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleDensity?: FloatFieldUpdateOperationsInput | number
    avgSpeed?: FloatFieldUpdateOperationsInput | number
    flowRate?: FloatFieldUpdateOperationsInput | number
    occupancy?: FloatFieldUpdateOperationsInput | number
    congestionIndex?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsTrafficCreateManySensorInput = {
    eventTime: Date | string
    vehicleDensity: number
    avgSpeed: number
    flowRate: number
    occupancy: number
    congestionIndex: number
  }

  export type SensorMetricsTrafficUncheckedUpdateManyWithoutSensorInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicleDensity?: FloatFieldUpdateOperationsInput | number
    avgSpeed?: FloatFieldUpdateOperationsInput | number
    flowRate?: FloatFieldUpdateOperationsInput | number
    occupancy?: FloatFieldUpdateOperationsInput | number
    congestionIndex?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsAirUpdateWithoutSensorInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    pm10?: FloatFieldUpdateOperationsInput | number
    co?: FloatFieldUpdateOperationsInput | number
    co2?: FloatFieldUpdateOperationsInput | number
    no2?: FloatFieldUpdateOperationsInput | number
    o3?: FloatFieldUpdateOperationsInput | number
    so2?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsAirUncheckedUpdateWithoutSensorInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    pm10?: FloatFieldUpdateOperationsInput | number
    co?: FloatFieldUpdateOperationsInput | number
    co2?: FloatFieldUpdateOperationsInput | number
    no2?: FloatFieldUpdateOperationsInput | number
    o3?: FloatFieldUpdateOperationsInput | number
    so2?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsAirCreateManySensorInput = {
    eventTime: Date | string
    pm10: number
    co: number
    co2: number
    no2: number
    o3: number
    so2: number
  }

  export type SensorMetricsAirUncheckedUpdateManyWithoutSensorInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    pm10?: FloatFieldUpdateOperationsInput | number
    co?: FloatFieldUpdateOperationsInput | number
    co2?: FloatFieldUpdateOperationsInput | number
    no2?: FloatFieldUpdateOperationsInput | number
    o3?: FloatFieldUpdateOperationsInput | number
    so2?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsWaterUsageUpdateWithoutSensorInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    usageLiters?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsWaterUsageUncheckedUpdateWithoutSensorInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    usageLiters?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsWaterUsageCreateManySensorInput = {
    eventTime: Date | string
    usageLiters: number
  }

  export type SensorMetricsWaterUsageUncheckedUpdateManyWithoutSensorInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    usageLiters?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsWaterQualityUpdateWithoutSensorInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    waterTemperature?: FloatFieldUpdateOperationsInput | number
    phLevel?: FloatFieldUpdateOperationsInput | number
    turbidity?: FloatFieldUpdateOperationsInput | number
    dissolvedOxygen?: FloatFieldUpdateOperationsInput | number
    conductivity?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsWaterQualityUncheckedUpdateWithoutSensorInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    waterTemperature?: FloatFieldUpdateOperationsInput | number
    phLevel?: FloatFieldUpdateOperationsInput | number
    turbidity?: FloatFieldUpdateOperationsInput | number
    dissolvedOxygen?: FloatFieldUpdateOperationsInput | number
    conductivity?: FloatFieldUpdateOperationsInput | number
  }

  export type SensorMetricsWaterQualityCreateManySensorInput = {
    eventTime: Date | string
    waterTemperature: number
    phLevel: number
    turbidity: number
    dissolvedOxygen: number
    conductivity: number
  }

  export type SensorMetricsWaterQualityUncheckedUpdateManyWithoutSensorInput = {
    eventTime?: DateTimeFieldUpdateOperationsInput | Date | string
    waterTemperature?: FloatFieldUpdateOperationsInput | number
    phLevel?: FloatFieldUpdateOperationsInput | number
    turbidity?: FloatFieldUpdateOperationsInput | number
    dissolvedOxygen?: FloatFieldUpdateOperationsInput | number
    conductivity?: FloatFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}