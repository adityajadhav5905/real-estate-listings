import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Enquirypop = ({ onClose, toemail }) => {
    const formRef = useRef();
    console.log("Popup opened for email:", toemail);


    const sendEmail = (e) => {
        e.preventDefault();

        const formData = new FormData(formRef.current);
        console.log("Sending to:", toemail);


        emailjs
            .sendForm(
                'service_m2r0ocf',
                'template_nwqru83',
                formRef.current, 
                '-7kfQcHl5LXQy3-yN'
            )
            .then(
                () => {
                    alert('Enquiry sent successfully!');
                    onClose();
                },
                (error) => {
                    console.error('Failed to send enquiry:', error);
                    alert('Failed to send enquiry. Please try again.',error);
                }
            );

    };


    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-[9999]">
            <section className="bg-white dark:bg-gray-900 flex p-4 rounded-2xl border-2 border-gray-500 max-w-2xl w-full">
                <div className="w-full">
                    <h2 className="mb-4 text-2xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                        Broker will get in touch with you soon..!
                    </h2>
                    <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Jhon Doe"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Your email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Contact Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="892890XXXX"
                                required
                            />
                        </div>
                        <input type="hidden" name="toemail" value={toemail} />


                        <div className="submit-btn w-full flex justify-center items-center gap-4">
                            <button
                                type="submit"
                                className="py-2 px-4 text-sm font-medium text-white rounded-lg bg-gray-500 hover:bg-gray-600"
                            >
                                Submit Enquiry
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="py-2 px-4 text-sm font-medium text-white rounded-lg bg-red-500 hover:bg-red-600"
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Enquirypop;
