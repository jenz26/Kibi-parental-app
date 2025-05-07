import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAPI, updateUserRoleAPI, deleteUserAPI, adminCreateUserAPI } from '../../../api/userService'; // Usiamo API dirette qui per semplicità, ma potrebbe essere un thunk
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import Pagination from '../../../components/common/Pagination';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { PencilIcon, TrashIcon, PlusIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from '../../../components/common/InputField';
import { ADMIN_USERS_PER_PAGE } from '../../../constants';


const userFormSchema = yup.object().shape({
  name: yup.string().required("Il nome è obbligatorio"),
  email: yup.string().email("Formato email non valido").required("L'email è obbligatoria"),
  password: yup.string().when('$isEditing', {
    is: (isEditing) => !isEditing, // Richiesto solo se non si sta modificando (cioè creando)
    then: (schema) => schema.min(6, "La password deve essere di almeno 6 caratteri").required("La password è obbligatoria"),
    otherwise: (schema) => schema.min(6, "La password deve essere di almeno 6 caratteri").optional() // Opzionale se si modifica
  }),
  role: yup.string().oneOf(['user', 'admin'], "Ruolo non valido").required("Il ruolo è obbligatorio"),
});


const UserManagement = () => {
  const dispatch = useDispatch(); // Non usato direttamente per i thunk, ma potrebbe servire per altro
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // Per modifica ruolo o dettagli
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const { user: authUser } = useSelector(state => state.auth); // Utente loggato

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    resolver: yupResolver(userFormSchema),
    context: { isEditing: !!editingUser } // Passa il contesto per la validazione condizionale della password
  });
  const isEditingForm = !!editingUser; // True se stiamo modificando un utente esistente

  const fetchUsers = async (page, limit, term) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllUsersAPI({ page, limit, searchTerm: term });
      setUsers(data.users);
      setTotalUsers(data.totalCount);
    } catch (err) {
      setError(err.message || 'Errore nel caricamento degli utenti.');
      toast.error(err.message || 'Errore nel caricamento degli utenti.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, ADMIN_USERS_PER_PAGE, searchTerm);
  }, [currentPage, searchTerm]);


  const handleOpenModal = (user = null) => {
    setEditingUser(user);
    if (user) {
      reset({ name: user.name, email: user.email, role: user.role, password: '' }); // Non pre-popolare la password per modifica
    } else {
      reset({ name: '', email: '', password: '', role: 'user' }); // Default per nuovo utente
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingUser(null);
    setIsModalOpen(false);
    reset();
  };

  const handleUserFormSubmit = async (formData) => {
    try {
      setIsLoading(true); // Aggiungi loading state per il form
      if (editingUser) { // Modifica Utente (ruolo o altri dettagli)
        const dataToUpdate = { role: formData.role };
        if (formData.name !== editingUser.name) dataToUpdate.name = formData.name;
        if (formData.email !== editingUser.email) dataToUpdate.email = formData.email;
        // Per la modifica, aggiorna solo se i campi sono cambiati e validi
        // await updateUserAPI(editingUser.id, dataToUpdate); // Sostituire updateUserRoleAPI con una più generica se necessario
        await updateUserRoleAPI(editingUser.id, formData.role); // Per ora solo il ruolo, come prima
        toast.success(`Utente ${editingUser.name} aggiornato.`);
      } else { // Crea Nuovo Utente
        await adminCreateUserAPI(formData);
        toast.success(`Utente ${formData.name} creato con successo.`);
      }
      fetchUsers(currentPage, ADMIN_USERS_PER_PAGE, searchTerm); // Refresh lista
      handleCloseModal();
    } catch (err) {
      toast.error(err.message || `Errore durante ${editingUser ? 'l\'aggiornamento' : 'la creazione'} dell'utente.`);
    } finally {
      setIsLoading(false); // Rimuovi loading state
    }
  };


  const handleDeleteConfirmation = (user) => {
    if (user.id === authUser.id) {
        toast.error("Non puoi eliminare te stesso!");
        return;
    }
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      setIsLoading(true);
      await deleteUserAPI(userToDelete.id);
      toast.success(`Utente ${userToDelete.name} eliminato con successo!`);
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
      fetchUsers(currentPage, ADMIN_USERS_PER_PAGE, searchTerm);
      if (users.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      toast.error(err.message || 'Errore durante l\'eliminazione dell\'utente.');
      setIsDeleteDialogOpen(false);
    } finally {
        setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };


  if (error && !isLoading && users.length === 0) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="page-title !text-2xl !mb-0">Gestione Utenti</h1>
        <Button onClick={() => handleOpenModal()} variant="primary" iconLeft={<UserPlusIcon className="h-5 w-5" />}>
          Nuovo Utente
        </Button>
      </div>

      <input
        type="text"
        placeholder="Cerca utenti per nome o email..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 border border-neutral-default/50 dark:border-neutral-dark/70 rounded-md focus:ring-primary focus:border-primary dark:bg-neutral-dark/30 dark:text-neutral-light"
      />

      {isLoading && users.length === 0 ? ( // Modificato per mostrare lo spinner anche se ci sono errori ma sta ricaricando
        <LoadingSpinner size="lg" className="my-10" />
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-neutral-dark shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-neutral-light dark:divide-neutral-dark/50">
            <thead className="bg-neutral-light/50 dark:bg-neutral-dark/30">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-default dark:text-gray-300 uppercase tracking-wider">Nome</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-default dark:text-gray-300 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-default dark:text-gray-300 uppercase tracking-wider">Ruolo</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-default dark:text-gray-300 uppercase tracking-wider">Azioni</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-neutral-dark divide-y divide-neutral-light dark:divide-neutral-dark/50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-neutral-light/30 dark:hover:bg-neutral-dark/40 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-dark dark:text-neutral-light">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-default dark:text-gray-300">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100' : 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100'
                    }`}>
                        {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenModal(user)} title="Modifica Utente">
                      <PencilIcon className="h-5 w-5 text-primary dark:text-primary-light" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteConfirmation(user)} title="Elimina Utente" disabled={user.id === authUser?.id}>
                      <TrashIcon className={`h-5 w-5 ${user.id === authUser?.id ? 'text-neutral-default' : 'text-red-500'}`} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {users.length === 0 && !isLoading && (
        <p className="text-center text-neutral-default dark:text-gray-400 py-8">Nessun utente trovato.</p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalUsers / ADMIN_USERS_PER_PAGE)}
        onPageChange={handlePageChange}
        itemsPerPage={ADMIN_USERS_PER_PAGE}
        totalItems={totalUsers}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingUser ? `Modifica Utente: ${editingUser.name}` : 'Crea Nuovo Utente'}
      >
        {isModalOpen && (
            <form onSubmit={handleSubmit(handleUserFormSubmit)} className="space-y-4">
                <InputField
                    label="Nome Completo"
                    name="name"
                    register={register}
                    error={errors.name}
                    disabled={isEditingForm && !authUser?.isAdmin} // Admin può modificare, utente no? O sempre disabilitato in modifica?
                                                            // Per ora, solo admin può, ma lo schema lo permette. Mettiamo disabilitato per modifica.
                                                            // Decidiamo: disabilitiamo la modifica del nome e email per semplicità nel form di modifica
                    // disabled={isEditingForm}
                />
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    register={register}
                    error={errors.email}
                    // disabled={isEditingForm}
                />
                {!editingUser && ( // Mostra campo password solo per creazione
                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        register={register}
                        error={errors.password}
                    />
                )}
                 {editingUser && ( // Opzionale: permettere cambio password in modifica
                    <InputField
                        label="Nuova Password (lascia vuoto per non cambiare)"
                        name="password"
                        type="password"
                        register={register}
                        error={errors.password}
                    />
                )}
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-neutral-dark dark:text-neutral-light mb-1">Ruolo</label>
                    <select
                        id="role"
                        {...register("role")}
                        className={`block w-full rounded-md border-0 py-2.5 px-3 shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6 dark:bg-neutral-dark/30 dark:text-neutral-light ${
                            errors.role ? 'text-red-600 ring-red-500 focus:ring-red-500' : 'text-neutral-dark ring-neutral-default/50 focus:ring-primary dark:ring-neutral-dark/70'
                        }`}
                        defaultValue={editingUser ? editingUser.role : 'user'}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    {errors.role && <p className="mt-1.5 text-xs text-red-500">{errors.role.message}</p>}
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={handleCloseModal}>Annulla</Button>
                    <Button type="submit" variant="primary" isLoading={isLoading}>
                        {editingUser ? 'Salva Modifiche' : 'Crea Utente'}
                    </Button>
                </div>
            </form>
        )}
      </Modal>

      <Modal
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Conferma Eliminazione Utente"
        primaryAction={handleDeleteUser}
        primaryActionLabel="Elimina"
        primaryActionVariant="danger"
        secondaryAction={() => setIsDeleteDialogOpen(false)}
        secondaryActionLabel="Annulla"
      >
        <p>Sei sicuro di voler eliminare l'utente "<strong>{userToDelete?.name}</strong>"? Questa azione è irreversibile.</p>
      </Modal>
    </div>
  );
};

export default UserManagement;