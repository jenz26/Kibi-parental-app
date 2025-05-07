import axiosInstance from './axiosInstance';

export const getUserProfileAPI = async (userId) => {
  const { data } = await axiosInstance.get(`/users/${userId}`);
  return data.profile;
};

export const updateUserProfileAPI = async (userId, profileData) => {
  // json-server non supporta il deep PATCH nativamente per sotto-oggetti come 'profile'
  // Quindi recuperiamo l'utente, aggiorniamo il profilo e facciamo un PUT
  const { data: user } = await axiosInstance.get(`/users/${userId}`);
  const updatedUser = { ...user, profile: { ...user.profile, ...profileData } };
  const { data: finalUser } = await axiosInstance.put(`/users/${userId}`, updatedUser);
  return finalUser.profile;
};


// Per Admin
export const getAllUsersAPI = async ({ page = 1, limit = 10, searchTerm = '' } = {}) => {
  let query = `/users?_page=${page}&_limit=${limit}&_sort=name&_order=asc`;
   if (searchTerm) {
    query += `&q=${searchTerm}`;
  }
  const response = await axiosInstance.get(query);
  const totalCount = response.headers['x-total-count'];
  return { users: response.data, totalCount: parseInt(totalCount, 10) };
};

export const updateUserRoleAPI = async (userId, role) => {
  const { data } = await axiosInstance.patch(`/users/${userId}`, { role });
  return data;
};

export const deleteUserAPI = async (userId) => {
  await axiosInstance.delete(`/users/${userId}`);
  return userId;
};

export const adminCreateUserAPI = async (userData) => {
  const { data } = await axiosInstance.post('/users', {
    ...userData,
    id: String(Date.now()), // Semplice ID per json-server
    profile: {
      parentName: userData.name,
      dueDate: null,
      interests: [],
      preferredLanguage: "it",
      childName: "",
      childBirthDate: null
    }
  });
  return data;
}