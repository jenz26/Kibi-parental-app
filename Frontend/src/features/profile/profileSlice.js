import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserProfileAPI, updateUserProfileAPI } from '../../api/userService';
import toast from 'react-hot-toast';

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const profileData = await getUserProfileAPI(userId);
      return profileData;
    } catch (error) {
      // toast.error(error.message || 'Errore nel caricamento del profilo.'); // Gestito dal componente
      return rejectWithValue(error.message || 'Failed to fetch profile');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ userId, profileData }, { rejectWithValue }) => {
    try {
      const updatedProfile = await updateUserProfileAPI(userId, profileData);
      return updatedProfile;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update profile');
    }
  }
);

const initialState = {
  profileData: null,
  isLoading: false, // Questo isLoading è per le operazioni dello slice (fetch/update)
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profileData = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileData = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true; // Potrebbe essere un `isUpdating` separato
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileData = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;