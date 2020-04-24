import React from 'react';
import Button from '@material-ui/core/Button';

import useFeature from '../../customHooks/useFeature';
import FeatureDetails from './featureDetails/FeatureDetails';

export default function FeatureAssociation(props) {
  const { tab, store } = props;
  const feature1 = useFeature();
  const feature2 = useFeature();
  return (
    <>
      {tab === 1 && store.selectedCohort && (
        <>
          <FeatureDetails
            feature={feature1}
            store={store}
          />
          <hr />
          <FeatureDetails
            feature={feature2}
            store={store}
          />
          <hr />
          <Button
            onClick={() => store.associateFeatures([feature1, feature2])}
            variant="contained"
            disabled={store.loading}
          >
            Find Associations
          </Button>
        </>
      )}
    </>
  );
}
