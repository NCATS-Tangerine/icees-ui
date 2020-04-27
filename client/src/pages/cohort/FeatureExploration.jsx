import React from 'react';
import Button from '@material-ui/core/Button';

import useFeature from '../../customHooks/useFeature';
import FeatureDetails from './featureDetails/FeatureDetails';

export default function FeatureExploration(props) {
  const { tab, store } = props;
  const feature = useFeature();
  return (
    <>
      {tab === 0 && store.selectedCohort && (
        <>
          <FeatureDetails
            feature={feature}
            store={store}
          />
          <hr />
          <Button
            onClick={() => store.exploreFeature(feature)}
            variant="contained"
            disabled={store.loading}
          >
            Explore
          </Button>
        </>
      )}
    </>
  );
}
