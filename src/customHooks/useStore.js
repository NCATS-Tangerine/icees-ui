import { useState } from 'react';

import API from './API';

export default function useStore() {
  const [page, setPage] = useState(0);
  const [cohorts, setCohorts] = useState([]);
  const [commonObj, setCommonObj] = useState({});

  function getCohortDictionary(args) {
    API.getCohortDictionary(args)
      .then((res) => {
        console.log('result', res);
        setCohorts(res['return value']);
        setCommonObj({ table: args.table, year: args.year });
        setPage(1);
      })
      .catch((err) => {
        console.log(err);
        setCommonObj({});
        setPage(0);
      });
  }

  function exploreFeature(cohortIndex, featureStore) {
    const { cohort_id } = cohorts[cohortIndex];
    const { feature, details } = featureStore;
    const data = {
      feature: {
        [feature]: details,
      },
      maximum_p_value: 1,
    };
    API.exploreFeature({ ...commonObj, cohort_id, data })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  function associateFeatures(cohortIndex, features) {
    const { cohort_id } = cohorts[cohortIndex];
    const data = {
      feature_a: { [features[0].feature]: features[0].details},
      feature_b: { [features[1].feature]: features[1].details},
    };
    API.associateFeatures({ ...commonObj, cohort_id, data })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('Error', err);
      })
  }

  return {
    page,
    cohorts,
    getCohortDictionary,
    exploreFeature,
    associateFeatures,
  };
}