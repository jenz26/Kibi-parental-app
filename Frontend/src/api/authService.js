import axiosInstance from './axiosInstance';

// Simula la generazione di un token JWT.
const generateFakeJwt = (user) => {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = { sub: user.id, email: user.email, role: user.role, name: user.name, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) }; // Scade in 24 ore
  const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, '');
  const encodedPayload = btoa(JSON.stringify(payload)).replace(/=/g, '');
  // Una "firma" finta, non sicura per produzione
  const signature = btoa(`${encodedHeader}.${encodedPayload}.fakeSecret`).replace(/=/g, '');
  return `${encodedHeader}.${encodedPayload}.${signature}`;
};


export const loginAPI = async (credentials) => {
  // In un'app reale, questa sarebbe una POST a /auth/login
  // Qui simuliamo cercando l'utente in /users
  const { data } = await axiosInstance.get(`/users?email=${credentials.email}&password=${credentials.password}`);
  if (data.length > 0) {
    const user = data[0];
    const token = generateFakeJwt(user);
    return { user, token };
  } else {
    throw new Error('Credenziali non valide');
  }
};

export const registerAPI = async (userData) => {
  // Controlla se l'email esiste già
  const { data: existingUsers } = await axiosInstance.get(`/users?email=${userData.email}`);
  if (existingUsers.length > 0) {
    throw new Error('Email già registrata');
  }

  // Crea il nuovo utente
  const newUser = {
    ...userData,
    role: 'user', // Ruolo di default
    id: String(Date.now()), // ID univoco semplice per json-server
    profile: { // Profilo di base
      parentName: userData.name,
      dueDate: null,
      interests: [],
      preferredLanguage: "it",
      childName: "",
      childBirthDate: null
    }
  };
  // Rimuovi il campo 'confirmPassword' e 'consent' che non va salvato nel db
  delete newUser.confirmPassword;
  delete newUser.consent;

  const { data } = await axiosInstance.post('/users', newUser);
  const token = generateFakeJwt(data);
  return { user: data, token };
};