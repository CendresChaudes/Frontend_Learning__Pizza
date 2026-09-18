import { useEffect, useState } from 'react';

type TDestroyableViewModel = {
  destroy?: () => void;
};

export function useViewModel<TViewModel extends TDestroyableViewModel>(
  createViewModel: () => TViewModel,
) {
  const [viewModel] = useState(createViewModel);

  useEffect(() => {
    return () => {
      if (viewModel.destroy) viewModel.destroy();
    };
  }, [viewModel]);

  return viewModel;
}
