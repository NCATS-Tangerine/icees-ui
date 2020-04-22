import React from 'react';
import Button from '@material-ui/core/Button';

import useFeature from '../../customHooks/useFeature';
import FeatureDetails from './featureDetails/FeatureDetails';

export default function FeatureExploration(props) {
  const { tab, explore } = props;
  const feature = useFeature();
  return (
    <>
      {tab === 0 && (
        <>
          <FeatureDetails
            feature={feature}
          />
          <hr />
          <Button
            onClick={() => explore(feature)}
          >
            Explore
          </Button>
        </>
      )}
    </>
  );
}
