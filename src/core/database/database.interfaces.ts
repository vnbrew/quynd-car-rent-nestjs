export interface IDatabaseConfigAttributes {
    username?: string;
    password?: string;
    database?: string;
    host?: string;
    port?: number | string;
    dialect?: string;
    urlDatabase?: string;
    define: {
        timestamps: boolean
    }
}

export interface IDatabaseConfig {
    development: IDatabaseConfigAttributes;
    staging: IDatabaseConfigAttributes;
    production: IDatabaseConfigAttributes;
}
