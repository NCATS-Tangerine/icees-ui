import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';

import './featureDetails.css';

export default function FeatureDetails(props) {
  const { feature, store } = props;
  function getFeatureQualifiers() {
    const cohortFeature = store.selectedCohort.features.find((cohortFeature) => (cohortFeature.feature_name === feature.feature));
    const operators = new Set();
    const values = new Set();
    if (cohortFeature) {
      cohortFeature.feature_qualifiers.forEach((featureQualifier) => {
        operators.add(featureQualifier.operator);
        values.add(featureQualifier.value);
      });
    }
    return {
      operators: [...operators],
      values: [...values],
    };
  }
  const { operators, values } = getFeatureQualifiers();
  return (
    <div className="featureRow">
      <FormControl className="featureName">
        <InputLabel id="feature-name-select">Feature</InputLabel>
        <Select
          labelId="feature-name-select"
          id="feature_name"
          value={feature.feature}
          onChange={(e) => {
            feature.updateName(e.target.value);
            
          }}
        >
          {store.selectedCohort.features.map((cohortFeature) => (
            <MenuItem
              key={cohortFeature.feature_name}
              value={cohortFeature.feature_name}
            >
              {cohortFeature.feature_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="featureDetailsContainer">
        {feature.details.map((detail, index) => (
          <div key={`feature-detail-${index}`} className="featureDetails">
            <FormControl className="featureDetailOperator">
              <InputLabel id={`operator-select-${index}`}>Operator</InputLabel>
              <Select
                labelId={`operator-select-${index}`}
                id={`operator-${index}`}
                value={feature.details[index].operator}
                onChange={(e) => feature.updateDetail(index, 'operator', e.target.value)}
                disabled={!feature.feature}
              >
                {operators.map((operator) => (
                  <MenuItem key={operator} value={operator}>{operator}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="featureDetailValue" fullWidth>
              <InputLabel id={`value-select-${index}`}>Value</InputLabel>
              <Select
                labelId={`value-select-${index}`}
                id={`value-${index}`}
                value={feature.details[index].value}
                onChange={(e) => feature.updateDetail(index, 'value', e.target.value)}
                disabled={!feature.feature}
              >
                {values.map((value) => (
                  <MenuItem key={value} value={value}>{value}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton
              onClick={() => feature.remove(index)}
            >
              <HighlightOffTwoToneIcon />
            </IconButton>
          </div>
        ))}
        <IconButton
          onClick={feature.add}
        >
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );
}