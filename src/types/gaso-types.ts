export type IComunidad = {
  IDCCAA: number;
  CCAA: string;
};

export type IProvincia = {
  IDPovincia: number;
  IDCCAA: number;
  Provincia: string;
  CCAA: string;
};

export type IMunicipio = {
  IDMunicipio: number;
  IDProvincia: number;
  IDCCAA: number;
  Municipio: string;
  Provincia: string;
  CCAA: string;
};

export type IProducto = {
  IDProducto: number;
  NombreProducto: string;
};

export type IBusqueda = {
  ProvinciaId: string | null;
  ComunidadId: string | null;
  MunicipioId: string | null;
  ProductoId: number | null;
  Latitud: number | null;
  Longitud: number | null;
  TipoBusqueda: string | null;
  RadioBusqueda: number | null;
};

export type IForm = {
  Comunidad: IComunidad | null;
  Provincia: IProvincia | null;
  Municipio: IMunicipio | null;
  Producto: IProducto | null;
};

export type IEstacion = {
  'C.P.': string;
  'Dirección': string;
  'Horario': string;
  'Latitud': string;
  'Localidad': string;
  'Longitud (WGS84)': string;
  'Margen': string;
  'Municipio': string;
  'PrecioProducto': string;
  'Provincia': string;
  'Remisión': string;
  'Rótulo': string;
  'Tipo Venta': string;
  'IDEESS': number;
  'IDMunicipio': number;
  'IDProvincia': number;
  'IDCCAA': number;
  'logoUrl': string;
  'latitude': number;
  'longitude': number;
  'distance': number;
  'distance_map': number;
  'precio': number;
  'gradient': string;
  'color': string;
};

export type IResultados = {
  ListaEESSPrecio: IEstacion[];
};

export type DistanceResponse = {
  distances: number[][];
};
