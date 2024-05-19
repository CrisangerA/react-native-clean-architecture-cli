import { useMutation, useQueryClient } from '@tanstack/react-query';
// Modules
import { Scaffold, ScaffoldPayload } from '../domain/model';
import scaffoldRepository from '../infrastructure/repository';
import useHandleError from '@modules/shared/app/hooks/useHandleError';
// Config
import { COLLECTIONS } from '@config/api.routes';

export function useMutationScaffoldCreate() {
  const { showAlert } = useHandleError();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (scaffold: ScaffoldPayload) => {
      const res = await scaffoldRepository.create(scaffold);
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

export function useMutationScaffoldUpdate() {
  const { showAlert } = useHandleError();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (scaffold: Scaffold) => {
      const res = await scaffoldRepository.update(scaffold.id, scaffold);
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

export function useMutationScaffoldDelete() {
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
