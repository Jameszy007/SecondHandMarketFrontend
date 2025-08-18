const domain = "http://localhost:5173";

export const login = (credential) => {
  const loginUrl = `${domain}/auth/login`;
  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to log in");
    }

    return response.json();
  });
};

export const register = (credential) => {
  const registerUrl = `${domain}/auth/register`;
  return fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to register");
    }
  });
};

export const uploadReview = (data) => {
  const authToken = localStorage.getItem("authToken");
  const uploadStayUrl = `${domain}/reviews`;

  return fetch(uploadStayUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: data, //data contains image
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to upload stay");
    }
  });
};

export const getReviewsBySeller = () => {
  const authToken = localStorage.getItem("authToken");
  const listReviewsUrl = `${domain}/reviews`;

  return fetch(listReviewsUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to get stay list");
    }

    return response.json();
  });
};

export const deleteReview = (reviewId) => {
  const authToken = localStorage.getItem("authToken");
  const deleteReviewUrl = `${domain}/reviews/${reviewId}`;

  return fetch(deleteReviewUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to cancel reservation");
    }
  });
};
