import { useState } from 'react';
import _ from 'lodash';

import API from './API';

export default function useStore() {
  const [page, setPage] = useState(0);
  const [cohorts, setCohorts] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [commonObj, setCommonObj] = useState({});
  const [loadingCohort, setLoadingCohort] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exploreResponse, setExploreResponse] = useState(null);
  const [associateResponse, setAssociateResponse] = useState(null);

  function getCohortDictionary(args) {
    setLoading(true);
    API.getCohortDictionary(args)
      .then((res) => {
        const response = _.cloneDeep(res['return value']);
        setCohorts(response);
        setCommonObj({ table: args.table, year: args.year });
        setPage(1);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error', err);
        setCommonObj({});
        setPage(0);
        setLoading(false);
      });
  }

  function exploreFeature(featureStore) {
    setLoading(true);
    setExploreResponse(null);
    const { cohort_id } = selectedCohort;
    const { feature, details } = featureStore;
    const data = {
      feature: {
        [feature]: details,
      },
      maximum_p_value: 1,
    };
    API.exploreFeature({ ...commonObj, cohort_id, data })
      .then((res) => {
        const response = _.cloneDeep(res['return value']);
        setExploreResponse(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error', err);
        setLoading(false);
      });
  }

  function associateFeatures(features) {
    setLoading(true);
    setAssociateResponse(null);
    const { cohort_id } = selectedCohort;
    const data = {
      feature_a: { [features[0].feature]: features[0].details},
      feature_b: { [features[1].feature]: features[1].details},
    };
    API.associateFeatures({ ...commonObj, cohort_id, data })
      .then((res) => {
        const response = _.cloneDeep(res['return value']);
        setAssociateResponse(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error', err);
        setLoading(false);
      })
  }

  function setCohort(cohortIndex) {
    if (selectedCohort && selectedCohort.cohort_id === cohorts[cohortIndex].cohort_id) {
      // no need to get features again for same cohort
      return;
    }
    setLoadingCohort(true);
    setExploreResponse(null);
    setAssociateResponse(null);
    const { cohort_id } = cohorts[cohortIndex];
    API.getCohortFeatures({ ...commonObj, cohort_id })
      .then((res) => {
        const cohort = _.cloneDeep(cohorts[cohortIndex]);
        cohort.features = res['return value'].map((featureObj) => featureObj.feature);
        setSelectedCohort(cohort);
        setLoadingCohort(false);
      })
      .catch((err) => {
        console.log('Error', err);
        setLoadingCohort(false);
      });
  }

  return {
    page,
    setPage,
    loading,
    loadingCohort,
    cohorts,
    setCohort,
    selectedCohort,
    getCohortDictionary,
    exploreFeature,
    associateFeatures,
    exploreResponse,
    associateResponse,
  };
}