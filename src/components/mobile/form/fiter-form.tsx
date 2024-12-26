'use client';

import { useProductos } from '@/hooks/useGasolineras';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Select, SelectItem, Slider } from '@nextui-org/react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

type FilterFormValues = {
  tipoBusqueda: boolean; // true = distancia
  distancia?: number;
  productoId: string;
};

type FilterFormProps = {
  onSubmit: (filtro: FilterFormValues) => void;
  canUseLocation: boolean;
};

const validationSchema = Yup.object().shape({
  tipoBusqueda: Yup.boolean().required(),
  distancia: Yup.number().when('tipoBusqueda', {
    is: true,
    then: schema =>
      schema
        .required('Indica la distancia.')
        .min(1, 'La distancia mínima es 1 km.')
        .max(100, 'La distancia máxima es 100 km.'),
    otherwise: schema => schema.optional(),
  }),
  productoId: Yup.string().required('Selecciona un tipo de producto.'),
});

const FilterForm: React.FC<FilterFormProps> = ({ onSubmit, canUseLocation }) => {
  const {
    data: productos,
    isLoading: loadingProductos,
  } = useProductos(); // Hook para obtener productos desde la API

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FilterFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      tipoBusqueda: canUseLocation,
      distancia: 10,
      productoId: '',
    },
  });

  // Actualiza dinámicamente tipoBusqueda si cambia canUseLocation
  useEffect(() => {
    setValue('tipoBusqueda', canUseLocation);
  }, [canUseLocation, setValue]);

  const handleFormSubmit = (values: FilterFormValues) => {
    const filtro: any = {
      producto: Number.parseInt(values.productoId, 10),
      tipo: undefined,
      distancia: values.distancia,
    };

    onSubmit(filtro);
  };

  return (
    <div className="w-full justify-center">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Selector de distancia */}
        <div className="flex flex-col">
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
                value={field.value}
                onChange={value => field.onChange(value)}
                getValue={_value => ''}
              />
            )}
          />
        </div>

        {/* Selector de tipo de producto */}
        <div>
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

        <Button type="submit" className="w-full">
          Buscar
        </Button>
      </form>
    </div>
  );
};

export default FilterForm;
