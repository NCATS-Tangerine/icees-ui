import { useState } from 'react';

const newDetail = { operator: '', value: '' };

export default function useFeature() {
  const [feature, update] = useState('');
  const [details, updateDetails] = useState([]);

  function add() {
    details.push({...newDetail});
    updateDetails([...details]);
  }

  function remove(i) {
    details.splice(i, 1);
    updateDetails([...details]);
  }

  function updateDetail(i, type, value) {
    if (!isNaN(value)) value = Number(value);
    details[i][type] = value;
    updateDetails([...details]);
  }

  function updateName(value) {
    if (value !== feature) {
      update(value);
      updateDetails([{...newDetail}]);
    }
  }

  return {
    feature,
    details,
    updateName,
    add,
    remove,
    updateDetail,
  };
}