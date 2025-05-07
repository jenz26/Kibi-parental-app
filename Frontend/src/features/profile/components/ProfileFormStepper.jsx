import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile } from '../profileSlice';
import { updateAuthUser } from '../../auth/authSlice';

import Stepper from '../../../components/common/Stepper';
import Button from '../../../components/common/Button';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import Step1ParentData from './Step1ParentData';
import Step2PregnancyData from './Step2PregnancyData';
import Step3Interests from './Step3Interests';
import { profileStep1Schema, profileStep2Schema, profileStep3Schema } from '../../../schemas/profileSchema';
import { PROFILE_STEPPER_STEPS } from '../../../constants';
import toast from 'react-hot-toast';

const ProfileFormStepper = () => {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((state) => state.auth);
  const { profileData, isLoading: profileLoading, error: profileError } = useSelector((state) => state.profile);

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false); // Stato di loading per il submit

  const schemas = [profileStep1Schema, profileStep2Schema, profileStep3Schema];
  const currentSchema = schemas[currentStep];

  const methods = useForm({
    resolver: yupResolver(currentSchema),
    mode: 'onChange',
    defaultValues: {
      parentName: '',
      childName: '',
      dueDate: '',
      childBirthDate: '',
      interests: [],
      preferredLanguage: 'it',
    }
  });

  useEffect(() => {
    if (authUser?.id && !profileData && !profileLoading && !profileError) {
      dispatch(fetchProfile(authUser.id));
    }
  }, [dispatch, authUser, profileData, profileLoading, profileError]);

  useEffect(() => {
    if (profileData) {
      methods.reset({
        parentName: profileData.parentName || authUser?.name || '',
        childName: profileData.childName || '',
        dueDate: profileData.dueDate ? profileData.dueDate.split('T')[0] : '', // Formato YYYY-MM-DD per input date
        childBirthDate: profileData.childBirthDate ? profileData.childBirthDate.split('T')[0] : '', // Formato YYYY-MM-DD
        interests: Array.isArray(profileData.interests) ? profileData.interests : [],
        preferredLanguage: profileData.preferredLanguage || 'it',
      });
    } else if (authUser && !profileData) { // Se non c'è profilo, usa nome authUser
        methods.reset({
            parentName: authUser.name || '',
            childName: '',
            dueDate: '',
            childBirthDate: '',
            interests: [],
            preferredLanguage: 'it',
        });
    }
  }, [profileData, methods, authUser]);


  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      if (currentStep < PROFILE_STEPPER_STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmitForm(methods.getValues());
      }
    } else {
        // Trova il primo errore e scrolla al campo se possibile
        const firstErrorField = Object.keys(methods.formState.errors)[0];
        if (firstErrorField) {
            const fieldElement = document.getElementsByName(firstErrorField)[0];
            fieldElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        toast.error("Completa i campi evidenziati prima di procedere.");
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitForm = async (formData) => {
    if (!authUser?.id) {
        toast.error("Utente non trovato. Effettua nuovamente il login.");
        return;
    }
    setIsSubmitting(true);
    try {
      const cleanFormData = {
        ...formData,
        dueDate: formData.dueDate || null,
        childBirthDate: formData.childBirthDate || null,
      };

      await dispatch(updateProfile({ userId: authUser.id, profileData: cleanFormData })).unwrap();

      if (formData.parentName && formData.parentName !== authUser.name) {
        dispatch(updateAuthUser({ name: formData.parentName }));
      }
      toast.success('Profilo aggiornato con successo!');
    } catch (err) {
      toast.error(err.message || 'Errore durante l\'aggiornamento del profilo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return <Step1ParentData />;
      case 1: return <Step2PregnancyData />;
      case 2: return <Step3Interests />;
      default: return null;
    }
  };

  // Mostra spinner durante il caricamento iniziale del profilo
  if (profileLoading && !profileData) {
    return <div className="flex justify-center py-10"><LoadingSpinner size="lg" /></div>;
  }
  // Mostra errore se il caricamento iniziale fallisce
  if (profileError && !profileData && !profileLoading) { // Aggiunto !profileLoading per evitare flash
    return <p className="text-red-500 text-center py-10">Errore nel caricamento del profilo: {profileError}</p>;
  }


  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmitForm)} className="space-y-8 p-4 sm:p-6 bg-white dark:bg-neutral-dark shadow-xl rounded-lg">
        <Stepper steps={PROFILE_STEPPER_STEPS} currentStep={currentStep} />

        <div className="mt-8 min-h-[250px] sm:min-h-[300px]">
          {renderStepContent()}
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-neutral-light dark:border-neutral-dark/50">
          <Button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0 || isSubmitting}
            variant="outline"
          >
            Precedente
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            isLoading={isSubmitting}
            disabled={isSubmitting || profileLoading} // Disabilita anche se il profilo sta caricando
            variant="primary"
          >
            {currentStep === PROFILE_STEPPER_STEPS.length - 1 ? 'Salva Profilo' : 'Successivo'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProfileFormStepper;