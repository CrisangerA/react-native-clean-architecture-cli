import React from 'react';
import { FlatList } from 'react-native';
// Components
import OrderItem from './Item';
import { Loading } from '@components/index';
// Modules
import { Order } from '@modules/scaffold/domain/model';
import { useQueryScaffold } from '@modules/scaffold/app/queries';
// Navigation
import { Routes } from '@navigation/routes';
import { useNavigation } from '@navigation/index';
// Theme
import { commonStyles } from '@theme/common';

// -----------------------------------------------------------------------------

export default function OrdersListView() {
  const { data, isPending } = useQueryScaffold();
  const { goTo } = useNavigation();

  if (isPending) {
    return <Loading />;
  }

  function onPress(order: Order) {
    goTo(Routes.OrderDetail, { order });
  }

  return (
    <FlatList
      data={data || []}
      contentContainerStyle={commonStyles.flatList}
      renderItem={({ item }) => (
        <OrderItem {...item} onPress={() => onPress(item)} />
      )}
    />
  );
}
