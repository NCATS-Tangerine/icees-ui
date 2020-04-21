import { useState } from 'react';

const defaultOperator = '='

export default function useFeature() {
  const [feature, update] = useState('');
  const [details, updateDetails] = useState([]);

  function add() {
    details.push({ operator: defaultOperator, value: '' });
    updateDetails([...details]);
  }

  function remove(i) {
    details.splice(i, 1);
    updateDetails([...details]);
  }

  function updateDetail(i, type, value) {
    details[i][type] = value;
    updateDetails([...details]);
  }

  return {
    feature,
    details,
    update,
    add,
    remove,
    updateDetail,
  };
}