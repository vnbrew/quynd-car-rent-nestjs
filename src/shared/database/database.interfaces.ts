export interface IDatabaseConfigAttributes {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number | string;
  dialect?: string;
  urlDatabase?: string;
  define: {
    timestamps: boolean;
  };
  logging: boolean;
}

export interface IDatabaseConfig {
  config: IDatabaseConfigAttributes;
}
