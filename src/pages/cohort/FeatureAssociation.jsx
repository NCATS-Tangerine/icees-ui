import React from 'react';

import useFeature from './useFeature';
import FeatureDetails from './featureDetails/FeatureDetails';

export default function FeatureAssociation(props) {
  const { tab } = props;
  const feature1 = useFeature();
  const feature2 = useFeature();
  return (
    <>
      {tab === 1 && (
        <>
          <FeatureDetails
            feature={feature1}
          />
          <FeatureDetails
            feature={feature2}
          />
        </>
      )}
    </>
  );
}
