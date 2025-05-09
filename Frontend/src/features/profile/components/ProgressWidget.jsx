// --- START OF FILE ProgressWidget.jsx ---
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDaysIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import Button from '../../../components/common/Button'; // Verifica questo path!
import LoadingSpinner from '../../../components/common/LoadingSpinner'; // Verifica questo path!

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const ProgressWidget = ({
    profileIsLoading,
    profileError,
    profileData,
    progressData,
    isPregnancy,
    currentWeekOrMonth,
    fallbackTitle,
    fallbackDescription
}) => {
    const errorMessage = typeof profileError === 'string' ? profileError : (profileError?.message || "Si è verificato un errore nel caricare il profilo.");

    return (
        <motion.div
            className="md:col-span-2 p-6 bg-gradient-to-br from-primary to-secondary dark:from-primary-dark dark:to-secondary-dark text-white rounded-lg shadow-xl flex flex-col justify-between min-h-[300px]"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
        >
            {profileIsLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                    <LoadingSpinner color="white" size="md" />
                    <p className="mt-2 text-sm opacity-80">Caricamento profilo...</p>
                </div>
            ) : profileError ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <InformationCircleIcon className="w-10 h-10 text-yellow-300 mb-2" /> {/* text-yellow-300 su gradiente scuro dovrebbe essere OK */}
                    <p className="font-semibold">Errore Profilo</p>
                    <p className="text-sm opacity-90 mb-4">{errorMessage}</p>
                    <Button as={Link} to="/profile" variant="outline" size="sm" className="!text-white !border-white hover:!bg-white/20 self-center">
                        Vai al Profilo
                    </Button>
                </div>
            ) : progressData ? (
                <div className="flex flex-col h-full"> {/* Contenitore per i dati di progresso */}
                    <div className="flex items-start mb-3 space-x-3">
                        <CalendarDaysIcon className="w-7 h-7 mt-1 shrink-0" />
                        <div>
                            <h2 className="text-2xl font-semibold">
                                {isPregnancy
                                    ? `Settimana ${currentWeekOrMonth} (${progressData.trimester}° Trimestre)`
                                    : `${progressData.ageText} (${profileData?.childName ? profileData.childName : 'il tuo bimbo'})`
                                }
                            </h2>
                            {isPregnancy && (
                                <p className="text-lg opacity-90 mt-1">{progressData.sizeComparisonText}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3 text-sm overflow-y-auto pr-2 flex-grow"> {/* Controllare testo con opacità dopo fix gradiente */}
                        {isPregnancy ? (
                            <>
                                <div>
                                    <h3 className="font-semibold opacity-80 mb-1">Sviluppo del bambino:</h3>
                                    <ul className="list-disc list-inside space-y-0.5 pl-2">
                                        {progressData.fetusDev?.map((item, index) => <li key={`fetus-${index}`}>{item}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold opacity-80 mb-1">Cambiamenti per te:</h3>
                                    <ul className="list-disc list-inside space-y-0.5 pl-2">
                                        {progressData.momChanges?.map((item, index) => <li key={`mom-${index}`}>{item}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold opacity-80 mb-1">Cose da fare/Ricorda:</h3>
                                    <ul className="list-disc list-inside space-y-0.5 pl-2">
                                        {progressData.todos?.map((item, index) => <li key={`todo-${index}`}>{item}</li>)}
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <h3 className="font-semibold opacity-80 mb-1">Tappe dello Sviluppo:</h3>
                                    <ul className="list-disc list-inside space-y-0.5 pl-2">
                                        {progressData.motor?.map((item, index) => <li key={`motor-${index}`}>Motorio: {item}</li>)}
                                        {progressData.cognitive?.map((item, index) => <li key={`cog-${index}`}>Cognitivo/Linguistico: {item}</li>)}
                                        {progressData.social?.map((item, index) => <li key={`soc-${index}`}>Sociale/Emotivo: {item}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold opacity-80 mb-1">Consigli per te:</h3>
                                    <ul className="list-disc list-inside space-y-0.5 pl-2">
                                        {progressData.tips?.map((item, index) => <li key={`tip-${index}`}>{item}</li>)}
                                    </ul>
                                </div>
                                {progressData.alerts && progressData.alerts.length > 0 && (
                                    <div>
                                        <h3 className="font-semibold text-yellow-300 mb-1">Da osservare:</h3> {/* text-yellow-300 */}
                                        <ul className="list-disc list-inside space-y-0.5 pl-2 text-yellow-100/90"> {/* text-yellow-100/90 */}
                                            {progressData.alerts?.map((item, index) => <li key={`alert-${index}`}>{item}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    {progressData.articleSlug && (
                        <div className="mt-4 pt-3 border-t border-white/30">
                            <Link to={`/blog/${progressData.articleSlug}`} className="text-sm font-medium hover:underline opacity-90">
                                Leggi l'articolo correlato →
                            </Link>
                        </div>
                    )}
                </div> 
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <InformationCircleIcon className="w-10 h-10 text-yellow-300 mb-2" />
                    <p className="font-semibold">{fallbackTitle}</p>
                    <p className="text-sm opacity-90 mb-4">{fallbackDescription}</p>
                    <Button as={Link} to="/profile" variant="outline" size="sm" className="!text-white !border-white hover:!bg-white/20 self-center">
                        Vai al Profilo
                    </Button>
                </div>
            )}

            {!profileIsLoading && !profileError && (
                <Button as={Link} to="/profile" variant="outline" size="sm" className="!text-white !border-white hover:!bg-white/20 self-start mt-4 shrink-0">
                    {profileData ? 'Modifica Profilo' : 'Completa Profilo'}
                </Button>
            )}
        </motion.div>
    );
};

export default ProgressWidget;
// --- END OF FILE ProgressWidget.jsx ---