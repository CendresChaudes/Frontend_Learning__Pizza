import { useEffect, useState } from 'react';

type TDestroyableViewModel = {
  destroy?: () => void;
};

function isDestroyableViewModel(viewModel: unknown): viewModel is TDestroyableViewModel {
  return typeof viewModel === 'object' && viewModel !== null && 'destroy' in viewModel;
}

export function useViewModel<TViewModel>(createViewModel: () => TViewModel) {
  const [viewModel] = useState(createViewModel);

  useEffect(() => {
    return () => {
      if (isDestroyableViewModel(viewModel)) {
        viewModel.destroy?.();
      }
    };
  }, [viewModel]);

  return viewModel;
}
