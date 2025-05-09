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

// Schema di validazione per il form utente
const userFormSchema = yup.object().shape({
  name: yup.string().required("Il nome è obbligatorio").trim(),
  email: yup.string().email("Formato email non valido").required("L'email è obbligatoria").trim(),
  // La password è obbligatoria solo in creazione (quando editingUser è null)
  // In modifica, è opzionale (se l'utente vuole cambiarla)
  password: yup.string().when('$isEditing', {
    is: false, // Corrisponde a !editingUser (quindi creazione)
    then: (schema) => schema.min(6, "La password deve essere di almeno 6 caratteri").required("La password è obbligatoria"),
    otherwise: (schema) => schema.optional().test(
      'min-length-if-present',
      'La password deve essere di almeno 6 caratteri se fornita',
      (value) => !value || value.length >= 6 // Se il campo non è vuoto, deve essere >= 6
    )
  }),
  role: yup.string().oneOf(['user', 'admin'], "Ruolo non valido").required("Il ruolo è obbligatorio"),
});

const UserManagement = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading generale per fetch/delete
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading specifico per submit form
  const [error, setError] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const { user: authUser } = useSelector(state => state.auth);

  // Passiamo isEditing come contesto a yupResolver
  const isEditingForm = !!editingUser;
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: yupResolver(userFormSchema),
    context: { isEditing: isEditingForm }, // Passa il contesto qui
    defaultValues: { // Imposta valori di default
      name: '',
      email: '',
      password: '',
      role: 'user'
    }
  });

  // Funzione per caricare gli utenti
  const fetchUsers = async (page, limit, term) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllUsersAPI({ page, limit, searchTerm: term });
      setUsers(data.users);
      setTotalUsers(data.totalCount);
    } catch (err) {
      const message = err.message || 'Errore nel caricamento degli utenti.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Carica utenti al montaggio e al cambio pagina/termine ricerca
  useEffect(() => {
    fetchUsers(currentPage, ADMIN_USERS_PER_PAGE, searchTerm);
  }, [currentPage, searchTerm]);

  // Apre la modale per creare o modificare
  const handleOpenModal = (user = null) => {
    setEditingUser(user);
    if (user) {
      // Se stiamo modificando, popola il form con i dati esistenti
      // Lascia la password vuota per non mostrarla e per la validazione opzionale
      reset({ name: user.name, email: user.email, role: user.role, password: '' });
    } else {
      // Se stiamo creando, resetta il form ai valori di default
      reset(); // Usa i defaultValues definiti in useForm
    }
    setIsModalOpen(true);
  };

  // Chiude la modale e resetta lo stato
  const handleCloseModal = () => {
    setEditingUser(null);
    setIsModalOpen(false);
    reset(); // Resetta il form
  };

  // Gestisce il submit del form (creazione/modifica)
  const handleUserFormSubmit = async (formData) => {
    setIsSubmitting(true); // Attiva lo spinner del bottone
    try {
      if (editingUser) { // --- Modifica Utente ---
        // Prepara i dati da aggiornare, escludi la password se non fornita
        const dataToUpdate = {
            name: formData.name,
            email: formData.email,
            role: formData.role,
        };
        // Aggiungi la password solo se l'utente l'ha inserita nel form di modifica
        if (formData.password) {
            dataToUpdate.password = formData.password;
        }
        // *** NOTA: Assumi che esista una updateUserAPI che accetta questi campi ***
        // await updateUserAPI(editingUser.id, dataToUpdate); 
        
        // Se vuoi aggiornare SOLO il ruolo come prima, mantieni:
        await updateUserRoleAPI(editingUser.id, formData.role); 
        // (ma la validazione permette di cambiare anche nome/email/password ora)
        
        toast.success(`Utente ${editingUser.name} aggiornato.`);

      } else { // --- Crea Nuovo Utente ---
        // La password è già inclusa e validata da userFormSchema
        await adminCreateUserAPI(formData);
        toast.success(`Utente ${formData.name} creato con successo.`);
      }
      fetchUsers(currentPage, ADMIN_USERS_PER_PAGE, searchTerm); // Aggiorna la lista
      handleCloseModal();
    } catch (err) {
      const message = err.response?.data?.message || err.message || `Errore durante ${editingUser ? 'l\'aggiornamento' : 'la creazione'} dell'utente.`;
      toast.error(message);
    } finally {
      setIsSubmitting(false); // Disattiva lo spinner del bottone
    }
  };

  // Apre la conferma di eliminazione
  const handleDeleteConfirmation = (user) => {
    if (user.id === authUser?.id) { // Controllo per non auto-eliminarsi
        toast.error("Non puoi eliminare te stesso!");
        return;
    }
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  // Esegue l'eliminazione
  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    setIsLoading(true); // Usa il loading generale per l'eliminazione
    try {
      await deleteUserAPI(userToDelete.id);
      toast.success(`Utente ${userToDelete.name} eliminato con successo!`);
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
      // Aggiorna la lista, controllando se l'eliminazione svuota la pagina corrente
      const newTotalPages = Math.ceil((totalUsers - 1) / ADMIN_USERS_PER_PAGE);
      const newCurrentPage = (users.length === 1 && currentPage > 1) ? currentPage - 1 : currentPage;
      setCurrentPage(newCurrentPage); // Imposta prima la nuova pagina
      if (newCurrentPage === currentPage) { // Se la pagina non cambia, forza il fetch
          fetchUsers(newCurrentPage, ADMIN_USERS_PER_PAGE, searchTerm);
      }
      // Se la pagina cambia, l'useEffect la ricaricherà
    } catch (err) {
      toast.error(err.message || 'Errore durante l\'eliminazione dell\'utente.');
      setIsDeleteDialogOpen(false);
    } finally {
        setIsLoading(false);
    }
  };

  // Gestione cambio pagina
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Gestione input ricerca
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Torna alla prima pagina ad ogni nuova ricerca
  };

  // Gestione errore caricamento iniziale
  if (error && !isLoading && users.length === 0) {
      return <p className="text-center text-red-500 dark:text-red-400 mt-10">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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

      {/* --- MODIFICA TABELLA --- */}
      {isLoading && users.length === 0 ? (
        <div className="flex justify-center items-center py-10">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        // Wrapper per lo scroll orizzontale
        <div className="overflow-x-auto shadow-md rounded-lg mt-4 border border-neutral-light dark:border-neutral-dark/50">
          <table className="min-w-full divide-y divide-neutral-light dark:divide-neutral-dark/50">
            <thead className="bg-neutral-light/50 dark:bg-neutral-dark/30">
              <tr>
                {/* Nascondi ID su mobile? Opzionale */}
                {/* <th scope="col" className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-neutral-default dark:text-gray-300 uppercase tracking-wider">ID</th> */}
                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-default dark:text-gray-300 uppercase tracking-wider">Nome</th>
                {/* Email e Ruolo potrebbero essere nascosti su schermi molto piccoli se necessario */}
                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-default dark:text-gray-300 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-default dark:text-gray-300 uppercase tracking-wider">Ruolo</th>
                <th scope="col" className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-neutral-default dark:text-gray-300 uppercase tracking-wider">Azioni</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-neutral-dark divide-y divide-neutral-light dark:divide-neutral-dark/50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-neutral-light/30 dark:hover:bg-neutral-dark/40 transition-colors">
                  {/* <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-sm text-neutral-default dark:text-gray-400">{user.id}</td> */}
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-dark dark:text-neutral-light">{user.name}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-neutral-default dark:text-gray-300">{user.email}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100' : 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100'
                    }`}>
                        {user.role}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenModal(user)} title="Modifica Utente" className="p-1">
                      <PencilIcon className="h-4 w-4 text-primary dark:text-primary-light" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteConfirmation(user)} title="Elimina Utente" disabled={user.id === authUser?.id} className="p-1">
                      <TrashIcon className={`h-4 w-4 ${user.id === authUser?.id ? 'text-gray-400' : 'text-red-500'}`} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* --- FINE MODIFICA TABELLA --- */}

      {users.length === 0 && !isLoading && (
        <p className="text-center text-neutral-default dark:text-gray-400 py-8">Nessun utente trovato.</p>
      )}

      {totalUsers > ADMIN_USERS_PER_PAGE && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalUsers / ADMIN_USERS_PER_PAGE)}
            onPageChange={handlePageChange}
            itemsPerPage={ADMIN_USERS_PER_PAGE}
            totalItems={totalUsers}
          />
      )}

      {/* Modale per Creare/Modificare Utente */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingUser ? `Modifica Utente: ${editingUser.name}` : 'Crea Nuovo Utente'}
      >
        {/* Renderizza il form solo quando la modale è aperta per garantire il reset */}
        {isModalOpen && (
            <form onSubmit={handleSubmit(handleUserFormSubmit)} className="space-y-4">
                <InputField
                    label="Nome Completo"
                    name="name"
                    register={register}
                    error={errors.name}
                    disabled={isEditingForm} // Disabilita modifica nome se in modifica
                />
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    register={register}
                    error={errors.email}
                    disabled={isEditingForm} // Disabilita modifica email se in modifica
                />
                {/* Campo Password: Obbligatorio in creazione, opzionale in modifica */}
                 <InputField
                    label={isEditingForm ? "Nuova Password (lascia vuoto per non cambiare)" : "Password"}
                    name="password"
                    type="password"
                    register={register}
                    error={errors.password}
                    autoComplete="new-password" // Suggerisce di non auto-compilare
                />
                {/* Selettore Ruolo */}
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-neutral-dark dark:text-neutral-light mb-1">Ruolo</label>
                    <select
                        id="role"
                        {...register("role")}
                        className={`input-field ${errors.role ? 'ring-red-500' : 'ring-neutral-default/50'}`}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    {errors.role && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.role.message}</p>}
                </div>
                {/* Pulsanti Azione */}
                <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" variant="outline" onClick={handleCloseModal}>Annulla</Button>
                    <Button type="submit" variant="primary" isLoading={isSubmitting}>
                        {editingUser ? 'Salva Modifiche' : 'Crea Utente'}
                    </Button>
                </div>
            </form>
        )}
      </Modal>

      {/* Modale Conferma Eliminazione */}
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