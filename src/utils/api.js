export const getCards = (baseUrl) => {
  return fetch(`${baseUrl}/items`).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

export const addNewCard = ({ name, imageUrl, weather }, baseUrl) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    // headers
    headers: {
      "Content-Type": "application/json",
    },
    // Send the data in the body as a JSON string.
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

export const deleteCard = ({ baseUrl, id }) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  });
};
