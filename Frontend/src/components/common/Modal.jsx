import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from './Button'; // Assicurati che Button sia importato correttamente
import { motion } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children, primaryAction, primaryActionLabel, secondaryAction, secondaryActionLabel, primaryActionVariant = 'primary' }) => {
  if (!isOpen) return null;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-dark/40 dark:bg-black/60 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                as={motion.div}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative transform overflow-hidden rounded-lg bg-background-light dark:bg-neutral-dark text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button // Usiamo un button standard qui per il close
                    type="button"
                    className="text-neutral-default hover:text-neutral-dark dark:text-neutral-light dark:hover:text-white p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={onClose}
                  >
                    <span className="sr-only">Chiudi</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="p-6">
                  {title && (
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-neutral-dark dark:text-neutral-light mb-4">
                      {title}
                    </Dialog.Title>
                  )}
                  <div className="text-sm text-neutral-default dark:text-gray-300">
                    {children}
                  </div>
                </div>
                {(primaryAction || secondaryAction) && (
                  <div className="bg-neutral-light dark:bg-neutral-dark/50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    {primaryAction && (
                      <Button
                        variant={primaryActionVariant}
                        onClick={primaryAction}
                        className="w-full sm:ml-3 sm:w-auto"
                      >
                        {primaryActionLabel || 'Conferma'}
                      </Button>
                    )}
                    {secondaryAction && (
                      <Button
                        variant="outline"
                        onClick={secondaryAction || onClose}
                        className="mt-3 w-full sm:mt-0 sm:w-auto"
                      >
                        {secondaryActionLabel || 'Annulla'}
                      </Button>
                    )}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;