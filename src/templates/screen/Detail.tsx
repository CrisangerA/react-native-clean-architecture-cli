import React from 'react';
import { View } from 'react-native';

import { Text, DetailLayout } from '@components/index';

import { Order } from '@modules/orders/domain/model';
import { formatCurrency, formatDate } from '@modules/shared/domain/format';

interface Props {
  order: Order;
}

export default function OrderDetailScreen({ order }: Props) {
  const name = order.products.map(p => p.name).join(', ');
  return (
    <DetailLayout title="Detalle de pedido">
      <View>
        <Text title={name} font="body16Regular" />
        <Text title={formatCurrency(order.total)} font="body16Regular" />
        <Text title={formatDate(order.date)} font="body16Regular" />
      </View>
    </DetailLayout>
  );
}
