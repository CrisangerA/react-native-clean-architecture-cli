import React from 'react';
import * as Yup from 'yup';
import { StyleSheet, View } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';

import Products from './components/Products';
import { Button, Margin, Padding } from '@components/index';
import { PageLayout } from '@components/layout';
import { SearchInput, Switch, TextInput } from '@components/form';

import { useOrderMutationCreate } from '@modules/orders/app/mutation';
import {
  Order,
  OrderForm,
  OrderPayload,
  OrderStatus,
} from '@modules/orders/domain/model';

import { hScale } from '@theme/responsive';
import { useNavigation } from '@navigation/index';
import { MOCK_PRODUCTS } from '@config/mock';
import { Item } from '@modules/shared/domain/model';

// -----------------------------------------------------------------------------

interface Props {
  order?: Order;
}

const formatedProducts = MOCK_PRODUCTS.map(({ id, name }) => ({
  value: id,
  label: name,
}));

export default function OrderFormScreen({ order }: Props) {
  const { goBack } = useNavigation();

  const { control, handleSubmit, setValue, getValues } = useForm<OrderForm>({
    defaultValues: {
      date: order?.date || new Date(),
      isDelivery: order?.isDelivery || false,
      status: order?.status || OrderStatus.Pending,
      client: order?.client || undefined,
      deliveryAddress: order?.deliveryAddress ?? undefined,
      products: order?.products.map(p => p.id) || [],
      total: order?.total.toString() || '0',
    },
    resolver: yupResolver(
      Yup.object().shape({
        date: Yup.date().required('Fecha es requerida'),
        products: Yup.array()
          .required('Productos es requerido')
          .min(1, 'Productos es requerido'),
        total: Yup.string().required('El total es requerido'),
        isDelivery: Yup.boolean().oneOf([true, false]).required('Requerido'),
        status: Yup.number().required('El estado es requerido'),
      }),
    ),
  });

  const { fields, append, remove } = useFieldArray({
    name: 'products' as never,
    control,
  });

  const mutationCreate = useOrderMutationCreate();

  async function onSubmit(form: OrderForm) {
    form.deliveryAddress === undefined && delete form.deliveryAddress;
    form.client === undefined && delete form.client;

    const products = form.products
      .map(p => MOCK_PRODUCTS.find(d => d.id === p))
      .filter(p => p !== undefined);

    const payload: OrderPayload = {
      ...form,
      products,
      total: parseInt(form.total, 10),
    };

    const response = await mutationCreate.mutateAsync(payload);
    if (response instanceof Error) {
      return;
    }
    goBack();
  }

  const products = fields
    .map((field: any) => MOCK_PRODUCTS.find(p => p.id === field.value))
    .filter(p => p !== undefined);

  function onSelectItem({ value }: Item) {
    append({ value });
    const product = MOCK_PRODUCTS.find(p => p.id === value);
    if (product) {
      const total = getValues('total');
      const newTotal = parseInt(total, 10) + product.price;
      setValue('total', newTotal.toString());
    }
  }

  function onRemoveItem({ value }: Item) {
    const index = fields.findIndex(field => (field as any).value === value);
    if (index !== -1) {
      remove(index);
    }
    const product = MOCK_PRODUCTS.find(p => p.id === value);
    if (product) {
      const total = getValues('total');
      const newTotal = parseInt(total, 10) - product.price;
      setValue('total', newTotal.toString());
    }
  }

  return (
    <PageLayout title="Crear nuevo pedido">
      <View style={styles.container}>
        <Padding left={20} right={20}>
          <SearchInput
            label="Productos"
            name="products"
            control={control}
            multiple
            items={formatedProducts}
            onSelectItem={onSelectItem}
            onRemoveItem={onRemoveItem}
          />
        </Padding>
        {fields.length > 0 && <Products products={products} />}

        <Padding left={20} right={20}>
          {fields.length > 0 && (
            <TextInput
              label="Total"
              name="total"
              placeholder="Total"
              control={control}
            />
          )}
          <TextInput
            label="Cliente (Opcional)"
            name="client"
            placeholder="Client"
            control={control}
          />
          <Switch
            label="Entrega a domicilio"
            name="isDelivery"
            control={control}
          />
          <Margin top={20} />
          <Button title="Guardar" onPress={handleSubmit(onSubmit)} />
        </Padding>
      </View>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hScale(12),
  },
});
