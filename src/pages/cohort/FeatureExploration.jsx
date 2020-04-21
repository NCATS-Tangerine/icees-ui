import React from 'react';

import useFeature from './useFeature';
import FeatureDetails from './featureDetails/FeatureDetails';

export default function FeatureExploration(props) {
  const { tab } = props;
  const feature = useFeature();
  return (
    <>
      {tab === 0 && (
        <FeatureDetails
          feature={feature}
        />
      )}
    </>
  );
}
