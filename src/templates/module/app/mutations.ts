import { useMutation, useQueryClient } from '@tanstack/react-query';
// Modules
import scaffoldRepository from '../infrastructure/repository';
import { Scaffold, ScaffoldPayload } from '../domain/model';
import useHandleError from '@modules/shared/app/hooks/useHandleError';
// Config
import { COLLECTIONS } from '@config/api.routes';

export function useOrderMutationCreate() {
  const { showAlert } = useHandleError();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (order: ScaffoldPayload) => {
      const res = await scaffoldRepository.create(order);
      if (res instanceof Error) {
        showAlert(res);
        return res;
      }
      queryClient.invalidateQueries({
        queryKey: [COLLECTIONS.SCAFFOLD],
      });
      return res;
    },
  });
}

export function useOrderMutationUpdate() {
  const { showAlert } = useHandleError();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (order: Scaffold) => {
      const res = await scaffoldRepository.update(order.id, order);
      if (res instanceof Error) {
        showAlert(res);
        return res;
      }
      queryClient.invalidateQueries({
        queryKey: [COLLECTIONS.SCAFFOLD],
      });
      return res;
    },
  });
}

export function useOrderMutationDelete() {
  const { showAlert } = useHandleError();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await scaffoldRepository.delete(id);
      if (res instanceof Error) {
        showAlert(res);
        return res;
      }
      queryClient.invalidateQueries({
        queryKey: [COLLECTIONS.SCAFFOLD],
      });
      return res;
    },
  });
}
