import { useQuery } from '@tanstack/react-query';
// Modules
import scaffoldRepository from '../infrastructure/repository';
import useHandleError from '@modules/shared/app/hooks/useHandleError';
// Config
import { COLLECTIONS } from '@config/api.routes';

// -----------------------------------------------------------------------------

export function useQueryScaffolds() {
  const { showAlert } = useHandleError();
  return useQuery({
    queryKey: [COLLECTIONS.SCAFFOLD],
    queryFn: async () => {
      const res = await scaffoldRepository.findAll();
      if (res instanceof Error) {
        showAlert(res);
        return [];
      }
      return res;
    },
  });
}

export function useQueryScaffoldById(id: string) {
  const { showAlert } = useHandleError();
  return useQuery({
    queryKey: [COLLECTIONS.SCAFFOLD, id],
    queryFn: async () => {
      const res = await scaffoldRepository.findById(id);
      if (res instanceof Error) {
        showAlert(res);
        return [];
      }
      return res;
    },
  });
}
