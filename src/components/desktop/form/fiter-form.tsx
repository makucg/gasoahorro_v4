'use client';

import { useComunidades, useMunicipios, useProductos, useProvincias } from '@/hooks/useGasolineras';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Select,
  SelectItem,
  Slider,
  Switch,
} from '@nextui-org/react';
import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import * as Yup from 'yup';

type FilterFormValues = {
  tipoBusqueda: boolean; // true = distancia, false = filtros
  comunidadId?: string;
  provinciaId?: string;
  municipioId?: string;
  productoId: string;
  distancia?: number;
};

type FilterFormProps = {
  onSubmit: (filtro: any) => void;
  canUseLocation: boolean;
};

const validationSchema = Yup.object().shape({
  tipoBusqueda: Yup.boolean().required(),
  productoId: Yup.string().required('Selecciona un tipo de combustible.'),
  comunidadId: Yup.string().when('tipoBusqueda', {
    is: false,
    then: schema => schema.required('Selecciona una comunidad.'),
    otherwise: schema => schema.optional(),
  }),
  distancia: Yup.number().when('tipoBusqueda', {
    is: true,
    then: schema =>
      schema
        .required('Indica la distancia.')
        .min(1, 'La distancia mínima es 1 km.')
        .max(100, 'La distancia máxima es 100 km.'),
    otherwise: schema => schema.optional(),
  }),
});

const FilterForm: React.FC<FilterFormProps> = ({ onSubmit, canUseLocation }) => {
  const { data: comunidades, isLoading: loadingComunidades } = useComunidades();
  const { data: productos, isLoading: loadingProductos } = useProductos();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FilterFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      tipoBusqueda: canUseLocation,
      comunidadId: '',
      provinciaId: '',
      municipioId: '',
      productoId: '',
      distancia: 10,
    },
  });

  const tipoBusqueda = useWatch({ control, name: 'tipoBusqueda' });
  const comunidadId = useWatch({ control, name: 'comunidadId' });
  const provinciaId = useWatch({ control, name: 'provinciaId' });

  const { data: provincias, isLoading: loadingProvincias } = useProvincias(comunidadId || '');
  const { data: municipios, isLoading: loadingMunicipios } = useMunicipios(provinciaId || '');

  // Actualiza dinámicamente el valor de tipoBusqueda si cambia canUseLocation
  useEffect(() => {
    setValue('tipoBusqueda', canUseLocation);
  }, [canUseLocation, setValue]);

  const handleFormSubmit = (values: FilterFormValues) => {
    const filtro = tipoBusqueda
      ? {
          producto: Number.parseInt(values.productoId, 10),
          tipo: undefined,
          distancia: values.distancia,
        }
      : {
          id: values.municipioId || values.provinciaId || values.comunidadId || '',
          producto: Number.parseInt(values.productoId, 10),
          tipo: values.municipioId ? 'Municipio' : values.provinciaId ? 'Provincia' : 'CCAA',
        };

    onSubmit(filtro);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="pb-8">
        <h2 className="text-xl font-bold">Filtros de Búsqueda</h2>

        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="tipoBusqueda">Buscar por:</label>
          <Controller
            name="tipoBusqueda"
            control={control}
            render={({ field }) => (
              <Switch
                isSelected={field.value}
                onChange={value => canUseLocation && field.onChange(value)}
                isDisabled={!canUseLocation}
              >
                {tipoBusqueda ? 'Distancia' : 'Filtros'}
              </Switch>
            )}
          />
        </div>

        {tipoBusqueda
          ? (
              <div className="mb-4">
                <Controller
                  name="distancia"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      {...field}
                      label={`Distancia: ${field.value} km`}
                      minValue={1}
                      maxValue={100}
                      step={1}
                      defaultValue={10}
                      value={field.value}
                      marks={[
                        { value: 25, label: '25 km' },
                        { value: 50, label: '50 km' },
                        { value: 75, label: '75 km' },
                      ]}
                      getValue={_value => ``}
                      className="pb-2"
                    />
                  )}
                />
              </div>
            )
          : (
              <>
                <div className="mb-4">
                  <Controller
                    name="comunidadId"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label="Comunidad Autónoma">
                        {loadingComunidades
                          ? (
                              <SelectItem key="loading" value="loading">Cargando...</SelectItem>
                            )
                          : (
                              comunidades?.map(c => (
                                <SelectItem key={c.IDCCAA} value={c.IDCCAA}>
                                  {c.CCAA}
                                </SelectItem>
                              )) || null
                            )}
                      </Select>
                    )}
                  />
                  {errors.comunidadId && (
                    <span className="font-medium text-danger" role="alert">
                      {errors.comunidadId?.message}
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <Controller
                    name="provinciaId"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label="Provincia" isDisabled={!comunidadId}>
                        {loadingProvincias
                          ? (
                              <SelectItem key="loading" value="loading">Cargando...</SelectItem>
                            )
                          : (
                              provincias?.map(p => (
                                <SelectItem key={p.IDPovincia} value={p.IDPovincia}>
                                  {p.Provincia}
                                </SelectItem>
                              )) || null
                            )}
                      </Select>
                    )}
                  />
                </div>
                <div className="mb-4">
                  <Controller
                    name="municipioId"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label="Municipio" isDisabled={!provinciaId}>
                        {loadingMunicipios
                          ? (
                              <SelectItem key="loading" value="loading">Cargando...</SelectItem>
                            )
                          : (
                              municipios?.map(m => (
                                <SelectItem key={m.IDMunicipio} value={m.IDMunicipio}>
                                  {m.Municipio}
                                </SelectItem>
                              )) || null
                            )}
                      </Select>
                    )}
                  />
                </div>
              </>
            )}

        <div className="mt-4">
          <Controller
            name="productoId"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Tipo de Combustible">
                {loadingProductos
                  ? (
                      <SelectItem value="loading">Cargando...</SelectItem>
                    )
                  : (
                      productos?.map(p => (
                        <SelectItem key={p.IDProducto} value={p.IDProducto}>
                          {p.NombreProducto}
                        </SelectItem>
                      )) || []
                    )}
              </Select>
            )}
          />
          {errors.productoId && (
            <span className="font-medium text-danger" role="alert">
              {errors.productoId?.message}
            </span>
          )}
        </div>

        <Button type="submit" className="mt-6 w-full">
          Buscar
        </Button>
      </form>
    </div>
  );
};

export default FilterForm;
