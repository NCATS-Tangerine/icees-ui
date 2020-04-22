import React from 'react';
import Button from '@material-ui/core/Button';

import useFeature from '../../customHooks/useFeature';
import FeatureDetails from './featureDetails/FeatureDetails';

export default function FeatureAssociation(props) {
  const { tab, associate } = props;
  const feature1 = useFeature();
  const feature2 = useFeature();
  return (
    <>
      {tab === 1 && (
        <>
          <FeatureDetails
            feature={feature1}
          />
          <hr />
          <FeatureDetails
            feature={feature2}
          />
          <hr />
          <Button
            onClick={() => associate([feature1, feature2])}
          >
            Find Associations
          </Button>
        </>
      )}
    </>
  );
}
